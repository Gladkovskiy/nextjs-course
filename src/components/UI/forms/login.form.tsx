'use client'

import {Form} from '@heroui/form'
import {Button, Input} from '@heroui/react'
import {useFormik} from 'formik'

import {
  LoginNamesType,
  LoginSchemType,
  loginValidation,
} from '@/components/UI/forms/validation'
import {loginInitialState} from '@/components/UI/forms/initalState'

interface IProps {
  onClose: () => void
}

const LoginForm = ({onClose}: IProps) => {
  const formik = useFormik<LoginSchemType>({
    initialValues: loginInitialState,
    validationSchema: loginValidation,
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <Form className=" w-full" onSubmit={formik.handleSubmit}>
      <Input
        label="email"
        type="email"
        {...formik.getFieldProps('email' as LoginNamesType)}
        errorMessage={formik.errors.email}
        isInvalid={!!formik.errors.email && !!formik.touched.email}
      />
      <Input
        label="password"
        type="password"
        {...formik.getFieldProps('password' as LoginNamesType)}
        errorMessage={formik.errors.password}
        isInvalid={!!formik.errors.password && !!formik.touched.password}
      />

      <div className=" flex w-full gap-4  items-center justify-end pt-8">
        <Button type="reset" onPress={onClose}>
          Отмена
        </Button>
        <Button type="submit" color="primary">
          Войти
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
