import { Router } from 'express';
import { DashboardController } from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken); // Protect all dashboard routes

router.get('/stats', DashboardController.getStats);
router.get('/contacts', DashboardController.getContacts);
router.get('/conversations', DashboardController.getConversations);

router.get('/ai/config', DashboardController.getAiConfig);
router.put('/ai/config', DashboardController.updateAiConfig);

router.get('/whatsapp/status', DashboardController.getWhatsAppStatus);

router.get('/broadcasts', DashboardController.getBroadcasts);
router.post('/broadcasts', DashboardController.createBroadcast);

router.get('/user/profile', DashboardController.getUserProfile);

export default router;
