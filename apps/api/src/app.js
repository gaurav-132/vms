import cors from 'cors';
import express from 'express';
import { createHealthRouter } from './modules/health/health.routes.js';
import { createVisitorRouter } from './modules/visitors/visitor.routes.js';
import { errorHandler } from './core/middleware/error-handler.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/health', createHealthRouter());
  app.use('/v1/visitors', createVisitorRouter());

  app.use(errorHandler);

  return app;
}
