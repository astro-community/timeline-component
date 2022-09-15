import { defineElementInternals, useElementInternals } from 'packages:useElementInternals/src/useElementInternals.js'
import * as Element from 'packages:Element/src/Element.js'
import { any, getStatus, getString, getTime, getTimeISO } from './shared.js'

export class TimelineEventElement extends Element.Div {
	constructor(options = any as TimelineEventOptions) {
		options = Object(options)

		super()

		let content = new DocumentFragment()
		let observe = new MutationObserver(() => {
			observe.disconnect()
			ints.parts.content.replaceChildren(content)
			observe.observe(content, { childList: true })
		})
		observe.observe(content, { childList: true })

		let ints = useElementInternals<TimelineEventInternals, TimelineEventElement>(this, {
			props: {
				startTime: 0,
				endTime: 0,
				status: 'normal',
				get content() {
					return content
				},
				set content(newContent) {
					ints.parts.content.replaceChildren(newContent)
				},
			},
			onPropsChange(name, oldValue, newValue) {
				switch (name) {
					case 'startTime': {
						ints.setStyle({ '--TimelineEventOpening': newValue })

						break
					}

					case 'endTime': {
						ints.setStyle({ '--TimelineEventClosing': newValue })

						break
					}

					case 'status': {
						this.host.classList.toggle('status-' + oldValue, false)
						this.host.classList.toggle('status-' + newValue, true)
						this.host.part.toggle('status-' + oldValue, false)
						this.host.part.toggle('status-' + newValue, true)

						break
					}

					// case 'title': {
					// 	ints.parts.title.replaceChildren(newValue)

					// 	break
					// }

					// case 'subtitle': {
					// 	ints.parts.subtitle.replaceChildren(newValue)

					// 	break
					// }
				}

				switch (name) {
					case 'startTime':
					case 'endTime': {
						// if (!options.subtitle) {
						// 	this.host.subtitle = `${
						// 		getTimeISO(ints.props.startTime, '{hh}:{mm}:{ss}')
						// 	} - ${
						// 		getTimeISO(ints.props.endTime, '{hh}:{mm}:{ss}')
						// 	}`
						// }

						break
					}
				}
			}
		})

		// generate a shadow slot element
		ints.shadowSlotElement

		ints.parts.content = new Element.from('div', { class: 'event-content', part: 'event-content' })

		Element.assign(this, { class: 'event', part: 'event' })

		this.append(ints.parts.content)

		this.endTime = options.endTime!
		this.startTime = options.startTime!
		this.status = options.status!
		this.content = options.content!
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
	get status(): string

	// @ts-expect-error
	set status(status: string)

	// @ts-expect-error
	get content(): DocumentFragment

	// @ts-expect-error
	set content(status: Node | string)
}

defineElementInternals(TimelineEventElement, {
	startTime: getTime,
	endTime: getTime,
	status: getString,
	content(value: any) {
		return value
	},
})

export interface TimelineEventOptions {
	startTime?: number | string | Date
	endTime?: number | string | Date
	status?: string
	content?: Node | string
}

interface TimelineEventInternals {
	parts: {
		content: HTMLElement
	}

	props: {
		content: DocumentFragment
		startTime: number
		endTime: number

		status: string
	}
}
