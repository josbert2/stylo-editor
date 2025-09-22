import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Optimización para monorepos
  server: {
    watch: {
      ignored: ['!**/node_modules/stylo-editor/**']
    }
  },
  optimizeDeps: {
    include: ['stylo-editor'],
    force: true
  }
});