import PrivateRoute from '../components/PrivateRoute'
import React from 'react'

const test = () => {
    return (
        <PrivateRoute>
            <div>test</div>
        </PrivateRoute>
    )
}

export default test