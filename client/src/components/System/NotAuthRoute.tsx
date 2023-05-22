import { ReactNode, useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { initUser } from '@/store/features/user.slice';
import { AppDispatch } from '@/types/store.type';


interface NotAuthRouteProps {
    children: ReactNode;
}

const NotAuthRoute: React.FC<NotAuthRouteProps> = ({ children }) => {
    const router: NextRouter = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const [requestRefresh, setRequestRefresh] = useState(false);

    const action = async (): Promise<any> => {
        const token: string | null = localStorage.getItem('token');

        if (token) {
            return router.push('/');
        } else {
            if (requestRefresh == false) {
                setRequestRefresh(true)
                const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/user/refresh-token`, { 'token': token });
                const newToken: string = response.data.token;

                if (newToken != "") {
                    localStorage.setItem('token', newToken);
                    dispatch(initUser(token));
                    return router.push('/');
                }

            }
        }

    }

    useEffect(() => {
        action()
    }, []);

    return <>{children}</>;
};

export default NotAuthRoute;
