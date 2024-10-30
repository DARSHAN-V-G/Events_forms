import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/event': {
        target: 'http://localhost:4000', // Replace with your API server
        changeOrigin: true,
      },
    },
    optimizeDeps: {
      exclude: [
        'chunk-7YU3P52A',
        'chunk-2GZ6ZNRT',
        'chunk-LD2PXKD4',
        'chunk-LB6HAPC7',
      ],
    },
  },
})
