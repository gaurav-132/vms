export class VisitorRepositoryContract {
  findByTenantId(_tenantId) {
    throw new Error('findByTenantId must be implemented');
  }

  save(_visitor) {
    throw new Error('save must be implemented');
  }
}
