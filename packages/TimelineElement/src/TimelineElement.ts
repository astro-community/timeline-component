import type { TimelineTrackOptions } from './TimelineTrackElement.js'

import * as Element from 'packages:Element/src/Element.js'

import { TimelineRulerElement } from './TimelineRulerElement.js'
import { TimelineTrackElement } from './TimelineTrackElement.js'
import { any, getTime, getZoom } from './shared.js'
import { defineElementInternals, useElementInternals } from 'packages:useElementInternals/src/useElementInternals.js'

export class TimelineElement extends HTMLElement {
	constructor(options = any as TimelineOptions) {
		options = Object(options)

		super()

		let { parts, shadowRoot, shadowStyleElement } = useElementInternals<TimelineInternals, TimelineElement>(this, {
			props: {
				startTime: 0,
				endTime: 0,
				currentTime: 0,

				zoom: 1,

				msPerPx: 6e4,
				rulerMsPerStep: 36e5,
			},
			parts: {
				header: {}
			} as TimelineInternals['parts'],
			onPropsChange(name, _oldValue, newValue) {
				switch (name) {
					case 'endTime': {
						this.setStyle({ '--TimelineClosing': newValue })

						this.parts.ruler.redraw()
					}

					case 'currentTime': {
						this.setStyle({ '--TimelineCurrent': newValue })

						break
					}

					case 'startTime': {
						this.setStyle({ '--TimelineOpening': newValue })

						this.parts.ruler.redraw()

						break
					}

					case 'msPerPx': {
						this.setStyle({ '--TimelineMsPerPx': newValue })

						break
					}

					case 'rulerMsPerStep': {
						this.setStyle({ '--TimelineRulerMsPerStep': newValue })

						// @ts-ignore
						parts.ruler.repaint()

						break
					}

					case 'zoom': {
						this.setStyle({ '--TimelineZoom': newValue })

						// @ts-ignore
						this.parts.ruler.repaint()

						break
					}
				}
			},
		})

		let headerParts = useElementInternals(parts.header).parts

		parts.workspace = new Element.from('div', { class: 'workspace is-flow-y' },
			new Element.from('div', { class: 'workspace-column has-track-headers' },
			parts.legend = new Element.from('div', { class: 'legend', part: 'legend' }),
				headerParts.tracks = new Element.from('div', { class: 'tracks', part: 'tracks' })
			),
			new Element.from('div', { class: 'workspace-column has-tracks is-flow-x' },
				parts.ruler = new TimelineRulerElement(),
				parts.tracks = new Element.from('div', { class: 'tracks', part: 'tracks' }),
				parts.playhead = new Element.from('div', { class: 'playhead', part: 'playhead' },
					new Element.fromSVG('svg', { class: 'playhead-handle', part: 'playhead-handle', viewBox: '0 0 2 1' },
						new Element.fromSVG('path', { d: 'M 0,0 L 2,0 L 1,1' })
					),
					new Element.from('div', { class: 'playhead-line', part: 'playhead-line' })
				)
			)
		)

		shadowStyleElement.textContent = (this.constructor as typeof TimelineElement).cssText

		shadowRoot.prepend(shadowStyleElement, parts.workspace)

		this.endTime = options.endTime!
		this.currentTime = options.currentTime!
		this.startTime = options.startTime!
	}

	connectedCallback() {
		let { parts } = useElementInternals(this) as any as {
			parts: {
				ruler: TimelineRulerElement
			}
		}

		parts.ruler.repaint()
	}

	addTrack(options = any as TimelineTrackOptions) {
		let track = new TimelineTrackElement(options)
		let { parts } = useElementInternals(this)

		useElementInternals(parts.header).parts.tracks.append(useElementInternals(track).parts.header)

		parts.tracks.append(track)

		return track
	}

	removeTrack(track: TimelineTrackElement) {
		let { parts } = useElementInternals(this)

		useElementInternals(parts.header).parts.tracks.removeChild(useElementInternals(track).parts.header)

		parts.tracks.removeChild(track)

		return track
	}

	removeTracks() {
		for (let track of this.tracks) {
			this.removeTrack(track)
		}
	}

	get tracks(): NodeListOf<TimelineTrackElement> {
		let { parts } = useElementInternals(this)

		return parts.tracks.childNodes as NodeListOf<TimelineTrackElement>
	}

	set tracks(tracks: any) {
		if (Array.isArray(tracks)) {
			this.removeTracks()

			for (let track of tracks as TimelineTrackOptions[]) {
				this.addTrack(track)
			}
		}
	}

	// @ts-expect-error
	get startTime(): number

	// @ts-expect-error
	set startTime(startTime: number | string | Date)

	// @ts-expect-error
	get endTime(): number

	// @ts-expect-error
	set endTime(endTime: number | string | Date)

	// @ts-expect-error
	get currentTime(): number

	// @ts-expect-error
	set currentTime(currentTime: number | string | Date)

	// @ts-expect-error
	get zoom(): number

	// @ts-expect-error
	set zoom(zoom: number | string)

	declare static cssText: string
}

defineElementInternals(TimelineElement, {
	startTime: getTime,
	endTime: getTime,
	currentTime: getTime,
	zoom: getZoom,
})

export interface TimelineOptions {
	startTime: number
	endTime: number
	currentTime: number
}

interface TimelineInternals {
	props: {
		startTime: number
		endTime: number
		currentTime: number

		zoom: number

		msPerPx: number
		rulerMsPerStep: number
	}

	parts: {
		header: HTMLDivElement
		ruler: TimelineRulerElement
	}
}
