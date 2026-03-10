export class VisitorModel {
  constructor({ id, tenantId, fullName, phone = null, company = null, createdAt }) {
    this.id = id;
    this.tenantId = tenantId;
    this.fullName = fullName;
    this.phone = phone;
    this.company = company;
    this.createdAt = createdAt;
  }

  static create(input) {
    return new VisitorModel({
      id: crypto.randomUUID(),
      tenantId: input.tenantId,
      fullName: input.fullName.trim(),
      phone: input.phone ?? null,
      company: input.company ?? null,
      createdAt: new Date().toISOString()
    });
  }
}
