import {useEffect, useState} from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { X } from 'react-feather'

function Upload() {
	const [fileStatuses, setFileStatuses] = useState<File[]>([])
	const [locallyStoredFiles , setLocallyStoredFiles] = useState<any>([])

	const getFileType = (path: string): string => {
		const pathSplit: string[] = path.split('.')
		return pathSplit[pathSplit.length - 1]
	}

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
				localStorage.setItem('fileData', JSON.stringify(fileData))
				return
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

	const handleSubmit = (files: any[]) => {
		const fileObjects = files.map((file: {file: any}) => file.file)
        storeFilesInLocalStorage(fileObjects);
	}

	useEffect(() => {
	    const filesLocallyStored: any = localStorage.getItem('fileData')
	    setLocallyStoredFiles(() => JSON.parse(filesLocallyStored))
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
			</div>

            <div className="mt-16">
				<ul className="flex flex-wrap justify-between gap-y-7">
					{locallyStoredFiles?.map((file: any, i: number) => (
						<li className="rounded-md relative shadow p-2 w-[17rem] bg-white overflow-hidden group">
							<span className="absolute top-0 bottom-0 left-0 w-[3rem] bg-sky-400 text-white grid place-items-center">
								getFileType(file.path)
							</span>
							<span className="file-name  ml-[3rem]">
								truncateString(file.path, 20)
							</span>

							<span className="absolute top-0 bottom-0 right-0 hidden w-[2rem] text-red-400 group-hover:grid place-items-center">
								<button className="cursor-pointer">
								    <X />
								</button>
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Upload
