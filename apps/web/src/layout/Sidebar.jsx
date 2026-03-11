import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../utils/constants';

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white px-4 py-6">
      <h1 className="mb-8 text-xl font-bold text-indigo-700">VMS Cloud</h1>
      <nav className="grid gap-2">
        {NAVIGATION_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
