import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type UiButtonVariant = 'primary' | 'secondary'
export type UiButtonProps = {
	className?: string
	variant: UiButtonVariant
	isComplete?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const UiButton = ({
	className,
	variant,
	isComplete,
	...props
}: UiButtonProps) => {
	return (
		<button
			{...props}
			className={clsx(
				className,
				`w-full   px-7 py-3 uppercase disabled:opacity-50 ${isComplete === false ? 'pointer-events-none opacity-50' : ''} `,
				{
					primary:
						'border-2 border-app-yellow bg-transparent text-app-yellow transition-colors duration-300 hover:bg-app-yellow hover:text-black',
					secondary:
						'border-2 border-app-gray bg-transparent text-app-gray transition-colors duration-300 hover:border-white hover:bg-white hover:text-black'
				}[variant]
			)}
		/>
	)
}
