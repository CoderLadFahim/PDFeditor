import { Edit, Upload } from "react-feather"
import { Link } from "react-router-dom"

function Sidebar() {
	return (
		<nav className="app-sidebar bg-gray-200 text-white">
			<ul>
				<li className="active-nav-link nav-link">
				    <Upload />
				    <p className="nav-link-text"><Link to="/">Upload</Link></p>
				</li>
                <li className= "nav-link">
				    <Edit />
				    <p className="nav-link-text"><Link to="/compose">Compose</Link></p>
				</li>
			</ul>
		</nav>
	)
}

export default Sidebar
