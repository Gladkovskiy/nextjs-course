import {recipeActionSelector, recipeSelector} from '@/lib/store/recipe/selectors'
import {useRecipeStore} from '@/lib/store/recipe/store'
import {RecipeStore} from '@/lib/store/recipe/types'
import {useShallow} from 'zustand/react/shallow'

export const useRecipeActions = (): RecipeStore['actions'] => useRecipeStore(recipeActionSelector)

export const useRecipe = (): {
	recipes: RecipeStore['recipes']
	isLoading: RecipeStore['isLoading']
	error: RecipeStore['error']
} => useRecipeStore(useShallow(recipeSelector))
