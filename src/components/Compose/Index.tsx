import React from 'react'
import CanvasControl from './CanvasControl'
import Canvas from './Canvas'

function Compose() {
    React.useEffect(() => {
        console.log('compose component');
    }, [])
    return (
        <div>
            <CanvasControl />

            <Canvas />
        </div>
    )
}

export default Compose
