const builtInModules = require('builtin-modules')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'standard',
    'prettier/standard',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier', 'eslint-plugin-import-helpers', '@typescript-eslint'],
  rules: {
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off',
    'prettier/prettier': 'warn',
    'import-helpers/order-imports': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        },
        groups: [`/^(${builtInModules.join('|')})$/`, 'module', [('parent', 'sibling', 'index')]],
        newlinesBetween: 'always'
      }
    ]
  }
}
