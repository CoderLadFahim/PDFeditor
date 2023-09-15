import React from 'react'
import { FilePlus } from 'react-feather';

function Upload() {
    React.useEffect(() => {
        console.log('upload component');
    }, [])
  return (
    <div className="content-wrapper bg-gray-200 p-6 pb-56 mb-5 rounded-xl relative">
            <h2>Upload document</h2>

            <div className="status-card bg-white rounded-xl w-[16rem] h-[15rem] flex flex-col items-center justify-center mx-auto space-y-3 mt-8">
                <div className='text-green-500'>
                    <FilePlus size={64} />
                </div>
                <h1 className='text-gray-800'>Click to Upload</h1>
            </div>

            <div className='mt-16'>
                <ul className='flex flex-wrap justify-between gap-y-7'>
                    <li className='rounded-md shadow p-2 w-[17rem] bg-white flex items-center justify-between'>
                        <span className="file-name">some-file.pdf</span>
                        <span className="file-name text-green-500 font-bold">20%</span>
                    </li>
                </ul>
            </div>

        </div>
  )
}

export default Upload
