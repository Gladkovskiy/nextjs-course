import {signInSchema} from '@/schema/auth'
import prisma from '@/utils/prisma'
import {getUserFromDb} from '@/utils/user'
import {PrismaAdapter} from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import {ZodError} from 'zod'

export const {handlers, auth, signIn, signOut} = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			credentials: {
				email: {label: 'email', type: 'email'},
				password: {label: 'password', type: 'password'},
			},
			authorize: async credentials => {
				try {
					if (!credentials.email || !credentials.password) {
						throw new Error('Invalid credentials.')
					}

					const {email, password} = await signInSchema.parseAsync(credentials)

					const user = await getUserFromDb(email)

					if (!user) {
						throw new Error('Неверные учетные данные')
					}

					const isPasswordValid = await bcrypt.compare(password, user.password)

					if (!isPasswordValid) {
						throw new Error('Невереный пароль')
					}

					return user
				} catch (error) {
					if (error instanceof ZodError) {
						throw error
						return null
					}
					throw error
					return null
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({token, user}) {
			if (user) {
				token.id = user.id
			}
			return token
		},
	},
})
