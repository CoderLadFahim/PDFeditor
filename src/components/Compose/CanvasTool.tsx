import {useDraggable} from '@neodrag/react'
import {useContext, useRef, useState} from 'react'
import { CanvasContext } from '../../contexts/CanvasContext'

function CanvasTool({type, icon}) {
	const canvasTool = useRef(null)
	const [canvasToolPosition, setCanvasToolPosition] = useState({x: 0, y: 0})
	const {state, dispatch} = useContext(CanvasContext)

	const {isDragging} = useDraggable(canvasTool, {
		position: canvasToolPosition,
		onDrag: ({offsetX, offsetY}) =>
			setCanvasToolPosition({x: offsetX, y: offsetY}),
		onDragEnd: () => setCanvasToolPosition({x: 0, y: 0}),
	})

	return (
		<button
			ref={canvasTool}
			className={`rounded p-2 bg-gray-700 ${
				state.selectedTool === type ? 'bg-green-500' : ''
			}`}
			onClick={() =>
				dispatch({
					type: 'CHANGE_SELECTED_TOOL',
					payload: type,
				})
			}
		>
			{icon()}
		</button>
	)
}

export default CanvasTool
