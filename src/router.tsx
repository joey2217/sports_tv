import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorPage from './pages/error'
import Home, { hotLoader } from './pages/home'
import Cates, { catesLoader } from './pages/cate/cates'
import Match, { matchLoader } from './pages/match'
import Type, { typeLoader } from './pages/type'
import Cate, { cateLoader } from './pages/cate/cate'
import CateIndex from './pages/cate'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: hotLoader,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/hot/:type',
        loader: typeLoader,
        element: <Type />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'cate',
        element: <CateIndex />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            loader: catesLoader,
            element: <Cates />,
          },
          {
            path: ':id/:type',
            loader: cateLoader,
            element: <Cate />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: 'match/:id/:type',
        loader: matchLoader,
        element: <Match />,
        errorElement: <ErrorPage />,
      },
    ],
  },
])

export default router
