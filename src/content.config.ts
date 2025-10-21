// src/content/content.config.ts

import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

// 1. Definiert die Docs (Starlight) Collection
const docs = defineCollection({ schema: docsSchema() });

// 2. Definiert die neue Blog Collection (für src/content/blog)
const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        description: z.string().optional(),
        // ⚠️ WICHTIG: Nur categories (plural), NICHT categories!
        categories: z.string().optional(), // ← Multiple Kategorien
        tags: z.array(z.string()).optional(), // Mehrere Tags
        author: z.string().optional(),
    }),
});

// Exportiert beide Collections, damit Astro sie verarbeitet
export const collections = { docs, blog };