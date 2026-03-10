import { VisitorRepositoryContract } from '../../contracts/visitor-repository.contract.js';

export class VisitorMemoryRepository extends VisitorRepositoryContract {
  constructor() {
    super();
    this.items = [];
  }

  findByTenantId(tenantId) {
    return this.items.filter((item) => item.tenantId === tenantId);
  }

  save(visitor) {
    this.items.push(visitor);
    return visitor;
  }
}
