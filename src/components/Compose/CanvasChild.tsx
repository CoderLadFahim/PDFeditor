import {useContext, useEffect, useState} from 'react'
import {CheckSquare, Edit, Trash, XSquare} from 'react-feather'

import {useDraggable} from '@neodrag/react'
import {useRef} from 'react'
import {ICanvasChildProps} from '../../types/ComponentProps'
import {CanvasContext} from '../../contexts/CanvasContext'

function CanvasChild({id, x, y, dragHandler, type}: ICanvasChildProps) {
	const {state, dispatch} = useContext(CanvasContext)

	const objectInContext = state.canvasChildren.find(
		(canvasChild) => canvasChild.id === id
	)
	const value = objectInContext?.value

	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [position, setPosition] = useState<{x: number; y: number}>({x, y})

	const [inputFieldValue, setInputFieldValue] = useState<string>(
		value ?? 'Click to add text'
	)
	const handleKeyDown = (e: any): void => {
		if (e.key.toLowerCase() === 'enter') setCanvasChildValue()
	}

	const setCanvasChildValue = (): void => {
		setIsEditing(() => false)
		dispatch({
			type: 'EDIT_TEXT_FIELD_CONTENT',
			payload: {id, value: inputFieldValue},
		})
	}

	const draggableRef = useRef(null)
	useDraggable(draggableRef, {
		bounds: 'parent',
		position,
		onDrag: ({offsetY, offsetX, rootNode}) => {
			setPosition({x: offsetX, y: offsetY})
			const selectedNode = rootNode
			// @ts-ignore
			const selectedNodeParent: HTMLElement | null =
				selectedNode.parentNode

			const parentNodeOffsetLeft = selectedNodeParent?.offsetLeft
			const parentNodeOffsetTop = selectedNodeParent?.offsetTop
			const currentNodeClientRect =
				selectedNode?.getBoundingClientRect()

			if (!parentNodeOffsetLeft || !parentNodeOffsetTop) return
			const [x, y] = [
				Math.floor(
					currentNodeClientRect.left - parentNodeOffsetLeft
				),
				Math.floor(currentNodeClientRect.top - parentNodeOffsetTop),
			]
			dragHandler(x, y, id)
		},
	})

	const handleCheckSqClick = (e: {stopPropagation: () => void}) => {
		e.stopPropagation()
		setCanvasChildValue()
	}

	const handleXSqClick = (e: {stopPropagation: () => void}) => {
		e.stopPropagation()
		setIsEditing(() => false)
	}

	const handleEditBtnClick = (e: {stopPropagation: () => void}) => {
		e.stopPropagation()
		setIsEditing(() => true)
	}

	const handleDelBtnClick = (e: {stopPropagation: () => void}) => {
		e.stopPropagation()
		dispatch({type: 'DELETE_CANVAS_CHILD', payload: id})
	}

    const handleCanvasChildClick = (e: { stopPropagation: () => void }) => {
        if (e.ctrlKey) return;
        e.stopPropagation();
        dispatch({
            type: 'SET_SELECTED_COMPONENT_ID',
            payload: { id, type }
        })
    }

	return (
		<div
			onClick={handleCanvasChildClick}
			ref={draggableRef}
			className={`absolute ${
				!isEditing
					? 'border hover:border-blue-400 rounded'
					: 'border-transparent'
			} border-${id === state.selectedCanvasChild?.id ? 'green-400 border-2' : 'transparent'} `}
		>
			{isEditing ? (
				<div className="flex items-center space-x-2">
					<input
						className="border border-green-400 p-1 rounded outline-none"
						type="text"
						value={inputFieldValue}
						onKeyDown={handleKeyDown}
						onChange={(e) =>
							setInputFieldValue(() => e.target.value)
						}
					/>
					<div className="flex items-center space-x-1">
						<button
							className="text-green-500"
							onClick={handleCheckSqClick}
						>
							<CheckSquare />
						</button>
						<button
							className="text-red-500"
							onClick={handleXSqClick}
						>
							<XSquare />
						</button>
					</div>
				</div>
			) : (
				<div className="flex relative group">
					<p className="cursor-pointer">{value}</p>
					<div className="absolute space-x-1 -right-11 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
						<button
							className="text-green-600 transition group-hover:opacity-100"
							onClick={handleEditBtnClick}
						>
							<Edit size={15} />
						</button>
						<button
							className="text-red-600 transition group-hover:opacity-100"
							onClick={handleDelBtnClick}
						>
							<Trash size={15} />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default CanvasChild
