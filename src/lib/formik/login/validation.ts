import z from 'zod'
import {toFormikValidationSchema} from 'zod-formik-adapter'

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
