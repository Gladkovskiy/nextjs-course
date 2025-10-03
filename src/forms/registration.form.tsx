import {Form} from '@heroui/form'
import {Input} from '@heroui/react'
import React, {useState} from 'react'

interface IProps {
  onClose: () => void
}

const RegistrationForm: React.FC<IProps> = ({onClose}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted', FormData)

    onClose()
  }

  return (
    <Form className=" w-full" onSubmit={handleSubmit}>
      <Input
        aria-label="Email"
        isRequired
        name="email"
        placeholder="Введите email"
        type="email"
        value={formData.email}
        classNames={{
          innerWrapper: 'bg-default-100',
          input: ' text-sm focus:outline-none',
        }}
        onChange={e => {
          setFormData({...formData, email: e.target.value})
        }}
        validate={value => {
          if (!value) return 'Почта обязательна'
          if (validateEmail(value)) return 'Некорректный email'
          return null
        }}
      />
    </Form>
  )
}

export default RegistrationForm
