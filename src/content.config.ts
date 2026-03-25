import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['ernaehrung', 'training', 'ki-tech', 'erfolgsgeschichten']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    locale: z.enum(['de', 'en']).default('de'),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
