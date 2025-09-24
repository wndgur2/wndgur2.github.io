import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react';

import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      manifest: false,
    }),
    tsconfigPaths(),
    react(),
    svgr(),
  ],
  server: {
    proxy: {
      '^/api': 'http://example.com/',
    },
    port: 3000,
  },
})
