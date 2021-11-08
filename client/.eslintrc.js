// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    camelcase: 'off',
    'no-param-reassign': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-nested-ternary': 'off',

    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-no-bind': 'off',

    'jsx-a11y/label-has-associated-control': 'off',

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
