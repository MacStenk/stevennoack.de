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
        // NEU: Kategorien und Tags
        category: z.string().optional(), // Einzelne Kategorie
        tags: z.array(z.string()).optional(), // Mehrere Tags
        author: z.string().optional(),
    }),
});

// Exportiert beide Collections, damit Astro sie verarbeitet
export const collections = { docs, blog };