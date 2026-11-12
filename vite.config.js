import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '::',
    port: 5173,
  },
  plugins: [
    react(),
    {
      name: 'dual-stack-host',
      configResolved(config) {
        // Garante escuta dual-stack (IPv6 [::1] + IPv4 127.0.0.1) no Windows
        config.server.host = '::'
      },
    },
  ],
})
