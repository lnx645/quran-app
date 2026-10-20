import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Vendor dipisah ke chunk sendiri agar cache browser efektif antar deploy:
// react + react-dom + react-router + @emotion jarang berubah.
// (Rolldown di Vite 8 hanya menerima manualChunks bentuk fungsi.)
const VENDOR_RE =
  /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]|[\\/]node_modules[\\/]@emotion[\\/]/

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules') && VENDOR_RE.test(id)) return 'vendor'
        },
      },
    },
  },
})
