import React, { memo } from 'react'
import {useRouter} from 'next/router'

const Match: React.FC = () => {
    const router =useRouter()
    console.log(router)
    return (
        <>Match</>
    )
}

export default memo(Match)
