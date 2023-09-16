import {useEffect, useState} from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import {X} from 'react-feather'

function Upload() {
	const [fileStatuses, setFileStatuses] = useState<File[]>([])
	const [locallyStoredFileCount, setLocallyStoredFileCount] = useState<number>(0)

	const getUploadParams = () => {
		return {url: 'https://httpbin.org/post'}
	}

	const handleChangeStatus = ({_, file}: any): void => {
		setFileStatuses((prevFiles) => [...prevFiles, file])
	}

	function storeFilesInLocalStorage(files: string | any[]) {
		const fileData: (string | ArrayBuffer | null)[] = []
		const reader = new FileReader()

		function readFile(index: number) {
			if (index >= files.length) {
				try {
				    localStorage.setItem('fileData', JSON.stringify(fileData))
				} catch (error) {
                    alert('File limit exceeded')
                    localStorage.removeItem('fileData')
				}
				return checkFilesInLocalStorage()
			}

			const file = files[index]
			reader.onload = function (event) {
				const dataUrl = event?.target?.result
				if (dataUrl) fileData.push(dataUrl)
				readFile(index + 1)
			}
			reader.readAsDataURL(file)
		}

		readFile(0)
	}

	const checkFilesInLocalStorage = () => {
        const filesInLocalStorage = localStorage.getItem('fileData')
        setLocallyStoredFileCount(filesInLocalStorage ? JSON.parse(filesInLocalStorage).length : 0)
	}

	const handleSubmit = (files: any[]) => {
		const fileObjects = files.map((file: {file: any}) => file.file)
		storeFilesInLocalStorage(fileObjects)
	}

	useEffect(() => {
        checkFilesInLocalStorage()
	}, [])

	return (
		<div className="content-wrapper bg-gray-200 p-6 pb-56 mb-5 rounded-xl relative">
			<h2>Upload document</h2>

			<div className="mt-5">
				<small className="text-xs text-gray-700">
					Accepted filetypes: pdf
				</small>{' '}
				<br />
				<small className="text-xs text-gray-700">
					Max file size: 1MB
				</small>
				<Dropzone
					getUploadParams={getUploadParams}
					// maxSizeBytes={1048576}
					onSubmit={handleSubmit}
					onChangeStatus={handleChangeStatus}
					accept="application/pdf"
				/>
				<p className="text-gray-700">{locallyStoredFileCount} files uploaded.  </p>
                <p className="text-gray-700 text-xs">Max storage capacity: 5MB</p>
			</div>
		</div>
	)
}

export default Upload
