import {ChangeEvent, useContext, useEffect, useState} from 'react'
import CanvasInput from './CanvasInput'
import {AlertCircle, Download, Eye, Image, Trash, Type, ZoomIn} from 'react-feather'
import {CanvasContext} from '../../contexts/CanvasContext'
import {ICanvasChild} from '../../types/Reusables'

function CanvasControl() {
	const {state, dispatch} = useContext(CanvasContext)

	const selectedCanvasChild: ICanvasChild | undefined =
		state.canvasChildren.find(
			(childComponent: ICanvasChild) =>
				childComponent.id === state.selectedCanvasChild?.id
		)

	const [x, setX] = useState<number>(selectedCanvasChild?.x ?? 0)
	const [y, setY] = useState<number>(selectedCanvasChild?.y ?? 0)

	const [showClearConfirmation, setShowClearConfirmation] =
		useState<boolean>(false)

	const handleCoordChange = () => {
		if (!state.selectedCanvasChild) return
		console.log({x, y})
		dispatch({
			type: 'CHANGE_CANVAS_CHILD_COORDS',
			payload: {x, y, id: state.selectedCanvasChild.id},
		})
	}

	useEffect(() => {
		if (!selectedCanvasChild) return
		setX(() => selectedCanvasChild.x)
		setY(() => selectedCanvasChild.y)
	}, [selectedCanvasChild])

	const handleXChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (/^\d+$/.test(e.target.value)) setX(+e.target.value)
	}

	const handleYChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (/^\d+$/.test(e.target.value)) setY(+e.target.value)
	}

	const handlePreviewBtnClick = () => {
		dispatch({
			type: 'SET_PREVIEW_MODE',
			payload: true,
		})
	}

	const handleDocumentClearClick = () => {
		dispatch({
			type: 'SET_CANVAS',
			payload: {
				selectedTool: state.selectedTool,
				selectedCanvasChild: null,
				previewMode: false,
				canvasChildren: [],
			},
		})
		setShowClearConfirmation(() => false)
	}

	return (
		<section
			className={`app-canvas-control transition bg-gray-800 px-6 pt-6 text-white relative ${
				state.previewMode ? 'opacity-0' : ''
			}`}
		>
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


			<div className="coord-inputs space-x-4 mb-4">
				<button
					className={`rounded p-2 bg-gray-700 ${
						state.selectedTool === 'text'
							? 'bg-green-500'
							: ''
					}`}
					onClick={() =>
						dispatch({
							type: 'CHANGE_SELECTED_TOOL',
							payload: 'text',
						})
					}
				>
					<Type size={20} />
				</button>

				<button
					className={`rounded p-2 bg-gray-700 ${
						state.selectedTool === 'image'
							? 'bg-green-500'
							: ''
					}`}
					onClick={() =>
						dispatch({
							type: 'CHANGE_SELECTED_TOOL',
							payload: 'image',
						})
					}
				>
					<Image size={20} />
				</button>
			</div>
			<div className='flex items-center space-x-2 text-gray-500 mb-10'>
			    <AlertCircle size={13} />
			    <span className='italic text-sm'>Ctrl+Click to zoom</span>
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

			{!showClearConfirmation ? (
				<div className="absolute flex left-0 right-0 bottom-0">
					<button
						className="p-3 grid place-items-center bg-slate-700 hover:bg-blue-600 flex-1"
						onClick={handlePreviewBtnClick}
					>
						<Eye />
					</button>
					<button
						className="p-3 grid place-items-center bg-slate-900 hover:bg-green-600 flex-1"
						onClick={() => window.print()}
					>
						<Download />
					</button>
					<button
						onClick={() =>
							setShowClearConfirmation(() => true)
						}
						className={`p-3 grid place-items-center bg-slate-700 hover:bg-red-600 flex-1 ${!Boolean(state.canvasChildren.length) ? 'opacity-30 pointer-events-none' : ''}`}
					>
						<Trash />
					</button>
				</div>
			) : (
				<div className="flex flex-col absolute left-0 right-0 bottom-0 --border border-white">
					<p className="prompt p-3 bg-gray-700 text-center">
						Clear document?
					</p>
					<div className="flex">
						<button
							className="p-3 grid place-items-center bg-red-500 hover:bg-red-600 flex-1"
							onClick={handleDocumentClearClick}
						>
							Clear
						</button>
						<button
							className="p-3 grid place-items-center bg-sky-500 hover:bg-sky-600 transition flex-1"
							onClick={() =>
								setShowClearConfirmation(() => false)
							}
						>
							Keep
						</button>
					</div>
				</div>
			)}
		</section>
	)
}

export default CanvasControl
