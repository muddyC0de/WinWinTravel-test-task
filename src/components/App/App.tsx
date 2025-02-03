import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'

import { useAppliedFiltersStore } from '@store/useAppliedFilters'
import { useFilterModalStore } from '@store/useFilterModal'
import { useNewFiltersStore } from '@store/useNewFilters'

import { FilterModal } from './filterModal'

export const App = () => {
	const isOpen = useFilterModalStore(state => state.isOpen)
	const onOpen = useFilterModalStore(state => state.onOpen)

	const newFilters = useNewFiltersStore(state => state.newFilters)
	const appliedFilters = useAppliedFiltersStore(state => state.appliedFilters)

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
							Applied Filters ids
						</Heading>
						<Text>
							<pre>{JSON.stringify(appliedFilters, null, 2)}</pre>
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
						<Button
							variant={'outline'}
							onClick={onOpen}
						>
							Open Modal
						</Button>
					</Box>
				</Stack>

				<FilterModal />
			</Box>
		</Box>
	)
}
