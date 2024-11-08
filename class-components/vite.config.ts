/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? './' : './',
  build:{
    sourcemap: false,
    minify: 'esbuild',
  },
  esbuild: process.env.NODE_ENV === 'production' ? {
    drop: ['console', 'debugger'],
  } : {},
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
  },
})
