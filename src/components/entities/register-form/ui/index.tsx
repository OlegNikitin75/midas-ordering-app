'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import { IRegisterFormData } from '@/app/types'
import { UiButton, UiInput, UiMessage } from '@/components/ui'
import { NAV_LINKS } from '@/constants/nav-links'

export const RegisterForm = () => {
	const { register, handleSubmit, formState } = useForm<IRegisterFormData>({
		resolver: zodResolver(RegisterSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const nameError = formState.errors.name?.message
	const emailError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message

	const Router = useRouter()

	const [isPending, startTransition] = useTransition()

	const [error, setError] = useState<string | undefined>('')

	const submitData = async (data: IRegisterFormData) => {
		const { name, email, password } = data

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				body: JSON.stringify({ name, email, password }),
				headers: { 'Content-Type': 'application/json' }
			})

			if (response.status === 400)
				return { error: 'Такой пользователь уже зарегистрирован' }

			if (response.status === 200) {
				setError('')
				Router.push('/login')
			}
		} catch (error) {
			return {
				error: 'Ошибка создания пользователя, пожалуйста попробуйте позже'
			}
		}
	}

	const handleFormSubmit = async (data: IRegisterFormData) => {
		setError('')
		startTransition(() => {
			submitData(data).then(res => {
				setError(res?.error)
			})
		})
	}

	return (
		<div className='w-full max-w-[360px] pt-6 md:pt-10'>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<UiInput
					error={nameError}
					label='Имя и фамилия'
					inputProps={{
						disabled: isPending,
						type: 'text',
						placeholder: 'Иван Иванов',
						...register('name')
					}}
				/>
				{nameError && <UiMessage message={nameError} />}

				<UiInput
					error={emailError}
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
					error={passwordError}
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

				<UiButton
					disabled={isPending}
					type='submit'
					variant='primary'
					className='my-6'
				>
					Создать аккаунт
				</UiButton>
			</form>

			<div className='my-5 text-center text-sm text-app-gray '>
				Уже есть аккаунт?{' '}
				<Link
					href={NAV_LINKS.login}
					className='mx-2 font-semibold text-app-yellow underline'
				>
					Войти <span className='text-lg'>&#187;</span>
				</Link>
			</div>
		</div>
	)
}
