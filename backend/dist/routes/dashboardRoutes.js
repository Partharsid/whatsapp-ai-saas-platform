"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticateToken); // Protect all dashboard routes
router.get('/stats', dashboardController_1.DashboardController.getStats);
router.get('/contacts', dashboardController_1.DashboardController.getContacts);
router.get('/conversations', dashboardController_1.DashboardController.getConversations);
router.get('/ai/config', dashboardController_1.DashboardController.getAiConfig);
router.put('/ai/config', dashboardController_1.DashboardController.updateAiConfig);
router.get('/whatsapp/status', dashboardController_1.DashboardController.getWhatsAppStatus);
router.get('/broadcasts', dashboardController_1.DashboardController.getBroadcasts);
router.post('/broadcasts', dashboardController_1.DashboardController.createBroadcast);
router.get('/user/profile', dashboardController_1.DashboardController.getUserProfile);
exports.default = router;
