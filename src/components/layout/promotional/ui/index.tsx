import { FC } from 'react'
import Image from 'next/image'
import { FoodProductCard } from '@/components/entities/food-product-card'
import { UiHeading } from '@/components/ui'
import { PROMOTIONAL_DISHES } from '@/constants/promotional-dishes'

interface IPromotionalProps {}

export const Promotional: FC<IPromotionalProps> = ({}) => {
	return (
		<section id='promotional' className='py-10'>
			<div className='mainContainer'>
				<UiHeading tag='h2'>
					Акционные <br /> блюда
				</UiHeading>
				<div className='flex justify-between gap-4 py-9 md:gap-4'>
					<div className='flex w-[calc(50%-12px)] md:w-1/3 flex-1  flex-col items-center bg-app-red pt-20 text-center 2xl:w-1/4'>
						<span className='text-4xl font-normal tracking-wide md:text-7xl'>
							-10 %
						</span>
						<span className='hidden gap-2  text-2xl font-bold text-app-yellow lg:flex'>
							Акция
							<div className=' animate-pulse'>
								<Image src='/img/fire-icon.png' alt='' width={12} height={12} />
							</div>
						</span>
					</div>

					<ul className='flex md:w-2/3 lg:w-3/4 w-1/2 flex-wrap justify-center gap-4'>
						{PROMOTIONAL_DISHES?.map(dishes => (
							<li key={dishes.id} className='w-full md:w-auto'>
								<FoodProductCard item={dishes} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
