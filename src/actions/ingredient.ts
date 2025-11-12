'use server'

import {IngredientsSchemType} from '@/components/UI/forms/validation'
import prisma from '@/lib/prisma'
import {ActionResponse} from '@/types/resposnse'
import {Ingredient} from 'generated/prisma'

export const createIngredient = async (values: IngredientsSchemType): Promise<ActionResponse<Ingredient>> => {
	try {
		const ingredient = await prisma.ingredient.create({
			data: values,
		})

		return {
			message: `Добавлен ингридиент ${values.name}`,
			success: true,
			responseObject: ingredient,
		}
	} catch (error) {
		console.log(error)
		return {
			message: `Произошла ошибка при добавлении ${values.name}`,
			success: false,
		}
	}
}

export const getIngredients = async (): Promise<ActionResponse<Ingredient[]>> => {
	try {
		const ingredients = await prisma.ingredient.findMany()

		return {
			message: 'Ингридиенты успешно получены',
			success: true,
			responseObject: ingredients,
		}
	} catch (error) {
		console.log(error)

		return {
			message: 'Произошла ошибка при получении ингридиентов',
			success: false,
		}
	}
}

export const deleteIngredient = async (id: string): Promise<ActionResponse<Ingredient>> => {
	try {
		const ingredient = await prisma.ingredient.delete({
			where: {
				id,
			},
		})

		return {
			message: 'Ингридиент успешно удален',
			success: true,
			responseObject: ingredient,
		}
	} catch (error) {
		console.log(error)

		return {
			message: 'Произошла ошибка при удалении ингридиента',
			success: false,
		}
	}
}
