import {createRecipe, deleteRecipe, getRecipes, updateRecipe} from '@/actions/recipe'
import {RecipeSchemType} from '@/lib/formik/recipe/validation'
import {RecipeState, RecipeStore} from '@/lib/store/recipe/types'
import {create} from 'zustand'
import {devtools, DevtoolsOptions} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

// const {createIngredient, getIngredients, deleteIngredient} = ingredientApi

const recipeState: RecipeState = {
	recipes: [],
	isLoading: false,
	error: '',
}

const devToolsOptions: DevtoolsOptions = {
	name: 'recipe-store',
	enabled: process.env.NODE_ENV === 'development',
}

//persist для zustand, для использования добавляем перед immer, и добаляем свойства name, storage default localstorage
/* const persistOptions: PersistOptions<IngredientStore, Omit<IngredientStore, 'actions'>> = {
	name: 'recipe-store',
	partialize: state => {
		const {actions: _, ...rest} = state

		return rest
	},
} */

//immer для имутабельности состояния (npm i immer)
export const useRecipeStore = create<RecipeStore>()(
	devtools(
		immer(set => ({
			...recipeState,
			actions: {
				addRecipe: async (values: RecipeSchemType) => {
					set(
						state => {
							state.error = ''
							state.isLoading = true
						},
						false,
						{
							type: 'addRecipe',
							payload: {
								error: '',
								isLoading: true,
							},
						}
					)

					const res = await createRecipe(values)

					if (res.success) {
						set(
							state => {
								state.isLoading = false
								state.recipes.push(res.responseObject!)
							},
							false,
							{
								type: 'addRecipe',
								payload: {
									recipe: res.responseObject!,
									isLoading: false,
								},
							}
						)
					} else {
						set(
							state => {
								state.isLoading = false
								state.error = res.message
							},
							false,
							{
								type: 'addRecipe',
								payload: {
									error: res.message,
									isLoading: false,
								},
							}
						)
					}
				},

				loadRecipes: async () => {
					set(
						state => {
							state.error = ''
							state.isLoading = true
						},
						false,
						{
							type: 'loadRecipes',
							payload: {
								error: '',
								isLoading: true,
							},
						}
					)

					const res = await getRecipes()

					if (res.success) {
						set(
							state => {
								state.isLoading = false
								state.recipes = res.responseObject!
							},
							false,
							{
								type: 'loadRecipes',
								payload: {
									ingredients: res.responseObject!,
									isLoading: false,
								},
							}
						)
					} else {
						set(
							state => {
								state.isLoading = false
								state.error = res.message
							},
							false,
							{
								type: 'loadRecipes',
								payload: {
									error: res.message,
									isLoading: false,
								},
							}
						)
					}
				},

				removeRecipe: async (id: string) => {
					set(
						state => {
							state.error = ''
							state.isLoading = true
						},
						false,
						{
							type: 'removeRecipe',
							payload: {
								error: '',
								isLoading: true,
							},
						}
					)

					const res = await deleteRecipe(id)

					if (res.success) {
						set(
							state => {
								state.isLoading = false
								state.recipes = state.recipes.filter(recipe => recipe.id !== id)
							},
							false,
							{
								type: 'removeRecipe',
								payload: {
									recipeId: id,
									isLoading: false,
								},
							}
						)
					} else {
						set(
							state => {
								state.isLoading = false
								state.error = res.message
							},
							false,
							{
								type: 'removeRecipe',
								payload: {
									error: res.message,
									isLoading: false,
								},
							}
						)
					}
				},

				updateRecipe: async (values: RecipeSchemType & {id: string}) => {
					set(
						state => {
							state.error = ''
							state.isLoading = true
						},
						false,
						{
							type: 'updateRecipe',
							payload: {
								error: '',
								isLoading: true,
							},
						}
					)

					const res = await updateRecipe(values)

					if (res.success) {
						set(
							state => {
								state.isLoading = false
								state.recipes = state.recipes.map(recipe =>
									recipe.id === res.responseObject!.id ? res.responseObject! : recipe
								)
							},
							false,
							{
								type: 'updateRecipe',
								payload: {
									recipe: res.responseObject!,
									isLoading: false,
								},
							}
						)
					} else {
						set(
							state => {
								state.isLoading = false
								state.error = res.message
							},
							false,
							{
								type: 'updateRecipe',
								payload: {
									error: res.message,
									isLoading: false,
								},
							}
						)
					}
				},
			},
		})),
		devToolsOptions
	)
)
