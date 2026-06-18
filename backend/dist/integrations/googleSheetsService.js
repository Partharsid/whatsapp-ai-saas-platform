"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetsService = void 0;
const prisma_1 = require("../utils/prisma");
class GoogleSheetsService {
    static async logChat(userId, data) {
        const config = await prisma_1.prisma.googleSheetConfig.findUnique({ where: { userId } });
        if (!config || !config.isActive)
            return;
        try {
            // In a real scenario, you'd decode the encrypted service account credentials from config.
            // For MVP, assuming a server-wide service account or using OAuth.
            // Here we mock the auth setup since we don't have a real credentials file.
            /*
            const auth = new google.auth.JWT(
              client_email, null, private_key,
              ['https://www.googleapis.com/auth/spreadsheets']
            );
            const sheets = google.sheets({ version: 'v4', auth });
      
            await sheets.spreadsheets.values.append({
              spreadsheetId: config.sheetId,
              range: `${config.sheetName}!A:F`,
              valueInputOption: 'USER_ENTERED',
              requestBody: {
                values: [
                  [data.timestamp, data.contactName, data.phoneNumber, data.topic, data.fullChat, data.sentiment]
                ]
              }
            });
            */
            console.log(`[Google Sheets] Mock logging for ${userId}:`, data.topic);
            await prisma_1.prisma.googleSheetConfig.update({
                where: { id: config.id },
                data: { lastSyncAt: new Date() }
            });
        }
        catch (error) {
            console.error('Failed to log to Google Sheets:', error);
        }
    }
}
exports.GoogleSheetsService = GoogleSheetsService;
