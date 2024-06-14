import { useState, useEffect } from 'react';

const useUserUID = (): string | null => {
    const [userUID, setUserUID] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('UUID');
        if (storedUser) {
            try {
                setUserUID(storedUser.replace(/"/g, ''));
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