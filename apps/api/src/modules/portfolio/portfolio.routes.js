import express from 'express';
import { portfolioController } from './portfolio.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', portfolioController.list);
router.get('/:id', portfolioController.getById);
router.post('/', authenticateToken, portfolioController.create);
router.put('/:id', authenticateToken, portfolioController.update);
router.delete('/:id', authenticateToken, portfolioController.delete);

export const portfolioRoutes = router;
