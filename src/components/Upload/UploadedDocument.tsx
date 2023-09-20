import _ from 'lodash'
import {Edit, Trash2} from 'react-feather'
import {IFileInLocalStorage} from '../../types/Reusables'
import { useEffect, useState } from 'react';

// import {pdfjs} from 'react-pdf'
// import {Document, Page} from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// 	'pdfjs-dist/build/pdf.worker.min.js',
// 	import.meta.url
// ).toString()

function UploadedDocument({file}: {file: IFileInLocalStorage}) {

    const [fileBinary, setFileBinary] = useState<Blob | null>(null);

    useEffect(() => {
        fetch(file.fileBase64Url)
            .then(data => data.blob())
            .then(blob => setFileBinary(blob))
    }, [])

	return (
		<div className="flex space-x-2">
			<div className="w-56 h-52 shadow group border rounded-xl border-sky-400 flex relative">
				<div className="description bg-white w-full p-2 self-end rounded-b-xl">
					<p>{_.truncate('Name', {length: 45})}</p>
				</div>

				<div className="calls-to-action space-y-3 absolute right-2 top-2">
					<button className="bg-green-400 transform transition opacity-0 group-hover:opacity-100 hover:scale-[1.15] rounded-full w-8 h-8 grid place-items-center text-white">
						<Edit size="15" />
					</button>
					<button className="bg-red-400 transform transition opacity-0 group-hover:opacity-100 hover:scale-[1.15]  rounded-full w-8 h-8 grid place-items-center text-white">
						<Trash2 size="15" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default UploadedDocument
