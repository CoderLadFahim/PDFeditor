import {useContext, useEffect, useRef, useState} from 'react'
import CanvasChild from './CanvasChild'
import {ICanvasChild, IDocument, IFileInLocalStorage} from '../../types/Reusables'
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

function Canvas({activeDocument, queryParams}: {activeDocument: IDocument | undefined, [key: string]: any}) {
	const canvasComponent = useRef<HTMLDivElement>(null)
	const {dispatch} = useContext(CanvasContext)
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
		if (activeDocument?.previewMode) return
		if (activeDocument?.selectedTool === 'zoom') return zoom()
		if (!activeDocument?.selectedTool) return
		const newCanvasChild: ICanvasChild = {
			type: activeDocument?.selectedTool,
			value: activeDocument?.selectedTool === 'text' ? 'Text field' : '',
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


	const document_id = queryParams.get('document_id')

	useEffect(() => {
	    if (!document_id) return;
	    console.log('this is running', activeDocument?.documentId);
        // @ts-ignore
	    const files = JSON.parse(localStorage.getItem('uploadedFiles'))
	    const fileToShow = files.find((file: IFileInLocalStorage) => file.documentId === document_id)

        if (!fileToShow) return;
		fetch(fileToShow.fileBase64Url)
			.then((data) => data.blob())
			.then((blob) => setFileBinary(blob));
	}, [])

	return (
		<div
			ref={canvasComponent}
			id="app-canvas"
			className={`app-canvas overflow-y-hidden ${activeDocument?.selectedTool === 'zoom' && !activeDocument?.previewMode  ? 'cursor-zoom-in' : ''} bg-white shadow w-[595px] h-[842px] ${
				activeDocument?.previewMode ? 'preview-mode' : ''
			} ${enableZoom ? `transform scale-[2] print:scale-[1] cursor-zoom-out` : ''}`}
			style={enableZoom ? { transformOrigin: `${coordsToZoomFrom.x}px ${coordsToZoomFrom.y}px` } : {}}
			onClick={handleCanvasClick}
		>
			{activeDocument?.canvasChildren.map((child, i) => (
				<CanvasChild
					{...child}
					key={i}
					dragHandler={handleDrag}
				/>
			))}

			{fileBinary ? (
				    <Document file={fileBinary} onLoadSuccess={() => console.log('yay')}>
					    <Page width={595} height={842} pageNumber={1} />
				    </Document>
				) : (
					''
			)}

		</div>
	)
}

export default Canvas
