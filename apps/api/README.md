# apps/api

Node.js backend service for VMS, separated from the frontend.

## Standardized backend architecture (SOLID)

```txt
src/
  config/              Environment and configuration
  core/                Shared core abstractions/errors
  modules/
    health/            Health endpoints
    visitors/
      domain/          Entities and domain rules
      application/     Use-cases/services
      infrastructure/  Repository implementations
      interfaces/      HTTP controllers
      visitor.module.js
  app.js               Express app wiring
  server.js            Process bootstrap
```

## Principles

- SOLID layering in backend module design.
- ACID-safe persistence constraints in SQL migrations.
- Modules follow the domain sequence: Organization -> Gates -> Users -> Visitors -> Entries.
