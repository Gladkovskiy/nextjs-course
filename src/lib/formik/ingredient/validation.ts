import {Category, Unit} from 'generated/prisma'
import z from 'zod'
import {toFormikValidationSchema} from 'zod-formik-adapter'

export const IngredientsSchema = z.object({
	name: z.string({error: 'Обязательное поле для ввода'}),
	category: z.enum(Category, {
		error: 'Обязательное поле для ввода',
	}),
	unit: z.enum(Unit, {
		error: 'Обязательное поле для ввода',
	}),
	pricePerUnit: z
		.number()
		.nullish()
		.transform(value => (value === undefined ? null : value)),
	description: z.string({error: 'Обязательное поле для ввода'}),
})

export const ingredientsValidation = toFormikValidationSchema(IngredientsSchema)
export type IngredientsSchemType = z.infer<typeof IngredientsSchema>
export type IngredientsNamesType = keyof IngredientsSchemType
