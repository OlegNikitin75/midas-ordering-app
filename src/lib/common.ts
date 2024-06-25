export const priceWithSpace = (price: number | null) =>
	price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const togglePageScrolling = () => {
	const body = document.querySelector('body')
	if (body?.className.includes('noScroll')) {
		body?.classList.remove('noScroll')
	} else body?.classList.add('noScroll')
}

export const isValidateEmail = (email: string) => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
	return emailRegex.test(email)
}

export const setDefaultUserImage = (userName: string | null | undefined) => {
	return userName?.trim().charAt(0)
}
