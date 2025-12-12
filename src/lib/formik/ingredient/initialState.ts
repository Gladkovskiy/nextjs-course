import {IngredientsSchemType} from '@/lib/formik/ingredient/validation'
import {Category, Unit} from 'generated/prisma'

export const initialStateIngredient: IngredientsSchemType = {
	name: '',
	category: Category.VEGETABLES,
	description: '',
	pricePerUnit: null,
	unit: Unit.KILOGRAMS,
}
