import { User } from '@/models/User'
import { connect } from '@/utils/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

interface IRequest {
	json():
		| { name: string; email: string; password: string }
		| PromiseLike<{ name: string; email: string; password: string }>
	name: string
	email: string
	password: string
}

export const POST = async (req: IRequest) => {
	const { name, email, password } = await req.json()

	await connect()

	const existingUser = await User.findOne({ email })
	if (existingUser)
		return new NextResponse('Такой пользователь уже зарегистрирован', {
			status: 400
		})
	const hashedPassword = await bcrypt.hash(password, 5)
	const newUser = new User({ name, email, password: hashedPassword })

	try {
		await newUser.save()
		return new NextResponse('Новый пользователь зарегистрирован', {
			status: 200
		})
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500
		})
	}
}
