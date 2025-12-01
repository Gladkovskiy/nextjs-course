export enum PATHS {
	ROOT = '/',
	INGREDIENTS = '/ingredients',
	ABOUT = '/about',
	ERROR = '/error',
}

export const siteConfig = {
	title: 'Кухня',
	description: 'Рецепты кухни',
	navItems: [
		{href: PATHS.ROOT, label: 'Рецепты'},
		{href: PATHS.INGREDIENTS, label: 'Ингредиенты'},
		{href: PATHS.ABOUT, label: 'О нас'},
	],
}

export const pageContentConfig = {
	[PATHS.ROOT]: {
		context: '<p>Здесь будут рецепты...</p>',
	},
	[PATHS.INGREDIENTS]: {
		context: '<p>Традиционные ингредиенты кухни...</p>',
	},
	[PATHS.ABOUT]: {
		context: '<p>Вкус многовековых традиций...</p>',
	},
}

export const protectedPath = [PATHS.INGREDIENTS]
