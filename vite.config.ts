import tsPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
import { devtools } from '@tanstack/devtools-vite';
const APP = './src/app';
export default defineConfig({
  build: {
    sourcemap: true,
    cssCodeSplit: true,
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: APP + '/routes',
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),

    tailwindcss(),

    devtools(),
    tsPaths(),
    vanillaExtractPlugin(),
  ],
});
