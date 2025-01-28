import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@stripe/stripe-js': '/node_modules/@stripe/stripe-js',
      '@paypal/react-paypal-js': '/node_modules/@paypal/react-paypal-js',
    },
  },
  optimizeDeps: {
    include: ['jwt-decode'], // Explicitly include jwt-decode
  },
})
