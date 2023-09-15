import {useContext, useRef, useState} from 'react'
import TextField from './TextField'
import {ICanvasChild} from '../../types/Reusables'
import {v4} from 'uuid'
import _ from 'lodash'
import {CanvasContext} from '../../contexts/CanvasContext'

function Canvas() {
	const canvasComponent = useRef<HTMLDivElement>(null)
	const {state, dispatch} = useContext(CanvasContext)

	const handleDrag = _.debounce((x: number, y: number, id: string): void => {
		console.log({x, y, id})

		dispatch({type: 'CHANGE_CANVAS_CHILD_COORDS', payload: {x, y, id}})
	}, 100)

	const handleDel = (id: string): void => {
		dispatch({type: 'DELETE_CANVAS_CHILD', payload: id})
	}

	const handleCanvasClick = (e: {clientX: number; clientY: number}) => {
		const rect = canvasComponent.current?.getBoundingClientRect()
		if (!rect) return
		const x = Math.floor(e.clientX - rect.left)
		const y = Math.floor(e.clientY - rect.top)

		const newCanvasChild: ICanvasChild = {
			type: 'text',
			id: v4(),
			x,
			y,
		}

		dispatch({type: 'CREATE_CANVAS_CHILD', payload: newCanvasChild})
	}

	return (
		<div
			ref={canvasComponent}
			className="app-canvas bg-white shadow w-[595px] h-[842px]"
			onClick={handleCanvasClick}
		>
			{state.canvasChildren.map((child) => (
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
