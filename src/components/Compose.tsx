import React from 'react'

function Compose() {
    React.useEffect(() => {
        console.log('compose component');
    }, [])
  return (
    <div className="ml-96">Compose</div>
  )
}

export default Compose
