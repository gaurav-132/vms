const AUTH_KEY = 'xyz-auth-session';

export const authService = {
    login(payload) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
    },
    register(payload) {
        localStorage.setItem('xyz-tenant', JSON.stringify(payload));
    },
    logout() {
        localStorage.removeItem(AUTH_KEY);
    },
    getSession() {
        const stored = localStorage.getItem(AUTH_KEY);
        return stored ? JSON.parse(stored) : null;
    },
    isAuthenticated() {
        return Boolean(this.getSession());
    },
};
