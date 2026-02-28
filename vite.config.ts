import tsPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { devtools } from '@tanstack/devtools-vite';

const APP = './src/app';
const PLAYWRIGHT_EXECUTABLE_PATH =
  process.env.PLAYWRIGHT_LAUNCH_OPTIONS_EXECUTABLE_PATH ??
  process.env.PLAYWRIGHT_EXECUTABLE_PATH;

export default defineConfig({
  server: {
    host: '0.0.0.0',
    watch: {
      ignored: [
        '**/.devenv/**',
        '**/.direnv/**',
        '**/node_modules/**',
        '**/.git/**',
      ],
    },
  },
  build: {
    copyPublicDir: true,
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    cssCodeSplit: true,
  },
  server: {
    allowedHosts: ['dev.app.yobble.org'],
    host: true,
    port: 5173,
    hmr: {
      host: 'dev.app.yobble.org',
      protocol: 'wss',
      clientPort: 443,
    },
  },

  preview: {
    host: '0.0.0.0',
    port: 5173,
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
            provider: playwright(
              PLAYWRIGHT_EXECUTABLE_PATH
                ? {
                    launchOptions: {
                      executablePath: PLAYWRIGHT_EXECUTABLE_PATH,
                    },
                  }
                : undefined,
            ),
            instances: [{ browser: 'chromium' }],
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
