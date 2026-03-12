import express from 'express';
import { dashboardController } from './dashboard.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/stats', authenticateToken, dashboardController.getStats);

export const dashboardRoutes = router;
