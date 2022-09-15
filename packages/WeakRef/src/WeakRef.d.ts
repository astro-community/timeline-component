interface WeakRef<T extends object, V extends object, A extends unknown[] = unknown[]> {
	(target?: T, ...args: A): V
}

interface WeakRefConstructor {
	new <T extends object = object, V extends object = object, A extends unknown[] = unknown[]>(
		set: (target: T, ...args: A) => V
	): WeakRef<T, V, A>

	readonly prototype: WeakRef<object, object, unknown[]>
}

export declare var WeakRef: WeakRefConstructor
