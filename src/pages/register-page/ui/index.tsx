'use client'
import { FC, FormEvent, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useMobileMenuStore } from '@/app/store/store'
import { NavbarMobile } from '@/components/layout/navbar-mobile'
import { UiHeading } from '@/components/ui'
import { NAV_LINKS } from '@/constants/nav-links'
import { RegisterForm } from '@/components/entities/register-form'

interface IRegisterPageProps {}

export const RegisterPage: FC<IRegisterPageProps> = ({}) => {
	const isOpenMenu = useMobileMenuStore(state => state.isOpenMenu)
	const router = useRouter()
	const { data: session, status: sessionStatus } = useSession()

	useEffect(() => {
		if (sessionStatus === 'authenticated') {
			router.replace(`${NAV_LINKS.home}`)
		}
	}, [sessionStatus, router])

	const handleFormSubmit = async (event: FormEvent) => {}
	if (sessionStatus === 'loading')
		return (
			<div className='mx-auto h-10 w-10 md:h-20 md:w-20'>
				<Image src='/tube-spinner.svg' alt={''} width={20} height={20} />
			</div>
		)

	return (
		sessionStatus === 'unauthenticated' && (
			<section className='relative pb-20'>
				<div className='absolute right-0 -z-10 hidden brightness-50 md:top-[100px] md:block md:h-[504px] md:w-[753px] lg:top-0 lg:h-[450px] lg:w-[520px] lg:brightness-100 xl:h-[500px] xl:w-[600px] 2xl:h-[600px] 2xl:w-[840px]'>
					<Image
						src='/img/register/register-image.jpg'
						alt='about image'
						width={1170}
						height={680}
						className='brightness-50'
					/>
				</div>
				{isOpenMenu && <NavbarMobile />}

				<div className='mainContainer'>
					<UiHeading tag='h2'>Регистрация</UiHeading>
					<div className='w-full max-w-[360px] py-6 md:py-10'>
						<RegisterForm />
					</div>
				</div>
			</section>
		)
	)
}
