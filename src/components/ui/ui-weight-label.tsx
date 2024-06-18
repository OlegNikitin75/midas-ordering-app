import { FC } from 'react'

interface IUiWeightLabelProps {
	weight: number
}

export const UiWeightLabel: FC<IUiWeightLabelProps> = ({ weight }) => {
	return (
		<div className='flex h-5 w-12 place-items-baseline justify-center gap-1 rounded bg-white bg-opacity-30'>
			<span className='text-[13px]'>{weight}</span>
			<span>г</span>
		</div>
	)
}
