import React from "react";
import { ICanvasContext, ICanvasState } from "../types/Reusables";


export function canvasReducer(state: ICanvasState, action: {type: string, payload: any}) {
	switch (action.type) {
		case 'increment':
			return state;
			break
		case 'decrement':
			return state;
			break
		default:
		    return state;
			break
	}
}

export const initialCanvasState: ICanvasState = {
    documents: [
        {
            selectedTool: 'text'
        }
    ]
}

export const CanvasContext = React.createContext<ICanvasContext>({
    state: initialCanvasState,
    dispatch: Function
})
