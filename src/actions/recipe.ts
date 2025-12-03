import prisma from '@/lib/prisma/prisma'
import {ActionResponse} from '@/types/resposnse'
import {Recipe} from 'generated/prisma'

const getRecipes = async (): Promise<ActionResponse<Recipe[]>> => {
	try {
		const recipes = await prisma.recipe.findMany({
			include: {
				ingredients: {
					include: {
						ingredient: true,
					},
				},
			},
		})

		return {
			message: 'Рецепты успешно получены',
			success: true,
			responseObject: recipes,
		}
	} catch (error) {
		console.log(error)

		return {
			message: 'Произошла ошибка при получении рецептов',
			success: false,
		}
	}
}

const createRecipe = async (values: {
	name: string
	description: string
	imageUrl: string
	ingredients: {
		id: string
		quantity: number
	}[]
}): Promise<ActionResponse<Recipe>> => {
	try {
		const {name, description, imageUrl, ingredients} = values

		if (ingredients.length === 0)
			return {
				message: 'Добавьте хотя бы один ингредиент',
				success: false,
			}

		const recipe = await prisma.recipe.create({
			data: {
				name,
				description,
				imageUrl,
				ingredients: {
					create: ingredients.map(({id, quantity}) => ({
						ingredient: {connect: {id}},
						quantity,
					})),
				},
			},
			include: {
				ingredients: {
					include: {
						ingredient: true,
					},
				},
			},
		})

		return {
			message: 'Рецепт успешно создан',
			success: true,
			responseObject: recipe,
		}
	} catch (error) {
		console.log(error)

		return {
			message: 'Произошла ошибка при создании рецепта',
			success: false,
		}
	}
}

const updateRecipe = async (values: {
	id: string
	name: string
	description: string
	imageUrl: string
	ingredients: {
		id: string
		quantity: number
	}[]
}): Promise<ActionResponse<Recipe>> => {
	try {
		const {id, name, description, imageUrl, ingredients} = values
		const recipe = await prisma.recipe.update({
			where: {id},
			data: {
				name,
				description,
				imageUrl,
				ingredients: {
					deleteMany: {},
					create: ingredients.map(({id, quantity}) => ({
						ingredient: {connect: {id}},
						quantity,
					})),
				},
			},
			include: {
				ingredients: {
					include: {
						ingredient: true,
					},
				},
			},
		})

		return {
			message: 'Рецепт успешно обновлен',
			success: true,
			responseObject: recipe,
		}
	} catch (error) {
		console.log(error)

		return {
			message: 'Произошла ошибка при обновлении рецепта',
			success: false,
		}
	}
}

const deleteRecipe = async (id: string) => {
	try {
		await prisma.recipeOnIngredient.deleteMany({
			where: {recipeId: id},
		})

		await prisma.recipe.delete({
			where: {id},
		})

		return {
			message: 'Рецепт успешно удален',
			success: true,
		}
	} catch (error) {
		console.log(error)

		return {
			message: 'Произошла ошибка при удалении рецепта',
			success: false,
		}
	}
}

export const recipeApi = {
	getRecipes,
	createRecipe,
	updateRecipe,
	deleteRecipe,
}
