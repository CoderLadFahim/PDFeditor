import {useState} from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

function Upload() {
	const [files, setFiles] = useState<File[]>([])

	const getFileType = (path: string): string => {
		const pathSplit: string[] = path.split('.')
		return pathSplit[pathSplit.length - 1]
	}

	const getUploadParams = () => {
		return {url: 'https://httpbin.org/post'}
	}

	const handleChangeStatus = ({_, file}: any, status: any): void => {
		setFiles(prevFiles => [...prevFiles, file])
	}

	return (
		<div className="content-wrapper bg-gray-200 p-6 pb-56 mb-5 rounded-xl relative">
			<h2>Upload document</h2>

            <div className='mt-5'>
			    <small className="text-xs text-gray-700">Accepted filetypes: pdf</small> <br />
			    <small className="text-xs text-gray-700">Max file size: 1MB</small>
			    <Dropzone
				    getUploadParams={getUploadParams}
				    maxSizeBytes={1048576}
				    onChangeStatus={handleChangeStatus}
				    accept="application/pdf"
			    />
            </div>
		</div>
	)
}

export default Upload
