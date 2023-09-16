import {useDraggable} from '@neodrag/react'
import {useContext, useEffect, useRef, useState} from 'react'
import {CanvasContext} from '../../contexts/CanvasContext'
import useMousePosition from '../../hooks/useMousePosition'

function CanvasTool({type, icon}) {
	const canvasTool = useRef(null)
	const [canvasToolPosition, setCanvasToolPosition] = useState({x: 0, y: 0})
	const [isInsideCanvas, setIsInsideCanvas] = useState(false)
	const {state, dispatch} = useContext(CanvasContext)
	const {x, y} = useMousePosition()

	const {isDragging} = useDraggable(canvasTool, {
		position: canvasToolPosition,
		onDrag: (dragObj) => {
			const {offsetY, offsetX} = dragObj
			setCanvasToolPosition({x: offsetX, y: offsetY})
		},
		onDragEnd: () => setCanvasToolPosition({x: 0, y: 0}),
	})

	useEffect(() => {
	    if (!isDragging) return;
	    const canvasElement = document.getElementById('app-canvas')!
	    const canvasElementRect = canvasElement?.getBoundingClientRect()
	    if (!canvasElementRect) return;
	    const {top, right, bottom ,left} = canvasElementRect;
	    setIsInsideCanvas(() => (x >= left && x <= right) && (y >= top && y <= bottom))

	}, [isDragging, x, y])

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
