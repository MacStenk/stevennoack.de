import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://stevennoack.de',
  integrations: [sitemap()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  vite: {
    plugins: [tailwindcss()]
  }
});