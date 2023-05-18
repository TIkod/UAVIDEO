import { registerUser } from '@/store/features/user.slice';
import { AppDispatch, RootState } from '@/store/store';
import { NextRouter, useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type setterUser = Dispatch<SetStateAction<IUserReg>>

const RegistrationForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [userData, setUserData]: [IUserReg, setterUser] = useState({ name: '', email: '', password: '' })
    const userState: IUserState = useSelector((state: RootState) => state.auth)
    const router: NextRouter = useRouter();


    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        dispatch(registerUser(userData));
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
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                placeholder="Name"
            />
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
            <button type="submit">Register</button>
            {userState.error ? "Проверьте корректность вводимых данных" : ""}
        </form>
    );
};

export default RegistrationForm;
