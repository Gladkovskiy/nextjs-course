'use server'

import {RegistrationSchemType} from '@/components/UI/forms/validation'
import prisma from 'utils/prisma'

export const registrationUser = async (values: RegistrationSchemType) => {
	const {email, password} = values

	try {
		const user = await prisma.user.create({data: {email, password}})

		console.log('user', user)

		return user
	} catch (error) {
		console.log('Ошибка при регистрации:', error)
		return {error: 'Ошибка при регистрации'}
	}
}
