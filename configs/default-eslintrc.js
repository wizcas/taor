// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    camelcase: 'off',
    'no-param-reassign': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',

    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',

    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    'import/no-unresolved': ['error', { caseSensitive: false }],
    'import/extensions': ['error', { ts: 'never', tsx: 'never' }],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type',
          'object',
        ],
      },
    ],
  },
};
