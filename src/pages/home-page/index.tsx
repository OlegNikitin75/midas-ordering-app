'use client'
import { FC } from 'react'
import { useMobileMenuStore } from '@/app/store/store'
import { Hero } from '@/components/layout/hero'
import { NavbarMobile } from '@/components/layout/navbar-mobile'
import { AnimatePresence, motion } from 'framer-motion'
import { Favorites } from '@/components/layout/favorites'
import { Promotional } from '@/components/layout/promotional'

interface IHomePageProps {}

export const HomePage: FC<IHomePageProps> = ({}) => {
	const isOpenMenu = useMobileMenuStore(state => state.isOpenMenu)
	return (
		<div className='min-h-[2120px] md:min-h-[3550px] lg:min-h-[3580px] xl:min-h-[2980px]'>
			{isOpenMenu && <NavbarMobile />}
			<Hero />
			<Favorites/>
			<Promotional/>
		</div>
	)
}
