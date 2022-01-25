import React, { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.png'

const AppHeader: React.FC = () => {
  return (
    <header className="flex items-center h-10">
      <Link href="/">
        <a className="flex items-center">
          <Image width={30} height={30} src={logo} alt="logo" />
          <span>SportTV</span>
        </a>
      </Link>
      <div className="flex-1"></div>
    </header>
  )
}

export default memo(AppHeader)
