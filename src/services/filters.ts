import { FilterItem } from '@api/types/Filter'

export const getFilters = async (): Promise<FilterItem[]> => {
	try {
		const response = await fetch('/filterData.json')
		const data = await response.json()
		return data.filterItems
	} catch (error) {
		console.error('[FETCHING_ERROR]', error)
		return []
	}
}
