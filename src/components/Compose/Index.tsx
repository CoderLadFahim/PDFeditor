import CanvasControl from './CanvasControl'
import Canvas from './Canvas'
import {EyeOff} from 'react-feather'
import {useContext, useEffect} from 'react'
import {CanvasContext} from '../../contexts/CanvasContext'
import {useLocation} from 'react-router-dom'

function Compose() {
	const {state, dispatch} = useContext(CanvasContext)
	const activeDocument = state.documents.find(
		(document) => document.documentId === state.activeDocumentId
	)

	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)

	const handleExitPreviewButtonClick = () => {
		dispatch({
			type: 'SET_PREVIEW_MODE',
			payload: false,
		})
	}

	useEffect(() => {
        if (localStorage.getItem('refreshed') === null) {
            localStorage.setItem('refreshed', '1');

		    const document_id = queryParams.get('document_id')
		    if (!document_id) return dispatch({
			    type: 'SET_ACTIVE_DOCUMENT_ID',
			    payload: 'BLANK_CANVAS',
		    })

		    dispatch({
			    type: 'SET_CANVAS',
			    payload: {
				    ...state,
				    activeDocumentId: document_id,
				    documents: [
					    ...state.documents,
					    {
						    documentId: document_id,
						    selectedTool: 'zoom',
						    selectedCanvasChild: null,
						    previewMode: false,
						    canvasChildren: [],
					    },
				    ],
			    },
		    })

		    window.location.reload()
        } else {
            console.log('This page has been refreshed');
        }

	}, [])

	return (
		<div>
			{/*    <Canvas activeDocument={state.documents.find( (document) => document.documentId === state.activeDocumentId)} /> */}
			{/* <CanvasControl activeDocument={state.documents.find( (document) => document.documentId === state.activeDocumentId)} /> */}

			<Canvas key={activeDocument?.canvasChildren.length} queryParams={queryParams} activeDocument={activeDocument} />
			<CanvasControl activeDocument={activeDocument} />

			{activeDocument?.previewMode ? (
				<button
					onClick={handleExitPreviewButtonClick}
					className="px-3 py-1 bg-gray-800 rounded-full shadow text-white fixed bottom-3 right-3 flex items-center opacity-10 hover:opacity-100 transition justify-between space-x-3"
				>
					<EyeOff />
					<span>Exit preview</span>
				</button>
			) : (
				''
			)}
		</div>
	)
}

export default Compose
