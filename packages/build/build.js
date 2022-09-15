// @ts-check

import ts from 'typescript'
import { dirname, relative } from 'path'
import { existsSync, readdirSync, readFileSync, rmSync } from 'fs'
import { fileURLToPath } from 'url'
import { rollup } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { transform } from 'lightningcss'
import { gzipSizeSync } from 'gzip-size'
import { sync as brotliSizeSync } from 'brotli-size'

export async function build(dir = '.') {
	const dirURL = new URL(toDir(dir), fileURL)

	const pkgURL = new URL('package.json', dirURL)

	const pkg = JSON.parse(readFileSync(pkgURL, 'utf-8'))

	const builds = []

	const cleared = {}

	/** @type {import('rollup').RollupCache | undefined} */
	let cache = {
		modules: [],
		plugins: {},
	}

	console.log(color.dim(`╭──────────────────────────┬──────────┬──────────┬──────────┐`, matchBoxArt))
	console.log(color.dim(`│ file                     │     size │     gzip │   brotli │`, matchBoxArt))
	console.log(color.dim(`├──────────────────────────┼──────────┼──────────┼──────────┤`, matchBoxArt))

	const dirs = Object.assign({ src: '.', lib: '.' }, pkg.directories)

	const libDirURL = new URL(toDir(dirs.lib), dirURL)
	const srcDirURL = new URL(toDir(dirs.src), dirURL)

	if (libDirURL.href !== dirURL.href) {
		if (existsSync(libDirURL)) {
			for (const entry of readdirSync(libDirURL)) {
				const fileURL = new URL(entry, libDirURL)

				rmSync(fileURL, { recursive: true, force: true, maxRetries: 2 })
			}
		}
	}

	for (const sourcePath in pkg.source) {
		const config = {
			lib: String(libDirURL.pathname),
			type: String(pkg.type || 'module'),
			...Object(pkg.source[sourcePath])
		}
		const sourceURL = new URL(sourcePath, srcDirURL)
		const configLibDirURL = new URL(toDir(config.lib), dirURL)

		await rollup({
			cache,
			input: fileURLToPath(sourceURL),
			treeshake: 'smallest',
			external: [
				'react'
			],
			plugins: [
				typescript({
					typescript: ts,
					tsconfig: fileURLToPath(tsConfigURL),
					abortOnError: false,
					check: false,
					clean: true,
					verbosity: 0,
				}),
				resolvePaths(),
				includeCSS(),
			],
		}).then(
			bundle => {
				cache = bundle.cache

				return bundle.write({
					dir: fileURLToPath(configLibDirURL),
					format: config.type === 'module' ? 'esm' : 'cjs',
					plugins: [
						terser({
							keep_classnames: true,
							keep_fnames: true,
						}),
						writeDts(),
						sizes(libDirURL),
					],
				})
			}
		)
	}

	console.log(color.dim(`└──────────────────────────┴──────────┴──────────┴──────────╯`, matchBoxArt))
}

// @ts-ignore
const fileURL = new URL(import.meta.url)
const rootURL = new URL('../../', fileURL)
const pkgsURL = new URL('packages/', rootURL)
const tsConfigURL = new URL('tsconfig.json', rootURL)

function resolvePaths() {
	/** @type {import('rollup').Plugin} */
	const plugin = {
		name: 'resolve/paths',
		resolveId(importee, importer, options) {
			let modified = importee.replace(/^packages:(.*)$/, `${pkgsURL.pathname}$1`)

			if (modified !== importee) return this.resolve(modified, importer, options)
		},
	}

	return plugin
}

function includeCSS() {
	/** @type {import('rollup').Plugin} */
	const plugin = {
		name: 'resolve/css',
		resolveId(importee, importer, options) {
			let modified = importee.replace(/^(.*)\?raw$/, `$1`)

			if (modified !== importee) return this.resolve(modified, importer, options)
		},
		transform(code, importee) {
			if (importee.endsWith('.css')) return {
				code: `export default ${JSON.stringify(
					transform({
						filename: importee,
						code: Buffer.from(code),
						minify: true,
					}).code.toString('utf-8')
				)}`,
			}
		},
	}

	return plugin
}

