import {useIngredientStore} from '@/lib/store/ingredient/ingredientStore'
import {ingredientsActionSelector, ingredientSelector} from '@/lib/store/ingredient/selectors'
import {IIngredientStore} from '@/lib/store/ingredient/types'
import {useShallow} from 'zustand/react/shallow'

export const useIngredientActions = (): IIngredientStore['actions'] => useIngredientStore(ingredientsActionSelector)

export const useIngredient = (): {
	ingredients: IIngredientStore['ingredients']
	isLoading: IIngredientStore['isLoading']
	error: IIngredientStore['error']
} => useIngredientStore(useShallow(ingredientSelector))
