module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'max-len': ['error', { code: 130 }],
    'import/no-extraneous-dependencies': ['off', {
      devDependencies: ['/**/*.test.ts', '/**/*.spec.ts'],
    }],
    'no-param-reassign': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
