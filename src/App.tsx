import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useInitData } from './store/category'

const App: React.FC = () => {
  useInitData()
  return <RouterProvider router={router} />
}

export default App
