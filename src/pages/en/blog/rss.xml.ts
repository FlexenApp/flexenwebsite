import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((p) => p.data.locale === 'en' && !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  return rss({
    title: 'Flexen Blog',
    description:
      'Tips and insights on fitness, nutrition, and AI-powered training — straight from Flexen.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/en/blog/${post.id}/`,
    })),
    customData: '<language>en-US</language>',
  })
}
