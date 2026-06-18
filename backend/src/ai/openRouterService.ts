import { prisma } from '../utils/prisma';
import axios from 'axios';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenRouterService {
  private static BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

  static async generateReply(userId: string, conversationId: string, incomingMessage: string) {
    // Fetch the user's API Key configuration
    const config = await prisma.apiKeyConfig.findUnique({ where: { userId } });
    if (!config) throw new Error('API Key configuration not found');

    const apiKey = config.useServerKey ? process.env.OPENROUTER_API_KEY : config.openRouterKey;
    if (!apiKey) throw new Error('OpenRouter API key is missing');

    const model = config.selectedModel;

    // Fetch conversation memory and system prompt
    const chatMemory = await prisma.chatMemory.findUnique({ where: { conversationId } });
    const activePrompt = await prisma.systemPrompt.findFirst({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    const systemPromptContent = activePrompt?.content || 'You are a helpful assistant for a business.';

    let messages: Message[] = [
      { role: 'system', content: systemPromptContent }
    ];

    // Load history if exists
    let contextWindow: Message[] = [];
    if (chatMemory?.contextWindow) {
      contextWindow = JSON.parse(chatMemory.contextWindow);
    }

    // Append new message
    contextWindow.push({ role: 'user', content: incomingMessage });

    // Keep only last 20 messages for context (simple truncation)
    if (contextWindow.length > 20) {
      contextWindow = contextWindow.slice(contextWindow.length - 20);
    }

    messages = [...messages, ...contextWindow];

    try {
      const response = await axios.post(
        this.BASE_URL,
        {
          model,
          messages,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.FRONTEND_URL,
            'X-Title': 'WhatsApp AI Automation',
            'Content-Type': 'application/json'
          }
        }
      );

      const aiReply = response.data.choices[0].message.content;

      // Update memory
      contextWindow.push({ role: 'assistant', content: aiReply });
      
      await prisma.chatMemory.upsert({
        where: { conversationId },
        create: {
          conversationId,
          contextWindow: JSON.stringify(contextWindow),
        },
        update: {
          contextWindow: JSON.stringify(contextWindow),
        }
      });

      return aiReply;
    } catch (error) {
      console.error('Error generating AI reply:', error);
      throw error;
    }
  }
}
