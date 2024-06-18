import { User } from '@/models/User'
import { connect } from '@/utils/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

interface IRequest {
	
	json(): { name: string } | PromiseLike<{ name: string }>
	name: string
}

export const PUT = async (req: IRequest) => {

	await connect()
	const data = await req.json()
	const session = await getServerSession(authOptions)

	const email = session?.user?.email
	

	try {
		await User.updateOne({email},{name:data.name})
		return new NextResponse('Профиль пользователя изменен', {
			status: 200
		})
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500
		})
	}
}
