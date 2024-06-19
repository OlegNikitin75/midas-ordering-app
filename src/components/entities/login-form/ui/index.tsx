'use client'
import { useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import router from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { ILoginFormData } from '@/app/types'
import { UiButton, UiInput, UiMessage } from '@/components/ui'
import { NAV_LINKS } from '@/constants/nav-links'
import { login } from '@/actions/login'
import { LoginSchema } from '@/schemas'

export const LoginForm = () => {
	const { register, handleSubmit, formState } = useForm<ILoginFormData>({
		resolver: zodResolver(LoginSchema),
		mode: 'onChange'
	})

	const emailError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message

	const [isPending, startTransition] = useTransition()

	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	const handleFormSubmit = async (data: ILoginFormData) => {
		startTransition(() => {
			login(data).then(res => {
				setError(res.error)
				setSuccess(res.success)
			})
		})

		// const res = await signIn('credentials', {
		// 	redirect: false,
		// 	email,
		// 	password
		// })
		// if (res?.url) router.replace(`${NAV_LINKS.home}`)
	}
	return (
		<div className='w-full max-w-[360px] pt-6 md:pt-10'>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<UiInput
					label='Email'
					inputProps={{
						disabled: isPending,
						type: 'email',
						placeholder: 'example@test.com',
						...register('email')
					}}
				/>
				{emailError && <UiMessage message={emailError} />}
				<UiInput
					label='Пароль'
					inputProps={{
						disabled: isPending,
						type: 'password',
						placeholder: '******',
						...register('password')
					}}
				/>
				{passwordError && <UiMessage message={passwordError} />}
				{error && <UiMessage message={error} />}
				{success && <UiMessage message={success} type='success' />}

				<UiButton
					disabled={isPending}
					type='submit'
					variant='primary'
					className='my-6'
				>
					Войти
				</UiButton>
			</form>
			<UiButton
				onClick={() => {
					signIn('google')
				}}
				variant='secondary'
				className='my-3 flex min-w-[264px] items-center justify-center gap-2'
			>
				<span className='inline-block h-6 w-6'>
					<Image src='/img/google-icon.png' width={16} height={16} alt='' />
				</span>
				Войти с Google
			</UiButton>

			<div className='my-5 text-center text-[13px] text-app-gray '>
				Еще нет аккаунта?{' '}
				<Link
					href={NAV_LINKS.register}
					className='mx-2 font-semibold text-app-yellow hover:underline'
				>
					Зарегистрироваться <span className='text-lg'>&#187;</span>
				</Link>
			</div>
		</div>
	)
}
