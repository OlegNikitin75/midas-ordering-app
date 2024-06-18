'use client'
import { CONTRACT } from '@/constants/contract'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'

interface IContractPageProps {}

export const ContractPage: FC<IContractPageProps> = ({}) => {
	const [openId, setOpenId] = useState<number | string | null>(null)

	

	

	const handleClick = (id: number) => {
		if (String(id) === openId) setOpenId(null)
		else setOpenId(String(id))
	}
	

	return (
		<div className='min-h-screen py-12'>
			<div className='mainContainer'>
				<div className='mb-10 text-center text-4xl'>
					Пользовательское соглашение
				</div>
				<ul>
					{CONTRACT?.map((item, index) => (
						<li key={item.title} className='py-3'>
							<div className='flex items-center gap-16'>
								<button
									onClick={() => handleClick(index + 1)}
									className='h-12 w-12 rounded-full bg-app-yellow p-3'
								>
									{openId === item.id ? (
										<Image
											src='/img/chevron-down.svg'
											alt='icon'
											width={12}
											height={12}
										/>
									) : (
										<Image
											src='/img/chevron-right.svg'
											alt='icon'
											width={12}
											height={12}
										/>
									)}
								</button>
								<div>
									{index + 1}. {item.title}
								</div>
							</div>
							{openId === item.id && (
								<motion.div
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 0.3,
										ease: [0, 0.71, 0.2, 1.01],
										scale: {
											type: 'spring',
											damping: 10,
											stiffness: 100,
											restDelta: 0.001
										}
									}}
									className='pl-28 whitespace-pre-line'
								>
									{item.text}
								</motion.div>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
