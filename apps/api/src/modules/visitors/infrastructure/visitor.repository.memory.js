export class InMemoryVisitorRepository {
  constructor() {
    this.items = [];
  }

  async listByTenant(tenantId) {
    return this.items.filter((item) => item.tenantId === tenantId);
  }

  async create(visitor) {
    this.items.push(visitor);
    return visitor;
  }
}
