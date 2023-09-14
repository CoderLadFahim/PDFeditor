import {useEffect, useRef, useState} from 'react'
import TextField from './TextField'
import {ICanvasChild} from '../../types/Reusables'
import {v4} from 'uuid'

function Canvas() {
	const canvasComponent = useRef(null)
	const [canvasChildren, setCanvasChildren] = useState<ICanvasChild[]>([
		{
			type: 'text',
			id: v4(),
			x: 4,
			y: 75,
		},
	])

	const handleDrag = (x: number, y: number, id: string): void => {
		console.log({x, y, id})
	}

	const handleCanvasClick = (e) => {
		// @ts-ignore
		const rect = canvasComponent.current?.getBoundingClientRect()
		const x = Math.floor(e.clientX - rect.left)
		const y = Math.floor(e.clientY - rect.top)

		const newCanvasChild: ICanvasChild = {
			type: 'text',
			id: v4(),
			x,
			y,
		}

		// return console.log(newCanvasChild)
		setCanvasChildren((prevChildren: ICanvasChild[]): ICanvasChild[] => [
			...prevChildren,
			newCanvasChild,
		])
	}

	return (
		<div
			ref={canvasComponent}
			className="app-canvas bg-white shadow w-[595px] h-[842px]"
			onClick={handleCanvasClick}
		>
			{canvasChildren.map((child) => (
				<TextField
					{...child}
					key={child.id}
					dragHandler={handleDrag}
				/>
			))}
		</div>
	)
}

export default Canvas
