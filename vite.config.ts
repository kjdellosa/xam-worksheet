/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTSConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTSConfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup.ts'
  }
})
