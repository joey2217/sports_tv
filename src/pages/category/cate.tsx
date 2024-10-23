import MatchCard from '@/components/MatchCard'
import { HotPageData } from '@/types'
import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Category: React.FC = () => {
  const { dataList } = useLoaderData() as HotPageData & { date: string }
  return (
    <div>
      <div className="match-list">
        {dataList.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </div>
  )
}

export default Category
