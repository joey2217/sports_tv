import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'

// dayjs.locale('zh-cn')

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App
