import React from 'react'

import {
	Button,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

import { useConfirmStore } from '@store/useConfirm'
import { useFilterStore } from '@store/useFilters'

export const ConfirmModal: React.FC = () => {
	const {
		currentFilters,
		newFilters,
		setCurrentFilters,
		setNewFilters,
		setIsOldFilters
	} = useFilterStore()
	const { isOpen, onClose } = useConfirmStore()

	const onConfirm = () => {
		setCurrentFilters([...newFilters])
		setIsOldFilters(false)
		onClose()
	}

	const onCancel = () => {
		setNewFilters(currentFilters)
		setIsOldFilters(true)
		onClose()
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent maxW={'none'}>
				<ModalHeader
					borderBottom={'none'}
					fontSize="40px"
					fontWeight="medium"
					marginBottom={'60px'}
					color={'gray.500'}
				>
					Do you want to apply new filter
				</ModalHeader>
				<ModalCloseButton />

				<ModalFooter
					display={'flex'}
					justifyContent={'center'}
					gap={'16px'}
				>
					<Button
						variant={'outline'}
						colorScheme="gray"
						h={'64px'}
						w={'280px'}
						onClick={onCancel}
					>
						Use old filter
					</Button>
					<Button
						w={'280px'}
						colorScheme="brand"
						h={'64px'}
						onClick={onConfirm}
						ml={3}
					>
						Apply new filter
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
