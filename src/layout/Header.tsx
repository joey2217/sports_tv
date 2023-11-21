import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeButton from './ThemeButton'

const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-1 flex-wrap min-h-[40px]">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/cates">cates</NavLink>
      <ThemeButton />
    </header>
  )
}

export default Header
