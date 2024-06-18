import clsx from 'clsx'
import {
	ChangeEvent,
	FC,
	InputHTMLAttributes,
	PropsWithRef,
	useId
} from 'react'

type UiInputProps = {
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	className?: string
	label?: string
	inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>
}

export const UiInput: FC<UiInputProps> = ({
	onChange,
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
					'flex w-full flex-col items-center justify-between  py-3  md:py-4 '
				)}
			>
				<label
					htmlFor={id}
					className='block w-full text-[13px] uppercase text-app-gray mb-2'
				>
					{label}
				</label>
				<input
					{...inputProps}
					id={id}
					onChange={onChange}
					className={clsx(
						className,
						'w-full  shrink-0 border-2 px-3 py-2 text-app-blue focus:border-app-yellow disabled:border-app-gray'
					)}
				/>
			</div>
		</>
	)
}
