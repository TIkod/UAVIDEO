import React from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import NotAuthRoute from '../../components/System/NotAuthRoute'



const login: React.FC = () => {
    return (
        <NotAuthRoute>
            login
            <LoginForm />
        </NotAuthRoute>
    )
}

export default login