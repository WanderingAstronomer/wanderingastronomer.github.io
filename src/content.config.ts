import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    canonicalUrl: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

const presentations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/presentations' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    order: z.number().optional().default(999),
    date: z.date().optional(),
    event: z.string().optional(),
    deckFile: z.string().optional(),
    source: z.enum(['gamma', 'powerpoint', 'other']).optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional().default(0),
  }),
});

export const collections = { blog, presentations };
