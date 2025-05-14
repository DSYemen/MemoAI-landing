import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Attempt to provide a minimal polyfill or mock for async_hooks
      // This is speculative and might not fully work depending on Genkit's usage.
      'node:async_hooks': path.resolve(__dirname, './src/lib/node-async-hooks-stub.ts'),
    },
  },
  server: {
    port: 9002,
  }
})
