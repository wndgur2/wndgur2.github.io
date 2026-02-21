// eslint.config.js
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
