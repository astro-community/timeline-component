import * as Element from 'packages:Element/src/Element.js'
import { defineElementInternals, useElementInternals } from 'packages:useElementInternals/src/useElementInternals.js'

import { TimelineTrackHeaderElement } from './TimelineTrackHeader.js'
import { TimelineEvent, TimelineEventOptions } from './TimelineEvent.js'
import { any } from './shared.js'

export class TimelineTrack extends Element.Div {
	constructor(options = any as TimelineTrackOptions) {
		options = Object(options)

		super()

		let { props, parts, setProps } = useElementInternals<TimelineTrackInternals, TimelineTrack>(this, {
			props: {
				header: new DocumentFragment(),
				open: true,
			},

			onPropsChange(name, _oldValue, newValue) {
				switch (name) {
					case 'header': {
						useElementInternals(parts.header).parts.content.replaceChildren(newValue)

						break
					}

					case 'open': {
						this.host.classList.toggle('open', newValue)
						this.host.part.toggle('open', newValue)

						parts.header.classList.toggle('open', newValue)

						break
					}
				}
			}
		})

		parts.header = new TimelineTrackHeaderElement()

		useElementInternals(parts.header).parts.toggle.addEventListener('click', () => {
			setProps({ open: !props.open })
		})

		Element.assign(this, { class: 'track-fragment', part: 'track-container' },
			parts.content = new Element.from('div', { class: 'track', part: 'track' }),
			parts.tracks = new Element.from('div', { class: 'tracks', part: 'tracks' })
		)

		this.header = options.header!
		this.open = options.open!
	}

	get events(): NodeList {
		return useElementInternals<TimelineTrackInternals>(this).parts.content.childNodes
	}

	get tracks(): NodeList {
		return useElementInternals<TimelineTrackInternals>(this).parts.tracks.childNodes
	}

	addEvent(options = any as TimelineEventOptions): TimelineEvent {
		return useElementInternals<TimelineTrackInternals>(this).parts.content.appendChild(new TimelineEvent(options))
	}

	addTrack(options = any): TimelineTrack {
		let track = new TimelineTrack(options)
		let { parts } = useElementInternals<TimelineTrackInternals>(this)

		this.classList.add('has-children')
		this.part.add('has-children')

		parts.header.classList.add('has-children')
		parts.header.part.add('has-children')

		useElementInternals(parts.header).parts.tracks.append(useElementInternals(track).parts.header)

		parts.tracks.append(track)

		return track
	}

	// @ts-expect-error
	get open(): boolean

	// @ts-expect-error
	set open(open: any)

	// @ts-expect-error
	get header(): DocumentFragment

	// @ts-expect-error
	set header(header: Node | string)
}

defineElementInternals(TimelineTrack, {
	open: Boolean,
	header(value: any) {
		return value
	},
})

export interface TimelineTrackOptions {
	header?: Node | string
	open?: boolean
}

interface TimelineTrackInternals {
	props: {
		header: Node | string
		open: boolean
	}
}
