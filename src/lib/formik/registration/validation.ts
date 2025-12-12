import z from 'zod'
import {toFormikValidationSchema} from 'zod-formik-adapter'

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
