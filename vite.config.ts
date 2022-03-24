import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3003,
  },
  plugins: [preact()],
})
