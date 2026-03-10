# VMS MVP Roadmap (Org-First, Dynamic Multi-Tenant)

## 1) Product scope

Support future tenant types in one codebase:

- organization
- school_college
- society

MVP functionality is implemented for **organization** only.

## 2) Domain-first implementation order

Organization -> Gates -> Users -> Visitors -> Entries

This is the required dependency chain for current implementation.

## 3) Platform decisions

- Frontend and backend are **separated**.
- Frontend is React (`apps/web`).
- Backend is Node.js (`apps/api`) and must follow **SOLID principles**.
- Database schema and workflows must follow **ACID-safe design** with constraints and transactional boundaries.

## 4) In-scope for org MVP

- Organization onboarding + tenant provisioning
- Gate management
- User management + roles (`admin`, `security`, `user`)
- Visitor management
- Entry management (check-in/check-out)
- Operational dashboard (active entries, today visitors, completed entries)

## 5) Out of scope for org MVP

- Separate employee management module
- School/society custom business rules
- Complex billing automation
- Microservices split

## 6) Phase plan

### Phase 0 (Day 1-2): Foundation alignment

- Finalize entity contracts and status enums
- Freeze API boundaries between web and Node backend
- Convert UI docs into module-wise backlog

**Exit criteria:** approved backlog for all five core domains.

### Phase 1 (Week 1): Tenant + auth base

- Tenant type aware onboarding (org-first enabled)
- Membership and role model with tenant isolation
- Protected app shell and route guards

**Exit criteria:** admin can create org and access workspace.

### Phase 2 (Week 2): Gates + users

- Create/edit/disable gates
- Add/manage users and role assignment
- Role-based permissions for admin/security/user

**Exit criteria:** organization has usable gate and user setup.

### Phase 3 (Week 3-4): Visitors + entries

- Visitor profile registration
- Entry lifecycle: check-in, active tracking, check-out
- Gate-linked entry operations

**Exit criteria:** security can complete full visitor entry lifecycle.

### Phase 4 (Week 4): Dashboard baseline

- Today visitors
- Active entries
- Completed entries
- Basic filters by date, gate, status

**Exit criteria:** operations team gets daily monitoring visibility.

### Phase 5 (Week 5): PWA hardening

- Offline-safe entry capture patterns
- Operational validation and audit-friendly updates
- Notification-ready extension points

**Exit criteria:** desk operations remain reliable under poor connectivity.

## 7) Success criteria

- Org onboarding completes in one flow.
- Gate/user/visitor/entry lifecycle works end-to-end.
- Tenant isolation is enforced.
- Architecture is extensible to schools/societies without rewrite.
