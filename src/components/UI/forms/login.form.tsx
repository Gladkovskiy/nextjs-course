'use client'

import {Form} from '@heroui/form'
import {Button, Input} from '@heroui/react'
import {useFormik} from 'formik'

import {signInFunc} from '@/actions/sign-in'
import {loginInitialState} from '@/components/UI/forms/initalState'
import {
	LoginNamesType,
	LoginSchemType,
	loginValidation,
} from '@/components/UI/forms/validation'

interface IProps {
	onClose: () => void
}

const LoginForm = ({onClose}: IProps) => {
	const formik = useFormik<LoginSchemType>({
		initialValues: loginInitialState,
		validationSchema: loginValidation,
		onSubmit: async values => {
			await signInFunc(values)

			// костыль, непнятно как обновить сессию
			window.location.reload()

			onClose()
		},
	})

	return (
		<Form className=' w-full' onSubmit={formik.handleSubmit}>
			<Input
				label='email'
				type='email'
				{...formik.getFieldProps('email' as LoginNamesType)}
				errorMessage={formik.errors.email}
				isInvalid={!!formik.errors.email && !!formik.touched.email}
			/>
			<Input
				label='password'
				type='password'
				{...formik.getFieldProps('password' as LoginNamesType)}
				errorMessage={formik.errors.password}
				isInvalid={!!formik.errors.password && !!formik.touched.password}
			/>

			<div className=' flex w-full gap-4  items-center justify-end pt-8'>
				<Button type='reset' onPress={onClose}>
					Отмена
				</Button>
				<Button type='submit' color='primary'>
					Войти
				</Button>
			</div>
		</Form>
	)
}

export default LoginForm
