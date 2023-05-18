import { withAuth } from '@/components/withAuth'
import React from 'react'

const test = () => {
    return (
        <div>test</div>
    )
}

export default withAuth(test)