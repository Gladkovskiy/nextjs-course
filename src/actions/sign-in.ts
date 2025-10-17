'use server'

import {signIn} from '@/auth/auth'

interface IProps {
	email: string
	password: string
}

export const signInFunc = async ({email, password}: IProps) => {
	try {
		const result = await signIn('credentials', {
			email,
			password,
			redirect: false,
		})

		return result
	} catch (error) {
		console.error('Ошибка авторизации')
		throw error
	}
}
