export type TCanvasChildType = 'image' | 'text'
export type TCanvasContextActionType =
	| 'CHANGE_CANVAS_CHILD_COORDS'
	| 'CREATE_CANVAS_CHILD'
	| 'DELETE_CANVAS_CHILD'
	| 'CHANGE_SELECTED_TOOL'
	| 'SET_CANVAS'
	| 'EDIT_TEXT_FIELD_CONTENT'

export interface ICanvasChild {
	type: TCanvasChildType
	id: string
	x: number
	y: number
	value: string
	width?: number
	height?: number
}

export interface ICanvasState {
	selectedTool: TCanvasChildType
	canvasChildren: ICanvasChild[]
	selectedCanvasChildId: {type: ICanvasChildType, id: string} | null
}

export interface ICanvasContext {
	state: ICanvasState
	dispatch: React.Dispatch<any>
}
