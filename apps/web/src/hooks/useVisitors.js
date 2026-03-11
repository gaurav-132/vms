import { useState, useEffect } from 'react';
import { visitorService } from '../services/visitorService';

export function useVisitors() {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        visitorService
            .getAll()
            .then(setVisitors)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { visitors, loading, error };
}
