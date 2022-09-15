import { TimelineElement } from './elements.js'
export { TimelineElement }
export { TimelineTrackElement } from './elements.js'
export { TimelineEventElement } from './elements.js'

const name = new URL(import.meta.url).searchParams.get('as') || 'web-timeline'

if (!customElements.get(name)) {
	customElements.define(name, TimelineElement)
}
