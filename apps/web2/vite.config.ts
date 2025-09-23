import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['!**/node_modules/stylo-editor/**'],
    }
  },
  
  // Fuerza la optimización de la dependencia
  optimizeDeps: {
    include: ['stylo-editor'],
    force: true
  },
  
  // Actualiza el alias para poder usar 'stylo-editor' directamente
  resolve: {
    alias: {
      'stylo-editor': path.resolve(__dirname, '../../packages/stylo-editor/src')
    }
  }
})
