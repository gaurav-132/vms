import { Router } from 'express';
import { asyncHandler } from '../../core/http/async-handler.js';
import { createVisitorModule } from './visitor.module.js';

export function createVisitorRouter() {
  const router = Router();
  const { visitorController } = createVisitorModule();

  router.get('/', asyncHandler(visitorController.list.bind(visitorController)));
  router.post('/', asyncHandler(visitorController.create.bind(visitorController)));

  return router;
}
