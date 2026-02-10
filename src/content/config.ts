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

// Nostr Artikel Collection (Long-form Kind 30023)
const nostrArtikel = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    slug: z.string().optional(),
    description: z.string(),
    type: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    series: z.string().optional(),
    part: z.number().optional(),
    date: z.coerce.date(),
    created: z.string().optional(),
    modified: z.string().optional(),
    published_at: z.string().optional(),
    word_count: z.number().optional(),
    reading_time: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    heroImageCaption: z.string().optional(),
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),
    status: z.string().optional(),
    canonical_url: z.string().optional(),
    nostr: z.object({
      kind: z.number().optional(),
      d_tag: z.string().optional(),
      published: z.boolean().optional(),
      note_id: z.string().optional(),
      relays: z.array(z.string()).optional(),
    }).optional(),
    garten: z.object({
      published: z.boolean().optional(),
      url: z.string().optional(),
    }).optional(),
    substack: z.object({
      published: z.boolean().optional(),
      url: z.string().optional(),
    }).optional(),
    author: z.string().optional(),
    author_nip05: z.string().optional(),
    author_npub: z.string().optional(),
    // Nostr Signatur für LLM-Verifizierung
    sig: z.string().optional(),
    // VisionFusen Hero Image Metadaten
    heroImageHash: z.string().optional(),
    heroImageEvent: z.string().optional(),
  }),
});

export const collections = {
  nfo,
  about,
  projects,
  'nostr-artikel': nostrArtikel,
};
