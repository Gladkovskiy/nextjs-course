import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'

import {siteConfig} from '@/config/site.config'
import './globals.css'

import AppLoader from '@/components/common/appLoader'
import {Providers} from '@/components/common/providers'
import Header from '@/components/UI/layouts/header/header'
import Title from '@/components/UI/layouts/title'
import {layoutConfig} from '@/config/layout.config'

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
					<AppLoader>
						<div className=' flex flex-col min-h-screen justify-between'>
							<div className=' flex flex-col'>
								<Header />
								<main className={`flex flex-col max-w-[1024px] mx-auto`}>
									<Title />
									{children}
								</main>
							</div>

							<footer className={`flex items-center justify-center`} style={{height: `${layoutConfig.footerHeight}`}}>
								<p>{siteConfig.description}</p>
							</footer>
						</div>
					</AppLoader>
				</Providers>
			</body>
		</html>
	)
}
