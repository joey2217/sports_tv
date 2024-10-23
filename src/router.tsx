import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import Home from './pages/home'
import {
  fetchCategoryList,
  fetchHotPageData,
  fetchMatchData,
  fetchMatchStats,
} from './api'
import MatchLayout from './pages/match/layout'
import MatchIndex from './pages/match'
import CategoryLayout from './pages/category/layout'
import CategoryIndex from './pages/category'
import Category from './pages/category/cate'
import dayjs from 'dayjs'
import Hot from './pages/hot'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        loader: () => fetchHotPageData(),
        element: <Home />,
      },
      {
        path: '/hot/:type',
        loader: ({ params }) => {
          if (params.type) {
            return fetchHotPageData({ type: params.type }).then((data) => ({
              ...data,
              type: params.type,
            }))
          }
          return Response.json(
            { msg: '数据错误' },
            { statusText: '暂无数据', status: 404 }
          )
        },
        element: <Hot />,
      },
      {
        path: 'match/:id/:type',
        loader: async ({ params }) => {
          if (params.id) {
            return fetchMatchData(params.id, params.type)
          }
          return Response.json(
            { msg: '数据错误' },
            { statusText: '暂无数据', status: 404 }
          )
        },
        element: <MatchLayout />,
        children: [
          {
            index: true,
            loader: ({ params }) => {
              if (params.id) {
                return fetchMatchStats(params.id)
              }
              return Response.json(
                { msg: '数据错误' },
                { statusText: '暂无数据', status: 404 }
              )
            },
            element: <MatchIndex />,
          },
        ],
      },
      {
        path: 'category',
        element: <CategoryLayout />,
        children: [
          {
            index: true,
            loader: () => fetchCategoryList(),
            element: <CategoryIndex />,
          },
          {
            path: 'c/:id/:type',
            loader: async ({ params, request }) => {
              const url = new URL(request.url)
              const date =
                url.searchParams.get('date') || dayjs().format('YYYY-MM-DD')
              if (params.type && params.id) {
                return fetchHotPageData({
                  type: params.type,
                  cid: params.id,
                  ishot: -1,
                  starttime: date,
                }).then((data) => ({
                  ...data,
                  date,
                }))
              }
              return Response.json(
                { msg: '数据错误' },
                { statusText: '暂无数据', status: 404 }
              )
            },
            element: <Category />,
          },
        ],
      },
    ],
  },
])

export default router
