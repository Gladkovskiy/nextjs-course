import {IngredientsSchemType} from '@/components/UI/forms/validation'
import {Ingredient} from 'generated/prisma'

export interface IIngredientState {
	ingredients: Ingredient[]
	isLoading: boolean
	error: string
}

export interface IIngredientAction {
	addIngredient: (values: IngredientsSchemType) => void
	loadIngredients: () => void
	removeIngredient: (id: string) => void
}

export interface IIngredientStore extends IIngredientState {
	actions: IIngredientAction
}
