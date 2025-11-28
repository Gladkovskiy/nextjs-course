'use client'

import {useSession} from '@/lib/auth/auth-client'
import {useIngredientActions} from '@/lib/store/ingredient/hooks'
import {FC, PropsWithChildren, useEffect} from 'react'

const AppLoader: FC<PropsWithChildren> = ({children}) => {
	const {loadIngredients} = useIngredientActions()
	const {data} = useSession()

	useEffect(() => {
		if (data?.user) loadIngredients()
	}, [loadIngredients, data])

	return <>{children}</>
}

export default AppLoader
