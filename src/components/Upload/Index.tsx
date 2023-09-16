import {useState, useEffect} from 'react'
import Dropzone from 'react-dropzone'
import {FilePlus, X, Trash} from 'react-feather'

function Upload() {
	const [files, setFiles] = useState<any[]>([])

	const convertFileToObject = (file: {
		name: any
		size: any
		type: any
		path: any
		webkitRelativePath: any
		lastModifiedDate: any
	}) => {
		return {
			name: file.name,
			size: file.size,
			type: file.type,
			path: file.path,
			webkitRelativePath: file.webkitRelativePath,
			lastModifiedDate: file.lastModifiedDate,
		}
	}

	const handleDrop = (acceptedFiles: any) => {
		const filesConvertedToObjects = acceptedFiles.map(convertFileToObject)
		setFiles((prevFiles) => [...prevFiles, ...filesConvertedToObjects])

		localStorage.setItem('files', JSON.stringify(filesConvertedToObjects))
	}

	const truncateString = (str: string, n: number): string => {
		if (str.length <= n) return str
		return str.slice(0, n).concat('...')
	}

	const getFileType = (path: string): string => {
		const pathSplit: string[] = path.split('.')
		return pathSplit[pathSplit.length - 1]
	}

	const handleFileDelete = (fileToDeleteIndex: number) =>
		setFiles((prevFiles) =>
			prevFiles.filter((_: any, i: number) => i !== fileToDeleteIndex)
		)

	const handleClearBtnClick = () => {
		setFiles(() => [])
		localStorage.removeItem('files')
	}

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
				<ul className="flex flex-wrap gap-7 mb-16">
					{files?.map((file: any, i: number) => (
						<li
							key={i}
							className="rounded-md relative shadow p-2 w-[17rem] bg-white overflow-hidden group"
						>
							<span className="absolute top-0 bottom-0 left-0 w-[3rem] bg-sky-400 text-white grid place-items-center">
								{getFileType(file.path)}
							</span>
							<span className="file-name  ml-[3rem]">
								{truncateString(file.path, 25)}
							</span>

							<span className="absolute top-0 bottom-0 right-0 hidden w-[2rem] text-red-400 group-hover:grid place-items-center">
								<button
									className="cursor-pointer"
									onClick={() => handleFileDelete(i)}
								>
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
