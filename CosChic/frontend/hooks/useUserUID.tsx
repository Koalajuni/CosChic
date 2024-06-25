import { useState, useEffect } from 'react';

const useUserUID = (): string | null => {
    const [userUID, setUserUID] = useState<string | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setUserUID(parsedData.UUID || null);
            } catch (error) {
                console.error('Failed to parse user data from localStorage:', error);
            }
        } else {
            console.error('No user data found in localStorage');
        }
    }, []);

    return userUID;
};

export default useUserUID;
