export type TCanvasElementType = 'image' | 'text'

export interface ICanvasChild {
    type: TCanvasElementType
    id: string
    x: number
    y: number
    width?: number
    height?: number
}

export interface IDocument {
    selectedTool: TCanvasElementType

}

export interface ICanvasState {
    documents: IDocument[]
}

export interface ICanvasContext {
    state: ICanvasState,
    dispatch: React.Dispatch<any>
} 
