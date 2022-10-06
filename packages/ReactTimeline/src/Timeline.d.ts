import { RefAttributes, ForwardRefExoticComponent } from "react"

/** React Component returning the Custom Element. */
export declare let Timeline: ForwardRefExoticComponent<
	TimelineProps & RefAttributes<TimelineRef>
>

export type TimelineRef = Timeline | undefined

export interface TimelineProps {
	startTime: number | string | Date
	endTime: number | string | Date
	currentTime?: number | string | Date
	zoom?: number | string | Date
}

// -----------------------------------------------------------------------------

/** React Component returning the Custom Element. */
export declare let TimelineTrack: ForwardRefExoticComponent<
	TimelineTrackProps & RefAttributes<TimelineRef>
>

export interface TimelineTrackProps {
	content: any
}

// -----------------------------------------------------------------------------

export declare class Timeline extends HTMLElement {
	constructor(options?: TimelineOptions)
	connectedCallback(): void
	addTrack(options?: TimelineTrackOptions): TimelineTrack
	get tracks(): NodeListOf<TimelineTrack>
	get startTime(): number
	set startTime(startTime: number | string | Date)
	get endTime(): number
	set endTime(endTime: number | string | Date)
	get currentTime(): number
	set currentTime(currentTime: number | string | Date)
	get zoom(): number
	set zoom(zoom: number | string)
}

export interface TimelineOptions {
	startTime: number
	endTime: number
	currentTime: number
}

export declare class TimelineTrack extends HTMLElement {
	constructor(options?: TimelineTrackOptions)
	get events(): NodeList
	get tracks(): NodeList
	get content(): string
	set content(content: Node | string)
	get open(): boolean
	set open(open: any)
	addEvent(options?: TimelineEventOptions): TimelineEvent
	addTrack(options?: any): TimelineTrack
}

export interface TimelineTrackOptions {
	content?: Node | string
	open?: boolean
}

export declare class TimelineEvent extends HTMLElement {
	constructor(options?: TimelineEventOptions)
	get startTime(): number
	set startTime(startTime: number | string | Date)
	get endTime(): number
	set endTime(endTime: number | string | Date)
	get status(): string
	set status(status: string)
}

export interface TimelineEventOptions {
	startTime?: number | string | Date
	endTime?: number | string | Date
	status?: string
}
