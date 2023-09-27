import React from 'react'
import ThemeButton from './ThemeButton'
import { Link } from 'react-router-dom'
import logoImg from './logo.png'

const Header: React.FC = () => {
  return (
    <header className="navbar bg-base-200">
      <nav className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl ">
          <img src={logoImg} alt="logo" className="w-6 h-6" />
          <span className="text-base font-semibold md:text-lg">LOGO</span>
        </Link>
      </nav>
      <div className="navbar-end">
        <ThemeButton />
      </div>
    </header>
  )
}

export default Header
