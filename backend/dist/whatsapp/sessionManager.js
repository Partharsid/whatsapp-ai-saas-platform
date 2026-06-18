"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const qrcode_1 = __importDefault(require("qrcode"));
const prisma_1 = require("../utils/prisma");
const openRouterService_1 = require("../ai/openRouterService");
const googleSheetsService_1 = require("../integrations/googleSheetsService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Manage multiple WhatsApp sessions
class SessionManager {
    sessions = new Map();
    io;
    constructor(io) {
        this.io = io;
    }
    async createSession(userId) {
        console.log(`Creating session for user: ${userId}`);
        const authFolder = path_1.default.join(__dirname, `../../sessions/auth_info_${userId}`);
        // Ensure sessions directory exists
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, '../../sessions'))) {
            fs_1.default.mkdirSync(path_1.default.join(__dirname, '../../sessions'));
        }
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(authFolder);
        const sock = (0, baileys_1.default)({
            auth: state,
            printQRInTerminal: false,
        });
        this.sessions.set(userId, sock);
        sock.ev.on('creds.update', saveCreds);
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;
            if (qr) {
                console.log(`QR generated for user: ${userId}`);
                const qrCodeDataUrl = await qrcode_1.default.toDataURL(qr);
                this.io.to(userId).emit('qr-code', qrCodeDataUrl);
                await prisma_1.prisma.whatsAppSession.upsert({
                    where: { userId },
                    create: { userId, status: 'QR_PENDING' },
                    update: { status: 'QR_PENDING' }
                });
            }
            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== baileys_1.DisconnectReason.loggedOut;
                console.log(`Connection closed for user ${userId}. Reconnecting: ${shouldReconnect}`);
                if (shouldReconnect) {
                    this.createSession(userId);
                }
                else {
                    this.sessions.delete(userId);
                    await prisma_1.prisma.whatsAppSession.update({
                        where: { userId },
                        data: { status: 'DISCONNECTED' }
                    });
                    // Also delete auth folder if logged out
                    fs_1.default.rmSync(authFolder, { recursive: true, force: true });
                }
            }
            else if (connection === 'open') {
                console.log(`Connection opened for user ${userId}`);
                const phoneNumber = sock.user?.id.split(':')[0];
                await prisma_1.prisma.whatsAppSession.upsert({
                    where: { userId },
                    create: { userId, status: 'CONNECTED', phoneNumber },
                    update: { status: 'CONNECTED', phoneNumber }
                });
                this.io.to(userId).emit('connection-status', 'connected');
            }
        });
        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type === 'notify') {
                for (const msg of messages) {
                    if (!msg.key.fromMe && msg.message) {
                        const remoteJid = msg.key.remoteJid;
                        if (!remoteJid || remoteJid.includes('@g.us'))
                            continue; // Ignore groups for now
                        const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;
                        if (!messageContent)
                            continue;
                        console.log(`Message received for user ${userId} from ${remoteJid}:`, messageContent);
                        // 1. Contact Management
                        const phoneNumber = remoteJid.split('@')[0];
                        const contact = await prisma_1.prisma.contact.upsert({
                            where: { userId_phoneNumber: { userId, phoneNumber } },
                            create: {
                                userId,
                                whatsAppId: remoteJid,
                                phoneNumber,
                                name: msg.pushName || 'Unknown',
                            },
                            update: {
                                name: msg.pushName || undefined,
                                lastMessageAt: new Date()
                            }
                        });
                        // 2. Conversation Management
                        let conversation = await prisma_1.prisma.conversation.findFirst({
                            where: { userId, contactId: contact.id, status: 'ACTIVE' }
                        });
                        if (!conversation) {
                            conversation = await prisma_1.prisma.conversation.create({
                                data: {
                                    userId,
                                    contactId: contact.id,
                                    status: 'ACTIVE'
                                }
                            });
                        }
                        // 3. Save incoming message
                        await prisma_1.prisma.message.create({
                            data: {
                                conversationId: conversation.id,
                                direction: 'INBOUND',
                                content: messageContent,
                            }
                        });
                        // 4. Generate AI Reply
                        try {
                            // Send typing indicator
                            await sock.presenceSubscribe(remoteJid);
                            await sock.sendPresenceUpdate('composing', remoteJid);
                            const aiReply = await openRouterService_1.OpenRouterService.generateReply(userId, conversation.id, messageContent);
                            // 5. Send AI Reply
                            await sock.sendMessage(remoteJid, { text: aiReply });
                            await sock.sendPresenceUpdate('paused', remoteJid);
                            // 6. Save outgoing message
                            await prisma_1.prisma.message.create({
                                data: {
                                    conversationId: conversation.id,
                                    direction: 'OUTBOUND',
                                    content: aiReply,
                                    isAiGenerated: true
                                }
                            });
                            // 7. Log to Google Sheets
                            await googleSheetsService_1.GoogleSheetsService.logChat(userId, {
                                timestamp: new Date().toISOString(),
                                contactName: contact.name || phoneNumber,
                                phoneNumber,
                                topic: 'AI Chat',
                                fullChat: `User: ${messageContent}\nAI: ${aiReply}`,
                                sentiment: 'Neutral'
                            });
                        }
                        catch (error) {
                            console.error('Error in AI/Reply pipeline:', error);
                        }
                    }
                }
            }
        });
        return sock;
    }
    getSession(userId) {
        return this.sessions.get(userId);
    }
    async deleteSession(userId) {
        const sock = this.sessions.get(userId);
        if (sock) {
            sock.logout();
            this.sessions.delete(userId);
        }
    }
}
exports.SessionManager = SessionManager;
