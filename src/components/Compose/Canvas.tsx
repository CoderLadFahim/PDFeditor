import {useContext, useEffect, useRef, useState} from 'react'
import CanvasChild from './CanvasChild'
import {ICanvasChild} from '../../types/Reusables'
import {v4} from 'uuid'
import _ from 'lodash'
import {CanvasContext} from '../../contexts/CanvasContext'
import useMousePosition from '../../hooks/useMousePosition'

function Canvas() {
	const canvasComponent = useRef<HTMLDivElement>(null)
	const {state, dispatch} = useContext(CanvasContext)
	const {x, y} = useMousePosition(canvasComponent)

	const [enableZoom, setZoom] = useState<boolean>(false)
	const [coordsToZoomFrom, setCoordsToZoomFrom] = useState<{x: (null | number), y: (null | number)}>({
	    x: null,
	    y: null
	});

	const handleDrag = _.debounce((x: number, y: number, id: string): void => {
		dispatch({type: 'CHANGE_CANVAS_CHILD_COORDS', payload: {x, y, id}})
	}, 100)

	const handleCanvasClick = () => {
		if (state.previewMode) return
		if (state.selectedTool === 'zoom') return zoom()
		if (!state.selectedTool) return
		const newCanvasChild: ICanvasChild = {
			type: state.selectedTool,
			value: state.selectedTool === 'text' ? 'Text field' : '',
			id: v4(),
			x,
			y,
		}

		dispatch({type: 'CREATE_CANVAS_CHILD', payload: newCanvasChild})
		dispatch({
		    type: 'CHANGE_SELECTED_TOOL',
		    payload: ''
		})
	}

	const zoom = () => setZoom(prevValue => !prevValue)

	useEffect(() => {
	    setCoordsToZoomFrom(() => ({x, y}))
	}, [enableZoom])

	return (
		<div
			ref={canvasComponent}
			id="app-canvas"
			className={`app-canvas ${state.selectedTool === 'zoom' && !state.previewMode  ? 'cursor-zoom-in' : ''} bg-white shadow w-[595px] h-[842px] ${
				state.previewMode ? 'preview-mode' : ''
			} ${enableZoom ? `transform scale-[2] cursor-zoom-out` : ''}`}
			style={enableZoom ? { transformOrigin: `${coordsToZoomFrom.x}px ${coordsToZoomFrom.y}px` } : {}}
			onClick={handleCanvasClick}
		>
			{state.canvasChildren.map((child, i) => (
				<CanvasChild
					{...child}
					key={i}
					dragHandler={handleDrag}
				/>
			))}
		</div>
	)
}

export default Canvas
