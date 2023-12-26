import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest
    }),
    vue()
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
