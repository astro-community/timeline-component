import React, { createContext, createElement, useContext, useState } from 'react'

export function createContextState<S = any>(initialState: S) {
	const context = createContext(initialState);

	return [
		() => useContext(context) as any as [S, React.Dispatch<React.SetStateAction<S>>],
		function Provider(props: React.PropsWithChildren) {
			return createElement(context.Provider, {
				value: useState(initialState) as any
			}, props.children)
		}
	] as const
}
