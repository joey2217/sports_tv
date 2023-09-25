import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeButton from './ThemeButton'

const Header: React.FC = () => {
  return (
    <header className="navbar bg-base-100">
      <Link href="/" className="btn btn-ghost normal-case text-xl navbar-start">
        <Image
          src="/logo.png"
          alt="logo"
          width={192}
          height={192}
          className="w-6 h-6"
        />
        <span className="text-base font-semibold md:text-lg">LOGO</span>
      </Link>
      <nav className="navbar-center">nav</nav>
      <div className="navbar-end">
        <ThemeButton />
      </div>
    </header>
  )
}

export default Header
