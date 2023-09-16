import { useContext } from 'react'
import { CanvasContext } from '../contexts/CanvasContext'

function Navbar() {
	const {state} = useContext(CanvasContext)

	return (
		<nav className={`app-navbar transition bg-gray-200 w-100 z-10 ${state.previewMode ? 'hidden' : '' }`}>
			<div className="logo-wrapper bg-gray-50 grid text-white place-items-center text-2xl">
				<img className='w-52'  src="https://jouleslabs.com/wp-content/uploads/2021/07/cropped-JoulesLab-Logo-without-tagline.png" alt="applicaion logo" />
			</div>
		</nav>
	)
}

export default Navbar
