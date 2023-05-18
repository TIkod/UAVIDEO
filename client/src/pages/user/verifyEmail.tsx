import React, { useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { initUser, verifyUser } from '@/store/features/user.slice';

const verifyEmail = () => {

    const router: NextRouter = useRouter();
    const dispatch: AppDispatch = useDispatch()

    const user: IUser | null = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        const token: string | null = localStorage.getItem('token')
        if (token) {
            dispatch(initUser(token));
        }
    }, [])

    useEffect(() => {
        if (router.query.token && user) {
            if (router.query.token == user.token) {
                console.log('verify')
                // перенаправлять на сайт
                // сделать страничку с просьбой подтвердить аккаунт
                dispatch(verifyUser(router.query.token))
            }
        }
    }, [router.query, user])

    useEffect(() => {
        if (user) {
            if (user.verified) {
                router.push('/');
            }
        }
    }, [user])

    return (
        <div>Подтверждение почты</div>
    )
}

export default verifyEmail