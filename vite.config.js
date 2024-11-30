import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Ensure proper build output for Vercel
  build: {
    outDir: 'dist'
  }
})