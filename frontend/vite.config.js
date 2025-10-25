import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: { 
      "@": path.resolve(__dirname, "./src"),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React 
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          
          // Router vendor
          if (id.includes('react-router-dom')) {
            return 'router-vendor';
          }
          
          // Query vendor
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
          
          // Stripe vendor
          if (id.includes('@stripe')) {
            return 'stripe-vendor';
          }
          
          // Firebase vendor
          if (id.includes('firebase')) {
            return 'firebase-vendor';
          }
          
          // UI vendor
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          
          // Utils vendor
          if (id.includes('axios') || id.includes('clsx') || 
              id.includes('tailwind-merge') || id.includes('class-variance-authority') ||
              id.includes('lucide-react')) {
            return 'utils-vendor';
          }
          
          // Large node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
