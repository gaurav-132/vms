import { authService } from '../services/authService';

export async function fetchWithAuth(url, options = {}) {
    const session = authService.getSession();
    const token = session?.token;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401 || response.status === 403) {
        authService.logout();
        window.location.href = '/login';
    }

    return response;
}
