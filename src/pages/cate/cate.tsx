import React, { useEffect, useState } from 'react'
import {
  Form,
  LoaderFunction,
  useLoaderData,
  useParams,
  useSubmit,
} from 'react-router-dom'
import { fetchHotPageData } from '../../api'
import { HotPageData, Match } from '../../types'
import LoadMore from '../../components/LoadMore'
import MatchCard from '../../components/MatchCard'
import dayjs from 'dayjs'

const today = dayjs().format('YYYY-MM-DD')

export const cateLoader: LoaderFunction = ({ params, request }) => {
  const url = new URL(request.url)
  const date = url.searchParams.get('date') || today
  if (params.type && params.id) {
    return fetchHotPageData({
      type: params.type,
      cid: params.id,
      ishot: -1,
      starttime: date,
    }).then((data) => {
      const { dataList, topList, ...rest } = data
      return {
        data: rest,
        dataList: topList.concat(dataList),
        date,
      }
    })
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
    date?: string
  }

  const params = useParams()

  const [page, setPage] = useState<number>()
  const [pageData, setPageData] = useState<HotPageData>()
  const [list, setList] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const submit = useSubmit()

  useEffect(() => {
    setPageData(data.data)
    setList(data.dataList)
    setPage(undefined)
  }, [data.data, data.dataList])

  const submitData = (e: React.ChangeEvent<HTMLInputElement>) => {
    submit(e.currentTarget.form)
  }

  useEffect(() => {
    if (page) {
      setLoading(true)
      fetchHotPageData({ pn: page, type: params.type, starttime: data.date })
        .then((data) => {
          const { dataList, topList, ...rest } = data
          setPageData(rest as HotPageData)
          setList((l) => [...l, ...topList, ...dataList])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [data.date, page, params.type])

  return (
    <div>
      <Form>
        <div className="form-control w-full max-w-xs mx-auto mb-4">
          <label className="label">
            <span className="label-text">比赛日期</span>
          </label>
          <input
            type="date"
            name="date"
            className="input input-bordered w-full"
            defaultValue={data.date || today}
            onChange={submitData}
          />
        </div>
      </Form>
      <div className="gap-1 md:gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {list.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
      {pageData ? (
        pageData.currentPage < pageData.totalPage ? (
          <LoadMore
            loading={loading}
            loadData={() => setPage((p) => (p ? p + 1 : 2))}
          />
        ) : (
          <div className="text-center">暂无更多数据</div>
        )
      ) : (
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      )}
    </div>
  )
}

export default Cate
