import { z, ZodType } from 'zod'
import {
	ILoginFormData,
	IProfileFormData,
	IRegisterFormData
} from '@/app/types'

export const LoginSchema: ZodType<ILoginFormData> = z.object({
	email: z
		.string()
		.min(1, { message: 'Поле является обязательным' })
		.email({ message: 'Неверный формат email' }),
	password: z
		.string()
		.min(1, { message: 'Поле является обязательным' })
		.min(6, { message: 'Пароль должен включать не менее 6 символов' })
})

export const RegisterSchema: ZodType<IRegisterFormData> = z.object({
	name: z.string().min(1, { message: 'Поле является обязательным' }),
	email: z
		.string()
		.min(1, { message: 'Поле является обязательным' })
		.email({ message: 'Неверный формат email' }),
	password: z
		.string()
		.min(1, { message: 'Поле является обязательным' })
		.min(6, { message: 'Пароль должен включать не менее 6 символов' })
})

export const ProfileSchema: ZodType<IProfileFormData> = z.object({
	name: z.string().min(1, { message: 'Поле является обязательным' }),
	email: z.string(),
})
