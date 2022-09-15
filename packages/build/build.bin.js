#!/usr/bin/env node

;(async () => {
	const { pathToFileURL } = await import('url')
	const { build } = await import('./build.js')

	const fileURL = pathToFileURL(process.cwd())
	const opts = process.argv.slice(2)

	await build(fileURL, ...opts)
})()
