import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';

const checkUserAuthentication = (): boolean => {
    const token: string | null = localStorage.getItem('token')

    if (token) {
        // Реализовать рефреш токена и проверку его валидации 
        return true
    } else {
        return false
    }

    // if (user) {
    //     return true
    // }
}

export const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const user = useSelector((state: RootState) => state.auth.user)
        const router = useRouter();

        const isAuthenticated = checkUserAuthentication();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/user/login');
            }
        }, []);

        return <WrappedComponent {...props} user={user} />
    };
};
