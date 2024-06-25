import { FC } from 'react'
import Image from 'next/image'
import {
	UiHeading,
	UiWeightLabel,
	UiPrice,
	UiButtonAddToCart
} from '@/components/ui'
import Link from 'next/link'

interface IFoodProductCardProps {
	item: {
		id: string
		title: string
		image: string
		description: string
		weight: number
		price: {
			oldPrice: number | null
			actualPrice: number
		}
		isPopular: boolean
		discount?: boolean
	}
}

export const FoodProductCard: FC<IFoodProductCardProps> = ({ item }) => {
	return (
		<article className='lg:W-[233px] h-[300px] w-full md:h-[444px] md:w-[225px]'>
			<Link href={'/'} className='group flex h-full flex-col justify-between'>
				<div>
					<div className='relative h-[155px] w-full overflow-hidden md:h-[233px]'>
						<Image
							src={item.image}
							alt={''}
							width={250}
							height={250}
							className='duration-300 group-hover:scale-125'
						/>
					</div>
					<UiHeading tag='h3' className='line-clamp-2 h-12 bg-app-red md:h-16'>
						{item.title}
					</UiHeading>
				</div>

				<div>
					<div className='md:hidden'>
						<UiWeightLabel weight={item.weight} />
					</div>

					<div className='group hidden flex-1 md:block'>
						<UiWeightLabel weight={item.weight} />

						<p className='line-clamp-2 max-h-[4em] pt-3 text-[13px] leading-[138%] opacity-80 duration-500 hover:line-clamp-none group-hover:max-h-20'>
							{item.description}
						</p>
					</div>
					<div className='flex h-16 items-center justify-between px-1'>
						<div className='flex flex-col items-start'>
							{item.discount && (
								<UiPrice price={item.price.oldPrice} discount={item.discount} />
							)}
							<UiPrice price={item.price.actualPrice} />
						</div>
						<UiButtonAddToCart />
					</div>
				</div>
			</Link>
		</article>
	)
}
