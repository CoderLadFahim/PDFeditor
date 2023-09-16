import {ICanvasInputProps} from '../../types/ComponentProps'

function CanvasInput({label, value, onChange, onEnter}: ICanvasInputProps) {
	const identifier: string = label.toLowerCase()

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key.toLowerCase() === 'enter') {
			const target = e.target as HTMLInputElement
			onEnter(+target.value)
		}
	}
	return (
		<label
			className="bg-gray-700 text-gray-400 flex items-center justify-between px-3 py-2 rounded-md"
			htmlFor={identifier}
		>
			<span>{label}</span>
			<input
				className="bg-inherit w-full text-right text-green-400 outline-none"
				type="text"
				id={identifier}
				value={value}
				onChange={onChange}
				onKeyDown={handleKeyDown}
			/>
		</label>
	)
}

export default CanvasInput
