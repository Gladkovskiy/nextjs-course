import {RecipeSchemType} from '@/lib/formik/recipe/validation'
import {Recipe} from 'generated/prisma'

export interface RecipeState {
	recipes: Recipe[]
	isLoading: boolean
	error: string
}

export interface RecipeAction {
	addRecipe: (values: RecipeSchemType) => void
	updateRecipe: (values: RecipeSchemType & {id: string}) => void
	loadRecipes: () => void
	removeRecipe: (id: string) => void
}

export interface RecipeStore extends RecipeState {
	actions: RecipeAction
}
