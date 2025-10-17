'use server'

import {RegistrationSchemType} from '@/components/UI/forms/validation'
import {saltAndHashPassword} from '@/utils/password'
import prisma from 'utils/prisma'

export const registrationUser = async (values: RegistrationSchemType) => {
	const {email, password} = values

	try {
		const hashedPassword = await saltAndHashPassword(password)
		const user = await prisma.user.create({
			data: {email, password: hashedPassword},
		})

		return user
	} catch (error) {
		console.error('User not registered', error)
		return error
	}
}
