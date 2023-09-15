export type TCanvasElementType = 'image' | 'text'
export type TCanvasContextTypes =
	| 'CHANGE_CANVAS_CHILD_COORDS'
	| 'CREATE_CANVAS_CHILD'
	| 'DELETE_CANVAS_CHILD'
	| 'CHANGE_SELECTED_TOOL'
	| 'SET_CANVAS'

export interface ICanvasChild {
	type: TCanvasElementType
	id: string
	x: number
	y: number
	value: string
	width?: number
	height?: number
}

export interface ICanvasState {
	selectedTool: TCanvasElementType
	canvasChildren: ICanvasChild[]
}

export interface ICanvasContext {
	state: ICanvasState
	dispatch: React.Dispatch<any>
}
