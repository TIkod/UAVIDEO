import { loginUser, registerUser } from '@/store/features/user.slice';
import { AppDispatch, RootState } from '@/store/store';
import { NextRouter, useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type setterUser = Dispatch<SetStateAction<IUserLog>>

const LoginForm: React.FC = () => {
    const userState: IUserState | null = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch();
    const [userData, setUserData]: [IUserLog, setterUser] = useState({ email: '', password: '' })
    const router: NextRouter = useRouter();

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        dispatch(loginUser(userData));
    };

    useEffect(() => {
        if (userState.loading == false && userState.error == false) {
            router.push('/')
        }
    }, [userState])

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="Email"
            />
            <input
                type="password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {userState.error ? "Неверный логин или пароль" : ''}
        </form>
    );
};

export default LoginForm;
