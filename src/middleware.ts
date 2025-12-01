import {PATHS} from '@/config/site.config'
import {auth} from '@/lib/auth/auth'
import {headers} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

export const middleware = async (request: NextRequest) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		const url = new URL(PATHS.ERROR, request.url)
		url.searchParams.set('message', 'Вы не авторизованы')

		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
	runtime: 'nodejs',
	matcher: ['/ingredients'],
}
