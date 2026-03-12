import express from 'express';
import { demoRequestsController } from './demoRequests.controller.js';

const router = express.Router();

router.post('/', demoRequestsController.create);
router.get('/', demoRequestsController.list);
router.patch('/:id/status', demoRequestsController.updateStatus);

export const demoRequestsRoutes = router;
