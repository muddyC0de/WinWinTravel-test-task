import { create } from 'zustand'

interface FilterState {
	isOpen: boolean
	isOldFilters: boolean
	setIsOldFilters: (isOld: boolean) => void
	onOpen: () => void
	onClose: () => void
	currentFilters: string[]
	newFilters: string[]
	setCurrentFilters: (filters: string[]) => void
	setNewFilters: (filters: string[]) => void
}

export const useFilterStore = create<FilterState>(set => ({
	isOpen: false,
	isOldFilters: false,

	setIsOldFilters: isOld => set({ isOldFilters: isOld }),

	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),

	currentFilters: [],
	newFilters: [],
	setCurrentFilters: filters =>
		set({
			currentFilters: filters
		}),
	setNewFilters: filters => set({ newFilters: filters })
}))
