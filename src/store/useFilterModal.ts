import { create } from 'zustand'

interface FilterModalState {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useFilterModalStore = create<FilterModalState>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))
