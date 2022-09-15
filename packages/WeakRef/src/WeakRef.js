export function WeakRef(
	set = (_target, value) => Object(value)
) {
	let map = new WeakMap

	return (target, ...args) => {
		let get = map.get(target)

		if (!get) map.set(target, get = set(target, ...args))

		return get
	}
}
