import { TimelineElement } from 'packages:TimelineElement/src/module.js'

void TimelineElement

/** Timeline element */
const timeline = globalThis.timeline = document.querySelector('web-timeline') as TimelineElement

// Update timeline element start, end, and current times
Object.assign(timeline, {
	startTime: '2022-01-01T00:00:00Z',
	endTime: '2022-01-02T00:00:00Z',
	currentTime: '2022-01-01T02:00:00Z',
})

// Use "Mission 1" track
let track1 = timeline.addTrack({ header: 'Mission 1' })
{
	track1.addEvent({
		content: 'Hello',
		startTime: '2022-01-01T01:00:00Z',
		endTime: '2022-01-01T08:00:00Z',
	})

	// Use "Status" track
	let track11 = track1.addTrack({ header: 'Status' })
	{
		track11.addEvent({ content: 'Status A', startTime: '2022-01-01T01:00:00Z', endTime: '2022-01-01T05:00:00Z' })

		// Use "Window 1" track
		let track111 = track11.addTrack({ header: 'Window 1' })
		{
			track111.addEvent({ content: 'Status A.1', startTime: '2022-01-01T01:00:00Z', endTime: '2022-01-01T03:00:00Z' })
		}

		// Use "Window 2" track
		let track112 = track11.addTrack({ header: 'Window 2' })
		{
			track112.addEvent({ content: 'Status A.2', startTime: '2022-01-01T03:00:00Z', endTime: '2022-01-01T05:00:00Z' })
		}
	}

	// Use "Beams" track
	let track12 = track1.addTrack({ header: 'Beams' })
	{
		track12.addEvent({ content: 'Beam B', startTime: '2022-01-01T03:00:00Z', endTime: '2022-01-01T06:00:00Z' })
		track12.addEvent({ content: 'Beam C', startTime: '2022-01-01T06:00:00Z', endTime: '2022-01-01T08:00:00Z' })
	}

	// Use "Mission 2" track
	let track2 = timeline.addTrack({ header: 'Mission 2' })
	{
		track2.addEvent({ content: 'Mission 2', startTime: '2021-12-31T00:00:00Z', endTime: '2022-01-01T04:00:00Z' })

		// Use "Status" track
		let track21 = track2.addTrack({ header: 'Status' })
		{
			track21.addEvent({ content: 'Status A', startTime: '2022-31-12T01:00:00Z', endTime: '2022-01-01T03:00:00Z' })
		}

		// Use "Beams" track
		let track22 = track2.addTrack({ header: 'Beams' })
		{
			track22.addEvent({ content: 'Beam B', startTime: '2022-01-01T03:00:00Z', endTime: '2022-01-01T04:00:00Z' })
		}
	}
}

/** Range for managing zoom. */
const range = document.querySelector<HTMLInputElement>('input[type="range"]')!

range.addEventListener('input', () => {
	timeline.zoom = range.value
})

// TypeScript declaration to support `globalThis.timeline`
declare global {
	var timeline: TimelineElement
}
