import { HttpError } from '../../../core/http-error.js';
import { VisitorModel } from '../models/visitor.model.js';

export class VisitorService {
  constructor(visitorRepository) {
    this.visitorRepository = visitorRepository;
  }

  async getVisitors(tenantId) {
    if (!tenantId) {
      throw new HttpError(400, 'tenantId is required');
    }

    return this.visitorRepository.findByTenantId(tenantId);
  }

  async createVisitor(payload) {
    if (!payload?.tenantId) {
      throw new HttpError(400, 'tenantId is required');
    }

    if (!payload?.fullName || !payload.fullName.trim()) {
      throw new HttpError(400, 'fullName is required');
    }

    const visitor = VisitorModel.create(payload);
    return this.visitorRepository.save(visitor);
  }
}
