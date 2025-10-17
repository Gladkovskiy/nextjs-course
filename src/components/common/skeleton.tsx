'use client'

import {Skeleton} from '@heroui/react'

const AppSkeleton = () => {
	return (
		<div>
			<Skeleton className='h-12 w-12 rounded-full' />
			<Skeleton className='h-12 w-12 rounded-full' />
		</div>
	)
}

export default AppSkeleton
