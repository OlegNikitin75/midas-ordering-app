'use client'
import { FC, FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMobileMenuStore } from '@/app/store/store'
import { NavbarMobile } from '@/components/layout/navbar-mobile'
import { UiButton, UiHeading, UiInput } from '@/components/ui'
import { NAV_LINKS } from '@/constants/nav-links'
import { isValidateEmail } from '@/lib/common'

interface IRegisterPageProps {}

export const RegisterPage: FC<IRegisterPageProps> = ({}) => {
	const isOpenMenu = useMobileMenuStore(state => state.isOpenMenu)
	const router = useRouter()
	const { data: session, status: sessionStatus } = useSession()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [checked, setChecked] = useState(false)
	const [error, setError] = useState('')

	const isComplete = !!name && !!email && !!password && checked

	useEffect(() => {
		if (sessionStatus === 'authenticated') {
			router.replace(`${NAV_LINKS.home}`)
		}
	}, [sessionStatus, router])

	const handleFormSubmit = async (event: FormEvent) => {
		event.preventDefault()
		if (!name) return
		if (!isValidateEmail(email)) {
			setError('Email не корректен')
			return
		}
		if (!password || password.length < 6) {
			setError('Пароль не корректен')
			return
		}

		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				body: JSON.stringify({ name, email, password }),
				headers: { 'Content-Type': 'application/json' }
			})
			if (res.status === 400) {
				setError('Такой пользователь уже зарегистрирован')
			}
			if (res.status === 200) {
				setError('')
				router.push('/login')
			}
		} catch (error) {
			setError('Ошибка создания пользователя, пожалуйста попробуйте позже')
		}
	}
	if (sessionStatus === 'loading')
		return (
			<div className='mx-auto h-10 w-10 md:h-20 md:w-20'>
				<Image src='/tube-spinner.svg' alt={''} width={20} height={20} />
			</div>
		)

	return (
		sessionStatus !== 'authenticated' && (
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
						<form
						
						onSubmit={handleFormSubmit}
					>
						<UiInput
							inputProps={{ type: 'text', value: name,placeholder:'Имя' }}
							onChange={event => setName(event.target.value)}
						/>
						<UiInput
							inputProps={{ type: 'text', value: email,placeholder:'Email' }}
							onChange={event => setEmail(event.target.value)}
						/>
						<UiInput
							inputProps={{
								type: 'password',
								value: password,
								placeholder:'Пароль'
							}}
							onChange={event => setPassword(event.target.value)}
						/>
						<div className='mb-6 mt-4 flex items-center gap-4'>
							<label className='flex items-center gap-3 text-[13px] text-app-gray'>
								<input
									type='checkbox'
									name=''
									id=''
									checked={checked}
									onChange={() => setChecked(!checked)}
									style={{ width: '16px', height: '16px' }}
								/>
								Я согласен с правилами сервиса
							</label>
						</div>
						<UiButton
							isComplete={isComplete}
							variant='primary'
							type='submit'
						>
							Зарегистрироваться
						</UiButton>
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

						<div className='my-5 text-center text-sm text-app-gray '>
							Уже есть аккаунт?{' '}
							<Link
								href={NAV_LINKS.login}
								className='mx-2 font-semibold text-app-yellow underline'
							>
								Войти <span className='text-lg'>&#187;</span>
							</Link>
						</div>
					</form>
					</div>
					
				</div>
			</section>
		)
	)
}
