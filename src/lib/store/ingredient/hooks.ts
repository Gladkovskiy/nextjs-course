import {useIngredientStore} from '@/lib/store/ingredient/ingredientStore'
import {ingredientsActionSelector, ingredientSelector} from '@/lib/store/ingredient/selectors'
import {IngredientStore} from '@/lib/store/ingredient/types'
import {useShallow} from 'zustand/react/shallow'

export const useIngredientActions = (): IngredientStore['actions'] => useIngredientStore(ingredientsActionSelector)

export const useIngredient = (): {
	ingredients: IngredientStore['ingredients']
	isLoading: IngredientStore['isLoading']
	error: IngredientStore['error']
} => useIngredientStore(useShallow(ingredientSelector))
