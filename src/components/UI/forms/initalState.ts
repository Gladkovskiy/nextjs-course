import {LoginSchemType, RegistrationSchemType} from './validation'

export const registrationInitialState: RegistrationSchemType = {
	name: '',
	email: '',
	password: '',
	repeatPassword: '',
}

export const loginInitialState: LoginSchemType = {
	email: '',
	password: '',
}
