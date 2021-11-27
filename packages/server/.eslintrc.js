const path = require('path');

module.exports = {
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
};
