import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import i18Next from 'eslint-plugin-i18next'
import preferArrow from 'eslint-plugin-prefer-arrow'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [
	{
		ignores: ['**/dist', '**/.eslintrc.cjs', 'tmp']
	},
	...fixupConfigRules(
		compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:react-hooks/recommended',
			'plugin:react/recommended',
			'plugin:prettier/recommended',
			'plugin:@tanstack/eslint-plugin-query/recommended'
		)
	),
	{
		plugins: {
			'react-refresh': reactRefresh,
			'prefer-arrow': preferArrow,
			i18next: i18Next
		},

		languageOptions: {
			globals: {
				...globals.browser
			},

			parser: tsParser
		},

		settings: {
			react: {
				version: 'detect'
			}
		},

		rules: {
			'react/react-in-jsx-scope': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'prettier/prettier': 'warn',

			'react-refresh/only-export-components': [
				'warn',
				{
					allowConstantExport: true
				}
			],

			'no-restricted-syntax': [
				'error',
				{
					selector:
						'ImportDeclaration[source.value=/.svg/][source.value=/\\u002E\\u002E\\u002Fassets/]',
					message:
						'Use the global alias "@assets" instead of a relative path to the icon'
				},
				{
					selector:
						'ImportDeclaration[source.value=/\\u002Esvg/] ImportDefaultSpecifier[local.name!=/Icon/]',
					message:
						'Not allowed to import SVG icons as components without the "Icon" suffix at the end.'
				},
				{
					selector:
						'ImportDeclaration[source.value=/@\\u002F(api|assets|components|constants|pages|providers|store|temp|types|utils)/]',
					message: 'Use alias `@{folderName}/` instead of `@/{folderName}/`'
				}
			],

			'prefer-arrow/prefer-arrow-functions': [
				'error',
				{
					disallowPrototype: true,
					singleReturnOnly: false,
					classPropertiesAllowed: false
				}
			],

			'prefer-arrow-callback': [
				'error',
				{
					allowNamedFunctions: true
				}
			],

			'func-style': [
				'error',
				'expression',
				{
					allowArrowFunctions: true
				}
			],

			'array-callback-return': 'error',
			'no-await-in-loop': 'error',
			'no-constant-binary-expression': 'error',
			'no-duplicate-imports': 'error',
			'no-template-curly-in-string': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable-loop': 'error',
			'no-use-before-define': 'error',
			camelcase: 'error',

			'id-length': [
				'error',
				{
					exceptions: ['_', 'w', 'h', 'e', 'i', 'j', 'k', 'p', 'm', 't']
				}
			],

			eqeqeq: ['error', 'smart'],
			'dot-notation': 'error',
			curly: 'error',
			'no-lonely-if': 'error',
			'no-return-assign': 'error',
			'no-multi-str': 'error',
			'no-implicit-coercion': 'error',
			'i18next/no-literal-string': 'off'
		}
	}
]
