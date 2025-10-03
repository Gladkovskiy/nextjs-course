import {LoginSchemType, RegistrationSchemType} from './validation'

export const registrationInitialState: RegistrationSchemType = {
  email: '',
  password: '',
  repeatPassword: '',
}

export const loginInitialState: LoginSchemType = {
  email: '',
  password: '',
}
