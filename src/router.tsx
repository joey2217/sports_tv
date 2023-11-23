import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorPage from './pages/error'
import Home, { hotLoader } from './pages/home'
import Cates, { catesLoader } from './pages/cates'
import Match, { matchLoader } from './pages/match'
import Type, { typeLoader } from './pages/type'

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
        path: 'cates',
        loader: catesLoader,
        element: <Cates />,
        errorElement: <ErrorPage />,
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
