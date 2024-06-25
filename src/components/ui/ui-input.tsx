import clsx from 'clsx'
import { FC, InputHTMLAttributes, PropsWithRef, useId } from 'react'

type UiInputProps = {
	error?: string
	className?: string
	label?: string
	inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>
}

export const UiInput: FC<UiInputProps> = ({
	error,
	className,
	label,
	inputProps
}) => {
	const id = useId()

	return (
		<>
			<div
				className={clsx(
					className,
					'flex w-full flex-col items-center justify-between  py-3'
				)}
			>
				<label
					htmlFor={id}
					className={`${!!error ? 'text-app-red' : 'text-app-gray'} mb-2 block w-full text-[13px] uppercase`}
				>
					{label}
				</label>
				<input
					{...inputProps}
					id={id}
					className={clsx(
						className,
						' w-full shrink-0 border-2 px-3 py-2 text-app-blue focus:border-app-yellow disabled:border-app-gray'
					)}
				/>
			</div>
		</>
	)
}
