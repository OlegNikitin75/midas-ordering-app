import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { NAV_LINKS } from '@/constants/nav-links'

export const DashboardPage = async () => {
	const session = await getServerSession()
	console.log(session);
	
	if (!session) redirect(`${NAV_LINKS.login}`)
	return <div>DASHBOARD</div>
}
