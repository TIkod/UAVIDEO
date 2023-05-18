import { loginUser, registerUser } from '@/store/features/user.slice';
import { AppDispatch } from '@/store/store';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

type setterUser = Dispatch<SetStateAction<IUserLog>>

const LoginForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [user, setUser]: [IUserLog, setterUser] = useState({ email: '', password: '' })

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        dispatch(loginUser(user));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
