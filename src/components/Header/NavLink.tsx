import React, { type PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import Link, { type LinkProps } from 'next/link'

const NavLink: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  ...props
}) => {
  const pathname = usePathname()

  return (
    <Link
      href="/"
      className="flex items-center gap-1 md:gap-2 lg:gap-4 link truncate shrink-0"
    >
      {children}
    </Link>
  )
}

export default NavLink
