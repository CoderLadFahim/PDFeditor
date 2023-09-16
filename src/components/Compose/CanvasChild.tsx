import {useContext, useState} from 'react'
import {Camera, CheckSquare, Edit, Trash, XSquare} from 'react-feather'

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

	const [textInputFieldValue, setTextInputFieldValue] = useState<string>(
		value ?? 'Click to add text'
	)
	const handleKeyDown = (e: any): void => {
		if (e.key.toLowerCase() === 'enter') setCanvasChildValue()
	}

	const setCanvasChildValue = (): void => {
		setIsEditing(() => false)
		dispatch({
			type: 'EDIT_CANVAS_CHILD_VALUE',
			payload: {
				id,
				value: textInputFieldValue,
			},
		})
	}

	// const [fileInputFieldValue, setFileInputFieldValue] = useState<any>(value ?? null)

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

	const handleCanvasChildClick = (e: {
		ctrlKey: any
		stopPropagation: () => void
	}) => {
		if (e.ctrlKey) return
		e.stopPropagation()
		dispatch({
			type: 'SET_SELECTED_COMPONENT_ID',
			payload: {id, type},
		})
	}

	const [imgSrc, setImgSrc] = useState<any>(value ?? '')
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = () => {
			setImgSrc(reader.result)
			setIsEditing(false)
			dispatch({
				type: 'EDIT_CANVAS_CHILD_VALUE',
				payload: {
					id,
					value: reader.result,
				},
			})
		}

		if (file) {
			reader.readAsDataURL(file)
		}
	}

	return (
		<div
			onClick={handleCanvasChildClick}
			ref={draggableRef}
			className={`absolute ${
				!isEditing
					? 'border hover:border-blue-400 rounded'
					: 'border-transparent'
			} border-${
				id === state.selectedCanvasChild?.id
					? 'green-400 border-2'
					: 'transparent'
			} `}
		>
			{isEditing ? (
				<div className="flex items-center space-x-2">
					{type === 'text' ? (
						<>
							<input
								className="border border-green-400 p-1 rounded outline-none"
								type="text"
								value={textInputFieldValue}
								onKeyDown={handleKeyDown}
								onChange={(e) =>
									setTextInputFieldValue(
										() => e.target.value
									)
								}
							/>
						</>
					) : (
						<input
							className="border border-green-400 p-1 rounded outline-none"
							type="file"
							accept='image/*'
							onChange={handleImageUpload}
						/>
					)}

					<div className="flex items-center space-x-1">
						{type === 'text' ? (
							<button
								className="text-green-500"
								onClick={handleCheckSqClick}
							>
								<CheckSquare />
							</button>
						) : (
							''
						)}
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
					{type === 'text' ? (
						<p className="cursor-pointer">{value}</p>
					) : imgSrc ? (
						<img
							src={imgSrc}
							alt="sample image"
							className='cursor-pointer'
							width="100"
							height="100"
							onDragStart={(e) => e.preventDefault()}
						/>
					) : (
						<div className="w-[100px] h-[100px] bg-gray-100 flex flex-col items-center justify-center space-y-2 cursor-pointer">
							<Camera />
							<p className="text-center text-sm">
								Image
							</p>
						</div>
					)}
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