function writeDts () {
	/** @type {import('rollup').Plugin} */
	const result = {
		name: 'write-dts',
		generateBundle(options, chunks) {
			options.file = Object.keys(chunks).at(0)

			for (const chunk of Object.values(chunks)) {
				const esmPath = String(Reflect.get(chunk, 'facadeModuleId'))
				const dtsPath = getDtsPath(esmPath)

				if (esmPath !== dtsPath) {
					if (existsSync(dtsPath)) {
						this.emitFile({
							type: 'asset',
							fileName: getDtsPath(chunk.fileName),
							source: readFileSync(dtsPath, 'utf-8'),
						})
					} else if (esmPath.endsWith('.ts')) {
						const generatedDts = compileDts(esmPath, {
							emitDeclarationOnly: true,
							declaration: true,
						})

						for (const name in generatedDts) {
							if (!name.startsWith('..')) {
								this.emitFile({
									type: 'asset',
									fileName: name,
									source: generatedDts[name],
								})
							}
						}
					}
				}
			}
		},
	}

	return result
}

function compileDts(fileName = '', /** @type {ts.CompilerOptions} */ options) {
	let generatedDts = {}

	let dirName = dirname(fileName)

	const host = ts.createCompilerHost(options);

	host.writeFile = (fileName = '', contents = '') => {
		fileName = relative(dirName, fileName)

		generatedDts[fileName] = contents
	}

	const program = ts.createProgram([ fileName ], options, host)

	program.emit()

	return generatedDts
}

function getDtsPath(mjsPath = '') {
	return mjsPath.replace(/\.[jt]s$/, '.d.ts')
}

function sizes(relURL = new URL('file://')) {
	/** @type {import('rollup').Plugin} */
	const plugin = {
		name: 'plugin/sizes',
		generateBundle(options, bundle) {
			const rows = []

			for (let file in bundle) {
				let chunk = bundle[file]

				if (chunk.type === 'chunk') {
					let code = chunk.code

					if (typeof code !== "string") continue

					let size = Buffer.byteLength(code, 'utf8')
					let gzip = gzipSizeSync(code)
					let brotli = brotliSizeSync(code)

					let fileURL = new URL(options.dir + file, relURL)
					let path = relative(fileURLToPath(relURL), fileURLToPath(fileURL))

					rows.push([ path, getKB(size), getKB(gzip), getKB(brotli) ])
				}
			}

			let column = [ 24, 8, 8, 8 ]
			for (let row of rows) {
				for (let index in row) {
					column[index] = column[index] || 0
					column[index] = Math.max(column[index], row[index].length)
				}
			}

			for (let row of rows) {
				for (let index in row) {
					row[index] = row[index][Number(index) > 0 ? 'padStart' : 'padEnd'](column[index], ' ')
				}

				const [ file, size, sizeG, sizeB ] = row
				console.log(
					color.dim(`│ ${color.cyan(file)} │ ${`${color.green(size)} │ ${color.green(sizeG)} │ ${color.green(sizeB)}`} │`, matchBoxArt)
				)
			}
		}
	}

	return plugin
}

function getKB(size = 0) {
	return (size / 1000).toFixed(2) + 'KB'
}

/** @type {Record<string, (value: string, maybe?: string | RegExp) => string>} */
const color = /** @type {any} */ (new Proxy(
	Object.entries({
		reset: 0,
		bold: 1,
		dim: 2,
		underline: 4,
		blink: 5,
		invert: 7,
		hidden: 8,
		black: 30,
		red: 31,
		green: 32,
		yellow: 33,
		blue: 34,
		magenta: 35,
		cyan: 36,
		white: 37,
		bgBlack: 40,
		bgRed: 41,
		bgGreen: 42,
		bgYellow: 43,
		bgBlue: 44,
		bgMagenta: 45,
		bgCyan: 46,
		bgWhite: 47,
	}).reduce(
		(color, [name, id]) => ({ ...color, [name]: `\x1b[${id}m` }), {}
	),
	{
		get: (
			/** @type {Record<string, string>} */ colors,
			/** @type {string} */ name
		) => (string = '', maybe = '') => maybe ? (
			string.replace(
				maybe,
				$0 => colors[name] + $0.replace(colors.reset, colors.reset + colors[name]) + colors.reset
			)
		) : (
			colors[name] + string.replace(colors.reset, colors.reset + colors[name]) + colors.reset
		),
	},
))

const matchBoxArt = /[┌┬─┐│├┼┤└┴┘╭╮╰╯]/g
const toDir = (path = '') => String(path).endsWith('/') ? path : path + '/'
