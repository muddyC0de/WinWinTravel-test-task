import React from 'react'
import { useTranslation } from 'react-i18next'

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

	const { t } = useTranslation()
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
						{t('filterModal.title')}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{isPending && <div>{t('filterModal.loading')}</div>}
						{error && (
							<div>{t('filterModal.error', { message: error.message })}</div>
						)}
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
							{t('filterModal.apply')}
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
							{t('filterModal.clearParameters')}
						</Box>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<ConfirmModal
				title={t('filterModal.confirmTitle')}
				confirmText={t('filterModal.confirmText')}
				cancelText={t('filterModal.cancelText')}
				isOpen={isOpenConfirm}
				onClose={onCloseConfirm}
				onConfirm={onConfirm}
				onCancel={onCancel}
			/>
		</>
	)
}
