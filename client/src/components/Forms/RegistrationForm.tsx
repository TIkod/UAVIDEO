import { registerUser } from '@/store/features/user.slice';
import { AppDispatch } from '@/store/store';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

type setterUser = Dispatch<SetStateAction<IUserReg>>

const RegistrationForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [user, setUser]: [IUserReg, setterUser] = useState({ name: '', email: '', password: '' })

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        dispatch(registerUser(user));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
            />
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
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
