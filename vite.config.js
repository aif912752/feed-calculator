import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  base: './', // ใช้ relative path
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.js',
    exclude: [...configDefaults.exclude, 'e2e/*']
  }
});
