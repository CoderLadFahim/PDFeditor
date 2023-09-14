import {useEffect, useState} from 'react'
import {CheckSquare, Edit, XSquare} from 'react-feather'

import {useDraggable} from '@neodrag/react'
import {useRef} from 'react'
import { ICanvasChildProps } from '../../types/ComponentProps'

function TextField({ id, x, y, dragHandler }: ICanvasChildProps) {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [value, setValue] = useState<string>('Click to add text')
	const [position, setPosition] = useState({x: 0, y: 0})

	useEffect(() => {
        setPosition({x, y})
	}, [])

	const [inputFieldValue, setInputFieldValue] = useState<string>(value)

	const handleKeyDown = (e: any): void => {
		if (e.key.toLowerCase() === 'enter') setTextFieldValue()
	}

	const setTextFieldValue = (): void => {
		setIsEditing(() => false)
		setValue(() => inputFieldValue)
	}

	const draggableRef = useRef(null)
	const {isDragging} = useDraggable(draggableRef, {
		bounds: 'parent',
		position,
		onDrag: ({offsetY, offsetX, rootNode}) => {
            setPosition({ x: offsetX, y: offsetY }); 
            const selectedNode = rootNode
            // @ts-ignore
            const selectedNodeParent: (HTMLElement | null) = selectedNode.parentNode;

            const parentNodeOffsetLeft = selectedNodeParent?.offsetLeft
            const parentNodeOffsetTop = selectedNodeParent?.offsetTop
            const currentNodeClientRect = selectedNode?.getBoundingClientRect()

            if (!parentNodeOffsetLeft || !parentNodeOffsetTop) return;
            const [x, y] = [
                Math.floor(currentNodeClientRect.left - parentNodeOffsetLeft),
                Math.floor(currentNodeClientRect.top - parentNodeOffsetTop)
            ]
            dragHandler(x, y, id)
        }
	})

	const handleCheckSqClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation()
        setTextFieldValue()
	}

	const handleXSqClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation()
	    setIsEditing(() => false)
	}

	const handleEditBtnClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation()
	    setIsEditing(() => true)
	}

	return (
		<div onClick={e => e.stopPropagation()} ref={draggableRef} className={`inline-block absolute ${isDragging ? 'border border-blue-400' : ''}`}>
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
				<div className="flex space-x-2 group relative">
					<p className="cursor-pointer">{value}</p>
					<button
						className="text-gray-600 transition absolute -right-5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
						onClick={handleEditBtnClick}
					>
						<Edit size={15} />
					</button>
				</div>
			)}
		</div>
	)
}

export default TextField
