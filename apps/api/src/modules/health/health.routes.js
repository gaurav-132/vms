import { Router } from 'express';
import { HealthController } from './controllers/health.controller.js';

export function createHealthRouter() {
  const router = Router();
  const healthController = new HealthController();

  router.get('/', healthController.status.bind(healthController));

  return router;
}
