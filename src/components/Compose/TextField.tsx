import {useState} from 'react'
import { CheckSquare, XSquare } from 'react-feather'

function TextField() {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [value, setValue] = useState<string>('Click to add text')

	const [inputFieldValue, setInputFieldValue] = useState<string>(value)

	const handleKeyDown = (e: any): void => {
	    if (e.key.toLowerCase() === 'enter') 
	        setTextFieldValue() 
	}

	const setTextFieldValue = (): void => {
	    setIsEditing(() => false) 
	    setValue(() => inputFieldValue) 
	}

	return (
		<div>
			{isEditing ? (
                <div className="flex items-center space-x-2">
				    <input
				        className="border border-green-400 p-1 rounded outline-none"
					    type="text"
					    value={inputFieldValue}
					    onKeyDown={handleKeyDown}
					    onChange={(e) => setInputFieldValue(() => e.target.value)}
				    />
                    <div className="flex items-center space-x-1">
				        <button className="text-green-500" onClick={() => setTextFieldValue()}><CheckSquare /></button>
				        <button className="text-red-500" onClick={() => setIsEditing(() => false)}><XSquare /></button>
                    </div>
                </div>
			) : (
				<p
					onClick={() => setIsEditing(() => true)}
					className="inline-block cursor-pointer"
				>
					{value}
				</p>
			)}
		</div>
	)
}

export default TextField
