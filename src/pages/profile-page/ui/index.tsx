'use client'
import { FC, startTransition, useEffect, useState } from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMobileMenuStore } from '@/app/store/store'
import { ProfileSchema } from '@/schemas'
import { IProfileFormData } from '@/app/types'
import { setDefaultUserImage } from '@/lib/common'
import { NavbarMobile } from '@/components/layout/navbar-mobile'
import { UiButton, UiHeading, UiInput, UiMessage } from '@/components/ui'
import { NAV_LINKS } from '@/constants/nav-links'

interface IProfilePageProps {}

export const ProfilePage: FC<IProfilePageProps> = () => {
	const isOpenMenu = useMobileMenuStore(state => state.isOpenMenu)

	const { data: session, status: sessionStatus, update } = useSession()

	const [userAvatar, setUserAvatar] = useState<string | undefined | null>('')
	const [defaultUserAvatar, setDefaultUserAvatar] = useState<
		string | undefined | null
	>('')

	const [error, setError] = useState<string | undefined>('')

	const { register, handleSubmit, formState, setValue } =
		useForm<IProfileFormData>({
			resolver: zodResolver(ProfileSchema),
			mode: 'onChange'
		})

	const nameError = formState.errors.name?.message

	useEffect(() => {
		if (sessionStatus === 'authenticated') {
			setValue('name', session?.user?.name)
			setValue('email', session?.user?.email)

			const userImage = session?.user?.image
			userImage
				? setUserAvatar(userImage)
				: setDefaultUserAvatar(setDefaultUserImage(session?.user?.name))
		}
	}, [session, sessionStatus, setValue, userAvatar])

	const submitData = async (data: IProfileFormData) => {
		const { name } = data
		try {
			const response = await fetch('/api/profile', {
				method: 'PUT',
				body: JSON.stringify({ name }),
				headers: { 'Content-Type': 'application/json' }
			})

			update({ name: name })
			if (response.status === 200) {
				setError('')
			}
		} catch (error) {
			return {
				error:
					'Ошибка обновления профиля пользователя, пожалуйста попробуйте позже'
			}
		}
	}

	const handleProfileInfoUpdate = async (data: IProfileFormData) => {
		console.log(data)
		setError('')
		startTransition(() => {
			submitData(data).then(res => {
				setError(res?.error)
			})
		})
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
						<div className='group relative mt-4 h-32 w-32 shrink-0 '>
							{userAvatar && (
								<Image src={userAvatar} alt='аватар' width={128} height={128} />
							)}

							{defaultUserAvatar && (
								<span
									className={`inline-block h-full w-full bg-app-blue pt-4 text-center text-8xl uppercase`}
								>
									{defaultUserAvatar}
								</span>
							)}

							<button
								type='button'
								className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'
							>
								<div className='h-10  w-10'>
									<Image src='/img/edit.png' alt='' width={20} height={20} />
								</div>
							</button>
						</div>
						<form
							className='grow'
							onSubmit={handleSubmit(handleProfileInfoUpdate)}
						>
							<UiInput
								inputProps={{
									type: 'text',
									...register('name')
								}}
							/>
							{nameError && <UiMessage message={nameError} />}
							<UiInput
								inputProps={{
									type: 'email',
									disabled: true,
									...register('email')
								}}
							/>
							{error && <UiMessage message={error} />}
							<UiButton variant='primary'>
								Сохранить
							</UiButton>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
