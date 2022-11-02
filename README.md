# Timeline Component

The **Timeline Component** lets you represent a sequence of tracks and events over a time span.

![Screenshot](/playground/assets/screenshot.png)

[![Open in StackBlitz][stackblitz-img]][stackblitz-url]

```html
<web-timeline></web-timeline>
```

The **Timeline Component** is controllable through an imperative API.

```html
<script>

const timeline = document.querySelector('web-timeline')

// set the start time to July 4th, 2023 (GMT)
timeline.startTime = '2023-07-04T00:00Z'

// set the current time to the middle of the same day
timeline.currentTime = '2023-07-04T12:00Z'

// set the end time to July 5th; the beginning of the next day.
timeline.endTime = '2023-07-05T00:00Z'

</script>
```

## Installation

The component is available from the **npm** registry:

```shell
npm install @astropub/timeline-component
```

<br />

The `<web-timeline>` component can be added with classic JavaScript:

```html
<script src="https://unpkg.com/@astropub/timeline-component/lib/classic"></script>
```

The `<web-timeline>` component can also be added within JavaScript modules:

```html
<script type="module">

import 'https://unpkg.com/@astropub/timeline-component/lib/module'

</script>
```

<br />

The exact import path may differ, depending on the project and tooling:

```html
<script type="module">

import '@astropub/timeline-component/lib/module'

</script>
```

<br />

### Astro-Themed Timeline Component

An **[Astro](https://github.com/RocketCommunicationsInc/astro)** themed `<web-timeline>` component can be added with classic JavaScript or JavaScript modules:

```html
<script src="https://unpkg.com/@astropub/timeline-component/lib/astro/classic"></script>
```

```html
<script type="module">

import 'https://unpkg.com/@astropub/timeline-component/lib/astro/module'

</script>
```

<br />

The `<web-timeline>` element itself can also be referenced from the JavaScript module:

```html
<script type="module">

import { Timeline } from 'https://unpkg.com/@astropub/timeline-component/lib/astro/module'

</script>
```

## Setting up Tracks

To add a track to the timeline, use the `addTrack` method:

```js
const track = timeline.addTrack({
  header: 'My Track'
})
```

## Setting up Events

To add an event to a `TimelineTrack`, use the `addEvent` method:

```js
const event = track.addEvent({
  content: 'My Event',
  startTime: '2022-07-04T05:00Z',
  endTime: '2022-07-04T08:00Z',
})
```

## Usage with Angular

The Timeline component offers public methods that can be executed.
These methods are can be executed by setting a [`ViewChild` decorator](https://angular.io/api/core/ViewChild) on the element.

```js
import { Timeline } from '@astropub/timeline-component/lib/elements.js'
import { Component, ElementRef, ViewChild, Input, OnChanges } from '@angular/core'

if (!customElements.get('web-timeline')) {
  customElements.define('web-timeline', Timeline)
}

@Component({
  selector: 'app-timeline',
  template: `<web-timeline #timeline></web-timeline>`,
})
export class TimelineComponent implements OnChanges {
  @ViewChild('timeline') timelineComponent: ElementRef
}
```

---

## API

- [Timeline](#timeline)
- [TimelineTrack](#timelinetrack)
- [TimelineEvent](#timelineevent)

### Timeline

The `Timeline` interface represents the timeline and all of its tracks and events.

```js
import { Timeline } from '@astropub/timeline-component/lib/astro/module'

const timeline = new Timeline({
  startTime: '2023-07-04T00:00Z',
  currentTime: '2023-07-04T08:00Z',
  endTime: '2023-07-05T00:00Z'
})
```

#### Timeline.startTime

The `startTime` property represents the starting point of the timeline.

This value can be provided as a number, as an epoch time, or as a `Date` object.

```js
// set the start time to July 4th, 2023 (GMT)

timeline.startTime = 1688428800000
timeline.startTime = '2023-07-04T00:00Z'
timeline.startTime = new Date('2023-07-04T00:00Z')
```

#### Timeline.currentTime

The `currentTime` property represents the current point in the timeline.

This value can be provided as a number, as an epoch time, or as a `Date` object.

```js
// set the start time to noon of July 4th, 2023 (GMT)

timeline.currentTime = 1688472000000
timeline.currentTime = '2023-07-04T12:00Z'
timeline.currentTime = new Date('2023-07-04T12:00Z')
```

#### Timeline.endTime

The `endTime` property represents the ending point of the timeline.

This value can be provided as a number, as an epoch time, or as a `Date` object.

```js
// set the end time to July 5th, 2023 (GMT)

timeline.endTime = 1688515200000
timeline.endTime = '2023-07-05T00:00Z'
timeline.endTime = new Date('2023-07-05T00:00Z')
```

#### Timeline.zoom

The `zoom` property represents the length at which time appears in the timeline.

This value can be provided as a number.

```js
// zoom out to 1/100th the current size
timeline.zoom = 0.01

