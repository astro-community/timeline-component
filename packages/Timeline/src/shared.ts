export let any = null as any

export let minmax = (min = 0, mid = 0, max = 0) => Math.min(max, Math.max(min, mid))

export let getTime = (time = 0 as any) => new Date(time).getTime() || 0

export let getString = (value: any) => value == null ? '' : String(value)

export let getZoom = (value: any) => Number(value) || 1

export let getTimeISO = (time = 0 as any, text = any) => {
	let isoText = new Date(getTime(time)).toISOString()
	let isoParts = {
		YYYY: isoText.slice(0, 4),
		MM: isoText.slice(5, 7),
		DD: isoText.slice(8, 10),
		hh: isoText.slice(11, 13),
		mm: isoText.slice(14, 16),
		ss: isoText.slice(17, 19),
		ms: isoText.slice(20, 24),
	} as {
		[part: string]: string
	}

	return String(text).replace(
		/\{([^}]+)\}/g,
		($0, $1) => isoParts[$1] || $0
	)
}

export let getStatus = (status: any) => {
	status = String(status).toLowerCase()

	if (status !== 'caution' && status !== 'critical' && status !== 'serious' && status !== 'standby') {
		status = 'normal'
	}

	return status
}

export let format = {
	MMYYYY: (divide: number) => ({ divide, format: (time: number) => getTimeISO(time, `{MM}/{YYYY}`) }),
	MMDD: (divide: number) => ({ divide, format: (time: number) => getTimeISO(time, `{MM}/{DD}`) }),
	hhmm: (divide: number) => ({ divide, format: (time: number) => getTimeISO(time, `{hh}:{mm}`) }),
	mmss: (divide: number) => ({ divide, format: (time: number) => getTimeISO(time, `{mm}:{ss}`) }),
	ssms: (divide: number) => ({ divide, format: (time: number) => getTimeISO(time, `{ss}:{ms}`) }),
}

export let steppers = [
	format.ssms(100),
	format.ssms(250),
	format.mmss(1e3),
	format.mmss(5e3),
	format.mmss(10e3),
	format.mmss(20e3),
	format.mmss(30e3),
	format.hhmm(60e3),
	format.hhmm(60e3),
	format.hhmm(60e3 * 2),
	format.hhmm(60e3 * 5),
	format.hhmm(60e3 * 10),
	format.hhmm(60e3 * 20),
	format.hhmm(60e3 * 30),
	format.hhmm(60e3 * 60),
	format.hhmm(60e3 * 60 * 2),
	format.hhmm(60e3 * 60 * 3),
	format.hhmm(60e3 * 60 * 6),
	format.hhmm(60e3 * 60 * 12),
	format.MMDD(60e3 * 60 * 24),
	format.MMDD(60e3 * 60 * 24 * 7),
	format.MMYYYY(60e3 * 60 * 24 * 365 / (12 + 1 / 12)),
]
