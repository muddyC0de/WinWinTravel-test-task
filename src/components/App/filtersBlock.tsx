import React from 'react'

import { Box, Checkbox, Divider, Grid, Heading } from '@chakra-ui/react'
import { useFilterStore } from 'store/use-filters'

import { FilterItem } from '@api/types/Filter'

interface Props {
	item: FilterItem
}

export const FiltersBlock: React.FC<Props> = ({ item }) => {
	const {
		currentFilters,
		newFilters,
		setNewFilters,
		isOldFilters,
		setIsOldFilters
	} = useFilterStore()

	const onCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		item: string
	) => {
		const isChecked = e.target.checked

		if (isChecked) {
			setNewFilters([...newFilters, item])
		}

		if (!isChecked) {
			setNewFilters(newFilters.filter(id => id !== item))
		}

		setIsOldFilters(false)
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
							isOldFilters
								? currentFilters.includes(option.id)
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
