import clsx from 'clsx'
import { HTMLAttributes } from 'react'

type UiHeadingVariant = 'h1' | 'h2' | 'h3' | 'h4'

export type UiHeadingProps = {
	tag: UiHeadingVariant
} & HTMLAttributes<HTMLHeadingElement>

export function UiHeading({ className, tag, ...props }: UiHeadingProps) {
	const Tag = tag || 'h1'

	return (
		<Tag
			{...props}
			className={clsx(
				className,
				'',
				{
					h1: 'text-3xl lg:text-6xl text-app-gray font-semibold md:leading-10',
					h2: 'text-[40px] md:text-[80px] leading-[112%]',
					h3: 'md:text-[20px] text-sm',
					h4: 'text-lg font-semibold'
				}[tag]
			)}
		/>
	)
}
