import { WeakRef } from 'packages:WeakRef/src/WeakRef.js'

export let useElementInternals = new WeakRef((host, opts) => {
	let animationID: number
	let shadowRoot: ShadowRoot
	let shadowSlotElement: HTMLSlotElement
	let shadowStyleElement: HTMLStyleElement

	let ints: any = {
		host,
		parts: {},
		props: {},
		style: {},
		get shadowRoot() {
			return shadowRoot || (
				shadowRoot = host.attachShadow({ mode: 'open' })
			)
		},
		get shadowSlotElement() {
			return shadowSlotElement || (
				shadowSlotElement = ints.shadowRoot.appendChild(
					document.createElement('slot')
				)
			)
		},
		get shadowStyleElement() {
			return shadowStyleElement || (
				shadowStyleElement = ints.shadowRoot.appendChild(
					document.createElement('style')
				)
			)
		},
		setProps(newProps: InternalProps) {
			let oldProps = ints.props!

			for (let name in newProps) {
				let oldValue = oldProps[name]
				let newValue = newProps[name]

				if (oldValue !== newValue) {
					oldProps[name] = newValue

					ints.onPropsChange!(name, oldValue, newValue)
				}
			}
		},
		onPropsChange() {},
		setStyle(style: InternalStyle) {
			for (let name in style) {
				ints.style[name] = style[name]
			}

			update()

			function update() {
				cancelAnimationFrame(animationID)

				let { sheet } = ints.shadowStyleElement

				if (sheet) {
					let runtimeStyle = (
						sheet.cssRules[0] as CSSStyleRule
						|| sheet.cssRules[sheet.insertRule(':host{')]
					).style

					for (let name in ints.style) {
						if (name.includes('-')) {
							runtimeStyle.setProperty(name, ints.style[name] as string)
						} else {
							runtimeStyle[name as keyof PickByValue<CSSStyleDeclaration, string>] = ints.style[name] as string
						}
					}
				} else {
					animationID = requestAnimationFrame(update)
				}
			}
		},
		...Object(opts)
	}

	return ints
}) as {
	<Opts extends InternalOptions, Host extends Element = Element>(
		target: Element,
		opts?: Partial<Opts> & {
			onPropsChange?(
				this: Internals<Host, Opts>,
				name: string,
				oldValue: any,
				newValue: any
			): void
		} & {
			[key: string]: any
		}
	): Internals<Host, Opts>
}

export let defineElementInternals = <T extends HTMLElement>(Class: Constructor<T>, props: Record<string, Function>) => {
	let { prototype } = Class

	for (let name in props) {
		Object.defineProperty(prototype, name, {
			configurable: true,
			get(this: T) {
				return useElementInternals(this).props[name]
			},
			set(this: T, value: any) {
				useElementInternals(this).setProps({ [name]: props[name](value) })
			},
		})
	}
}

interface Internals<
	Host extends Element,
	Opts extends InternalOptions
> {
	host: Host
	props: InternalProps & Opts['props']
	parts: InternalParts & Opts['parts']
	style: InternalStyle

	onPropsChange(this: this, name: string, oldValue: any, newValue: any): void

	shadowRoot: ShadowRoot
	shadowSlotElement: HTMLSlotElement
	shadowStyleElement: HTMLStyleElement

	setProps(newProps: Partial<Required<Opts>['props']>): void
	setStyle(newStyle: InternalStyle): void
}

interface InternalOptions {
	props?: InternalProps
	parts?: InternalParts
}

interface InternalProps {
	[propertyName: string]: any
}

interface InternalParts {
	[partName: string]: Element
}

interface InternalStyle {
	[propertyName: string]: string | number
}

/** Construct a type with the properties of T whose valuess are assignable to U. */
type PickByValue<T, U> = Pick<T, {
	[Key in keyof T]: T[Key] extends U ? Key : never
}[keyof T]>

interface Constructor<T> {
	new (): T
}
