import { default: makeWASocket, DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode';
import { prisma } from '../utils/prisma';
import { Server } from 'socket.io';
import { OpenRouterService } from '../ai/openRouterService';
import { GoogleSheetsService } from '../integrations/googleSheetsService';
import fs from 'fs';
import path from 'path';

// Manage multiple WhatsApp sessions
export class SessionManager {
  private sessions: Map<string, ReturnType<typeof makeWASocket>> = new Map();
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  async createSession(userId: string) {
    console.log(`Creating session for user: ${userId}`);
    const authFolder = path.join(__dirname, `../../sessions/auth_info_${userId}`);
    
    // Ensure sessions directory exists
    if (!fs.existsSync(path.join(__dirname, '../../sessions'))) {
      fs.mkdirSync(path.join(__dirname, '../../sessions'));
    }

    const { state, saveCreds } = await useMultiFileAuthState(authFolder);

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    });

    this.sessions.set(userId, sock);

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log(`QR generated for user: ${userId}`);
        const qrCodeDataUrl = await qrcode.toDataURL(qr);
        this.io.to(userId).emit('qr-code', qrCodeDataUrl);
        
        await prisma.whatsAppSession.upsert({
          where: { userId },
          create: { userId, status: 'QR_PENDING' },
          update: { status: 'QR_PENDING' }
        });
      }

      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log(`Connection closed for user ${userId}. Reconnecting: ${shouldReconnect}`);
        
        if (shouldReconnect) {
          this.createSession(userId);
        } else {
          this.sessions.delete(userId);
          await prisma.whatsAppSession.update({
            where: { userId },
            data: { status: 'DISCONNECTED' }
          });
          // Also delete auth folder if logged out
          fs.rmSync(authFolder, { recursive: true, force: true });
        }
      } else if (connection === 'open') {
        console.log(`Connection opened for user ${userId}`);
        const phoneNumber = sock.user?.id.split(':')[0];
        
        await prisma.whatsAppSession.upsert({
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
            if (!remoteJid || remoteJid.includes('@g.us')) continue; // Ignore groups for now

            const messageContent = msg.message.conversation || msg.message.extendedTextMessage?.text;
            if (!messageContent) continue;
            
            console.log(`Message received for user ${userId} from ${remoteJid}:`, messageContent);

            // 1. Contact Management
            const phoneNumber = remoteJid.split('@')[0];
            const contact = await prisma.contact.upsert({
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
            let conversation = await prisma.conversation.findFirst({
              where: { userId, contactId: contact.id, status: 'ACTIVE' }
            });

            if (!conversation) {
              conversation = await prisma.conversation.create({
                data: {
                  userId,
                  contactId: contact.id,
                  status: 'ACTIVE'
                }
              });
            }

            // 3. Save incoming message
            await prisma.message.create({
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

              const aiReply = await OpenRouterService.generateReply(userId, conversation.id, messageContent);

              // 5. Send AI Reply
              await sock.sendMessage(remoteJid, { text: aiReply });
              await sock.sendPresenceUpdate('paused', remoteJid);

              // 6. Save outgoing message
              await prisma.message.create({
                data: {
                  conversationId: conversation.id,
                  direction: 'OUTBOUND',
                  content: aiReply,
                  isAiGenerated: true
                }
              });

              // 7. Log to Google Sheets
              await GoogleSheetsService.logChat(userId, {
                timestamp: new Date().toISOString(),
                contactName: contact.name || phoneNumber,
                phoneNumber,
                topic: 'AI Chat',
                fullChat: `User: ${messageContent}\nAI: ${aiReply}`,
                sentiment: 'Neutral'
              });

            } catch (error) {
              console.error('Error in AI/Reply pipeline:', error);
            }
          }
        }
      }
    });

    return sock;
  }

  getSession(userId: string) {
    return this.sessions.get(userId);
  }

  async deleteSession(userId: string) {
    const sock = this.sessions.get(userId);
    if (sock) {
      sock.logout();
      this.sessions.delete(userId);
    }
  }
}
