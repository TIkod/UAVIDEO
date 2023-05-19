import MainLayout from '@/layouts/MainLayout'
import PrivateRoute from '../components/PrivateRoute'
import React from 'react'

const test = () => {
    return (
        <MainLayout>
            <PrivateRoute>
                <div>test</div>
            </PrivateRoute>
        </MainLayout>
    )
}

export default test