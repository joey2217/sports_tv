import React, { useEffect, useState } from 'react'
import { LoaderFunction, useLoaderData, useParams } from 'react-router-dom'
import { fetchHotPageData } from '../api'
import { HotPageData, Match } from '../types'
import LoadMore from '../components/LoadMore'
import MatchCard from '../components/MatchCard'

export const cateLoader: LoaderFunction = ({ params }) => {
  if (params.type && params.id) {
    return fetchHotPageData({ type: params.type, cid: params.id }).then(
      (data) => {
        const { dataList, topList, ...rest } = data
        return {
          data: rest,
          dataList: topList.concat(dataList),
        }
      }
    )
  }
  return Response.json(
    { msg: '数据错误' },
    { statusText: '暂无数据', status: 404 }
  )
}

const Cate: React.FC = () => {
  const data = useLoaderData() as {
    data: HotPageData
    dataList: Match[]
  }

  const params = useParams()

  const [page, setPage] = useState<number>()
  const [pageData, setPageData] = useState<HotPageData>()
  const [list, setList] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPageData(data.data)
    setList(data.dataList)
    setPage(undefined)
  }, [data.data, data.dataList])

  useEffect(() => {
    if (page) {
      setLoading(true)
      fetchHotPageData({ pn: page, type: params.type })
        .then((data) => {
          const { dataList, topList, ...rest } = data
          setPageData(rest as HotPageData)
          setList((l) => [...l, ...topList, ...dataList])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [page, params.type])

  return (
    <div>
      <div className="gap-1 md:gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {list.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
      {pageData && pageData.currentPage < pageData.totalPage ? (
        <LoadMore
          loading={loading}
          loadData={() => setPage((p) => (p ? p + 1 : 2))}
        />
      ) : (
        <div className="text-center">暂无更多数据</div>
      )}
    </div>
  )
}

export default Cate
