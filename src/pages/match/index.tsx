import type { MatchInfo, MatchStats } from '@/types'
import React from 'react'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import Stats from './Stats'

const MatchIndex: React.FC = () => {
  const matchInfo = useOutletContext<MatchInfo>()

  const data = useLoaderData() as MatchStats | undefined

  if (data) {
    return <Stats match={matchInfo} matchStats={data} />
  }
  return <h3 className="text-center">暂无数据</h3>
}

export default MatchIndex
