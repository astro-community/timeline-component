export type { TimelineOptions } from './TimelineElement.js'
export type { TimelineEventOptions } from './TimelineEventElement.js'
export type { TimelineTrackOptions } from './TimelineTrackElement.js'

import { TimelineElement } from './TimelineElement.js'
export { TimelineElement }
export { TimelineEventElement } from './TimelineEventElement.js'
export { TimelineTrackElement } from './TimelineTrackElement.js'
import { default as cssText } from './style.css?raw'

TimelineElement.cssText = cssText
