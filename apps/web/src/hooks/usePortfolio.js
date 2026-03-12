import { useState, useEffect, useCallback } from 'react';

export function usePortfolio() {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPortfolio = useCallback(async (type) => {
        setLoading(true);
        setError(null);
        try {
            const url = type ? `/api/portfolio?type=${type}` : '/api/portfolio';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch portfolio');
            const data = await res.json();
            setPortfolioItems(data);
        } catch (err) {
            console.error('usePortfolio error:', err);
            setError(err.message);
            setPortfolioItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPortfolio();
    }, [fetchPortfolio]);

    return { portfolioItems, loading, error, fetchPortfolio };
}
