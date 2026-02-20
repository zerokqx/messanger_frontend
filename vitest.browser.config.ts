import { configDefaults, defineConfig } from 'vitest/config';

import tsPaths from 'vite-tsconfig-paths';
import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tsPaths()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'firefox' }],
    },
    exclude: [...configDefaults.exclude, '.devenv/**', '.direnv/**', 'dist/**'],
  },
});
