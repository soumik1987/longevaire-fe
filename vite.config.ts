// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
        'icons/icon-192x192.png',
        'icons/maskable-icon-512.png'
      ],
      manifest: {
        id: "/",  // ✅ Recommended for identity
        name: 'Longevaire',
        short_name: 'Longevaire',
        description: 'Longevaire — wellness & longevity app',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/maskable-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' // ✅ Corrected
          }
        ],
        screenshots: [ // ✅ Removed `form_factor`, which is non-standard
          {
            src: '/screenshots/desktop.png',
            sizes: '1918x863',
            type: 'image/png',
            "form_factor": "wide" 
          },
          {
            src: '/screenshots/mobile.png',
            sizes: '343x756',
            type: 'image/png',
            "form_factor": "narrow" 
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1200
  }
});
