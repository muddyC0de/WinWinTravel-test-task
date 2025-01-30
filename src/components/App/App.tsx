import { Box, Heading, Stack, Text } from '@chakra-ui/react'

import { useFilterStore } from '@store/useFilters'

import { ConfirmModal } from './confirmModal'
import { FilterModal } from './filterModal'

export const App = () => {
	const {
		isOpen,
		isOldFilters,
		currentFilters,
		newFilters,
		onOpen,
		setIsOldFilters,
		setCurrentFilters,
		setNewFilters
	} = useFilterStore()

	return (
		<Box
			maxW="90rem"
			mx="auto"
			display={'flex'}
			justifyContent="center"
			alignItems="center"
			minH="100dvh"
		>
			<Box
				borderRadius="md"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				gap="1rem"
				w={{ base: '90%', md: '50%' }}
				p={6}
				boxShadow="rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px"
				bg="white"
			>
				<Heading
					size="lg"
					color="teal.500"
					mb={4}
				>
					Filter Store Data
				</Heading>

				<Stack spacing={4}>
					<Box>
						<Heading
							size="md"
							color="gray.700"
						>
							Modal Open State
						</Heading>
						<Text>{isOpen ? 'Open' : 'Closed'}</Text>
					</Box>

					<Box>
						<Heading
							size="md"
							color="gray.700"
						>
							Old Filters State
						</Heading>
						<Text>{isOldFilters ? 'True' : 'False'}</Text>
					</Box>

					<Box>
						<Heading
							size="md"
							color="gray.700"
						>
							Current Filters ids
						</Heading>
						<Text>
							<pre>{JSON.stringify(currentFilters, null, 2)}</pre>
						</Text>
					</Box>

					<Box>
						<Heading
							size="md"
							color="gray.700"
						>
							New Filters ids
						</Heading>
						<Text>
							<pre>{JSON.stringify(newFilters, null, 2)}</pre>
						</Text>
					</Box>
				</Stack>

				<Stack
					direction="row"
					spacing={4}
					justify="center"
					mt={6}
				>
					<Box>
						<Text
							fontSize="sm"
							color="gray.500"
							cursor="pointer"
							onClick={onOpen}
							_hover={{ textDecoration: 'underline' }}
						>
							Open Modal
						</Text>
					</Box>

					<Box>
						<Text
							fontSize="sm"
							color="gray.500"
							cursor="pointer"
							onClick={() => setCurrentFilters(['twin-beds', 'double-bed'])}
							_hover={{ textDecoration: 'underline' }}
						>
							Set Current Filters
						</Text>
					</Box>
					<Box>
						<Text
							fontSize="sm"
							color="gray.500"
							cursor="pointer"
							onClick={() => setNewFilters(['gym', 'spa'])}
							_hover={{ textDecoration: 'underline' }}
						>
							Set New Filters
						</Text>
					</Box>

					<Box>
						<Text
							fontSize="sm"
							color="gray.500"
							cursor="pointer"
							onClick={() => setIsOldFilters(!isOldFilters)}
							_hover={{ textDecoration: 'underline' }}
						>
							Toggle Old Filters
						</Text>
					</Box>
				</Stack>

				<ConfirmModal />
				<FilterModal />
			</Box>
		</Box>
	)
}
