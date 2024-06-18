import { priceWithSpace } from '@/lib/common'
import { FC } from 'react'

interface IUiPriceProps {
	price: number|null
	discount?: boolean
}

export const UiPrice: FC<IUiPriceProps> = ({ price, discount }) => {
	return (
		<span
			className={`${discount ? 'text-sm md:text-xl line-through text-app-gray' : 'text-base md:text-[25px] font-extrabold'}`}
		>
			{priceWithSpace(price)}
			<span className='pl-3'>₽</span>
		</span>
	)
}
