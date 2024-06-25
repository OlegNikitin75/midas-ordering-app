'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { NAV_ITEMS } from '@/constants/nav-items'
import { UiButton, UiButtonWithIcon, UiUserMessage } from '@/components/ui'
import { useMobileMenuStore } from '@/app/store/store'
import { togglePageScrolling } from '@/lib/common'
import { NAV_LINKS } from '@/constants/nav-links'
import { useOutsideClick } from '@/hooks/use-outside-click'

export const Header = () => {
	const pathname = usePathname()
	const isOpenMenu = useMobileMenuStore(state => state.isOpenMenu)
	const setIsOpenMenu = useMobileMenuStore(state => state.setIsOpenMenu)
	const { ref, isActive, setIsActive } = useOutsideClick(false)

	const { data: session } = useSession()
	let userName = session?.user?.name
	if (userName?.includes(' ')) userName = userName.split(' ')[0]

	const handleClick = () => {
		setIsOpenMenu()
		togglePageScrolling()
	}
	const handleLogoClick = () => {
		if (isOpenMenu) {
			togglePageScrolling()
			setIsOpenMenu()
		}
	}

	const toggleShowPopup = () => {
		setIsActive(!isActive)
	}

	return (
		<header>
			<div className='mainContainer'>
				<div className='flex items-center justify-between gap-2 py-10 xl:gap-8'>
					<Link onClick={handleLogoClick} href='/' className='h-4 w-[88px]'>
						<Image src='/img/logo.svg' width={170} height={30} alt='Logo' />
					</Link>
					<div className=' flex items-center gap-3 xl:hidden'>
						<UiButtonWithIcon onClick={handleClick}>
							{!isOpenMenu ? (
								<Image
									className='object-contain'
									src='/img/burger-icon.svg'
									width={37}
									height={16}
									alt=''
								/>
							) : (
								<Image
									className='object-contain'
									src='/img/close-icon.svg'
									width={27}
									height={27}
									alt=''
								/>
							)}
							<span
								className={`${isOpenMenu ? 'text-app-yellow' : ''} ml-3 hidden text-xs uppercase md:block`}
							>
								{isOpenMenu ? 'Закрыть' : 'Меню'}
							</span>
						</UiButtonWithIcon>
					</div>
					<nav className='hidden flex-1 items-center justify-between gap-8 uppercase xl:flex'>
						<ul className='flex items-center gap-8'>
							<Link
								href='#promotional'
								className='hidden w-24  rounded-full  bg-app-red px-2 py-1.5 text-center text-sm duration-300 hover:underline lg:inline-block'
							>
								Акция
							</Link>
							{NAV_ITEMS.map(item => (
								<li key={item.id}>
									<Link
										href={item.href}
										className={`${pathname === item.href ? 'pointer-events-none text-app-yellow' : ''} text-xs duration-300 hover:text-app-yellow`}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className='flex items-center gap-8'>
						<UiButtonWithIcon onClick={handleClick}>
							<Image
								className='object-contain'
								src='/img/cart-icon-header.svg'
								width={37}
								height={16}
								alt=''
							/>
							<span className='absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-app-red text-xs'>
								2
							</span>
						</UiButtonWithIcon>
						<a href='tel:+375 (29) 668-32-08' className='md:hidden'>
							<UiButtonWithIcon>
								<Image
									className='object-contain'
									src='/img/phone-icon.svg'
									width={37}
									height={16}
									alt=''
								/>
							</UiButtonWithIcon>
						</a>
						<div className='relative hidden md:block'>
							<UiButtonWithIcon onClick={toggleShowPopup}>
								<Image
									className='object-contain'
									src='/img/person-circle.svg'
									width={37}
									height={16}
									alt=''
								/>
							</UiButtonWithIcon>

							<div
								ref={ref}
								className={`${isActive ? 'visible opacity-100 transition-all duration-300' : 'invisible opacity-0 transition-all duration-300'} absolute right-0 top-7 z-40 flex w-48 flex-col gap-4 rounded-sm bg-app-blue p-4`}
							>
								{!session ? (
									<>
										<Link
											onClick={toggleShowPopup}
											href={NAV_LINKS.login}
											className='transition-all duration-300 hover:text-app-yellow'
										>
											Войти
										</Link>
										<Link
											onClick={toggleShowPopup}
											href={NAV_LINKS.register}
											className='transition-all duration-300 hover:text-app-yellow'
										>
											Регистрация
										</Link>
									</>
								) : (
									<UiButton onClick={() => signOut()} variant='primary'>
										Выйти
									</UiButton>
								)}
							</div>
						</div>
						{session && pathname !== NAV_LINKS.profile && (
							<UiUserMessage
								name={userName}
								className='-ml-6 hidden md:block'
							/>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
