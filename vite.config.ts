import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Allowday — Calendario delle spese',
        short_name: 'Allowday',
        description: 'Sapere ogni giorno quanto puoi spendere senza ansia.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f5f7fb',
        theme_color: '#5c6ac4',
        icons: [
          {
            src: '/icons/allowday-icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
          {
            src: '/icons/allowday-icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /(planner|auth)\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'allowday-api',
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    port: 5173,
    open: true,
    host: true
  }
});
