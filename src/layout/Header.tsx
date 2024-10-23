import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl gap-1 items-center">
        <NavLink to="/">首页</NavLink>
        <NavLink to="/hot/1">足球</NavLink>
        <NavLink to="/hot/2">篮球</NavLink>
        <NavLink to="/category">分类</NavLink>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
