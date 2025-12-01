import {Category, Unit} from 'generated/prisma'

export const CATEGORY_OPTIONS = [
	{value: Category.VEGETABLES, label: 'Овощи'},
	{value: Category.FRUITS, label: 'Фрукты'},
	{value: Category.MEAT, label: 'Мясо'},
	{value: Category.DAIRY, label: 'Молочные'},
	{value: Category.SPICES, label: 'Специи'},
	{value: Category.OTHER, label: 'Другое'},
]

export const UNIT_OPTIONS = [
	{value: Unit.GRAMS, label: 'Граммы'},
	{value: Unit.LITERS, label: 'Литры'},
	{value: Unit.MILILITERS, label: 'Миллилитры'},
	{value: Unit.PIECES, label: 'Штуки'},
	{value: Unit.KILOGRAMS, label: 'Килограммы'},
]
