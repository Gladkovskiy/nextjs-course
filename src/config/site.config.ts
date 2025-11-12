export const siteConfig = {
	title: 'Кухня',
	description: 'Рецепты кухни',
	navItems: [
		{href: '/', label: 'Рецепты'},
		{href: '/ingredients', label: 'Ингредиенты'},
		{href: '/about', label: 'О нас'},
	],
} as const

export const pageContentConfig = {
	'/': {
		context: '<p>Здесь будут рецепты...</p>',
	},
	'/ingredients': {
		context: '<p>Традиционные ингредиенты кухни...</p>',
	},
	'/about': {
		context: '<p>Вкус многовековых традиций...</p>',
	},
}
