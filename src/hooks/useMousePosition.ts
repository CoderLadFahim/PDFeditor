import {useEffect, useState} from 'react'

const useMousePosition = (element) => {
	const [mousePosition, setMousePosition] = useState<{x: number; y: number}>(
		{x: 0, y: 0}
	)

	const handleMouseMove = (e) => {
		const rect = element.current?.getBoundingClientRect()
		if (!rect) return
		const x = Math.floor(e.clientX - rect.left)
		const y = Math.floor(e.clientY - rect.top)
		setMousePosition(() => ({x, y}))
	}

	useEffect(() => {
		if (element.current)
			element.current.addEventListener('mousemove', handleMouseMove)
		return () => {
			if (element.current)
				element.current.addEventListener(
					'mousemove',
					handleMouseMove
				)
		}
	}, [])

	return mousePosition
}

export default useMousePosition
