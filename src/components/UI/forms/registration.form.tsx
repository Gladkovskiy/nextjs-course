'use client'

import {Form} from '@heroui/form'
import {Button, Input} from '@heroui/react'
import {useFormik} from 'formik'

import {registrationInitialState} from '@/components/UI/forms/initalState'
import {
	RegistrationNamesType,
	RegistrationSchemType,
	registrationValidation,
} from '@/components/UI/forms/validation'
import {signUp} from '@/lib/auth-client'
import {useState} from 'react'

interface IProps {
	onClose: () => void
}

const RegistrationForm = ({onClose}: IProps) => {
	const [error, setError] = useState<string | null>(null)

	const formik = useFormik<RegistrationSchemType>({
		initialValues: registrationInitialState,
		validationSchema: registrationValidation,
		onSubmit: async values => {
			const {email, name, password} = values

			const res = await signUp.email({
				email,
				name,
				password,
			})

			if (res.error) {
				console.log(res)
				setError(res.error.message || 'Something went wrong...')
			} else {
				onClose()
			}
		},
	})

	return (
		<Form className=' w-full' onSubmit={formik.handleSubmit}>
			<Input
				label='name'
				{...formik.getFieldProps('name' as RegistrationNamesType)}
				errorMessage={formik.errors.name}
				isInvalid={!!formik.errors.name && !!formik.touched.name}
			/>

			<Input
				label='email'
				type='email'
				{...formik.getFieldProps('email' as RegistrationNamesType)}
				errorMessage={formik.errors.email}
				isInvalid={!!formik.errors.email && !!formik.touched.email}
			/>
			<Input
				label='password'
				type='password'
				{...formik.getFieldProps('password' as RegistrationNamesType)}
				errorMessage={formik.errors.password}
				isInvalid={!!formik.errors.password && !!formik.touched.password}
			/>
			<Input
				label='repeatPassword'
				type='password'
				{...formik.getFieldProps('repeatPassword' as RegistrationNamesType)}
				errorMessage={formik.errors.repeatPassword}
				isInvalid={
					!!formik.errors.repeatPassword && !!formik.touched.repeatPassword
				}
			/>

			{error && <p className='text-red-500'>{error}</p>}

			<div className=' flex w-full gap-4  items-center justify-end pt-8'>
				<Button onPress={onClose} type='reset'>
					Отмена
				</Button>
				<Button type='submit' color='primary'>
					Зарегистрироваться
				</Button>
			</div>
		</Form>
	)
}

export default RegistrationForm
