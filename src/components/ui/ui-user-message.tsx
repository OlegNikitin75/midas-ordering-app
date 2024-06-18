import { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { NAV_LINKS } from '@/constants/nav-links'

interface IUiUserMessageProps {
	name: string | null | undefined
	className?: string
}

export const UiUserMessage: FC<IUiUserMessageProps> = ({ name, className }) => {
	return (
		<Link className={clsx(className, 'text-sm uppercase text-app-yellow')} href={NAV_LINKS.profile}>
			<span className='mx-2'>{name}</span>
		</Link>
	)
}
