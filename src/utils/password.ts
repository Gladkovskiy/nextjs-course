import bcrypt from 'bcryptjs'

export const saltAndHashPassword = async (
	password: string
): Promise<string> => {
	const passwordHash = await bcrypt.hash(password, 10)

	return passwordHash
}
