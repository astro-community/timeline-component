// @ts-check

import { defineConfig } from 'vite'

// @ts-ignore
const root = new URL('..', import.meta.url).pathname

export default defineConfig({
	resolve: {
		alias: [
			{ find:/^packages:(.*)$/, replacement: `${root}/packages/$1` }
		]
	},
	server: {
		port: 3000,
	},
})
