import * as Element from 'packages:Element/src/Element.js'
import { useElementInternals } from 'packages:useElementInternals/src/useElementInternals.js'

import { format, steppers } from './shared.js'

export class TimelineRulerElement extends Element.Div {
	constructor() {
		super({ class: 'ruler', part: 'ruler' })

		useElementInternals<TimelineRulerInternals>(this, {
			props: {
				stepper: {
					divide: 0,
					format: () => '',
				},
			}
		})

		this.repaint()
	}

	repaint() {
		let host = this as any as TimelineRulerElement & { constructor: typeof TimelineRulerElement }
		let base = (host.getRootNode() as ShadowRoot)?.host as HTMLElement

		if (!base || host === base) return

		let hostInternals = useElementInternals<TimelineRulerInternals>(host)
		let baseInternals = useElementInternals<TimelineInternals>(base)

		let oldStepper = hostInternals.props.stepper
		let newStepper = steppers.find(
			stepper => stepper.divide / baseInternals.props.msPerPx * baseInternals.props.zoom >= 60
		) || steppers.at(-1)!

		if (oldStepper !== newStepper) {
			hostInternals.props.stepper = newStepper

			host.redraw()
		}
	}

	redraw() {
		let host = this as this & { constructor: typeof TimelineRulerElement }
		let base = (host.getRootNode() as ShadowRoot)?.host as HTMLElement

		if (!base || host === base) return

		let hostInternals = useElementInternals(host)
		let baseInternals = useElementInternals(base)
		let { stepper } = hostInternals.props

		baseInternals.setProps({ rulerMsPerStep: stepper.divide })

		let rulerSteps = []

		for (let currentTime: number = baseInternals.props.startTime, closingTime: number = baseInternals.props.endTime; currentTime < closingTime; currentTime += stepper.divide) {
			rulerSteps.push(
				new Element.from('div', {
					class: 'ruler-step',
					part: 'ruler-step',
				}, stepper.format(currentTime))
			)
		}

		host.replaceChildren(...rulerSteps)
	}
}

interface TimelineRulerInternals {
	props: {
		stepper: Stepper
	}
}

interface TimelineInternals {
	props: {
		msPerPx: number
		zoom: number
	}
}

interface Stepper {
	divide: number;
	format: {
		(time: number): string
	}
}
