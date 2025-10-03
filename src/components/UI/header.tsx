'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import {siteConfig} from '@/config/site.config'
import {usePathname} from 'next/navigation'
import {layoutConfig} from '@/config/layout.config'

export const Logo = () => {
  return (
    <Image
      src={'/kitchen.png'}
      alt={siteConfig.title}
      width={36}
      height={36}
      priority
    />
  )
}

export default function Header() {
  const pathname = usePathname()

  const getNavItems = () =>
    siteConfig.navItems.map(item => (
      <NavbarItem key={item.href}>
        <Link
          color="foreground"
          href={item.href}
          className={`px-3 py-1 border-transparent border-1 rounded-md
                ${
                  pathname === item.href ? 'text-blue-500' : 'text-foreground'
                } hover:border hover:text-blue-300 hover:border-blue-300 hover:rounded-md transition-colors duration-200 transition-border
                `}
        >
          {item.label}
        </Link>
      </NavbarItem>
    ))

  return (
    <Navbar
      style={{
        height: `${layoutConfig.headerHeight}`,
      }}
    >
      <NavbarBrand>
        <Link href={'/'} className="flex gap-2 items-center">
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.title}</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Логин</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
