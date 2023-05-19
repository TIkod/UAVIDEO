import AddVideoForm from '@/components/AddVideoForm'
import PrivateRoute from '@/components/System/PrivateRoute'
import MainLayout from '@/layouts/MainLayout'
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

const profile: React.FC = () => {
    const user: IUser | null = useSelector((state: RootState) => state.auth.user)

    return (
        <MainLayout>
            <PrivateRoute>
                <h1>Аккаунт</h1>
                <div>
                    {user ? (
                        <>
                            <p>name: {user.name}</p>
                            <p>email: {user.email}</p>
                        </>
                    ) : (
                        <p>Загрузка</p>
                    )}
                </div>
                <h1>Добавить видео</h1>
                <AddVideoForm />
                <h1>Мои видео</h1>
            </PrivateRoute>
        </MainLayout>
    )
}

export default profile