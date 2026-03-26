import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration — React plugin enables JSX transform and Fast Refresh
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',
  },
})
