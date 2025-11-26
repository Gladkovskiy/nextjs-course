'use client'

import {useIngredientActions} from '@/lib/store/ingredient/hooks'
import {FC, PropsWithChildren, useEffect} from 'react'

const AppLoader: FC<PropsWithChildren> = ({children}) => {
	const {loadIngredients} = useIngredientActions()

	useEffect(() => {
		loadIngredients()
	}, [loadIngredients])

	return <>{children}</>
}

export default AppLoader
