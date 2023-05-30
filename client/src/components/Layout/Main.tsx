import React, { ReactNode } from 'react'

interface MainProps {
    children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh' }}>{children}</div>
    )
}

export default Main