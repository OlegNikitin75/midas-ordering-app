'use client'
import { FC } from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useMobileMenuStore } from '@/app/store/store'
import { NavbarMobile } from '@/components/layout/navbar-mobile'
import { UiHeading } from '@/components/ui'
import { AboutSlider } from '@/components/entities/about-slider'
import { NAV_LINKS } from '@/constants/nav-links'

const slides = [
	{
		id: '1',
		image: '/img/about/slide_1.jpg',
		title: 'Фермерское хозяйство "Дальний уголок"'
	},
	{
		id: '2',
		image: '/img/about/slide_2.jpg',
		title: 'Фермерское хозяйство "Куток"'
	},
	{
		id: '3',
		image: '/img/about/slide_3.jpg',
		title: 'Крестьянское хозяйство Ивановых'
	},
	{
		id: '4',
		image: '/img/about/slide_4.jpg',
		title: 'Фермерское хозяйство "Овощная долина"'
	},
	{
		id: '5',
		image: '/img/about/slide_5.jpg',
		title: 'Рыбное хозяйство "Серебряный пруд"'
	},
	{
		id: '6',
		image: '/img/about/slide_6.jpg',
		title: 'Крестьянское хозяйство "Ягодная поляна"'
	}
]

interface IAboutPageProps {}

export const AboutPage: FC<IAboutPageProps> = ({}) => {
	const session = useSession()

	if (session.status === 'unauthenticated') redirect(`${NAV_LINKS.home}`)

	const isOpenMenu = useMobileMenuStore(state => state.isOpenMenu)
	return (
		<section className='relative pb-20'>
			<div className='absolute right-0 -z-10 hidden brightness-50 md:top-[100px] md:block md:h-[504px] md:w-[753px] lg:top-0 lg:h-[450px] lg:w-[520px] lg:brightness-100 xl:h-[500px] xl:w-[600px] 2xl:h-[600px] 2xl:w-[840px]'>
				<Image
					src='/img/about/about-image_1.jpg'
					alt='about image'
					width={1170}
					height={680}
					className=''
				/>
			</div>
			{isOpenMenu && <NavbarMobile />}

			<div className='mainContainer'>
				<UiHeading tag='h2'>О нас</UiHeading>
				<div className='about w-full pt-8 text-base md:w-1/2 md:pt-16 lg:pr-16 lg:pt-10'>
					<p className='mb-3 text-xl 2xl:text-3xl'>
						<span className='font-bold text-app-yellow'>MIDAS</span> - это
						заботливый сервис доставки еды из настоящих продуктов.
					</p>
					<p className='2xl:text-xl'>
						Наши повара готовят с огромной любовью, чтобы радовать Вас каждым
						кусочком, подарив Вам незабываемое удовольствие от блюда.
					</p>
					<p className='2xl:text-22xl'>
						Для приготовления еды мы используем только натуральные фермерские
						продукты.
					</p>
					<p className='2xl:text-2xl'>
						Наши поставщики — это небольшие фермерские и семейные крестьянские
						хозяйства.
					</p>
				</div>
				<div className='flex flex-col justify-between gap-6 py-10 md:flex-row md:py-20 2xl:py-32'>
					<article className='flex flex-col items-center gap-4 rounded-lg border-2 border-app-gray bg-app-yellow p-2 text-black md:w-56 lg:w-60 2xl:w-96'>
						<div className='h-12 w-12'>
							<Image
								src='/img/about/ok-icon.svg'
								alt='icon'
								width={12}
								height={12}
							/>
						</div>
						<div>
							<span className='block text-center text-lg font-semibold uppercase'>
								ЛЕГКО!
							</span>
							<p className='text-center'>
								Заказать любимое блюдо или попробовать что-то новое?
								Сравнивайте, выбирайте, заказывайте!
							</p>
						</div>
					</article>
					<article className='flex  flex-col items-center gap-4 rounded-lg border-2 border-app-gray bg-app-yellow p-2 text-black md:w-56 lg:w-60 2xl:w-96'>
						<div className='h-12 w-12'>
							<Image
								src='/img/about/food-icon.svg'
								alt='icon'
								width={12}
								height={12}
							/>
						</div>
						<div>
							<span className='block text-center text-lg font-semibold uppercase'>
								УДОБНО!
							</span>
							<p className='text-center'>
								Вы можете оформить заказ всего в несколько кликов или просто
								позвоните и сделайте заказ по телефону.
							</p>
						</div>
					</article>
					<article className='flex flex-col items-center gap-4 rounded-lg border-2 border-app-gray bg-app-yellow p-2 text-black md:w-56 lg:w-60 2xl:w-96'>
						<div className='h-12 w-12'>
							<Image
								src='/img/about/cutlery-icon.svg'
								alt='icon'
								width={12}
								height={12}
							/>
						</div>
						<div>
							<span className='block text-center text-lg font-semibold uppercase'>
								ВКУСНО!
							</span>
							<p className='text-center'>
								Еда из фермерских продуктов с доставкой к Вам домой. Проведите
								уютный вечер дома наслаждаясь лучшими блюдами!
							</p>
						</div>
					</article>
				</div>
				<UiHeading tag='h4' className='mb-4 text-center'>
					Наши поставщики
				</UiHeading>
				<AboutSlider slides={slides} />
			</div>
		</section>
	)
}
