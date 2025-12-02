import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://stevennoack.de',
  integrations: [sitemap()],
  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    plugins: [tailwindcss()]
  }
});