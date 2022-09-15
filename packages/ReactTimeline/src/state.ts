import { createContextState } from "packages:ReactTimeline/src/createContextState.js";

const [ useState, Provider ] = createContextState({
	tracks: [] as any[]
});

export { useState, Provider }
