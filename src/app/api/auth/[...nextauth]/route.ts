import { User } from '@/models/User'
import { connect } from '@/utils/db'
import bcrypt from 'bcryptjs'
import { Account, User as AuthUser } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

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
		async jwt({
			token,
			user,
			session,
			trigger
		}: {
			token: any
			user: AuthUser
			session: any
			trigger: any
		}) {
			//console.log('jwt callback', { token, user, session })
			if (trigger === 'update' && session?.name) {
				token.name = session.name
			}

			if (user) {
				return {
					...token,
					id: user.id,
					name: user.name
				}
			}
			return token
		},
		async session({
			session,
			token,
			user
		}: {
			token: any
			user: AuthUser
			session: any
		}) {
			//console.log('session callback', { token, user, session })
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					name: token.name
				}
			}
		},

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
							email: user.email,
							name: user.name
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
export { handler as GET, handler as POST}
