import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id) return
          if (id.includes('react-router-dom')) return 'router-vendor'
          if (id.includes('@tanstack/react-query')) return 'query-vendor'
          if (id.includes('@stripe')) return 'stripe-vendor'
          if (id.includes('firebase')) return 'firebase-vendor'
          if (id.includes('@radix-ui')) return 'ui-vendor'
          if (
            id.includes('axios') ||
            id.includes('clsx') ||
            id.includes('tailwind-merge') ||
            id.includes('class-variance-authority') ||
            id.includes('lucide-react')
          ) return 'utils-vendor'
          if (id.includes('react')) return 'react-vendor'
          if (id.includes('node_modules')) return 'vendor'
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})