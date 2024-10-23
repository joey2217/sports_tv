import MatchCard from '@/components/MatchCard'
import { HotPageData } from '@/types'
import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Hot: React.FC = () => {
  const { topList, dataList } = useLoaderData() as HotPageData & {
    type: string
  }
  return (
    <div className="main">
      {topList.length > 0 && (
        <>
          <h4 className="mb-1 rounded-md px-2 py-1 text-base font-semibold">
            热门比赛
          </h4>
          <div className="match-list">
            {topList.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </>
      )}
      <h4 className="mb-1 rounded-md px-2 py-1 text-base font-semibold">
        全部比赛
      </h4>
      <div className="match-list">
        {dataList.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}

export default Hot
