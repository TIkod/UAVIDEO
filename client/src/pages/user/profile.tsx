import MyVideo from '@/components/MyVideo'
import AddVideoForm from '../../components/Forms/AddVideoForm'
import PrivateRoute from '@/components/System/PrivateRoute'
import MainLayout from '@/layouts/MainLayout'
import { RootState } from '@/types/store.type'
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
                            <AddVideoForm id={user!.id} />
                            <MyVideo userID={user.id} count={5} offset={0} />
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