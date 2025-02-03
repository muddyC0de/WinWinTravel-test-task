import { create } from 'zustand'

interface AppliedFilterState {
	appliedFilters: string[]
	applyFilters: (filters: string[]) => void
}

export const useAppliedFiltersStore = create<AppliedFilterState>(set => ({
	appliedFilters: [],
	applyFilters: filters => set({ appliedFilters: filters })
}))
