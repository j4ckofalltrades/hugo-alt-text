import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['assets/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'script',
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'strict': ['error', 'function'],
      'no-var': 'off',
      'prefer-const': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'indent': ['error', 2],
      'no-console': 'warn'
    }
  }
];
