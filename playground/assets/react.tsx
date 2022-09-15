import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Timeline, TimelineProps, TimelineTrack, TimelineTrackHeader } from 'packages:ReactTimeline/src/Timeline.js'

const root = ReactDOM.createRoot(document.getElementById('root')!)

function App() {
	return (
		<Timeline
			startTime="2022-01-01T00:00:00Z"
			endTime="2022-01-02T00:00:00Z"
			currentTime="2022-01-01T02:00:00Z"
		>
			<TimelineTrack>
				<TimelineTrackHeader>Awesome Blossom</TimelineTrackHeader>
			</TimelineTrack>
			<TimelineTrack>
				<TimelineTrackHeader>Oppossum</TimelineTrackHeader>
			</TimelineTrack>
		</Timeline>
	)
}

root.render(
	React.createElement(
		React.StrictMode,
		{},
		React.createElement(App)
	)
)
