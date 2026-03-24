import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import sentry from '@sentry/astro';

import tailwindcss from '@tailwindcss/vite';

import remarkDirective from 'remark-directive';
import remarkLock from './src/plugins/remark-lock.mjs';
import gwernPopups from 'astro-gwern-popups';

export default defineConfig({
  site: 'https://stevennoack.de',
  integrations: [sentry(), sitemap(), gwernPopups()],
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
