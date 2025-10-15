'use client'

import LoginModal from '@/components/UI/models/login.modal'
import RegistrationModal from '@/components/UI/models/registration.modal'
import {layoutConfig} from '@/config/layout.config'
import {siteConfig} from '@/config/site.config'
import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'

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
	const [modals, setModals] = useState({reg: false, log: false})

	const getNavItems = () =>
		siteConfig.navItems.map(item => (
			<NavbarItem key={item.href}>
				<Link
					color='foreground'
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
				<Link href={'/'} className='flex gap-2 items-center'>
					<Logo />
					<p className='font-bold text-inherit'>{siteConfig.title}</p>
				</Link>
			</NavbarBrand>

			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				{getNavItems()}
			</NavbarContent>

			<NavbarContent justify='end'>
				<NavbarItem className='hidden lg:flex'>
					<Button
						as={Link}
						color='primary'
						href='#'
						variant='flat'
						onPress={() => {
							setModals({...modals, log: true})
						}}
					>
						Войти
					</Button>
				</NavbarItem>
				<NavbarItem>
					<Button
						as={Link}
						color='primary'
						href='#'
						variant='flat'
						onPress={() => {
							setModals({...modals, reg: true})
						}}
					>
						Регистрация
					</Button>
				</NavbarItem>
			</NavbarContent>

			<RegistrationModal
				isOpen={modals.reg}
				onClose={() => setModals({...modals, reg: false})}
			/>
			<LoginModal
				isOpen={modals.log}
				onClose={() => setModals({...modals, log: false})}
			/>
		</Navbar>
	)
}
