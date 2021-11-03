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
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'no-use-before-define': 'off',

    '@typescript-eslint/no-use-before-define': ['error'],

    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],

    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/extensions': [2, { ts: 'never', tsx: 'never' }],
  },
};
