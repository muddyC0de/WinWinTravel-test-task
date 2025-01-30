import React from 'react'

import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useConfirmStore } from 'store/use-confirm'
import { useFilterStore } from 'store/use-filters'

import { FilterItem } from '@api/types/Filter'

import { FiltersBlock } from './filtersBlock'

export const FilterModal: React.FC = () => {
	const { onOpen: onOpenConfirm } = useConfirmStore()
	const { isOpen, onClose, setNewFilters } = useFilterStore()

	const fetchFilters = async (): Promise<FilterItem[]> => {
		const response = await fetch('/filterData.json')
		const data = await response.json()
		return data.filterItems
	}

	const onApply = () => {
		onClose()
		onOpenConfirm()
	}

	const onClearParameters = () => {
		setNewFilters([])
	}

	const { isPending, error, data } = useQuery({
		queryKey: ['filters'],
		queryFn: fetchFilters
	})

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent maxW={'none'}>
				<ModalHeader
					mb={'25px'}
					color={'#31393C'}
				>
					Filter
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{isPending && <div>Loading...</div>}
					{error && <div>Error: {error.message}</div>}
					{data &&
						data.map(item => (
							<Box
								key={item.id}
								mb={'25px'}
							>
								<FiltersBlock item={item} />
							</Box>
						))}
				</ModalBody>

				<ModalFooter
					display={'flex'}
					position={'relative'}
					justifyContent={'center'}
				>
					<Button
						colorScheme="brand"
						borderRadius={'sm'}
						w={'184px'}
						onClick={onApply}
					>
						Apply
					</Button>

					<Box
						position={'absolute'}
						right={'0'}
						top={'4'}
						color={'primary.100'}
						textDecoration={'underline'}
						textDecorationColor={'primary.100'}
						textUnderlineOffset={'0.1875rem'}
						role="button"
						onClick={onClearParameters}
					>
						Clear all parameters
					</Box>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
