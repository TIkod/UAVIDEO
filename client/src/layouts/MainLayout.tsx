import Header from '@/components/Layout/Header';
import VerifyText from '../components/System/VerifyText';
import { initUser } from '@/store/features/user.slice';
import { NextRouter, useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '@/components/Layout/Footer';
import Main from '@/components/Layout/Main';
import { AppDispatch, RootState } from '@/types/store.type';
import Head from 'next/head';

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
}


const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {

    const user: IUser | null = useSelector((state: RootState) => state.auth.user)
    const router: NextRouter = useRouter()
    const dispatch: AppDispatch = useDispatch()
    const [loadUser, setLoadUser] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(initUser(localStorage.getItem('token')))
        } else {
            router.push('/user/login')
        }
    }, [])

    useEffect(() => {
        if (loadUser == true) {
            if (!user && typeof window !== 'undefined') {
                router.push('/user/login')
            }
        }
        setLoadUser(true)
    }, [user])

    if (user) {
        return (
            <>
                <Head>
                    <title>UAVIDEO {title || ''}</title>
                    <meta name="description" content="video, hosting, videohosting, freevideo, topvideo" />
                </Head>
                {
                    user.verified ?
                        <>
                            <Header />
                            <Main>
                                {children}
                            </Main>
                            <Footer />
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

