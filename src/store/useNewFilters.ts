import { create } from 'zustand'

interface NewFiltersState {
	showAppliedFilters: boolean
	setShowAppliedFilters: (isOldFilters: boolean) => void
	newFilters: string[]
	setNewFilters: (filters: string[]) => void
	resetFilters: () => void
}

export const useNewFiltersStore = create<NewFiltersState>(set => ({
	showAppliedFilters: false,
	setShowAppliedFilters: showAppliedFilters => set({ showAppliedFilters }),
	newFilters: [],
	setNewFilters: filters => set({ newFilters: filters }),
	resetFilters: () => set({ newFilters: [] })
}))
