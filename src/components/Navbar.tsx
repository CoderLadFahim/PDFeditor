import { useContext } from 'react'
import { CanvasContext } from '../contexts/CanvasContext'

function Navbar() {
	const {state} = useContext(CanvasContext)
	const activeDocument = state.documents.find(documentObj => documentObj.documentId === state.activeDocumentId);

	return (
		<nav className={`app-navbar shadow transition bg-gray-200 w-100 z-10 ${activeDocument?.previewMode ? 'hidden' : '' }`}>
			<div className="logo-wrapper bg-gray-50 grid text-white place-items-center text-2xl">
				<!-- <img className='w-52'  src="https://jouleslabs.com/wp-content/uploads/2021/07/cropped-JoulesLab-Logo-without-tagline.png" alt="applicaion logo" /> -->
			</div>
		</nav>
	)
}

export default Navbar
