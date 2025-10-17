import prisma from '@/utils/prisma'

export const getUserFromDb = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({where: {email}})
		return user
	} catch (error) {
		console.log('Ошибка при поиске пользователя в базе данных:', error)
		return null
	}
}
