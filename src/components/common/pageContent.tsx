'use client'

import {pageContentConfig} from '@/config/site.config'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'
import {usePathname} from 'next/navigation'

import {useEffect, useState} from 'react'

const PageContent = () => {
	const pathname = usePathname()
	const [pageContent, setPageContent] = useState('')

	useEffect(() => {
		const text =
			pageContentConfig[pathname as keyof typeof pageContentConfig].context
		setPageContent(DOMPurify.sanitize(text))
	}, [])

	return <div>{parse(pageContent)}</div>
}

export default PageContent