// zoom in to 100x the current size
timeline.zoom = 1000
```

#### Timeline.tracks

The `tracks` property represents the list of tracks within the timeline.

The `tracks` property returns the DOM [children](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) representing all of the tracks.
When set as an [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), its value replaces all of the current tracks.

```js
const firstTrack = timeline.tracks[0]
```

#### Timeline.addTrack

The `addTrack` method adds a new track to the given timeline.

```js
timeline.addTrack({
  header: 'My Track',
  open: true,
})
```

The `addTrack` method accepts the following options:

- The `header` property defines the header content for the given track.
- The `open` property determines whether the track should display expanded or collapsed.

---

### TimelineTrack

The `TimelineTrack` interface represents a grouping for related events along a timeline.
Tracks contain events, and they can also container other tracks; subtracks.

```js
track.header = 'My Track'

track.addEvent({
  content: 'My Event",
  startTime: '2022-07-04T05:00Z',
  endTime: '2022-07-04T08:00Z',
})
```

#### TimelineTrack.header

The `header` property represents the header content for the given track.
It returns the DOM [Element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) container for the track header.
When set, its value is appended to the track header.

```js
track.header = 'My Track'

track.header.classList.add('my-track')
```

#### TimelineTrack.tracks

The `tracks` property represents the list of subtracks within a given track.

The `tracks` property returns the DOM [children](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) representing all of the subtracks.
When set as an [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), its value replaces all of the current tracks.

```js
const firstSubTrack = track.tracks[0]
```

#### TimelineTrack.open

The `open` property represents whether the track is expanded or collapsed.

The `open` property returns `true` or `false`.
When set as an [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean), it will expand or collapse the track if it contains subtracks.

#### TimelineTrack.addEvent

The `addEvent` method adds a new event to the given track.

```js
track.addEvent({
  content: 'My Event',
  startTime: '2022-07-04T05:00Z',
  endTime: '2022-07-04T08:00Z',
  status: 'standby',
})
```

The `addEvent` method accepts the following options:

- The `content` property defines the content for the given event.
- The `startTime` property determines the starting point of the given event.
- The `endTime` property determines the ending point of the given event.

#### TimelineTrack.addTrack

The `addTrack` method adds a new subtrack to the given track.

```js
track.addTrack({
  header: 'My Sub-Track',
  open: true,
})
```

The `addTrack` method accepts the following options:

- The `header` property defines the header content for the given track.
- The `open` property determines whether the track should display expanded or collapsed.

---

### TimelineEvent

The `TimelineEvent` interface represents an event within a given track.

#### TimelineEvent.startTime

The `startTime` property represents the starting point of a given event.

This value can be provided as a number, as an epoch time, or as a `Date` object.

```js
// set the start time to 8 hours into July 4th, 2023 (GMT)

event.startTime = 1688457600000
event.startTime = '2023-07-04T08:00Z'
event.startTime = new Date('2023-07-04T08:00Z')
```

#### TimelineEvent.endTime

The `endTime` property represents the ending point of a given event.

This value can be provided as a number, as an epoch time, or as a `Date` object.

```js
// set the end time to 12 hours into July 4th, 2023 (GMT)

event.endTime = 1688472000000
event.endTime = '2023-07-04T12:00Z'
event.endTime = new Date('2023-07-04T12:00Z')
```

#### TimelineEvent.content

The `content` property represents the content of the event.
It returns the DOM [Element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) container.
When set, its value is appended to the event.

```js
event.content = 'My Event'

event.content.classList.add('my-event')
```

---

### Defining Styles

The `track` part can be used to style the outermost area of tracks.

```css
web-timeline::part(track) {
  background-color: Indigo;
}
```

The `track-header` part can be used to style the header area of tracks.

```css
web-timeline::part(track-header) {
  background-color: Indigo;
}
```

The `event` part can be used to style the outermost area of events.

```css
web-timeline::part(event) {
  background-color: Indigo;
}
```

<br />

### Defining HTML Content

The `content` property of an `event` can be used to target or replace the content of a given event.

```js
const template = document.createElement('template')

template.innerHTML = 'This is <strong>my event</strong>'

event.content = template.content
```

[stackblitz-img]: https://img.shields.io/badge/-Open%20in%20Stackblitz-%231374EF?color=%23444&labelColor=%231374EF&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjEwIDggMTIgMTgiIGhlaWdodD0iMTgiIGZpbGw9IiNGRkYiPjxwYXRoIGQ9Ik0xMCAxNy42aDUuMmwtMyA3LjRMMjIgMTQuNGgtNS4ybDMtNy40TDEwIDE3LjZaIi8+PC9zdmc+&style=for-the-badge
[stackblitz-url]: https://stackblitz.com/github/jonathantneal/timeline-web-component?file=README.md&initialpath=/themed/
