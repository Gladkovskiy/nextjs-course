import {ingredientApi} from '@/actions/ingredient'
import {IngredientsSchemType} from '@/components/UI/forms/validation'
import {IngredientState, IngredientStore} from '@/lib/store/ingredient/types'
import {create} from 'zustand'
import {devtools, DevtoolsOptions} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

const {createIngredient, getIngredients, deleteIngredient} = ingredientApi

const ingredientState: IngredientState = {
	ingredients: [],
	isLoading: false,
	error: '',
}

const devToolsOptions: DevtoolsOptions = {
	name: 'ingredient-store',
	enabled: process.env.NODE_ENV === 'development',
}

//persist для zustand, для использования добавляем перед immer, и добаляем свойства name, storage default localstorage
/* const persistOptions: PersistOptions<IngredientStore, Omit<IngredientStore, 'actions'>> = {
	name: 'ingredient-store',
	partialize: state => {
		const {actions: _, ...rest} = state

		return rest
	},
} */

//immer для имутабельности состояния (npm i immer)
export const useIngredientStore = create<IngredientStore>()(
	devtools(
		immer(set => ({
			...ingredientState,
			actions: {
				addIngredient: async (values: IngredientsSchemType) => {
					set(
						state => {
							state.error = ''
							state.isLoading = true
						},
						false,
						{
							type: 'addIngredient',
							payload: {
								error: '',
								isLoading: true,
							},
						}
					)

					const res = await createIngredient(values)

					if (res.success) {
						set(
							state => {
								state.isLoading = false
								state.ingredients.push(res.responseObject!)
							},
							false,
							{
								type: 'addIngredient',
								payload: {
									ingredient: res.responseObject!,
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
								type: 'addIngredient',
								payload: {
									error: res.message,
									isLoading: false,
								},
							}
						)
					}
				},

				loadIngredients: async () => {
					set(
						state => {
							state.error = ''
							state.isLoading = true
						},
						false,
						{
							type: 'loadIngredients',
							payload: {
								error: '',
								isLoading: true,
							},
						}
					)

					const res = await getIngredients()

					if (res.success) {
						set(
							state => {
								state.isLoading = false
								state.ingredients = res.responseObject!
							},
							false,
							{
								type: 'loadIngredients',
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
								type: 'loadIngredients',
								payload: {
									error: res.message,
									isLoading: false,
								},
							}
						)
					}
				},

				removeIngredient: async (id: string) => {
					set(
						state => {
							state.error = ''
							state.isLoading = true
						},
						false,
						{
							type: 'removeIngredient',
							payload: {
								error: '',
								isLoading: true,
							},
						}
					)

					const res = await deleteIngredient(id)

					if (res.success) {
						set(
							state => {
								state.isLoading = false
								state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== id)
							},
							false,
							{
								type: 'removeIngredient',
								payload: {
									ingredientId: id,
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
								type: 'removeIngredient',
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
