'use client'

import DashboardHeader from '@/components/UI/layouts/header/dashboard'
import NavItemsHeader from '@/components/UI/layouts/header/navItems'
import {layoutConfig} from '@/config/layout.config'
import {siteConfig} from '@/config/site.config'
import {Navbar, NavbarBrand, NavbarContent} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'

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
	return (
		<Navbar
			style={{
				height: `${layoutConfig.headerHeight}`,
			}}
		>
			<NavbarBrand>
				<Link href={'/'} className='flex gap-2 items-center'>
					<Logo />
					<p className='font-bold text-inherit'>{siteConfig.title}</p>
				</Link>
			</NavbarBrand>

			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				<NavItemsHeader />
			</NavbarContent>

			<DashboardHeader />
		</Navbar>
	)
}
