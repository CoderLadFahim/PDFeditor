export type TCanvasElementType = 'image' | 'text'

export interface ICanvasChild {
    type: TCanvasElementType
    id: string
    x: number
    y: number
    width?: number
    height?: number
}
