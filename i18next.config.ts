import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['ru', 'en'],
  types: {
    input: ['./public/locales/en/*.json'],
    output: './src/shared/i18next/types/i18next.d.ts',
  },
  extract: {
    input: 'src/**/*.{ts,tsx}',
    output: 'locales/{{language}}/{{namespace}}.json',
  },
});
