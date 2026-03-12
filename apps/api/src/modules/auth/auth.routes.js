import express from 'express';
import { authController } from './auth.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/setup', authController.setupAdmin);
router.post('/register', authenticateToken, authController.register);

router.post('/login', authController.login);
router.get('/me', authenticateToken, authController.me);

// User Management (Admin only)
router.get('/users', authenticateToken, authController.listUsers);
router.put('/users/:id', authenticateToken, authController.updateUser);
router.delete('/users/:id', authenticateToken, authController.deleteUser);

export const authRoutes = router;
