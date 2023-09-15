export type TCanvasElementType = 'image' | 'text'

export interface ICanvasChild {
    type: TCanvasElementType
    id: string
    x: number
    y: number
    width?: number
    height?: number
}

export interface ICanvasState {
    selectedTool: TCanvasElementType
    canvasChildren: ICanvasChild[]
}

export interface ICanvasContext {
    state: ICanvasState,
    dispatch: React.Dispatch<any>
} 
