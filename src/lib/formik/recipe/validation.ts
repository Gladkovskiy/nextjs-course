import z from 'zod'
import {toFormikValidationSchema} from 'zod-formik-adapter'

const IngredientsSchema = z.object({
	id: z.string({error: 'Обязательное поле для ввода'}),
	quantity: z.number({error: 'Обязательное поле для ввода'}).positive({error: 'Значение должно быть больше нуля'}),
})

export const RecipeSchema = z.object({
	name: z.string({error: 'Обязательное поле для ввода'}),
	description: z.string({error: 'Обязательное поле для ввода'}),
	imageUrl: z.string({error: 'Обязательное поле для ввода'}),
	ingredients: z.array(IngredientsSchema).min(1, {error: 'Добавьте хотя бы один ингредиент'}),
})

export const recipeValidation = toFormikValidationSchema(RecipeSchema)
export type RecipeSchemType = z.infer<typeof RecipeSchema>
export type RecipeNamesType = keyof RecipeSchemType
