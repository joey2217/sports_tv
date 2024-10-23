import React from 'react'
import { Outlet } from 'react-router-dom'

const CategoryLayout: React.FC = () => {
  return (
    <div className="main">
      <Outlet />
    </div>
  )
}

export default CategoryLayout
