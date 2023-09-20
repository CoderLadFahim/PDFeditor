import _ from 'lodash'
import {Edit, Trash2} from 'react-feather'
import {IFileInLocalStorage} from '../../types/Reusables'
import { useNavigate } from 'react-router-dom'

function UploadedDocument({file, fileDeleterFunction}: {file: IFileInLocalStorage, fileDeleterFunction: Function}) {
    const navigate = useNavigate()

    const handleEditClick = () => {
        navigate(`/compose?document_id=${file.documentId}`)
    }

	return (
		<li
			className="rounded-md relative shadow p-2 w-[17rem] bg-white overflow-hidden group"
		>
			<span className="file-name">
				{_.truncate(file.filePath, {length: 32})}
			</span>

			<span className="absolute top-0 bottom-0 flex text-white transition right-0 opacity-0 w-[5rem] group-hover:opacity-100">
                <button
					className="cursor-pointer bg-sky-400 h-full flex-1 grid place-items-center"
					onClick={() => handleEditClick()}
				    >
					<Edit size={18} />
				</button>
                <button className="cursor-pointer bg-red-400 h-full flex-1 grid place-items-center" onClick={() => fileDeleterFunction(file.documentId)}>
					<Trash2 size={18} />
				</button>
			</span>
		</li>
	)
}

export default UploadedDocument
