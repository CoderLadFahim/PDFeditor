import { useEffect, useRef } from 'react'
import TextField from './TextField'

function Canvas() {
    const canvasComponent = useRef(null)
    const handleMouseMoveInsideCanvas = (e: any) => {
        // @ts-ignore
        const rect = canvasComponent.current?.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log('Mouse position:', { x, y });
    }

    useEffect(() => {
        // @ts-ignore
        canvasComponent.current.addEventListener('mousemove', handleMouseMoveInsideCanvas)

        return () => {
            // @ts-ignore
            canvasComponent.current.removeEventListener('mousemove', handleMouseMoveInsideCanvas)
        }
    })

	return (
		<div ref={canvasComponent} className="app-canvas bg-white shadow w-[595px] h-[842px]">
			<p className="inline-block">drag me daddy</p>
			     <TextField />
			{/* <TextField /> */}
		</div>
	)
}

export default Canvas
