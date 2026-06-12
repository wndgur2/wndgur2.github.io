import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      manifest: false,
      workbox: {
        // Let the Loop project Pages (wndgur2.github.io/loop/*) be served from the
        // network instead of this blog's SPA shell — otherwise the SW's navigation
        // fallback hijacks /loop/* and renders the blog's 404.
        navigateFallbackDenylist: [/^\/loop\//],
      },
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
