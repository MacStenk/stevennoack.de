import { defineCollection, z } from 'astro:content';

// NFO Content Collection
const nfo = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    typewriterSpeed: z.number().default(50),
    typewriterDelay: z.number().default(0),
  }),
});

// About Content Collection
const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    prompt: z.string(),
  }),
});

// Projects Content Collection
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['Active', 'Building', 'Planned', 'Archived']),
    url: z.string().url().optional(),
    order: z.number().default(999),
    techTags: z.array(z.string()),
  }),
});

export const collections = {
  nfo,
  about,
  projects,
};
