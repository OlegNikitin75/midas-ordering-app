'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'
import { NAV_ITEMS } from '@/constants/nav-items'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/constants/nav-links'

interface IFooterProps {}

export const Footer: FC<IFooterProps> = ({}) => {
	const pathname = usePathname()
	return (
		<footer className='bg-black'>
			<div className='mainContainer'>
				<div className='flex flex-col justify-between gap-4 border-b-[1px] border-app-gray border-opacity-50 py-5 md:flex-row md:items-center md:pb-10 md:pt-12 lg:gap-20'>
					<div className='flex flex-col flex-wrap gap-4 md:flex-row md:gap-10'>
						<Link href='/' className='block h-6 w-[135px]'>
							<Image src='/img/logo.svg' width={135} height={24} alt='Logo' />
						</Link>
						<nav>
							<ul className='Lg:items-center flex flex-col items-start gap-3 md:flex-row lg:gap-8'>
								{NAV_ITEMS.map(item => (
									<li key={item.id}>
										<Link href={item.href} className='text-xs underline opacity-75 hover:opacity-100 duration-300'>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className='shrink-0'>
						<a href='tel:+7 (499) 841-67-29' className='block pr-5 text-base  md:text-[20px] md:inline mb-2 md:mb-0 opacity-75 hover:opacity-100 duration-300'>
							+7 (499) 841-67-29
						</a>
						<a
							href='mailto:delivery@midas.rest'
							className='block text-xs opacity-75 hover:opacity-100 duration-300 underline underline-offset-1 md:inline'
						>
							delivery@midas.rest
						</a>
					</div>
				</div>

				<div className='flex justify-between gap-4 flex-wrap py-5 md:pb-9 md:pt-7 text-xs'>
					<div className=''>© 2020–2024, ООО «MIDAS»</div>

					<Link
						href='/contract'
						className={`${pathname === NAV_LINKS.contract ? 'pointer-events-none opacity-50' : ''} underline opacity-75 hover:opacity-100 duration-300`}
					>
						Пользовательское соглашение
					</Link>
				</div>
			</div>
		</footer>
	)
}
