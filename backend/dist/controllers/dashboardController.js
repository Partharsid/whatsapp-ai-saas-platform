"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const prisma_1 = require("../utils/prisma");
class DashboardController {
    static getStats = async (req, res) => {
        try {
            const userId = req.userId;
            const activeConversations = await prisma_1.prisma.conversation.count({ where: { userId, status: 'ACTIVE' } });
            const totalContacts = await prisma_1.prisma.contact.count({ where: { userId } });
            const aiRepliesSent = await prisma_1.prisma.message.count({ where: { conversation: { userId }, isAiGenerated: true } });
            const waSession = await prisma_1.prisma.whatsAppSession.findUnique({ where: { userId } });
            res.json({
                activeConversations,
                totalContacts,
                aiRepliesSent,
                waStatus: waSession?.status || 'DISCONNECTED',
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch stats' });
        }
    };
    static getContacts = async (req, res) => {
        try {
            const contacts = await prisma_1.prisma.contact.findMany({ where: { userId: req.userId }, orderBy: { lastMessageAt: 'desc' } });
            res.json(contacts);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch contacts' });
        }
    };
    static getConversations = async (req, res) => {
        try {
            const convs = await prisma_1.prisma.conversation.findMany({
                where: { userId: req.userId },
                include: { contact: true, messages: { orderBy: { timestamp: 'desc' }, take: 1 } },
                orderBy: { startedAt: 'desc' }
            });
            res.json(convs);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch conversations' });
        }
    };
    static getAiConfig = async (req, res) => {
        try {
            const userId = req.userId;
            let config = await prisma_1.prisma.apiKeyConfig.findUnique({ where: { userId } });
            if (!config) {
                config = await prisma_1.prisma.apiKeyConfig.create({ data: { userId, useServerKey: true } });
            }
            const prompt = await prisma_1.prisma.systemPrompt.findFirst({ where: { userId, isActive: true }, orderBy: { createdAt: 'desc' } });
            res.json({ config, prompt });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch AI config' });
        }
    };
    static updateAiConfig = async (req, res) => {
        try {
            const { provider, apiKey, model, systemPrompt, useServerKey } = req.body;
            const userId = req.userId;
            await prisma_1.prisma.apiKeyConfig.upsert({
                where: { userId },
                create: { userId, useServerKey: useServerKey ?? true, openRouterKey: apiKey, selectedModel: model },
                update: { useServerKey: useServerKey ?? true, openRouterKey: apiKey, selectedModel: model }
            });
            if (systemPrompt) {
                await prisma_1.prisma.systemPrompt.updateMany({ where: { userId }, data: { isActive: false } });
                await prisma_1.prisma.systemPrompt.create({
                    data: { userId, name: 'Custom Prompt', content: systemPrompt, isActive: true }
                });
            }
            res.json({ success: true });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update AI config' });
        }
    };
    static getWhatsAppStatus = async (req, res) => {
        try {
            const waSession = await prisma_1.prisma.whatsAppSession.findUnique({ where: { userId: req.userId } });
            res.json({ status: waSession?.status || 'DISCONNECTED' });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch WhatsApp status' });
        }
    };
    static getBroadcasts = async (req, res) => {
        try {
            const broadcasts = await prisma_1.prisma.broadcastCampaign.findMany({ where: { userId: req.userId }, orderBy: { scheduledAt: 'desc' } });
            res.json(broadcasts);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch broadcasts' });
        }
    };
    static createBroadcast = async (req, res) => {
        try {
            const { name, message, status } = req.body;
            const broadcast = await prisma_1.prisma.broadcastCampaign.create({
                data: { userId: req.userId, name, message, status, recipients: [] }
            });
            res.json(broadcast);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create broadcast' });
        }
    };
    static getUserProfile = async (req, res) => {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id: req.userId } });
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch user profile' });
        }
    };
}
exports.DashboardController = DashboardController;
