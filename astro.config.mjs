import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
    site: 'https://stevennoack.de', 

    integrations: [
        expressiveCode(), 
        mdx(), 
        starlight({
            title: 'Steven Noack', 
            sidebar: [
                {
                    label: 'Start',
                    items: [
                        { label: 'Übersicht', link: '/' },
                        { label: 'Über mich', link: '/about' },
                    ],
                },
                {
                    label: 'Setup & Installation',
                    collapsed: false,
                    items: [
                        { label: 'Setup-Anleitung', link: '/setup-guide' },
                    ],
                },
                {
                    label: 'Guides & Tutorials',
                    collapsed: true,
                    items: [],
                },
                {
                    label: 'Complete Stacks',
                    collapsed: true,
                    items: [],
                },
                {
                    label: 'Tools & Services',
                    collapsed: true,
                    items: [],
                },
                {
                    label: 'Content',
                    items: [
                        { label: 'Blog', link: '/blog' },
                        { label: 'Sets & Klangreisen', link: '/sets' },
                        { label: 'Zurück zur Hauptseite', link: '/' },
                    ],
                },
            ],
        }),
        sitemap({
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date(),
            filter: (page) => !page.includes('/admin') && !page.includes('/draft'),
        }),
    ],
});