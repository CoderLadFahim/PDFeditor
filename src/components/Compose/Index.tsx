import React from 'react'
import CanvasControl from './CanvasControl'

function Compose() {
    React.useEffect(() => {
        console.log('compose component');
    }, [])
    return (
        <div className="content-wrapper">
            <CanvasControl />
        </div>
    )
}

export default Compose
