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

import { getFilters } from '@/services/filters'
import { useAppliedFiltersStore } from '@store/useAppliedFilters'
import { useFilterModalStore } from '@store/useFilterModal'
import { useNewFiltersStore } from '@store/useNewFilters'

import { FiltersBlock } from './filtersBlock'
import { ConfirmModal } from './modals'

export const FilterModal: React.FC = () => {
	const [isOpenConfirm, setIsOpenConfirm] = React.useState(false)
	const isOpen = useFilterModalStore(state => state.isOpen)
	const onClose = useFilterModalStore(state => state.onClose)

	const applyFilters = useAppliedFiltersStore(state => state.applyFilters)
	const { setNewFilters, newFilters, setShowAppliedFilters, resetFilters } =
		useNewFiltersStore()

	const onCloseConfirm = () => setIsOpenConfirm(false)
	const onOpenConfirm = () => setIsOpenConfirm(true)

	const onConfirm = () => {
		if (newFilters.length) {
			applyFilters(newFilters)
		}
		onCloseConfirm()
		resetFilters()
	}

	const onCancel = () => {
		setShowAppliedFilters(true)
		resetFilters()
		onCloseConfirm()
	}

	const onApply = () => {
		setShowAppliedFilters(true)
		onClose()
		onOpenConfirm()
	}

	const onClearParameters = () => {
		setNewFilters([])
		setShowAppliedFilters(false)
	}

	const { isPending, error, data } = useQuery({
		queryKey: ['filters'],
		queryFn: getFilters
	})

	console.log(111)
	return (
		<>
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
			<ConfirmModal
				title="Do you want to apply new filter"
				confirmText="Apply new filter"
				cancelText="Use old filter"
				isOpen={isOpenConfirm}
				onClose={onCloseConfirm}
				onConfirm={onConfirm}
				onCancel={onCancel}
			/>
		</>
	)
}
