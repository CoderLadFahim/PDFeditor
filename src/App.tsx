import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Upload from './components/Upload/Index'
import Compose from './components/Compose/Index'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useEffect, useReducer, useRef} from 'react'
import {
	CanvasContext,
	canvasReducer,
	initialCanvasState,
} from './contexts/CanvasContext'

function App() {
	const [state, dispatch] = useReducer(canvasReducer, initialCanvasState)
	const hasMounted = useRef<boolean | null>(false)

	useEffect(() => {
		const canvasStateInLocalStorage = localStorage.getItem('canvasState')
		if (canvasStateInLocalStorage && !hasMounted.current) {
			dispatch({
				type: 'SET_CANVAS',
				payload: JSON.parse(canvasStateInLocalStorage),
			})
			hasMounted.current = true;
		}
		localStorage.setItem('canvasState', JSON.stringify(state));
	}, [state])

	return (
		<>
			<CanvasContext.Provider value={{state, dispatch}}>
				<Router>
					<Navbar />
					<Sidebar />
					<Routes>
						<Route path="/" element={<Upload />} />
						<Route path="/compose" element={<Compose />} />
					</Routes>
				</Router>
			</CanvasContext.Provider>
		</>
	)
}

export default App
