import { FC } from 'react'

interface IUiMessage {
	message: string | undefined
	type?: string
}

export const UiMessage: FC<IUiMessage> = ({ message, type = 'error' }) => {
	if (type === 'error') {
		return <div className='bg-pink-200 p-2 text-xs text-app-red'>{message}</div>
	}

	if (type === 'success') {}
		return (
			<div className='bg-green-200 p-2 text-xs text-green-700'>{message}</div>
		)
}
