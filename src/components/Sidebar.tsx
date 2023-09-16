import { useContext } from "react"
import { Edit, Upload } from "react-feather"
import { Link, useLocation } from "react-router-dom"
import { CanvasContext } from "../contexts/CanvasContext"

function Sidebar() {
    const location = useLocation()

	const {state} = useContext(CanvasContext)

	return (
		<nav className={`app-sidebar bg-gray-900 z-10 text-white ${state.previewMode ? 'hidden' : '' }`}>
			<ul>
                <li className={`${location.pathname === '/compose' ? 'active-nav-link' : ''} nav-link`}>
				    <Edit />
				    <p className="nav-link-text"><Link to="/compose">Compose</Link></p>
				</li>
				<li className={`${location.pathname === '/' ? 'active-nav-link' : ''} nav-link`}>
				    <Upload />
				    <p className="nav-link-text"><Link to="/">Upload</Link></p>
				</li>
			</ul>
		</nav>
	)
}

export default Sidebar
