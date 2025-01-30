import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
	borderColor: '#AAA',
	borderWidth: '2px'
})

export const dividerTheme = defineStyleConfig({
	baseStyle
})
