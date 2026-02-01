import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

import remarkDirective from 'remark-directive';
import remarkLock from './src/plugins/remark-lock.mjs';

export default defineConfig({
  site: 'https://stevennoack.de',
  integrations: [sitemap()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  markdown: {
    remarkPlugins: [remarkDirective, remarkLock],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
