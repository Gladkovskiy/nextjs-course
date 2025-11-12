import {IIngredientStore} from '@/lib/store/ingredient/types'

//если возвращаешь объект то на уровне хуков используй useShallow
export const ingredientSelector = (state: IIngredientStore) => ({
	ingredients: state.ingredients,
	isLoading: state.isLoading,
	error: state.error,
})

export const ingredientsActionSelector = (state: IIngredientStore) => state.actions
