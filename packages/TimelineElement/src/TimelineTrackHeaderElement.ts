import { useElementInternals } from 'packages:useElementInternals/src/useElementInternals.js'
import * as Element from 'packages:Element/src/Element.js'

export class TimelineTrackHeaderElement extends Element.Div {
	constructor() {
		super()

		let { parts } = useElementInternals(this)

		Element.assign(this, { class: 'track-fragment', part: 'track-container' })
		Element.append(this,
			new Element.from('div', { class: 'track-header', part: 'track-header' },
				parts.toggle = new Element.from('button', { type: 'button', class: 'toggle', part: 'toggle' },
					new Element.fromSVG('svg', { class: 'toggle-symbol', part: 'toggle-symbol', viewBox: '0 0 24 24' },
						new Element.fromSVG('path', { d: 'M9.29 15.88 13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42Z' })
					)
				),
				parts.content = new Element.from('div')
			),
			parts.tracks = new Element.from('div', { class: 'tracks', part: 'tracks' })
		)
	}
}
