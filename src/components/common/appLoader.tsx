'use client'

import {useSession} from 'next-auth/react'
import React, {useEffect} from 'react'
import {useAuthStore} from 'store/auth.store'

interface IProps {
	children: React.ReactNode
}

const AppLoader = ({children}: IProps) => {
	const {data: session, status} = useSession()
	const {setAuthState} = useAuthStore()

	useEffect(() => {
		setAuthState(status, session)
	}, [session, status, setAuthState])

	return <>{children}</>
}

export default AppLoader
