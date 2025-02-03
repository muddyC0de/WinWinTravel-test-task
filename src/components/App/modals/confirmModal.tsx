import React from 'react'

import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

interface Props {
	title: string
	description?: string
	confirmText: string
	cancelText: string
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmModal: React.FC<Props> = ({
	title,
	description,
	confirmText,
	cancelText,
	isOpen,
	onClose,
	onConfirm,
	onCancel
}) => {
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
					{title}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{description}</ModalBody>
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
						{cancelText}
					</Button>
					<Button
						w={'280px'}
						colorScheme="brand"
						h={'64px'}
						onClick={onConfirm}
						ml={3}
					>
						{confirmText}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
