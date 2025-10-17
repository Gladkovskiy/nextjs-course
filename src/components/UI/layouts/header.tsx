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
	Spinner,
} from '@heroui/react'
import {signOutFunc} from 'actions/sign-out'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'
import {useAuthStore} from 'store/auth.store'

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
	const {isAuth, session, setAuthState, status} = useAuthStore()

	const getNavItems = () =>
		siteConfig.navItems.map(item => (
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
		))

	const handleSignOut = async () => {
		await signOutFunc()
		setAuthState('unauthenticated', null)
	}

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

			{status === 'loading' && (
				<NavbarContent>
					<div className=' w-full flex justify-center'>
						<Spinner size='sm' />
					</div>
				</NavbarContent>
			)}

			{status != 'loading' && (
				<NavbarContent justify='end'>
					{isAuth && <p className=' text-sm'>Привет, {session?.user?.email}</p>}
					{isAuth ? (
						<NavbarItem className='hidden lg:flex'>
							<Button
								as={Link}
								color='primary'
								href='#'
								variant='flat'
								onPress={handleSignOut}
							>
								Выйти
							</Button>
						</NavbarItem>
					) : (
						<>
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
						</>
					)}
				</NavbarContent>
			)}

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
