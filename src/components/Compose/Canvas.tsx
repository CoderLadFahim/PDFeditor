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

	const handleDrag = _.debounce((x: number, y: number, id: string): void => {
		dispatch({type: 'CHANGE_CANVAS_CHILD_COORDS', payload: {x, y, id}})
	}, 100)

	const handleCanvasClick = (e) => {
		if (e.ctrlKey) return zoom()
		if (state.previewMode) return
		const newCanvasChild: ICanvasChild = {
			type: state.selectedTool,
			value: state.selectedTool === 'text' ? 'Click to add text' : null,
			id: v4(),
			x,
			y,
		}

		dispatch({type: 'CREATE_CANVAS_CHILD', payload: newCanvasChild})
	}

	const [enableZoom, setZoom] = useState<boolean>(false)
	const [coordsToZoomFrom, setCoordsToZoomFrom] = useState<{x: (null | number), y: (null | number)}>({
	    x: null,
	    y: null
	});


	const zoom = () => {
	    setZoom(prevValue => !prevValue)
	}

	useEffect(() => {
	    setCoordsToZoomFrom(() => ({x, y}))
	}, [enableZoom])

	return (
		<div
			ref={canvasComponent}
			className={`app-canvas bg-white shadow w-[595px] h-[842px] ${
				state.previewMode ? 'preview-mode' : ''
			} ${enableZoom ? `transform scale-[2]` : ''}`}
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
