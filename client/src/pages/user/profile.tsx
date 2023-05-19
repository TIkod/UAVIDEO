import AddVideoForm from '../../components/Forms/AddVideoForm'
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
                            <h1>Добавить видео</h1>
                            <AddVideoForm id={user!.id} />
                            <h1>Мои видео</h1>
                        </>
                    ) : (
                        <p>Загрузка</p>
                    )}
                </div>
            </PrivateRoute>
        </MainLayout>
    )
}

export default profile