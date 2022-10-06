import { Timeline } from './elements.js'

const name = new URL(
	// @ts-ignore
	document.currentScript.src
).searchParams.get('as') || 'web-timeline'

if (!customElements.get(name)) {
	customElements.define(name, Timeline)
}
