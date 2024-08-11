import { defineConfig, configDefaults } from 'vitest/config'
import react from "@vitejs/plugin-react";

export default 
  defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['src/__tests__/setup.ts'],
      coverage: {
        exclude: [
          ...configDefaults.exclude,
          '.eslintrc.cjs',
          'src/__tests__/*',
          'src/app/layout.tsx',
          'next.config.mjs'
        ],
      },
    },
  })
