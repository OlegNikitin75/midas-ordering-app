'use server'
import { z } from 'zod'
import { LoginSchema } from '@/schemas'

export const login = async (data: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(data)
	if (!validatedFields.success) {
		return { error: 'Некорректные поля!' }
	}
	return { success: 'Форма отправлена' }
}
