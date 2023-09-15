import React from 'react'
import {v4} from 'uuid'
import {ICanvasChild, ICanvasContext, ICanvasState, TCanvasContextType} from '../types/Reusables'

export function canvasReducer(
	state: ICanvasState,
	action: {type: TCanvasContextType; payload: any}
) {
	switch (action.type) {
		case 'CHANGE_CANVAS_CHILD_COORDS':
			const childToUpdate = state.canvasChildren.find(
				(canvasChild: ICanvasChild) =>
					canvasChild.id === action.payload.id
			)
			return {
				...state,
				canvasChildren: [
					...state.canvasChildren.filter(
						(child: ICanvasChild) =>
							child.id !== action.payload.id
					),
					{...childToUpdate, x: action.payload.x, y: action.payload.y},
				],
			}
			break
		case 'CREATE_CANVAS_CHILD':
			return {
				...state,
				canvasChildren: [
					...state.canvasChildren,
					{...action.payload},
				],
			}
			break
		case 'DELETE_CANVAS_CHILD':
			return {
				...state,
				canvasChildren: [
					...state.canvasChildren.filter(
						(canvasChild: ICanvasChild) =>
							canvasChild.id !== action.payload
					),
				],
			}
			break
		case 'CHANGE_SELECTED_TOOL':
			return {
				...state,
				selectedTool: action.payload
			}
			break
		case 'SET_CANVAS':
			return action.payload; 
			break
		default:
			return state
			break
	}
}

export const initialCanvasState: ICanvasState = {
	selectedTool: 'text',
	canvasChildren: [
		// {
		// 	type: 'text',
		// 	id: v4(),
		// 	x: 10,
		// 	y: 10,
		// },
	],
}

export const CanvasContext = React.createContext<ICanvasContext>({
	state: initialCanvasState,
	dispatch: Function,
})
