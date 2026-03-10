# apps/web

React frontend for VMS.

## Standardized frontend architecture

```txt
src/
  app/                 Router and app bootstrap concerns
  features/            Domain modules (auth, dashboard, gates, users, visitors)
  shared/components/   Reusable UI shells/components
  shared/lib/          Client utilities (API helpers, formatters)
```

## Route model

- Public routes: `/`
- Protected app routes: `/app/dashboard`, `/app/gates`, `/app/users`, `/app/visitors`

API integration targets the separate Node backend in `apps/api`.
