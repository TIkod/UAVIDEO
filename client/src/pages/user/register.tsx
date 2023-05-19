import NotAuthRoute from '@/components/NotAuthRoute'
import RegistrationForm from '../../components/Forms/RegistrationForm'
import React from 'react'

const register: React.FC = () => {
    return (
        <NotAuthRoute>
            <h1>Регистрация</h1>
            <RegistrationForm />
        </NotAuthRoute>
    )
}

export default register