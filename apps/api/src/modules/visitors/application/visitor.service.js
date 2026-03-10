import { createVisitor } from '../domain/visitor.entity.js';
import { HttpError } from '../../../core/http-error.js';

export class VisitorService {
  constructor(visitorRepository) {
    this.visitorRepository = visitorRepository;
  }

  async listByTenant(tenantId) {
    if (!tenantId) throw new HttpError(400, 'tenantId is required');
    return this.visitorRepository.listByTenant(tenantId);
  }

  async register(input) {
    if (!input.tenantId) throw new HttpError(400, 'tenantId is required');
    if (!input.fullName) throw new HttpError(400, 'fullName is required');

    const visitor = createVisitor({
      id: crypto.randomUUID(),
      tenantId: input.tenantId,
      fullName: input.fullName.trim(),
      phone: input.phone,
      company: input.company
    });

    return this.visitorRepository.create(visitor);
  }
}
