import { FoodProductCard } from '@/components/entities/food-product-card'
import { UiHeading } from '@/components/ui'
import { POPULAR_DISHES } from '@/constants/popular-dishes'
import { FC } from 'react'

interface IFavoritesProps {}

export const Favorites: FC<IFavoritesProps> = ({}) => {
	return (
		<section className='md:pt-96  lg:pt-36 2xl:pt-0 pb-10' >
			<div className='mainContainer'>
				<UiHeading tag='h2'>
					Популярные
					<br /> блюда
				</UiHeading>
				<ul className='flex flex-wrap justify-between gap-y-4 py-9'>
					{POPULAR_DISHES?.map(dishes => (
						<li key={dishes.id} className='w-[calc(50%-12px)] md:w-auto'>
							<FoodProductCard item={dishes} />
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
