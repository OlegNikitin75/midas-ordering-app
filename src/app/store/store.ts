import { create } from 'zustand'

interface IMobileMenuState {
	isOpenMenu: boolean
	setIsOpenMenu: () => void
}

export const useMobileMenuStore = create<IMobileMenuState>()(set => ({
	isOpenMenu: false,
	setIsOpenMenu: () => set(state => ({ isOpenMenu: !state.isOpenMenu }))
}))
