import {ChangeEvent, useContext, useState} from 'react'
import CanvasInput from './CanvasInput'
import {Download, Eye, Image, Trash, Type} from 'react-feather'
import {CanvasContext} from '../../contexts/CanvasContext'

function CanvasControl() {
	const {state, dispatch} = useContext(CanvasContext)

	const selectedCanvasChildObj = state.canvasChildren.find(childComponent => childComponent.id === state.selectedCanvasChild?.id)

	const [x, setX] = useState<number>(selectedCanvasChildObj?.x ?? 0)
	const [y, setY] = useState<number>(selectedCanvasChildObj?.y ?? 0)
	const handleCoordChange = (value: number) => {
		if (!state.selectedCanvasChild) return;
		console.log({x, y})
		dispatch({
			type: 'CHANGE_CANVAS_CHILD_COORDS',
			payload: {x, y, id: state.selectedCanvasChild.id},
		})
	}

	const handleXChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (/^\d+$/.test(e.target.value)) setX(+e.target.value)
	}

	const handleYChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (/^\d+$/.test(e.target.value)) setY(+e.target.value)
	}

	return (
		<section className="app-canvas-control bg-gray-800 px-6 pt-6 text-white relative">
			<div className="coord-inputs space-y-6 mb-10">
				<CanvasInput
					label="X"
					value={x}
					onChange={handleXChange}
					onEnter={handleCoordChange}
				/>

				<CanvasInput 
				    label="Y"
				    value={y} 
					onChange={handleYChange}
					onEnter={handleCoordChange}
				/>
			</div>

			{(() => {
				if (!state.selectedCanvasChild) return
				if (state.selectedCanvasChild?.type !== 'image') return
				return (
					<div className="coord-inputs space-y-6 mb-9">
						<CanvasInput label="W" value={x} />

						<CanvasInput label="H" value={x} />
					</div>
				)
			})()}

			<div className="coord-inputs space-x-4">
				<button className="rounded p-2 bg-gray-700 bg-green-500">
					<Type size={20} />
				</button>

				<button className="rounded p-2 bg-gray-700">
					<Image size={20} />
				</button>
			</div>

			<div className="absolute flex left-0 right-0 bottom-0">
				<button className="p-3 grid place-items-center bg-slate-700 hover:bg-blue-600 flex-1">
					<Eye />
				</button>
				<button className="p-3 grid place-items-center bg-slate-900 hover:bg-green-600 flex-1">
					<Download />
				</button>
				<button className="p-3 grid place-items-center bg-slate-700 hover:bg-red-600 flex-1">
					<Trash />
				</button>
			</div>
		</section>
	)
}

export default CanvasControl
