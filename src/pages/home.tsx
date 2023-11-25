import React, { useEffect, useState } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { fetchHotPageData } from '../api'
import { HotPageData, Match } from '../types'
import LoadMore from '../components/LoadMore'
import MatchCard from '../components/MatchCard'

export const hotLoader: LoaderFunction = () => {
  return fetchHotPageData().then((data) => {
    const { dataList, topList, ...rest } = data
    return {
      data: rest,
      dataList: topList.concat(dataList),
    }
  })
}

const Home: React.FC = () => {
  const { data, dataList } = useLoaderData() as {
    data: HotPageData
    dataList: Match[]
  }

  const [page, setPage] = useState<number>()
  const [pageData, setPageData] = useState<HotPageData>(data)
  const [list, setList] = useState(dataList)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (page) {
      setLoading(true)
      fetchHotPageData({ pn: page })
        .then((data) => {
          const { dataList, topList, ...rest } = data
          setPageData(rest as HotPageData)
          setList((l) => [...l, ...topList, ...dataList])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [page])

  return (
    <div>
      <div className="gap-1 md:gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {list.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
      {pageData.currentPage < pageData.totalPage ? (
        <LoadMore
          loading={loading}
          loadData={() => setPage((p) => (p ? p + 1 : 2))}
        />
      ) : (
        <div className="text-center p-4">暂无更多数据</div>
      )}
    </div>
  )
}

export default Home
