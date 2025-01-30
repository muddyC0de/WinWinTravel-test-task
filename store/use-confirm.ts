import { create } from 'zustand'

interface ConfirmState {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useConfirmStore = create<ConfirmState>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))
