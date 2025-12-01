import {FC} from 'react'

interface IProps {
	searchParams?: {
		[key: string]: string | string[] | undefined
	}
}

const ErrorPage: FC<IProps> = ({searchParams}) => {
	const message = searchParams?.message || 'Неизвестная ошибка'

	return (
		<div className=' flex  items-center justify-center'>
			<p className=' text-red-500 text-xl'>{message}</p>
		</div>
	)
}

export default ErrorPage
