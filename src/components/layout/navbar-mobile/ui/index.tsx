import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMobileMenuStore } from '@/app/store/store'
import { UiButton, UiUserMessage } from '@/components/ui'
import { NAV_ITEMS } from '@/constants/nav-items'
import { togglePageScrolling } from '@/lib/common'
import { NAV_LINKS } from '@/constants/nav-links'

interface INavbarMobileProps {}

export const NavbarMobile: FC<INavbarMobileProps> = ({}) => {
	const pathname = usePathname()
	const setIsOpenMenu = useMobileMenuStore(state => state.setIsOpenMenu)
	const { data: session } = useSession()

	let userName = session?.user?.name
	if (userName?.includes(' ')) userName = userName.split(' ')[0]

	const handleClick = () => {
		setIsOpenMenu()
		togglePageScrolling()
	}
	return (
		<AnimatePresence>
			<motion.div
				className='absolute z-40 h-screen w-full bg-black px-10 py-7 md:w-80 xl:hidden'
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
			>
				{session && (
					<div className='flex justify-center items-center gap-6'>
						<div className='w-12 h-12' >
								<Image src='/img/person-circle.svg' alt='' width={20} height={20} />
						</div>
					
						<UiUserMessage
							className='block text-center md:hidden'
							name={userName}
						/>
					</div>
				)}
				<nav className='pt-7'>
					<ul className='flex flex-col gap-7'>
						<li>
							<Link
								href='#promotional'
								className='inline-block w-24  rounded-full  bg-app-red px-2 py-1.5 text-center text-sm duration-300 hover:underline lg:hidden'
							>
								Акция
							</Link>
						</li>
						{NAV_ITEMS.map(item => (
							<li key={item.id}>
								<Link
									href={item.href}
									className={`${pathname === item.href ? 'pointer-events-none text-app-yellow' : ''} text-lg uppercase`}
									onClick={handleClick}
								>
									{item.name}
								</Link>
							</li>
						))}
						{!session ? (
							<>
								<li className='rounded-full border-2 border-app-yellow p-2 text-center'>
									<Link href={NAV_LINKS.login} onClick={handleClick}>
										Войти
									</Link>
								</li>
								<li className='rounded-full border-2 border-app-yellow p-2 text-center'>
									<Link href={NAV_LINKS.register} onClick={handleClick}>
										Регистрация
									</Link>
								</li>
							</>
						) : (
							<UiButton onClick={() => signOut()} variant='primary'>
								Выйти
							</UiButton>
						)}
					</ul>
				</nav>
			</motion.div>
		</AnimatePresence>
	)
}
