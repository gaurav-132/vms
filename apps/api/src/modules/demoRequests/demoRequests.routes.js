import express from 'express';
import { demoRequestsController } from './demoRequests.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', demoRequestsController.create);
router.get('/', authenticateToken, demoRequestsController.list);
router.get('/:id', authenticateToken, demoRequestsController.getById);
router.put('/:id', authenticateToken, demoRequestsController.update);
router.patch('/:id/status', authenticateToken, demoRequestsController.updateStatus);
router.delete('/:id', authenticateToken, demoRequestsController.delete);

export const demoRequestsRoutes = router;
