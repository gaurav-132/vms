# Backend SOLID Architecture (Node.js)

## Layering

- **Controller layer**: validates input, maps HTTP to use-cases.
- **Service layer**: contains domain behavior and business rules.
- **Repository layer**: encapsulates database operations.

## SOLID application

1. **Single Responsibility**
   - One responsibility per class/module (e.g., `EntryService` only handles entry lifecycle rules).
2. **Open/Closed**
   - Extend through interfaces/adapters without changing stable service contracts.
3. **Liskov Substitution**
   - Repository implementations can be swapped (e.g., mock vs Supabase/Postgres) without breaking service behavior.
4. **Interface Segregation**
   - Keep contracts focused (`VisitorReader`, `VisitorWriter`) instead of broad interfaces.
5. **Dependency Inversion**
   - Services depend on interfaces, not concrete DB clients.

## Suggested module template

```txt
src/modules/visitor/
  visitor.controller.ts
  visitor.service.ts
  visitor.repository.ts
  visitor.types.ts
```

## Transaction guidance (ACID)

- Wrap multi-step state transitions (e.g., check-in/check-out workflows) in transactions.
- Enforce invariants with DB constraints first, service checks second.
- Keep writes idempotent where possible.
