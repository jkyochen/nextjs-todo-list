import { useState, useEffect } from 'react';

export function useLoadingState(timeout = 5000) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (loading) {
            timer = setTimeout(() => {
                setLoading(false);
            }, timeout);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [loading, timeout]);

    const toggleLoading = () => {
        setLoading(prev => !prev);
    };

    return { loading, toggleLoading };
}
