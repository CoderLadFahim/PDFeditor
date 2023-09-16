export type TCanvasChildType = 'image' | 'text' | 'zoom'
export type TCanvasContextActionType =
	| 'CHANGE_CANVAS_CHILD_COORDS'
	| 'CREATE_CANVAS_CHILD'
	| 'DELETE_CANVAS_CHILD'
	| 'CHANGE_SELECTED_TOOL'
	| 'SET_CANVAS'
	| 'EDIT_TEXT_FIELD_CONTENT'
    | 'SET_PREVIEW_MODE'
    | 'SET_SELECTED_COMPONENT_ID' 
    | 'EDIT_CANVAS_CHILD_VALUE'

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
	selectedCanvasChild: {type: ICanvasChildType, id: string} | null
	previewMode: boolean
}

export interface ICanvasContext {
	state: ICanvasState
	dispatch: React.Dispatch<any>
}
