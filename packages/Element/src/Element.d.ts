export var append: {
	<T extends Element>(target: T, ...children: Child[]): T
}

export var handle: {
	<T extends Element>(target: T, events: Events): T
}

export var emit: {
	<T extends Element>(target: T, type: string, options: any): boolean
}

export let assign: {
	<T extends Element>(target: T, attrs: Attributes, ...children: Child[]): T
}

export let from: {
	new <K extends string>(name: K, attributes?: Attributes, ...children: Child[]): K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : HTMLElement

	<K extends string>(name: K, attributes?: Attributes, ...children: Child[]): K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : HTMLElement
}

export let fromSVG: {
	new <K extends string>(name: K, attributes?: Attributes, ...children: Child[]): K extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[K] : SVGElement

	<K extends string>(name: K, attributes?: Attributes, ...children: Child[]): K extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[K] : SVGElement
}

export let Div: {
	new (attributes?: Attributes, ...children: Child[]): HTMLElement

	prototype: HTMLElement
}

// -----------------------------------------------------------------------------

export type Child = Node | string

export interface Attributes {
	[type: string]: any
}

export interface Events {
	[type: string]: {
		<T extends Event = Event>(event?: T): void
	}
}
