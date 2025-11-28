'use client'

import {Form} from '@heroui/form'
import {Button, Input} from '@heroui/react'
import {useFormik} from 'formik'

import {loginInitialState} from '@/components/UI/forms/initalState'
import {LoginNamesType, LoginSchemType, loginValidation} from '@/components/UI/forms/validation'
import {signIn} from '@/lib/auth/auth-client'
import {useState} from 'react'

interface IProps {
	onClose: () => void
}

const LoginForm = ({onClose}: IProps) => {
	const [error, setError] = useState<string | null>(null)

	const formik = useFormik<LoginSchemType>({
		initialValues: loginInitialState,
		validationSchema: loginValidation,
		onSubmit: async values => {
			const {email, password} = values

			const res = await signIn.email({
				email,
				password,
			})

			if (res.error) {
				setError(res.error.message || 'Something went wrong...')
			} else {
				// костыль, непнятно как обновить сессию
				// window.location.reload()
				onClose()
			}
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

			{error && <p className='text-red-500'>{error}</p>}

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
