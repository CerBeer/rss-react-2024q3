import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.ts'
import react from "@vitejs/plugin-react";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['app/__tests__/test-utils/setup.ts'],
      coverage: {
        exclude: [
          ...configDefaults.exclude,
          'src/main.tsx',
          '.eslintrc.cjs',
          'src/__tests__/*',
        ],
      },
    },
    plugins: [react()],
  }),
)
