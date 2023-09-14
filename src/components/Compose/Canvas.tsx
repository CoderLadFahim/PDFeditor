import {useEffect, useRef} from 'react'
import TextField from './TextField'
import {ICanvasChild} from '../../types/Reusables'
import {v4} from 'uuid'

function Canvas() {
	const canvasComponent = useRef(null)
	const handleMouseMoveInsideCanvas = (e: any) => {
		// @ts-ignore
		const rect = canvasComponent.current?.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		// console.log('Mouse position:', {x, y})
	}

	useEffect(() => {
		// @ts-ignore
		canvasComponent.current.addEventListener(
			'mousemove',
			handleMouseMoveInsideCanvas
		)

		return () => {
			// @ts-ignore
			canvasComponent.current.removeEventListener(
				'mousemove',
				handleMouseMoveInsideCanvas
			)
		}
	}, [])

	const canvasChildren: ICanvasChild[] = [
		{
			type: 'text',
			id: v4(),
			x: Math.floor(Math.random() * 100),
			y: Math.floor(Math.random() * 700),
		},
	]

	const handleDrag = (x: number, y: number, id: string): void => {
	    console.log({x, y, id});
	}

	return (
		<div
			ref={canvasComponent}
			className="app-canvas bg-white shadow w-[595px] h-[842px]"
		>
			{canvasChildren.map((child) => (
				<TextField {...child} key={child.id} dragHandler={handleDrag} />
			))}
		</div>
	)
}

export default Canvas
