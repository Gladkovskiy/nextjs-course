'use client'

import {Form} from '@heroui/form'
import {Button, Input} from '@heroui/react'
import {useFormik} from 'formik'

import {
  RegistrationNamesType,
  RegistrationSchemType,
  registrationValidation,
} from '@/components/UI/forms/validation'
import {registrationInitialState} from '@/components/UI/forms/initalState'

interface IProps {
  onClose: () => void
}

const RegistrationForm = ({onClose}: IProps) => {
  const formik = useFormik<RegistrationSchemType>({
    initialValues: registrationInitialState,
    validationSchema: registrationValidation,
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <Form className=" w-full" onSubmit={formik.handleSubmit}>
      <Input
        label="email"
        type="email"
        {...formik.getFieldProps('email' as RegistrationNamesType)}
        errorMessage={formik.errors.email}
        isInvalid={!!formik.errors.email && !!formik.touched.email}
      />
      <Input
        label="password"
        type="password"
        {...formik.getFieldProps('password' as RegistrationNamesType)}
        errorMessage={formik.errors.password}
        isInvalid={!!formik.errors.password && !!formik.touched.password}
      />
      <Input
        label="repeatPassword"
        type="password"
        {...formik.getFieldProps('repeatPassword' as RegistrationNamesType)}
        errorMessage={formik.errors.repeatPassword}
        isInvalid={
          !!formik.errors.repeatPassword && !!formik.touched.repeatPassword
        }
      />

      <div className=" flex w-full gap-4  items-center justify-end pt-8">
        <Button onPress={onClose} type="reset">
          Отмена
        </Button>
        <Button type="submit" color="primary">
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  )
}

export default RegistrationForm
