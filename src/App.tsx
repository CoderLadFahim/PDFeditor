import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Upload from './components/Upload/Index'
import Compose from './components/Compose/Index'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useReducer } from 'react'
import { CanvasContext, canvasReducer, initialCanvasState } from './contexts/CanvasContext'

function App() {
	const [state, dispatch] = useReducer(canvasReducer, initialCanvasState)

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
