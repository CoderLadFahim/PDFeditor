import React from 'react'
import {
	ICanvasChild,
	ICanvasContext,
	ICanvasState,
	TCanvasContextActionType,
} from '../types/Reusables'

export function canvasReducer(
	state: ICanvasState,
	action: {type: TCanvasContextActionType; payload: any}
) {
	switch (action.type) {
		case 'CHANGE_CANVAS_CHILD_COORDS':
			return {
				...state,
				canvasChildren: state.canvasChildren.map((canvasChild) =>
					canvasChild.id !== action.payload.id
						? canvasChild
						: {
								...canvasChild,
								x: action.payload.x,
								y: action.payload.y,
						  }
				),
			}
			break
		case 'EDIT_CANVAS_CHILD_VALUE':
			return {
				...state,
				canvasChildren: state.canvasChildren.map((canvasChild) =>
					canvasChild.id !== action.payload.id
						? canvasChild
						: {
								...canvasChild,
							value: action.payload.value
						  }
				),
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
				canvasChildren: state.canvasChildren.filter((canvasChild: ICanvasChild) => canvasChild.id !== action.payload),
			}
			break
		case 'SET_SELECTED_COMPONENT_ID':
			return {
				...state,
				selectedCanvasChild: action.payload,
			}
			break
		case 'CHANGE_SELECTED_TOOL':
			return {
				...state,
				selectedTool: action.payload,
			}
			break
		case 'SET_CANVAS':
			return action.payload
			break
		case 'SET_PREVIEW_MODE':
			return {
				...state,
				previewMode: action.payload,
			}
			break
		default:
			return state
			break
	}
}

export const initialCanvasState: ICanvasState = {
	selectedTool: 'zoom',
	selectedCanvasChild: null,
	previewMode: false,
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
