import {IngredientsSchemType} from '@/lib/formik/ingredient/validation'
import {Ingredient} from 'generated/prisma'

export interface IngredientState {
	ingredients: Ingredient[]
	isLoading: boolean
	error: string
}

export interface IngredientAction {
	addIngredient: (values: IngredientsSchemType) => void
	loadIngredients: () => void
	removeIngredient: (id: string) => void
}

export interface IngredientStore extends IngredientState {
	actions: IngredientAction
}
