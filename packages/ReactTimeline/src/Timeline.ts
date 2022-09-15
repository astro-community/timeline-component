import React from 'react'
import { Provider, useState } from './state.js'
import { TimelineElement } from 'packages:TimelineElement/src/TimelineElement.js'
import { createContextState } from 'packages:ReactTimeline/src/createContextState.js'
import { any } from 'packages:TimelineElement/src/shared.js'
export { TimelineElement }
export { TimelineTrackElement } from 'packages:TimelineElement/src/TimelineTrackElement'
export { TimelineEventElement } from 'packages:TimelineElement/src/TimelineEventElement'

/** Name of the Custom Element. */
let name = 'web-timeline'

if (!customElements.get(name)) {
	customElements.define(name, TimelineElement)
}

export function Timeline(props: React.PropsWithChildren<TimelineProps>) {
	return React.createElement(TimelineProvider, {}, React.createElement(TimelineContent, props))
}

function TimelineContent(props: React.PropsWithChildren<TimelineProps>) {
	let [ state, setState ] = useTimelineState()
	let ref = useCallbackRef((node: TimelineElement) => {
		if (node) {
			let tracks = [ ...state.tracks ].map(
				(track) => {
					let header = new DocumentFragment

					if (typeof track.header === 'string') {
						header.append(track.header)
					} else {
						header.append(...track.header.childNodes)
					}

					return { open: false, header }
				}
			)

			node.tracks = tracks
		}
	})

	return React.createElement(TimelineComponent, {
		...props,
		ref,
	})
}

/** React Component returning the Custom Element. */
export let TimelineComponent = createComponent<TimelineElement, TimelineProps>('web-timeline', {
	tracks: 1,
	startTime: 1,
	endTime: 1,
	currentTime: 1,
	zoom: 1,
})

export interface TimelineProps {
	startTime: number | string | Date
	endTime: number | string | Date
	currentTime: number | string | Date
	zoom?: number
}

const [ useTimelineState, TimelineProvider ] = createContextState({
	tracks: new Set<{
		header: Node | string
	}>
})

// -----------------------------------------------------------------------------

export function TimelineTrack(props: React.PropsWithChildren<TimelineTrackProps>) {
	return React.createElement(TimelineTrackProvider, {},
		React.createElement(TimelineTrackContent, props)
	)
}

function TimelineTrackContent(props: React.PropsWithChildren<TimelineTrackProps>) {
	const [ timelineState, setTimelineState ] = useTimelineState()
	const [ timelineTrackState, setTimelineTrackState ] = useTimelineTrackState()
	const ref = useCallbackRef((node: HTMLElement) => {
		console.log(1, node)
		// let header = new DocumentFragment()

		// if (node) header.append(...node.childNodes)

		// setTimelineTrackState({
		// 	...timelineTrackState,
		// 	header
		// })
	})

	return React.createElement(TimelineTrackProvider, {},
		React.cloneElement(props.children as JSX.Element, { ref })
	)
}

export interface TimelineTrackProps {}

const [ useTimelineTrackState, TimelineTrackProvider ] = createContextState({
	open: false,
	header: new DocumentFragment
})

// -----------------------------------------------------------------------------

export const TimelineTrackHeader = (props: TimelineTrackHeaderProps) => {
	const ref = useCallbackRef((node: HTMLElement) => {
		let header = new DocumentFragment

		if (node) header.append(...node.childNodes)

		// pass header up to the current track
	})

	return React.createElement('noscript', { ref }, props.children)
}

export type TimelineTrackHeaderProps = React.PropsWithChildren<{}>

// -----------------------------------------------------------------------------

function createComponent<T, P = {}>(name: string, props: {}) {
	let dom = Object.assign(Object.create(null), props)

	let Component = React.forwardRef<T, React.PropsWithChildren<P>>((props, ref) => {
		/** Properties to add to the Custom Element. */
		let kDOM = {} as Record<string, any>

		/** Attributes to add to the Custom Element. */
		let kJSX = {
			ref(current: any) {
				if (current) for (let k in kDOM) current[k] = kDOM[k]

				if (typeof ref === 'function') ref(current)
				else if (ref) ref.current = current
			}
		}

		// push props to either properties or attributes
		for (let k in props) {
			(k in dom ? kDOM : kJSX)[k] = props[k as keyof P]
		}

		// return the created Custom Element
		return React.createElement(name, kJSX, props.children)
	})

	// assign the React Component display name as the Custom Element name
	Component.displayName = name

	return Component
}

// ....

function useCallbackRef<T extends anyfunction>(callback: T | undefined): T {
	const callbackRef = React.useRef(callback)

	React.useEffect(() => {
		callbackRef.current = callback
	})

	return React.useMemo(
		() => (
			(...args) => callbackRef.current?.(...args)
		) as T,
		[]
	)
}

type anyfunction<A = any, R = any> = (...args: A[]) => R
