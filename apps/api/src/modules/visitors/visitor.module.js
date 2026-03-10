import { VisitorController } from './controllers/visitor.controller.js';
import { VisitorMemoryRepository } from './repositories/memory/visitor.repository.memory.js';
import { VisitorService } from './services/visitor.service.js';

export function createVisitorModule() {
  const visitorRepository = new VisitorMemoryRepository();
  const visitorService = new VisitorService(visitorRepository);
  const visitorController = new VisitorController(visitorService);

  return { visitorController };
}
