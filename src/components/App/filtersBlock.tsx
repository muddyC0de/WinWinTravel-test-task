import React from 'react'

import { Box, Checkbox, Divider, Grid, Heading } from '@chakra-ui/react'

import { FilterItem } from '@api/types/Filter'

import { useAppliedFiltersStore } from '@store/useAppliedFilters'
import { useNewFiltersStore } from '@store/useNewFilters'

interface Props {
	item: FilterItem
}

export const FiltersBlock: React.FC<Props> = ({ item }) => {
	const newFilters = useNewFiltersStore(state => state.newFilters)
	const setNewFilters = useNewFiltersStore(state => state.setNewFilters)
	const showAppliedFilters = useNewFiltersStore(
		state => state.showAppliedFilters
	)
	const setShowAppliedFilters = useNewFiltersStore(
		state => state.setShowAppliedFilters
	)

	const appliedFilters = useAppliedFiltersStore(state => state.appliedFilters)

	const updateFilters = (item: string, isChecked: boolean) => {
		const updatedFilters = showAppliedFilters
			? [...appliedFilters]
			: [...newFilters]

		setNewFilters(
			isChecked
				? [...updatedFilters, item]
				: updatedFilters.filter(id => id !== item)
		)

		setShowAppliedFilters(false)
	}

	const onCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		item: string
	) => {
		updateFilters(item, e.target.checked)
	}

	return (
		<Box
			color={'#31393C'}
			display={'flex'}
			flexDirection={'column'}
		>
			<Heading
				fontWeight={'medium'}
				size={'md'}
				marginBottom={'26px'}
			>
				{item.name}
			</Heading>
			<Grid
				templateColumns="repeat(3, 1fr)"
				gap={5}
			>
				{item.options.map(option => (
					<Checkbox
						isChecked={
							showAppliedFilters
								? appliedFilters.includes(option.id)
								: newFilters.includes(option.id)
						}
						onChange={e => onCheckboxChange(e, option.id)}
						key={option.id}
						value={option.id}
					>
						{option.name}
					</Checkbox>
				))}
			</Grid>

			<Divider mt={'30px'} />
		</Box>
	)
}
