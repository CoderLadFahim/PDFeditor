import {RefObject, useEffect, useState} from 'react'

const useMousePosition = (element?: RefObject<HTMLDivElement>) => {
	const [mousePosition, setMousePosition] = useState<{x: number; y: number}>(
		{x: 0, y: 0}
	)

	const handleMouseMove = (e: any) => {
		const rect = element?.current?.getBoundingClientRect()
		let x = rect ? Math.floor(e.clientX - rect.left) : e.clientX
		let y = rect ? Math.floor(e.clientY - rect.top) : e.clientY
		setMousePosition(() => ({x, y}))
	}

	useEffect(() => {
		const elementToAddTheEventListenerTo= element?.current ?? document
		elementToAddTheEventListenerTo.addEventListener('mousemove', handleMouseMove)

		return () => elementToAddTheEventListenerTo.removeEventListener('mousemove', handleMouseMove)
	}, [])

	return mousePosition
}

export default useMousePosition
