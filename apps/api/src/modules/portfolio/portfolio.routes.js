import express from 'express';
import { portfolioController } from './portfolio.controller.js';

const router = express.Router();

router.get('/', portfolioController.list);
router.post('/', portfolioController.create);
router.delete('/:id', portfolioController.delete);

export const portfolioRoutes = router;
