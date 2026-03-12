import { authService } from '../services/authService';

export function useAuth() {
    return {
        isAuthenticated: authService.isAuthenticated(),
        session: authService.getSession(),
        login: authService.login.bind(authService),
        logout: authService.logout.bind(authService),
    };
}
