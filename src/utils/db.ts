import mongoose from 'mongoose'

export const connect = async () => {
	if (mongoose.connections[0].readyState) return
	try {
		const url = process.env.MONGO_URL || ''
		await mongoose.connect(url)
		console.log('Подключились')
	} catch (error) {
		throw new Error('Ошибка подключения к базе данных')
	}
}
