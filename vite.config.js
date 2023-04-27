import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //host: 'rinhack.local',
    proxy: {
      '/api': {
        target: 'http://api.rinhack.local:8000',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
})
