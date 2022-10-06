import { Timeline } from './elements.js'
export { Timeline }
export { TimelineTrack } from './elements.js'
export { TimelineEvent } from './elements.js'

const name = new URL(import.meta.url).searchParams.get('as') || 'web-timeline'

if (!customElements.get(name)) {
	customElements.define(name, Timeline)
}
