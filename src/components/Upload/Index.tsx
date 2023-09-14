import React from 'react'

function Upload() {
    React.useEffect(() => {
        console.log('upload component');
    }, [])
  return (
    <div className='content-wrapper'>Upload</div>
  )
}

export default Upload
