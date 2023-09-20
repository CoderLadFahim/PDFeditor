import {useContext, useEffect, useRef, useState} from 'react'
import CanvasChild from './CanvasChild'
import {ICanvasChild, IDocument} from '../../types/Reusables'
import {v4} from 'uuid'
import _ from 'lodash'
import {CanvasContext} from '../../contexts/CanvasContext'
import useMousePosition from '../../hooks/useMousePosition'

import {pdfjs} from 'react-pdf'
import {Document, Page} from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.js',
	import.meta.url
).toString()

function Canvas({activeDocument}: {activeDocument: IDocument}) {
	const canvasComponent = useRef<HTMLDivElement>(null)
	const {state, dispatch} = useContext(CanvasContext)
	const {x, y} = useMousePosition(canvasComponent)

	const [enableZoom, setZoom] = useState<boolean>(false)
	const [coordsToZoomFrom, setCoordsToZoomFrom] = useState<{x: (null | number), y: (null | number)}>({
	    x: null,
	    y: null
	});

	const handleDrag = _.debounce((x: number, y: number, id: string): void => {
		dispatch({type: 'CHANGE_CANVAS_CHILD_COORDS', payload: {x, y, id}})
	}, 100)

	const handleCanvasClick = () => {
		dispatch({type: 'SET_SELECTED_COMPONENT_ID', payload: null})
		if (activeDocument.previewMode) return
		if (activeDocument.selectedTool === 'zoom') return zoom()
		if (!activeDocument.selectedTool) return
		const newCanvasChild: ICanvasChild = {
			type: activeDocument.selectedTool,
			value: activeDocument.selectedTool === 'text' ? 'Text field' : '',
			id: v4(),
			x,
			y,
		}

		dispatch({type: 'CREATE_CANVAS_CHILD', payload: newCanvasChild})
		dispatch({
		    type: 'CHANGE_SELECTED_TOOL',
		    payload: ''
		})
	}

	const zoom = () => setZoom(prevValue => !prevValue)

	useEffect(() => {
	    setCoordsToZoomFrom(() => ({x, y}))
	}, [enableZoom])

	const [fileBinary, setFileBinary] = useState<Blob | null>(null)

	useEffect(() => {
        // @ts-ignore
	    const [file] = JSON.parse(localStorage.getItem('uploadedFiles'))
	    
		fetch(file.fileBase64Url)
			.then((data) => data.blob())
			.then((blob) => setFileBinary(blob))
	}, [])
	const scaleBy = 1;

	return (
		<div
			ref={canvasComponent}
			key={state.activeDocumentId}
			id="app-canvas"
			className={`app-canvas ${activeDocument.selectedTool === 'zoom' && !activeDocument.previewMode  ? 'cursor-zoom-in' : ''} bg-white shadow w-[595px] h-[842px] ${
				activeDocument.previewMode ? 'preview-mode' : ''
			} ${enableZoom ? `transform scale-[2] print:scale-[1] cursor-zoom-out` : ''}`}
			style={enableZoom ? { transformOrigin: `${coordsToZoomFrom.x}px ${coordsToZoomFrom.y}px` } : {}}
			onClick={handleCanvasClick}
		>
			{activeDocument.canvasChildren.map((child, i) => (
				<CanvasChild
					{...child}
					key={i}
					dragHandler={handleDrag}
				/>
			))}

{/* w-[595px] h-[842px] */}

			{fileBinary ? (
				    <Document file={fileBinary} onLoadSuccess={() => console.log('yay')}>
					    <Page width={595 * scaleBy} height={842 * scaleBy} pageNumber={1} />
					    {/* <Page pageNumber={1} /> */}
				    </Document>
				) : (
					''
			)}

		</div>
	)
}

export default Canvas
