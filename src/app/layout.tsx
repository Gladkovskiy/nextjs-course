import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'

import {siteConfig} from '@/config/site.config'
import './globals.css'

import Header from '@/components/UI/layouts/header/header'
import Title from '@/components/UI/layouts/title'
import {layoutConfig} from '@/config/layout.config'
import {Providers} from '@/providers/providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto px-4`}>
				<Providers>
					<Header />

					<Title />
					<main
						className={` container mx-auto px-4`}
						style={{
							height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`,
						}}
					>
						{children}
					</main>

					<footer className={`flex items-center justify-center`} style={{height: `${layoutConfig.footerHeight}`}}>
						<p>{siteConfig.description}</p>
					</footer>
				</Providers>
			</body>
		</html>
	)
}
