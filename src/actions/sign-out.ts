'use server'

import {signOut} from '@/auth/auth'

export const signOutFunc = async () => {
	try {
		const result = await signOut({redirect: false})

		return result
	} catch (error) {
		console.error('Ошибка авторизации', error)
		throw error
	}
}
