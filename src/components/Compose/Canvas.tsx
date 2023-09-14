import {useDraggable} from '@neodrag/react'
import React, { useRef } from 'react'

function Canvas() {
	const draggableRef = useRef(null)
	const drag = useDraggable(draggableRef, {
        bounds: 'parent',
        defaultPosition: {
            x: 100, y: 50
        },
        grid: [10, 10]
	})

	return (
		<div className="app-canvas bg-white shadow w-[595px] h-[842px]">
			<p className="inline-block" ref={draggableRef}>drag me daddy</p>
		</div>
	)
}

export default Canvas
