import tsPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { devtools } from '@tanstack/devtools-vite';

const APP = './src/app';

export default defineConfig({
  build: {
    copyPublicDir: true,
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    cssCodeSplit: true,
  },

  test: {
    globals: true,
    ui: true,
    exclude: [...configDefaults.exclude, '.devenv/**', '.direnv/**', 'dist/**'],
    setupFiles: './vitest.setup.ts',
    projects: [
      {
        plugins: [
          react({
            babel: {
              plugins: [['babel-plugin-react-compiler']],
            },
          }),
          tsPaths(),
        ],
        test: {
          name: 'node',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.browser.test.{ts,tsx}'],
        },
      },
      {
        plugins: [
          tanstackRouter({
            target: 'react',
            generatedRouteTree: APP + '/route-tree.gen.ts',
            autoCodeSplitting: true,
            routesDirectory: APP + '/routes',
          }),
          react({
            babel: {
              plugins: [['babel-plugin-react-compiler']],
            },
          }),
          tsPaths(),
        ],
        test: {
          name: 'browser',

          include: ['src/**/*.test.{ts,tsx}'],
          setupFiles: './vitest.browser.setup.ts',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'firefox' }],
          },
          exclude: [
            ...configDefaults.exclude,
            '.devenv/**',
            '.direnv/**',
            'dist/**',
          ],
        },
      },
    ],
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      generatedRouteTree: APP + '/route-tree.gen.ts',
      autoCodeSplitting: true,
      routesDirectory: APP + '/routes',
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    devtools({}),
    tsPaths(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ['module', 'main', 'browser'],
    },
  },
});
