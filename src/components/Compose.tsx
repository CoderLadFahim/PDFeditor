import React from 'react'

function Compose() {
    React.useEffect(() => {
        console.log('compose component');
    }, [])
  return (
    <div className="content-wrapper">Compose</div>
  )
}

export default Compose
