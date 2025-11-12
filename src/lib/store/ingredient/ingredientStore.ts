import {createIngredient, deleteIngredient, getIngredients} from '@/actions/ingredient'
import {IngredientsSchemType} from '@/components/UI/forms/validation'
import {IIngredientState, IIngredientStore} from '@/lib/store/ingredient/types'
import {create} from 'zustand'

const ingredientState: IIngredientState = {
	ingredients: [],
	isLoading: false,
	error: '',
}

export const useIngredientStore = create<IIngredientStore>(set => ({
	...ingredientState,
	actions: {
		addIngredient: async (values: IngredientsSchemType) => {
			set(state => ({...state, isLoading: true, error: ''}))

			const res = await createIngredient(values)

			if (res.success) {
				set(state => ({...state, isLoading: false, ingredients: [...state.ingredients, res.responseObject!]}))
			} else {
				set(state => ({...state, isLoading: false, error: res.message}))
			}
		},

		loadIngredients: async () => {
			set(state => ({...state, isLoading: true, error: ''}))

			const res = await getIngredients()

			if (res.success) {
				set(state => ({...state, isLoading: false, ingredients: res.responseObject!}))
			} else {
				set(state => ({...state, isLoading: false, error: res.message}))
			}
		},

		removeIngredient: async (id: string) => {
			set(state => ({...state, isLoading: true, error: ''}))

			const res = await deleteIngredient(id)

			if (res.success) {
				set(state => ({...state, isLoading: false, ingredients: state.ingredients.filter(item => item.id !== id)}))
			} else {
				set(state => ({...state, isLoading: false, error: res.message}))
			}
		},
	},
}))
