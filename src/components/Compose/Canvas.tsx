import {useRef, useState} from 'react'
import TextField from './TextField'
import {ICanvasChild} from '../../types/Reusables'
import {v4} from 'uuid'
import _ from 'lodash'

function Canvas() {
	const canvasComponent = useRef<HTMLDivElement>(null)
	const [canvasChildren, setCanvasChildren] = useState<ICanvasChild[]>([
		{
			type: 'text',
			id: v4(),
			x: 26,
			y: 440,
		},
	])

	const handleDrag = _.debounce((x: number, y: number, id: string): void => {
		console.log({x, y, id})
	}, 500)

	const handleDel = (id: string): void => {
		setCanvasChildren((prevChildren: ICanvasChild[]): ICanvasChild[] =>
			prevChildren.filter((child) => child.id !== id)
		)
	}

	const handleCanvasClick = (e: {clientX: number; clientY: number}) => {
		const rect = canvasComponent.current?.getBoundingClientRect()
		if (!rect) return;
		const x = Math.floor(e.clientX - rect.left)
		const y = Math.floor(e.clientY - rect.top)

		const newCanvasChild: ICanvasChild = {
			type: 'text',
			id: v4(),
			x,
			y,
		}

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
					delHandler={handleDel}
				/>
			))}
		</div>
	)
}

export default Canvas
