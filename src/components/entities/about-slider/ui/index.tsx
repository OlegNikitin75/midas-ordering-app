import { FC } from 'react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import '@/app/globals.css'


interface IAboutSliderProps {
	slides: {
		id: string
		image: string
		title: string
	}[]
}

export const AboutSlider: FC<IAboutSliderProps> = ({ slides }) => {
	return (
		<>
			<Swiper
				slidesPerView={1}
				spaceBetween={10}
				navigation={true}
				loop={true}
				autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
				modules={[Navigation,Autoplay]}
				className='aboutSlider'
				
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 50
					}
				}}
			>
				{slides?.map(item => (
					<SwiperSlide key={item.id} className='h-full'>
						<a href='/' className='group'>
							<span className='group-hover:text-black'>{item.title}</span>
							<Image
								src={item.image}
								alt={item.title}
								width={100}
								height={100}
							/>
						</a>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}
