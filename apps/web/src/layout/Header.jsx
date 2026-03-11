import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { authService } from '../services/authService';

export function Header() {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-sm text-slate-500">Multi-tenant Visitor Management</p>
        <h2 className="text-lg font-semibold text-slate-900">Welcome back 👋</h2>
      </div>
      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
    </header>
  );
}
