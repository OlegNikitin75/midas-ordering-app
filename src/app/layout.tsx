import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import SessionProvider from '@/utils/SessionProvider'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
	subsets: ['cyrillic'],
	weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
	title: 'MIDAS',
	description: 'Доставка готовой еды из фермерских продуктов!',
	icons: {
		icon: '/favicon.png'
	}
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession()

	return (
		<html lang='ru'>
			<body className={montserrat.className}>
				<SessionProvider session={session}>
					<Header />
					<main className='min-h-screen'>{children}</main>
					<Footer />
				</SessionProvider>
			</body>
		</html>
	)
}
