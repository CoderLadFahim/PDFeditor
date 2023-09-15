import CanvasControl from './CanvasControl'
import Canvas from './Canvas'
import {EyeOff} from 'react-feather'
import {useContext} from 'react'
import {CanvasContext} from '../../contexts/CanvasContext'

function Compose() {
	const {state, dispatch} = useContext(CanvasContext)

    const handleExitPreviewButtonClick = () => {
        dispatch({
            type: 'SET_PREVIEW_MODE',
            payload: false
        })
    }

	return (
		<div>
			<Canvas />
			<CanvasControl />

			{state.previewMode ? (
				<button onClick={handleExitPreviewButtonClick} className="px-3 py-1 bg-gray-800 rounded-full shadow text-white fixed bottom-3 right-3 flex items-center opacity-10 hover:opacity-100 transition justify-between space-x-3">
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
