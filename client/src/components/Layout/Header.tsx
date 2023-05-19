import { exit } from '@/store/features/user.slice'
import { AppDispatch, RootState } from '@/store/store'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Header: React.FC = () => {

    const user: IUser | null = useSelector((state: RootState) => state.auth.user)
    const router: NextRouter = useRouter()
    const dispatch: AppDispatch = useDispatch()

    return (
        <div>
            {user!.name}
            <ul>
                <li onClick={() => router.push('/')} style={{ cursor: "pointer" }}>Home</li>
                <li onClick={() => router.push('/user/profile')} style={{ cursor: "pointer" }}>Profile</li>
            </ul>
            <button onClick={() => dispatch(exit())}>exit</button>
        </div>
    )
}

export default Header