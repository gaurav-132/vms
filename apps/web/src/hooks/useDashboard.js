import { useState, useCallback } from 'react';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export function useDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchWithAuth('/api/dashboard/stats');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch dashboard stats');
            }
            const data = await response.json();
            setStats(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { stats, loading, error, fetchStats };
}
