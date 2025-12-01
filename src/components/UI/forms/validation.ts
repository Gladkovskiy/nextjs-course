import {Category, Unit} from 'generated/prisma'
import z from 'zod'
import {toFormikValidationSchema} from 'zod-formik-adapter'

//--------------------------
export const RegistrationSchema = z
	.object({
		name: z.string({error: 'Обязательное поле для ввода'}),
		email: z.email({error: 'Некорректный адрес электронной почты'}),
		password: z
			.string({error: 'Обязательное поле для ввода'})
			.min(3, 'Пароль должен быть минимум 3 символа')
			.max(10, 'Пароль должен быть максимум 10 символов'),
		repeatPassword: z.string({error: 'Обязательное поле для ввода'}),
	})
	.refine(data => data.password === data.repeatPassword, {
		error: 'Пароли не совпадают',
		path: ['repeatPassword'],
	})

export const registrationValidation = toFormikValidationSchema(RegistrationSchema)
export type RegistrationSchemType = z.infer<typeof RegistrationSchema>
export type RegistrationNamesType = keyof RegistrationSchemType

//--------------------------
export const LoginSchema = z.object({
	email: z.email({error: 'Некорректный адрес электронной почты'}),
	password: z
		.string({error: 'Обязательное поле для ввода'})
		.min(3, 'Пароль должен быть минимум 3 символа')
		.max(10, 'Пароль должен быть максимум 10 символов'),
})

export const loginValidation = toFormikValidationSchema(LoginSchema)
export type LoginSchemType = z.infer<typeof LoginSchema>
export type LoginNamesType = keyof LoginSchemType

//--------------------------
export const IngredientsSchema = z.object({
	name: z.string({error: 'Обязательное поле для ввода'}),
	category: z.enum(Category, {
		error: 'Обязательное поле для ввода',
	}),
	unit: z.enum(Unit, {
		error: 'Обязательное поле для ввода',
	}),
	pricePerUnit: z
		.number()
		.nullish()
		.transform(value => (value === undefined ? null : value)),
	description: z.string({error: 'Обязательное поле для ввода'}),
})

export const ingredientsValidation = toFormikValidationSchema(IngredientsSchema)
export type IngredientsSchemType = z.infer<typeof IngredientsSchema>
export type IngredientsNamesType = keyof IngredientsSchemType
