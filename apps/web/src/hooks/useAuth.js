import { useMemo } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const session = useMemo(() => authService.getSession(), []);

  return {
    session,
    isAuthenticated: Boolean(session)
  };
}
