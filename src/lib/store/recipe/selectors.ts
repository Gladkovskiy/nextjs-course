import {RecipeStore} from '@/lib/store/recipe/types'

//если возвращаешь объект то на уровне хуков используй useShallow
export const recipeSelector = (state: RecipeStore) => ({
	recipes: state.recipes,
	isLoading: state.isLoading,
	error: state.error,
})

export const recipeActionSelector = (state: RecipeStore) => state.actions
