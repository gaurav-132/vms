import { VisitorService } from './application/visitor.service.js';
import { InMemoryVisitorRepository } from './infrastructure/visitor.repository.memory.js';
import { createVisitorController } from './interfaces/visitor.controller.js';

export function createVisitorModule() {
  const repository = new InMemoryVisitorRepository();
  const service = new VisitorService(repository);
  const controller = createVisitorController(service);

  return { controller };
}
