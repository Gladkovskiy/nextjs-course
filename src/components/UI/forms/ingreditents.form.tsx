'use client'

import {createIngredient} from '@/actions/ingredient'
import {ingredientsInitialState} from '@/components/UI/forms/initalState'
import {
	IngredientsNamesType,
	IngredientsSchemType,
	ingredientsValidation,
} from '@/components/UI/forms/validation'
import {CATEGORY_OPTIONS, UNIT_OPTIONS} from '@/config/const/select-option'
import {Form} from '@heroui/form'
import {Button, Input, Select, SelectItem} from '@heroui/react'
import {useFormik} from 'formik'
import {FC, useState, useTransition} from 'react'

const IngredientForm: FC = () => {
	const [response, setResponse] = useState({message: '', success: true})
	const [loading, setLoading] = useTransition()

	const formik = useFormik<IngredientsSchemType>({
		initialValues: ingredientsInitialState,
		validationSchema: ingredientsValidation,
		onSubmit: async values => {
			setLoading(async () => {
				const addIngredient = await createIngredient(values)

				setResponse(addIngredient)

				if (addIngredient.success) formik.resetForm()
			})
		},
	})

	return (
		<Form className=' w-[500px]' onSubmit={formik.handleSubmit}>
			<Input
				label='имя ингридиента'
				{...formik.getFieldProps('name' as IngredientsNamesType)}
				errorMessage={formik.errors.name}
				isInvalid={!!formik.errors.name && !!formik.touched.name}
			/>

			<div className=' flex gap-2 w-full'>
				<div className=' w-1/3'>
					<Select
						label='категория'
						{...formik.getFieldProps('category' as IngredientsNamesType)}
						errorMessage={formik.errors.category}
						isInvalid={!!formik.errors.category && !!formik.touched.category}
					>
						{CATEGORY_OPTIONS.map(option => (
							<SelectItem key={option.value} className=' text-black'>
								{option.label}
							</SelectItem>
						))}
					</Select>
				</div>

				<div className=' w-1/3'>
					<Select
						label='еденица измерения'
						{...formik.getFieldProps('unit' as IngredientsNamesType)}
						errorMessage={formik.errors.unit}
						isInvalid={!!formik.errors.unit && !!formik.touched.unit}
					>
						{UNIT_OPTIONS.map(unit => (
							<SelectItem key={unit.value} className=' text-black'>
								{unit.label}
							</SelectItem>
						))}
					</Select>
				</div>

				<div className=' w-1/3'>
					<Input
						label='цена за еденицу'
						type='number'
						{...formik.getFieldProps('pricePerUnit' as IngredientsNamesType)}
						errorMessage={formik.errors.pricePerUnit}
						isInvalid={
							!!formik.errors.pricePerUnit && !!formik.touched.pricePerUnit
						}
						endContent={<span>$</span>}
					/>
				</div>
			</div>

			<Input
				label='описание'
				{...formik.getFieldProps('description' as IngredientsNamesType)}
				errorMessage={formik.errors.description}
				isInvalid={!!formik.errors.description && !!formik.touched.description}
			/>

			<div className=' flex w-full items-center justify-end gap-2'>
				<p
					className={`${response.success ? 'text-green-500' : 'text-red-500'}`}
				>
					{response.message}
				</p>

				<Button color='primary' type='submit' isLoading={loading}>
					Добавить ингридиент
				</Button>
			</div>
		</Form>
	)
}

export default IngredientForm
