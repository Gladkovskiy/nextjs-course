'use client'

import LoginModal from '@/components/UI/models/login.modal'
import RegistrationModal from '@/components/UI/models/registration.modal'
import {signOut, useSession} from '@/lib/auth-client'
import {NavbarContent, NavbarItem} from '@heroui/navbar'
import {Button, Spinner} from '@heroui/react'
import Link from 'next/link'
import {useState} from 'react'

const DashboardHeader = () => {
	const [modals, setModals] = useState({reg: false, log: false})
	const {data: session, isPending} = useSession()

	if (isPending)
		return (
			<NavbarContent>
				<div className=' w-full flex justify-center'>
					<Spinner size='sm' />
				</div>
			</NavbarContent>
		)

	return (
		<>
			<NavbarContent justify='end'>
				{session?.user && (
					<p className=' text-sm'>Привет, {session?.user?.name}</p>
				)}
				{session?.user ? (
					<NavbarItem className='hidden lg:flex'>
						<Button
							as={Link}
							color='primary'
							href='#'
							variant='flat'
							onPress={() => signOut()}
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

			<RegistrationModal
				isOpen={modals.reg}
				onClose={() => setModals({...modals, reg: false})}
			/>
			<LoginModal
				isOpen={modals.log}
				onClose={() => setModals({...modals, log: false})}
			/>
		</>
	)
}

export default DashboardHeader
