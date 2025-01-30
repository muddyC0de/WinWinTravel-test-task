import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const defaultControlStylesOnAction = {
	bg: 'white',
	borderColor: '#31393C'
}

const baseStyle = definePartsStyle({
	control: {
		bg: 'white',
		borderWidth: '2px',
		borderColor: '#31393C',
		borderRadius: 3,

		_hover: {
			...defaultControlStylesOnAction,
			_checked: defaultControlStylesOnAction
		},
		_checked: defaultControlStylesOnAction
	},
	icon: {
		color: 'black',
		// svg has inline stroke-width param, so I don't see any other way to set this parameter.
		strokeWidth: '0.0625rem!important'
	},
	label: {
		ml: '0.75rem',
		fontSize: '16px'
	}
})

const mdSize = definePartsStyle({
	control: {
		w: '20px',
		h: '20px'
	},
	icon: {
		fontSize: '0.65rem'
	}
})

export const checkboxTheme = defineMultiStyleConfig({
	baseStyle,
	defaultProps: {
		size: 'md'
	},
	sizes: {
		md: mdSize
	}
})
