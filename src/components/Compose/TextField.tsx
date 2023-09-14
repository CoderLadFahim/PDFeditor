import {useState} from 'react'
import {CheckSquare, Edit, XSquare} from 'react-feather'

import {useDraggable} from '@neodrag/react'
import {useRef} from 'react'

function TextField() {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [value, setValue] = useState<string>('Click to add text')

	const [inputFieldValue, setInputFieldValue] = useState<string>(value)

	const handleKeyDown = (e: any): void => {
		if (e.key.toLowerCase() === 'enter') setTextFieldValue()
	}

	const setTextFieldValue = (): void => {
		setIsEditing(() => false)
		setValue(() => inputFieldValue)
	}

	const draggableRef = useRef(null)
	useDraggable(draggableRef, {
		bounds: 'parent',
		// defaultPosition: { x, y, },
		grid: [10, 10],
	})

	return (
		<div ref={draggableRef} className="inline-block">
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
							onClick={() => setTextFieldValue()}
						>
							<CheckSquare />
						</button>
						<button
							className="text-red-500"
							onClick={() => setIsEditing(() => false)}
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
						onClick={() => setIsEditing(() => true)}
					>
						<Edit size={15} />
					</button>
				</div>
			)}
		</div>
	)
}

export default TextField
