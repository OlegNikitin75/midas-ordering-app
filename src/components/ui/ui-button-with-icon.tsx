import { FC, ReactNode } from 'react'

interface IUiButtonWithIconProps {
	children: ReactNode
	onClick?: () => void
}

export const UiButtonWithIcon: FC<IUiButtonWithIconProps> = ({
	children,
	onClick
}) => {
	return (
		<button
			onClick={onClick}
			type='button'
			className='relative flex h-6 w-6 items-center justify-center opacity-80 hover:opacity-100 duration-300'
		>
			{children}
		</button>
	)
}
