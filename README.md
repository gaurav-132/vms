# Visitor Management System (VMS)

Multi-tenant SaaS Visitor Management System with **separated frontend and backend**.

## Architecture

- Frontend: React app in `apps/web`
- Backend: Node.js API in `apps/api`
- Database: Supabase Postgres (RLS + ACID-safe constraints)

## Domain implementation order (org MVP)

Organization -> Gates -> Users -> Visitors -> Entries

## Monorepo layout

```txt
apps/
  web/
  api/
packages/
  ui/
docs/
  mvp-roadmap.md
  backend-solid-architecture.md
supabase/
  migrations/
```
