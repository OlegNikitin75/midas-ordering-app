'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { ILoginFormData } from '@/app/types'
import { UiButton, UiErrorMessage, UiInput } from '@/components/ui'
import { NAV_LINKS } from '@/constants/nav-links'

export const LoginForm = () => {
	const { register, handleSubmit, formState } = useForm<ILoginFormData>({
		mode: 'onChange'
	})

	const emailError = formState.errors['email']?.message
	const passwordError = formState.errors['password']?.message

	const submitData = (data: ILoginFormData) => {
		console.log(data)
	}

	return (
		<div className='w-full max-w-[360px] pt-6 md:pt-10'>
			<form onSubmit={handleSubmit(submitData)}>
				<UiInput
					label='Email'
					inputProps={{
						type: 'text',
						placeholder: 'example@test.com',
						...register('email', {
							required: 'Это поле обязательно',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Неправильный email'
							}
						})
					}}
				/>
				{emailError && <UiErrorMessage error={emailError} />}
				<UiInput
					label='Пароль'
					inputProps={{
						type: 'password',
						placeholder: '******',
						...register('password', {
							required: 'Это поле обязательно',
							minLength: {
								value: 6,
								message: 'Пароль должен содержать не менее 6 символов'
							}
						})
					}}
				/>
				{passwordError && <UiErrorMessage error={passwordError} />}

				<UiButton type='submit' variant='primary' className='my-6'>
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
