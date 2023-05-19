import VerifyText from '@/components/VerifyText';
import { initUser } from '@/store/features/user.slice';
import { AppDispatch, RootState } from '@/store/store';
import { NextRouter, useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface MainLayoutProps {
    children: ReactNode;
}


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    const user: IUser | null = useSelector((state: RootState) => state.auth.user)
    const router: NextRouter = useRouter()
    const dispatch: AppDispatch = useDispatch()
    const [loadUser, setLoadUser] = useState(false)

    console.log(user, 'MAIN LAYOUT')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(initUser(localStorage.getItem('token')))
        } else {
            router.push('/user/login')
        }
    }, [])

    useEffect(() => {
        if (loadUser == true) {
            console.log(1)
            console.log(typeof window !== 'undefined')
            if (!user && typeof window !== 'undefined') {
                router.push('/user/login')
            }
        }
        setLoadUser(true)
    }, [user])

    if (user) {
        return (
            <>
                {
                    user.verified ?
                        <>
                            MainLayout
                            {children}
                        </>
                        :
                        <VerifyText />
                }
            </>
        )
    } else {
        return <></>
    }
}

export default MainLayout

