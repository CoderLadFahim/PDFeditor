import {ChangeEvent, useContext, useEffect, useState} from 'react'
import CanvasInput from './CanvasInput'
import {Download, Eye, Image, Trash, Type, ZoomIn} from 'react-feather'
import {CanvasContext} from '../../contexts/CanvasContext'
import {
	ICanvasChild,
	IDocument,
	IFileInLocalStorage,
} from '../../types/Reusables'
import CanvasTool from './CanvasTool'
import {ICanvasToolProps} from '../../types/ComponentProps'

function CanvasControl({activeDocument}: {activeDocument: IDocument}) {
	const {state, dispatch} = useContext(CanvasContext)
	const canvasTools: ICanvasToolProps[] = [
		{type: 'text', icon: () => <Type size={20} />},
		{type: 'image', icon: () => <Image size={20} />},
		{type: 'zoom', icon: () => <ZoomIn size={20} />},
	]

	// let uploadedDocuments: IFileInLocalStorage[] = [];
	const [uploadedDocuments, setUploadedDocuments] = useState<
		IFileInLocalStorage[]
	>([])
	useEffect(() => {
		const filesFromLocalStorage: null | string =
			localStorage.getItem('uploadedFiles')
		if (!filesFromLocalStorage) return

		setUploadedDocuments(() => JSON.parse(filesFromLocalStorage))

		console.log({uploadedDocuments})
	}, [])

	const handleDocumentOptionClick = (documentObj: IFileInLocalStorage) => {
	    console.log(documentObj);

	}

	const selectedCanvasChild: ICanvasChild | undefined =
		activeDocument.canvasChildren.find(
			(childComponent: ICanvasChild) =>
				childComponent.id === activeDocument.selectedCanvasChild?.id
		)

	const [x, setX] = useState<number>(selectedCanvasChild?.x ?? 0)
	const [y, setY] = useState<number>(selectedCanvasChild?.y ?? 0)

	const [showClearConfirmation, setShowClearConfirmation] =
		useState<boolean>(false)

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
				...state,
				documents: state.documents.map((documentObj: IDocument) =>
					documentObj.documentId !== activeDocument.documentId
						? {...documentObj}
						: {
								...documentObj,
								selectedTool:
									activeDocument.selectedTool,
								selectedCanvasChild: null,
								previewMode: false,
								canvasChildren: [],
						  }
				),
			},
		})
		setShowClearConfirmation(() => false)
		setX(() => 0)
		setY(() => 0)
	}

	return (
		<section
			className={`app-canvas-control transition bg-gray-800 px-6 pt-6 text-white relative z-10 ${
				activeDocument.previewMode ? 'hidden' : ''
			}`}
		>
			<div className="mb-10">
				<label
					htmlFor="countries"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Select a document
				</label>
				<select
					id="countries"
					className="bg-gray-50 text-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				>
					{uploadedDocuments
						? uploadedDocuments.map(
								(documentObj: IFileInLocalStorage) => (
									<option key={documentObj.documentId} value={documentObj.documentId} onClick={() => handleDocumentOptionClick(documentObj)}>
										{documentObj.filePath}
									</option>
								)
						  )
						: ''}
				</select>
			</div>

			<div className="coord-inputs space-y-6 mb-10">
				<CanvasInput label="X" value={x} onChange={handleXChange} />

				<CanvasInput label="Y" value={y} onChange={handleYChange} />
			</div>

			<div className="coord-inputs space-x-4 mb-4">
				{canvasTools.map((tool, i) => (
					<CanvasTool key={i} {...tool} />
				))}
			</div>

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
						className={`p-3 grid place-items-center bg-slate-700 hover:bg-red-600 flex-1 ${
							!Boolean(
								activeDocument.canvasChildren.length
							)
								? 'opacity-30 pointer-events-none'
								: ''
						}`}
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
