import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import { fileURLToPath } from 'url';
import pluginRouter from '@tanstack/eslint-plugin-router';
const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));
export default defineConfig(
  [
    globalIgnores(['dist']),
    {
      files: ['**/*.{ts,tsx}'],

      extends: [
        js.configs.recommended,
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        reactX.configs['recommended-typescript'],
        reactDom.configs.recommended,
        ...pluginRouter.configs['flat/recommended'],
      ],
      rules: {
        '@typescript-eslint/only-throw-error': 'off',
      },

      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parser: tsParser,

        parserOptions: {
          tsconfigRootDir: import.meta.dirname,
          project: [ './tsconfig.app.json'],
        },
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    },
  ],
  globalIgnores([gitignorePath, '**/types/**/v1.d.ts'])
);
