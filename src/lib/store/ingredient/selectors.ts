import {IngredientStore} from '@/lib/store/ingredient/types'

//если возвращаешь объект то на уровне хуков используй useShallow
export const ingredientSelector = (state: IngredientStore) => ({
	ingredients: state.ingredients,
	isLoading: state.isLoading,
	error: state.error,
})

export const ingredientsActionSelector = (state: IngredientStore) => state.actions
