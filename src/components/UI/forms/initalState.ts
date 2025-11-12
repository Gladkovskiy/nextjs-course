import {
	IngredientsSchemType,
	LoginSchemType,
	RegistrationSchemType,
} from './validation'

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

export const ingredientsInitialState: IngredientsSchemType = {
	name: '',
	category: '',
	description: '',
	pricePerUnit: null,
	unit: '',
}
