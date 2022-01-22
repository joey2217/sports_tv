import React, { memo, useEffect } from 'react'
import {useRouter} from 'next/router'

const Match: React.FC = () => {
    const router =useRouter()

    useEffect(()=>{
        const {id,type} = router.query

    },[router.query])

    return (
        <>Match</>
    )
}

export default memo(Match)
