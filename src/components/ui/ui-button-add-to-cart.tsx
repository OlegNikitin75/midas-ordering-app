import { FC } from 'react'

interface IUiButtonAddToCartProps {}

export const UiButtonAddToCart: FC<IUiButtonAddToCartProps> = ({}) => {
	return (
		<button
			type='button'
			className=' h-9 w-9 md:h-11 md:w-11 rounded bg-app-yellow bg-opacity-75 bg-[url("/img/cart-icon.svg")] bg-center bg-no-repeat duration-300 hover:bg-opacity-100'
		></button>
	)
}
