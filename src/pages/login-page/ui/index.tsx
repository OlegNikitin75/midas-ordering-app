'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {  useSession } from 'next-auth/react'
import { useMobileMenuStore } from '@/app/store/store'
import { NavbarMobile } from '@/components/layout/navbar-mobile'
import { UiHeading } from '@/components/ui'
import { NAV_LINKS } from '@/constants/nav-links'
import { LoginForm } from '@/components/entities/login-form'

export const LoginPage = ({}) => {
	const isOpenMenu = useMobileMenuStore(state => state.isOpenMenu)

	const { data: session, status: sessionStatus } = useSession()

	const router = useRouter()

	useEffect(() => {
		if (sessionStatus === 'authenticated') {
			router.replace(`${NAV_LINKS.home}`)
		}
	}, [sessionStatus, router])


	if (sessionStatus === 'loading')
		return (
			<div className='mx-auto h-10 w-10 md:h-20 md:w-20'>
				<Image src='/tube-spinner.svg' alt={''} width={20} height={20} />
			</div>
		)

	return (
		
			<section className='relative pb-20'>
				<div className='absolute right-0 -z-10 hidden brightness-50 md:top-[100px] md:block md:h-[504px] md:w-[753px] lg:top-0 lg:h-[450px] lg:w-[520px] lg:brightness-100 xl:h-[500px] xl:w-[600px] 2xl:h-[600px] 2xl:w-[840px]'>
					<Image
						src='/img/login/login-image.jpg'
						alt='Салат овощной с сухариками'
						width={1170}
						height={680}
						className='brightness-50'
					/>
				</div>
				{isOpenMenu && <NavbarMobile />}

				<div className='mainContainer'>
					<UiHeading tag='h2' className='md:max-w-80'>
						Войти на сайт
					</UiHeading>
					<LoginForm/>
				</div>
			</section>
		)
}
