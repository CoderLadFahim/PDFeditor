import {useContext, useEffect, useState} from 'react'
import Dropzone from 'react-dropzone'
import {FilePlus, Trash} from 'react-feather'

import UploadedDocument from './UploadedDocument.tsx'
import {IFileInLocalStorage} from '../../types/Reusables'
import {v4} from 'uuid'
import {CanvasContext, initialCanvasState} from '../../contexts/CanvasContext'

const getLocalStorageSizeBykey = (key: string): number => {
	let allStrings = ''
	for (const localStorageKey in window.localStorage) {
		if (window.localStorage.hasOwnProperty(localStorageKey)) {
			if (localStorageKey !== key) continue; 
			allStrings += window.localStorage[localStorageKey]
		}
	}
	return (3 + (allStrings.length * 16) / (8 * 1024)) / 1024;
}

function Upload() {
	const [files, setFiles] = useState<IFileInLocalStorage[]>([])
	const {state, dispatch} = useContext(CanvasContext)

	const toBase64 = (file: Blob): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result as string)
			reader.onerror = (error) => reject(error)
		})
	}

	const handleDrop = async (acceptedFiles: File[]) => {
		const acceptedFilesToBase64 = acceptedFiles.map(
			async (value): Promise<IFileInLocalStorage> => {
				const fileBase64Url: string = await toBase64(value)
				// ignoring this as creating a custom file interface extending File, conflicts with react-dropzone
				// @ts-ignore
				const filePath = value.path
				return {documentId: v4(), fileBase64Url, filePath}
			}
		)
		const fileDataToKeepTrackOf: IFileInLocalStorage[] =
			await Promise.all(acceptedFilesToBase64)

		setFiles((prevFiles) => [...prevFiles, ...fileDataToKeepTrackOf])
	}

	const handleClearBtnClick = () => {
		setFiles(() => [])
		localStorage.removeItem('uploadedFiles')

		dispatch({
		    type: 'SET_CANVAS',
		    payload: initialCanvasState
		})
	}

	useEffect(() => {
		const uploadedFilesInLocalStorage =
			localStorage.getItem('uploadedFiles')
		if (!uploadedFilesInLocalStorage) return
		const filesParsed = JSON.parse(uploadedFilesInLocalStorage)
		setFiles(() => filesParsed)
	}, [])

	useEffect(() => {
		if (!Boolean(files.length)) return

		const filesStringified = JSON.stringify(files)
        try {
		    localStorage.setItem('uploadedFiles', filesStringified)
        } catch(e: any) {
            if (e.name === 'QuotaExceededError') alert('File size exceeded');
        }

		for (const file of files) dispatch({
			type: 'SET_DOCUMENT',
			payload: {
				documentId: file.documentId,
				selectedTool: 'zoom',
				selectedCanvasChild: null,
				previewMode: false,
				canvasChildren: [],
			},
		})

	}, [files])

	return (
		<div className="content-wrapper bg-gray-200 p-6 pb-56 mb-5 rounded-xl relative">
			<h2>Upload document</h2>

			<Dropzone onDrop={handleDrop}>
				{({getRootProps, getInputProps}) => (
					<section className="cursor-pointer">
						<div
							{...getRootProps()}
							className="status-card bg-white rounded-xl w-[16rem] h-[15rem] flex flex-col items-center justify-center mx-auto space-y-3 mt-8"
						>
							<div className="text-green-500">
								<FilePlus size={64} />
							</div>
							<h1 className="text-gray-800">
								Click to Upload
							</h1>
							<p className="text-sm">
								or drag and drop your files here
							</p>
							<input {...getInputProps()} />
						</div>
					</section>
				)}
			</Dropzone>

			<div className="mt-16">
				<button
					className={`bg-red-500 px-3 py-2 rounded shadow flex space-x-2 text-white mb-12 absolute -bottom-6 right-6 ${
						files.length ? '' : 'hidden'
					}`}
					onClick={handleClearBtnClick}
				>
					<Trash />
					<span>Clear</span>
				</button>
				<div className="flex flex-wrap items-center gap-4">
					{files.map((file, i) => (
						<UploadedDocument file={file} key={i} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Upload
