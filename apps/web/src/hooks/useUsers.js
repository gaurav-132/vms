import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        userService
            .getAll()
            .then(setUsers)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { users, loading, error };
}
