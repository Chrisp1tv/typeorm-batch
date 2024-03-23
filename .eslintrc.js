module.exports = {
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  plugins: ['no-only-tests'],
  extends: ['plugin:prettier/recommended'],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'node_modules',
    'dist',
  ],
  root: true,
  overrides: [
    {
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        'no-console': 'error',
        'no-only-tests/no-only-tests': 'error',
      },
      plugins: ['@typescript-eslint'],
    },
  ],
};
