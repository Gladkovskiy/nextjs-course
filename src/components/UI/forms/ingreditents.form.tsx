'use client'

import {CATEGORY_OPTIONS, UNIT_OPTIONS} from '@/config/const/select-option'
import {useSession} from '@/lib/auth/auth-client'
import {initialStateIngredient} from '@/lib/formik/ingredient/initialState'
import {IngredientsNamesType, IngredientsSchemType, ingredientsValidation} from '@/lib/formik/ingredient/validation'
import {useIngredient, useIngredientActions} from '@/lib/store/ingredient/hooks'
import {Form} from '@heroui/form'
import {Button, Input, Select, SelectItem} from '@heroui/react'
import {useFormik} from 'formik'
import {FC} from 'react'

const IngredientForm: FC = () => {
	const {addIngredient} = useIngredientActions()
	const {error, isLoading} = useIngredient()
	const {data} = useSession()

	const formik = useFormik<IngredientsSchemType>({
		initialValues: initialStateIngredient,
		validationSchema: ingredientsValidation,
		onSubmit: async values => {
			await addIngredient(values)

			if (!error) formik.resetForm()
		},
	})

	if (!data?.user) return null

	return (
		<Form className=' w-full border-1 p-5 rounded-2xl border-gray-300 shadow' onSubmit={formik.handleSubmit}>
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
						isInvalid={!!formik.errors.pricePerUnit && !!formik.touched.pricePerUnit}
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
				<p className={'text-red-500'}>{error}</p>

				<Button color='primary' type='submit' isLoading={isLoading} className=' mt-3'>
					Добавить ингридиент
				</Button>
			</div>
		</Form>
	)
}

export default IngredientForm
