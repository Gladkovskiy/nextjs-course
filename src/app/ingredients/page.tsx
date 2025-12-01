import IngredientForm from '@/components/UI/forms/ingreditents.form'
import LitsOfIngrediets from '@/components/UI/ingredients/listOfIngredients'

const Ingredients = () => {
	return (
		<div className=' flex flex-col items-center'>
			{/* <PageContent /> */}
			<IngredientForm />
			<LitsOfIngrediets />
		</div>
	)
}

export default Ingredients
