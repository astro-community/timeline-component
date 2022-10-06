export type { TimelineOptions } from './Timeline.js'
export type { TimelineEventOptions } from './TimelineEvent.js'
export type { TimelineTrackOptions } from './TimelineTrack.js'

import { Timeline } from './Timeline.js'
export { Timeline }
export { TimelineEvent } from './TimelineEvent.js'
export { TimelineTrack } from './TimelineTrack.js'
import { default as cssText } from './style.css?raw'

Timeline.cssText = cssText
