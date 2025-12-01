'use client'

import {INGREDIENTS_TABLE_COLUMN_NAME} from '@/config/const/ingredient-table-name'
import {CATEGORY_OPTIONS, UNIT_OPTIONS} from '@/config/const/select-option'
import {useSession} from '@/lib/auth/auth-client'
import {useIngredient, useIngredientActions} from '@/lib/store/ingredient/hooks'
import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@heroui/react'
import {FC} from 'react'

const LitsOfIngrediets: FC = () => {
	const {ingredients} = useIngredient()
	const {removeIngredient} = useIngredientActions()
	const {data} = useSession()

	if (!data?.user) return null

	return (
		<Table aria-label='Список ингердиентов' className=' mt-4 w-full'>
			<TableHeader>
				{INGREDIENTS_TABLE_COLUMN_NAME.map(column => (
					<TableColumn key={column}>{column}</TableColumn>
				))}
			</TableHeader>

			<TableBody>
				{ingredients.map(ingredient => (
					<TableRow key={ingredient.id}>
						<TableCell>{ingredient.name}</TableCell>
						<TableCell>{CATEGORY_OPTIONS.find(category => category.value === ingredient.category)?.label}</TableCell>
						<TableCell>{UNIT_OPTIONS.find(unit => unit.value === ingredient.unit)?.label}</TableCell>
						<TableCell>{ingredient.pricePerUnit}</TableCell>
						<TableCell>{ingredient.description}</TableCell>
						<TableCell>
							<Button
								color='danger'
								onPress={() => {
									removeIngredient(ingredient.id)
								}}
							>
								Удалить
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default LitsOfIngrediets
