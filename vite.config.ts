import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
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
  ],
  server: {
    proxy: {
      '^/api': 'http://example.com/',
    },
    port: 3000,
  },
})
