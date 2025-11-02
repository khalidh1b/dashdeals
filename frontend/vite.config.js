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
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    rollupOptions: {
      output: {

        // Optimize chunk naming for better caching
        chunkFileNames: () => {
            return `assets/[name]-[hash].js`;
        },
        manualChunks: function(id) {
          if (!id) return
          
          // Router chunk - check before general react to avoid conflicts
          if (id.includes('react-router-dom')) {
            return 'router-vendor'
          }
          
          // Query/state management - check before general react to avoid conflicts
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor'
          }
          
          // Payment - only load when needed
          if (id.includes('@stripe')) {
            return 'stripe-vendor'
          }
          
          // UI components library - check before general react to avoid conflicts
          if (id.includes('@radix-ui')) {
            return 'ui-vendor'
          }
          
          // Core React libraries - keep them separate for better caching
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor'
          }
          
          // Firebase - split into smaller chunks for better loading
          if (id.includes('firebase')) {
            return 'firebase-vendor'
          }
          
          // Icons - separate chunk as they can be large
          if (id.includes('lucide-react') || id.includes('react-icons')) {
            return 'icons'
          }
          
          // Form handling
          if (id.includes('react-hook-form')) {
            return 'forms'
          }
          
          // Toast notifications
          if (id.includes('react-hot-toast')) {
            return 'toast'
          }
          
          // Date/time utilities
          if (id.includes('date-fns') || id.includes('dayjs') || id.includes('moment')) {
            return 'date-utils'
          }
          
          // Animation libraries
          if (id.includes('framer-motion') || id.includes('react-spring')) {
            return 'animation'
          }
          
          // Chart libraries
          if (id.includes('chart.js') || id.includes('recharts')) {
            return 'charts'
          }
          
          // Utilities and smaller libraries
          if (
            id.includes('axios') ||
            id.includes('clsx') ||
            id.includes('tailwind-merge') ||
            id.includes('class-variance-authority') ||
            id.includes('sort-by') ||
            id.includes('match-sorter') ||
            id.includes('prop-types')
          ) {
            return 'utils-vendor'
          }
          
          // Development tools
          if (
            id.includes('eslint') ||
            id.includes('prettier') ||
            id.includes('webpack-bundle-analyzer')
          ) {
            return 'dev-tools'
          }
          
          // Other third-party libraries
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },

    // Enable better optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['//console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3,
        unsafe: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        properties: {
          regex: /^_/
        },
        toplevel: true,
      },
      format: {
        comments: false,
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline small assets
    // Enable source maps for production debugging (optional)
    sourcemap: false, // Set to true if needed for debugging
  },
  // Optimize dependencies during development
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    exclude: [
      '@stripe/stripe-js',
      '@stripe/react-stripe-js',
      'firebase/auth',
      'firebase/app'
    ]
  }
});
