import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    },
    // hmr: {
    //   host: 'http://10.0.0.77',
    // },
    proxy: {
      '/api': {
        target: 'http://10.0.0.77:8000',
        changeOrigin: true,
      },
    },
    cors: {
         origin: 'http://10.0.0.77'
    },
  },
  // server: {
  //   hmr: {
  //     host: "localhost",
  //     protocol: "ws",
  //   },
  // },
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  //   host: '0.0.0.0',
  //   strictPort: true,
  //   port: 5173,
  //   hmr: {
  //     clientPort: 5173,
  //   },
  // }
  // server: {
  //   proxy: {
  //     'http://10.0.0.77:5173': {
  //       target: 'http://10.0.0.77:8000', // Django backend add
  //       changeOrigin: true,
  //                   },
  //   },
  // },
})
