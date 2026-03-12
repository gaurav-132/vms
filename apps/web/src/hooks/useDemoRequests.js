import { useState, useCallback } from 'react';

export function useDemoRequests() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const submitDemoRequest = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch('/api/demo-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit request');
            }

            setSuccess(true);
            return true;
        } catch (err) {
            console.error('submitDemoRequest error:', err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const resetStatus = useCallback(() => {
        setSuccess(false);
        setError(null);
    }, []);

    return { submitDemoRequest, loading, success, error, resetStatus };
}
