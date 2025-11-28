import {Category, Unit} from 'generated/prisma'
import {IngredientsSchemType, LoginSchemType, RegistrationSchemType} from './validation'

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
	category: Category.VEGETABLES,
	description: '',
	pricePerUnit: null,
	unit: Unit.KILOGRAMS,
}
