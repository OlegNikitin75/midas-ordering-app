import NextAuth from 'next-auth/next'
import { Account, User as AuthUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { User } from '@/models/User'
import { connect } from '@/utils/db'

export const authOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				name: { label: 'Name', type: 'text' },
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials: any) {
				await connect()
				try {
					const user = await User.findOne({ email: credentials.email })
					if (user) {
						const isPasswordCorrect = await bcrypt.compare(
							credentials.password,
							user.password
						)
						if (isPasswordCorrect) {
							return user
						}
					}
				} catch (error: any) {
					throw new Error(error)
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || '',
			clientSecret: process.env.GOOGLE_SECRET || ''
		})
	],
	callbacks: {
		async signIn({ user, account }: { user: AuthUser; account: Account }) {
			if (account?.provider === 'credentials') {
				return true
			}
			if (account?.provider === 'google') {
				await connect()
				try {
					const existingUser = await User.findOne({ email: user.email })
					if (!existingUser) {
						const newUser = new User({
							email: user.email
						})
						await newUser.save()
						return true
					}
					return true
				} catch (error) {
					console.log('Ошибка сохранения пользователя', error)
					return false
				}
			}
		}
	}
}
export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }