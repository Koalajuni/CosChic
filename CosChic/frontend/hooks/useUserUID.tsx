import { useState, useEffect } from 'react';

const useUserUID = (): string | null => {
    const [userData, setUserData] = useState<{ UUID: string | null; email: string | null }>({
        UUID: null,
        email: null,
    });

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData);
            } catch (error) {
                console.error('Failed to parse user data from localStorage:', error);
            }
        } else {
            console.error('No user data found in localStorage');
        }
    }, []);

    // Return only userUID
    return userData.UUID;
};

export default useUserUID;

