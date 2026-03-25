import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((p) => p.data.locale === 'de' && !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  return rss({
    title: 'Flexen Blog',
    description:
      'Tipps und Insights zu Fitness, Ernährung und KI-gestütztem Training — direkt von Flexen.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/de/blog/${post.id}/`,
    })),
    customData: '<language>de-DE</language>',
  })
}
