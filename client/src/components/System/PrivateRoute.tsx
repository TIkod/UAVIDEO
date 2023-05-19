import { ReactNode, useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { initUser } from '@/store/features/user.slice';


interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const router: NextRouter = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const [requestRefresh, setRequestRefresh] = useState(false);

    const action = async (): Promise<any> => {
        const token: string | null = localStorage.getItem('token');

        if (!token) {
            return router.push('/user/login');
        }

        if (requestRefresh == false) {
            setRequestRefresh(true)
            const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACK}/user/refresh-token`, { 'token': token });
            const newToken: string = response.data.token;

            if (newToken == "") {
                return router.push('/user/login');
            }

            localStorage.setItem('token', newToken);
            dispatch(initUser(token));
        }
    }

    useEffect(() => {
        action()
    }, []);

    return <>{children}</>;
};

export default PrivateRoute;
