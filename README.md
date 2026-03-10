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

## Run all apps at once

From the repository root:

1. Install dependencies

```bash
npm install
```

2. Start all app dev servers (web + api) in one command

```bash
npm run dev
```

This uses Turborepo to run every workspace `dev` script in parallel.

### Default local URLs

- Web: `http://localhost:5173`
- API: `http://localhost:4000`
