export function createVisitor({ id, tenantId, fullName, phone, company, createdAt }) {
  return {
    id,
    tenantId,
    fullName,
    phone: phone ?? null,
    company: company ?? null,
    createdAt: createdAt ?? new Date().toISOString()
  };
}
