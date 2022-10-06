export declare class Timeline extends HTMLElement {
	constructor(options?: TimelineOptions)

	addTrack(options?: TimelineTrackOptions): TimelineTrack

	get tracks(): NodeListOf<TimelineTrack>

	get startTime(): number
	set startTime(startTime: number | string | Date)

	get endTime(): number
	set endTime(endTime: number | string | Date)

	get currentTime(): number
	set currentTime(currentTime: number | string | Date)

	get zoom(): number
	set zoom(zoom: number | string | Date)
}

export interface TimelineOptions {
	startTime: number | string | Date
	endTime: number | string | Date
	currentTime?: number | string | Date
	zoom?: number | string | Date
}

export declare class TimelineTrack extends HTMLElement {
	constructor(options?: TimelineTrackOptions)

	get events(): NodeList
	get tracks(): NodeList

	get title(): string
	set title(title: string)

	get open(): boolean
	set open(open: boolean)

	addEvent(options?: TimelineEventOptions): TimelineEvent
	addTrack(options?: TimelineTrackOptions): TimelineTrack
}

export interface TimelineTrackOptions {
	title: string
	open?: boolean
}

export declare class TimelineEvent extends HTMLElement {
	constructor(options?: TimelineEventOptions)

	get startTime(): number
	set startTime(startTime: number | string | Date)

	get endTime(): number
	set endTime(endTime: number | string | Date)

	get title(): string
	set title(title: number | string | Date)

	get subtitle(): string
	set subtitle(subtitle: number | string | Date)

	get status(): TimelineEventStatus
	set status(status: TimelineEventStatus)
}

export interface TimelineEventOptions {
	startTime: number | string | Date
	endTime: number | string | Date
	title: string
	subtitle?: string
	status?: TimelineEventStatus
}

export type TimelineEventStatus = "caution" | "critical" | "serious" | "standby" | (string & Record<never, never>)
