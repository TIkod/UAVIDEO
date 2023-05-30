import { AppDispatch, RootState } from '@/types/store.type';
import NotAuthRoute from '../../components/System/NotAuthRoute'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/store/features/user.slice';

type setterUser = Dispatch<SetStateAction<IUserReg>>


const register: React.FC = () => {

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
        <NotAuthRoute>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Створити обліковий запис
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    ім'я
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Електронна пошта
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Пароль
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={userData.password}
                                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Створити аккаунт
                                </button>
                                {userState.error ? "Неверный логин или пароль" : ''}
                            </div>
                        </form>
                    </div>
                    <div className="mt-6">
                        <div className="mt-6">
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600">
                                    Є аккаунт?{' '}
                                    <a href="/user/login">
                                        <span className="text-indigo-600 hover:text-indigo-500">Увійти</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NotAuthRoute>
    )
}

export default register