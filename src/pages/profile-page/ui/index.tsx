'use client'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { NavbarMobile } from '@/components/layout/navbar-mobile'
import { UiButton, UiButtonWithIcon, UiHeading, UiInput } from '@/components/ui'
import { useMobileMenuStore } from '@/app/store/store'
import { NAV_LINKS } from '@/constants/nav-links'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { AnimatePresence, motion } from 'framer-motion'

interface IProfilePageProps {}

type ImageType = {
	userImage: string | StaticImport | null | undefined
}

export const ProfilePage: FC<IProfilePageProps> = () => {
	const isOpenMenu = useMobileMenuStore(state => state.isOpenMenu)
	const { data: session, status: sessionStatus } = useSession()
	const [userName, setUserName] = useState('')
	const [error, setError] = useState('')
	useEffect(() => {
		if (sessionStatus === 'authenticated') {
			const currentUserName = session?.user?.name
			setUserName(currentUserName)
		}
	}, [session, sessionStatus])

	const userImage: ImageType = session?.user?.image

	const handleProfileInfoUpdate = async () => {
		try {
			const res = await fetch('/api/profile', {
				method: 'PUT',
				body: JSON.stringify({ name: userName }),
				headers: { 'Content-Type': 'application/json' }
			})

			if (res.status === 200) {
				setError('')
			}
		} catch (error) {
			setError(
				'Ошибка обновления профиля пользователя, пожалуйста попробуйте позже'
			)
		}
	}

	if (sessionStatus === 'loading')
		return (
			<div className='absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 md:h-20 md:w-20'>
				<Image src='/tube-spinner.svg' alt={''} width={20} height={20} />
			</div>
		)
	if (sessionStatus === 'unauthenticated') {
		redirect(`${NAV_LINKS.login}`)
	}

	return (
		<section className='relative pb-20'>
			{isOpenMenu && <NavbarMobile />}
			<div className='mainContainer'>
				<UiHeading tag='h2' className='md:max-w-80'>
					Профиль
				</UiHeading>

				<div className='mx-auto w-full max-w-md py-10'>
					<div className='flex gap-4'>
						<div className='group relative mt-4 h-32 w-32 shrink-0 overflow-hidden rounded-lg'>
							<Image src={userImage} alt='аватар' width={128} height={128} />
							<button
								type='button'
								className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'
							>
								<div className='h-10  w-10'>
									<Image src='/img/edit.png' alt='' width={20} height={20} />
								</div>
							</button>
						</div>
						<form className='grow' onSubmit={handleProfileInfoUpdate}>
							<UiInput
								onChange={event => setUserName(event.target.value)}
								inputProps={{
									placeholder: 'Имя и фамилия',
									type: 'text',
									value: userName
								}}
							/>
							<UiInput
								inputProps={{
									type: 'text',
									value: session?.user?.email,
									disabled: true
								}}
							/>
							<UiButton variant='primary'>Сохранить</UiButton>
						</form>
						{error && (
							<AnimatePresence>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='pb-2 text-center text-base font-semibold text-app-red'
								>
									{error}
								</motion.div>
							</AnimatePresence>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
