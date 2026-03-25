/**
 * SoftwareApplication schema for Flexen
 */
export function getAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Flexen',
    operatingSystem: ['Android', 'iOS'],
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Fitness',
    description: 'KI-Coach fuer Fitness, Ernaehrung & Wohlbefinden',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
    },
  }
}

/**
 * FAQPage schema
 */
export function getFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}

/**
 * Organization schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Flexen',
    url: 'https://flexen.app',
    logo: 'https://flexen.app/images/logo.svg',
    sameAs: [],
  }
}

/**
 * BreadcrumbList schema
 */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Article schema for blog posts
 */
export function getArticleSchema(article: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  image?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image,
    url: article.url,
    author: { '@type': 'Organization', name: 'Flexen' },
    publisher: {
      '@type': 'Organization',
      name: 'Flexen',
      logo: { '@type': 'ImageObject', url: 'https://flexen.app/images/logo.svg' },
    },
  }
}
