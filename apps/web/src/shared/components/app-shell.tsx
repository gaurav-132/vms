import { Link, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard' },
  { to: '/app/gates', label: 'Gates' },
  { to: '/app/users', label: 'Users' },
  { to: '/app/visitors', label: 'Visitors' }
];

export function AppShell() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #e5e7eb', padding: '1rem' }}>
        <h2>VMS</h2>
        <nav style={{ display: 'grid', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main style={{ padding: '1.5rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
