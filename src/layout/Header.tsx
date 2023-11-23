import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeButton from './ThemeButton'

const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-1 flex-wrap min-h-[40px]">
      <NavLink to="/">首页</NavLink>
      <NavLink to="/hot/1">足球</NavLink>
      <NavLink to="/hot/2">篮球</NavLink>
      {/* <NavLink to="/cates">分类</NavLink> */}
      <ThemeButton />
    </header>
  )
}

export default Header
