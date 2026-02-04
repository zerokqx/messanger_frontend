import tsPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
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
  plugins: [
    tanstackRouter({
      target: 'react',

      generatedRouteTree: APP + '/routeTree.gen.ts',
      autoCodeSplitting: true,
      routesDirectory: APP + '/routes',
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),

    tailwindcss(),

    devtools({}),
    tsPaths(),
    vanillaExtractPlugin(),
  ],
});
