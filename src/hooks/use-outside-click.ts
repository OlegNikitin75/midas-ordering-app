import { log } from 'console'
import { useState, useRef, useEffect, MouseEvent } from 'react'

export const useOutsideClick = (initialValue: boolean) => {
	const [isActive, setIsActive] = useState(initialValue)
	const ref = useRef<HTMLDivElement>(null)
	const handleClick = (event: any) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsActive(false)
		}
	}
	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	})

	return { ref, isActive, setIsActive }
}
