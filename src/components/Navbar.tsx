import { useContext } from 'react'
import { CanvasContext } from '../contexts/CanvasContext'
import { Settings } from 'react-feather';

function Navbar() {
    const { state } = useContext(CanvasContext)
    const activeDocument = state.documents.find(documentObj => documentObj.documentId === state.activeDocumentId);

    return (
        <nav className={`app-navbar shadow transition bg-gray-200 w-100 z-10 flex justify-between items-center ${activeDocument?.previewMode ? 'hidden' : ''}`}>
            <div className="logo-wrapper bg-gray-50 flex justify-center items-center text-2xl space-x-2">
                <Settings className='text-green-500' />
                <p className='font-bold text-gray-600 -skew-x-12'>PDF Mechanic</p>
            </div>
        </nav>
    )
}

export default Navbar

