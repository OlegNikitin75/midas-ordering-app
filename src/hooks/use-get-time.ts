import { useEffect, useState } from 'react'

export const useGetTime = () => {
	const [message, setMessage] = useState('')

	useEffect(() => {
		const today = new Date()

		if (today.getHours() < 12 && today.getHours() >= 6)
			setMessage('Доброе утро')

		if (today.getHours() >= 12 && today.getHours() < 18)
			setMessage('Добрый день')

		if (today.getHours() >= 18 && today.getHours() <= 23)
			setMessage('Добрый вечер')

		if (today.getHours() >= 0 && today.getHours() < 4) setMessage('Доброй ночи')
	}, [])

	return { message }
}
