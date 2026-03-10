import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '../shared/components/app-shell';
import { HomePage } from '../features/auth/pages/home-page';
import { DashboardPage } from '../features/dashboard/pages/dashboard-page';
import { VisitorsPage } from '../features/visitors/pages/visitors-page';
import { GatesPage } from '../features/gates/pages/gates-page';
import { UsersPage } from '../features/users/pages/users-page';

export const appRouter = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  {
    path: '/app',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'gates', element: <GatesPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'visitors', element: <VisitorsPage /> }
    ]
  }
]);
