// apps/web/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: [
        // raíz de tu app web
        path.resolve(__dirname),
        // carpeta del paquete que quieres leer fuera del root
        path.resolve(__dirname, '../../packages/stylo-editor'),
      ],
      // Si estás en WSL o FS de red:
      // strict: false,
    },
    // Si no te detecta cambios en Linux/WSL:
    // watch: { usePolling: true, interval: 100 },
  },
  optimizeDeps: {
    exclude: ['stylo-editor'],
  },
})
