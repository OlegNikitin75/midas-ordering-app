import {
	UiButtonAddToCart,
	UiHeading,
	UiPrice,
	UiWeightLabel
} from '@/components/ui'
import { FoodProductCard } from '@/components/entities/food-product-card'
import Image from 'next/image'
import { FC } from 'react'
import Link from 'next/link'

const item = {
	id: '1',
	title: 'Тирамису',
	image: '/img/benefits/image 1.png',
	description:
		'Десерт, в состав которого входят сыр маскарпоне, кофе, куриные яйца, сахар и печенье, припудренный какао-порошком',
	weight: 250,

	price: {
		oldPrice: 1400,
		actualPrice: 1100
	},
	isPopular: false,
	isBenefit: true,
	discount: true
}

const banner = {
	id: '1',
	image: '/img/hero-image.png',
	title: 'Стейк из лосося с овощами',
	description:
		'Нежный стейк дикого лосося, пропитанный соком и ароматом слегка обжаренных фермерских овощей',
	weight: 250,
	price: 1100
}

interface IHeroProps {}

export const Hero: FC<IHeroProps> = ({}) => {
	return (
		<section className='relative lg:min-h-[488px] 2xl:min-h-[925px]'>
			<div className='absolute right-0 z-20 hidden md:top-[100px] md:block md:h-[504px] md:w-[753px] lg:top-0 lg:h-[532px] lg:w-[628px] 2xl:h-[700px] 2xl:w-[900px]'>
				<Image
					src={banner.image}
					alt={banner.title}
					width={1170}
					height={838}
				/>
				<div className='absolute -bottom-[250px] h-[355px] w-[355px] bg-[url("/img/hero-label-bg.svg")] px-12 py-10 md:left-5 lg:left-20'>
					<div className='w-[220px]'>
						<span className='text-[25px] leading-tight'>{banner.title}</span>
						<UiWeightLabel weight={banner.weight} />
						<p className='py-3 text-[15px] opacity-80'>{banner.description}</p>
						<div className='flex items-center gap-4'>
							<UiPrice price={banner.price} />
							<UiButtonAddToCart />
						</div>
					</div>
				</div>
			</div>
			<div className='absolute -left-3 hidden h-48 w-32 -translate-y-1/4 bg-[url("/img/dots-left.svg")] md:top-[120px] md:block lg:top-[220px] 2xl:w-40'></div>
			<div className='mainContainer relative lg:min-h-[488px] 2xl:min-h-[925px]'>
				<div className='hidden h-[480px] flex-row justify-between md:flex lg:max-w-[500px] lg:flex-col lg:pt-8'>
					<div className='md:flex-1'>
						<UiHeading tag='h1' className='mb-8 lg:w-full'>
							Доставка готовой еды из фермерских продуктов!
						</UiHeading>
					</div>

					<div className='mb-10 flex flex-col'>
						<a
							href='tel:+375 (29) 668-32-08'
							className='text-[25px] duration-300 hover:text-app-yellow'
						>
							+375 (29) 668-32-08
						</a>
						<a
							href='mailto:delivery@midas.rest'
							className='text-lg underline  underline-offset-2 duration-300 hover:text-app-yellow'
						>
							delivery@midas.rest
						</a>
					</div>
				</div>
			</div>
			<div className='absolute -bottom-96 -right-3 z-30 hidden h-64 bg-[url("/img/dots-right.svg")] md:-bottom-[18rem] md:block md:w-44 lg:bottom-44 lg:w-32 2xl:w-40'></div>
			<div className='flex flex-col'></div>
		</section>
	)
}
