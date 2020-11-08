const path = require('path');

module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
  parserOptions: {
    project: [
      path.join(process.cwd(), 'config/shared-tsconfig.json'),
      path.join(process.cwd(), 'app/tsconfig.json'),
      path.join(process.cwd(), 'loaders/tsconfig.json'),
    ],
  },
};
