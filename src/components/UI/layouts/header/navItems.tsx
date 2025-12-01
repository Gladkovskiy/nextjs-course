'use client'

import {protectedPath, siteConfig} from '@/config/site.config'
import {useSession} from '@/lib/auth/auth-client'
import {NavbarItem} from '@heroui/navbar'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const NavItemsHeader = () => {
	const pathname = usePathname()
	const {data} = useSession()

	return (
		<>
			{siteConfig.navItems
				.filter(({href}) => {
					if (protectedPath.includes(href)) return data?.user

					return true
				})
				.map(item => (
					<NavbarItem key={item.href}>
						<Link
							color='foreground'
							href={item.href}
							className={`px-3 py-1 rounded-2xl ${
								pathname === item.href ? 'bg-blue-300 rounded-2xl text-white' : ''
							} hover:bg-blue-300 hover:text-white hover:rounded-2xl transition-all duration-300 ease-in-out`}
						>
							{item.label}
						</Link>
					</NavbarItem>
				))}
		</>
	)
}

export default NavItemsHeader
