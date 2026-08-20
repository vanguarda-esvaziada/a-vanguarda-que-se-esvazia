import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Caminhos relativos para que o build sirva também em file:// e em subdiretório.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'dist', assetsDir: 'recursos' },
})
