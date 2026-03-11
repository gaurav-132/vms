import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  return (
    <div className="grid min-h-screen bg-slate-100 md:grid-cols-[240px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
