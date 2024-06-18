import { FC } from 'react'

interface IUiErrorMessage {
	error: string|undefined
}

export const UiErrorMessage: FC<IUiErrorMessage> = ({ error }) => {
	return <div className='bg-pink-200 p-2 text-app-red text-xs'>{error}</div>
}
