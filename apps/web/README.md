# apps/web

Frontend foundation for VMS using React, Vite, React Router, and TailwindCSS.

## Structure

```txt
src/
  components/   Reusable presentational UI primitives
  layout/       App chrome and structural wrappers
  features/     Feature modules (auth, dashboard, users, visitors, invitations, settings)
  hooks/        Shared custom hooks
  services/     Session and API service layer
  utils/        Constants and helper utilities
  routes/       Router + guards
  styles/       Global Tailwind entry styles
```

## Routes

- Public: `/login`, `/register`
- Protected: `/dashboard`, `/dashboard/users`, `/dashboard/visitors`, `/dashboard/invitations`, `/dashboard/settings`
