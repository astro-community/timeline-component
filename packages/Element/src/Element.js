export let append = (target, ...children) => target.append(...children) || target

// export let handle = (target, events) => {
// 	for (let name in events) {
// 		target.addEventListener(name, events[name])
// 	}

// 	return target
// }

// export let emit = (target, type, options) => target.dispatchEvent(Object.assign(new Event(type), options))

export let assign = (target, attrs, ...children) => {
	for (let name in attrs) {
		target.setAttribute(name, attrs[name])
	}

	return append(target, ...children)
}

export function from(name, attributes = null, ...children) {
	return assign(document.createElement(name), attributes, ...children)
}

export function fromSVG(name, attributes = null, ...children) {
	return assign(document.createElementNS('http://www.w3.org/2000/svg', name), attributes, ...children)
}

export function Div(attributes = null, ...children) {
	let element = from('div', attributes, ...children)
	let { prototype } = new.target || HTMLElement

	if (prototype.constructor !== HTMLElement) Object.setPrototypeOf(element, prototype)

	return element
}

Div.prototype = HTMLElement.prototype
