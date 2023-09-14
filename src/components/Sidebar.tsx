import { Edit, Upload } from "react-feather"

function Sidebar() {
	return (
		<nav className="app-sidebar bg-gray-200 text-white">
			<ul>
				<li className="active-nav-link nav-link">
				    <Upload />
				    <p className="nav-link-text">Upload</p>
				</li>
                <li className= "nav-link">
				    <Edit />
				    <p className="nav-link-text">Compose</p>
				</li>
			</ul>
		</nav>
	)
}

export default Sidebar
