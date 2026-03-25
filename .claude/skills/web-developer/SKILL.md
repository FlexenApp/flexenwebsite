---
name: web-developer
description: "Flexen Website Developer Skill. Use for Astro/React components, routing, SEO implementation, structured data, performance optimization, Core Web Vitals, build setup, deployment, and technical infrastructure."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Flexen Website — Developer Skill

Du bist ein Senior Web Developer spezialisiert auf Astro, React und Performance-Optimierung. Du baust die technische Infrastruktur der Flexen Website.

**Kontext laden:** Lies IMMER zuerst `WEBSITE_STRATEGIE.md` (Kapitel 6, 8, 12, 13) und `CLAUDE.md` bevor du arbeitest.

---

## Tech Stack

```
Astro 5          — Static Site Generator, zero JS by default
React 19         — Islands fuer interaktive Komponenten
Tailwind CSS 4   — Utility-First Styling
TypeScript       — Strict Mode
GSAP 3           — Animation Library (client-side)
Lenis            — Smooth Scrolling (client-side)
```

## Projekt-Setup

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://flexen.app',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind(),
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-US' } }
    }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
})
```

### Ordnerstruktur
```
src/
  components/
    astro/           — Statische Komponenten (.astro)
    react/           — Interaktive Islands (.tsx)
  layouts/
    BaseLayout.astro — HTML Shell, Fonts, Meta, OG, hreflang
    BlogLayout.astro — Blog Post Layout
  pages/
    de/
      index.astro
      features.astro
      preise.astro
      impressum.astro
      datenschutz.astro
      blog/
        [...slug].astro
    en/
      index.astro
      features.astro
      pricing.astro
      imprint.astro
      privacy.astro
      blog/
        [...slug].astro
  content/
    blog/             — Markdown Posts (Astro Content Collections)
  styles/
    global.css        — CSS Variables, Base Styles, Font Faces
    animations.css    — Keyframes, Utility Classes
  lib/
    animations.ts     — GSAP Setup, ScrollTrigger Helpers
    smooth-scroll.ts  — Lenis Init
    seo.ts            — Structured Data Generators
    i18n.ts           — Translation Helpers
  i18n/
    de.json
    en.json
  assets/
    images/
    fonts/
    lottie/
public/
  robots.txt
  favicon.svg
  og/                 — Open Graph Images
```

---

## SEO Implementation

### Structured Data (JSON-LD)
```typescript
// lib/seo.ts
export function getAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Flexen',
    operatingSystem: ['Android', 'iOS'],
    applicationCategory: 'HealthApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: 'XXXX', // TODO: echte Zahl
    },
  }
}

export function getFAQSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
```

### BaseLayout Head (Pflicht auf jeder Seite)
```astro
---
// BaseLayout.astro
const { title, description, ogImage, locale = 'de', canonicalPath } = Astro.props
const canonical = `https://flexen.app${canonicalPath}`
const altLocale = locale === 'de' ? 'en' : 'de'
const altPath = canonicalPath.replace(`/${locale}/`, `/${altLocale}/`)
---
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <!-- hreflang -->
  <link rel="alternate" hreflang="de" href={`https://flexen.app/de${canonicalPath.replace(/^\/(de|en)/, '')}`} />
  <link rel="alternate" hreflang="en" href={`https://flexen.app/en${canonicalPath.replace(/^\/(de|en)/, '')}`} />
  <link rel="alternate" hreflang="x-default" href={`https://flexen.app/de${canonicalPath.replace(/^\/(de|en)/, '')}`} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage || 'https://flexen.app/og/default.jpg'} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content={locale === 'de' ? 'de_DE' : 'en_US'} />

  <!-- Fonts: Preload fuer LCP -->
  <link rel="preload" href="/fonts/SpaceGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/DMSans-Variable.woff2" as="font" type="font/woff2" crossorigin />
</head>
<html lang={locale}>
```

---

## Performance-Checkliste

### Core Web Vitals Targets
| Metrik | Ziel |
|--------|------|
| LCP | < 2.0s |
| INP | < 150ms |
| CLS | < 0.05 |

### Image Optimization
```astro
---
// Astro Image Component — automatisch WebP/AVIF
import { Image } from 'astro:assets'
import heroImg from '../assets/images/hero.png'
---
<Image
  src={heroImg}
  alt="Flexen App Dashboard"
  widths={[640, 750, 828, 1080, 1200]}
  formats={['avif', 'webp']}
  loading="eager"  /* Hero: eager, Rest: lazy */
  fetchpriority="high"
/>
```

### Bundle Budget
| Resource | Max (gzip) |
|----------|-----------|
| Total | < 500 KB |
| JavaScript | < 150 KB |
| CSS | < 50 KB |
| Fonts | < 100 KB |
| Above-Fold Images | < 200 KB |

### Caching Headers (vercel.json)
```json
{
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

---

## i18n Pattern

```typescript
// lib/i18n.ts
import de from '../i18n/de.json'
import en from '../i18n/en.json'

const translations = { de, en } as const

export function t(locale: 'de' | 'en', key: string): string {
  return translations[locale]?.[key] ?? key
}

export function localePath(locale: 'de' | 'en', path: string): string {
  return `/${locale}${path}`
}
```

### Sprach-Switcher (kein Flaggen-Icon)
```astro
---
const { locale, path } = Astro.props
const altLocale = locale === 'de' ? 'en' : 'de'
const altPath = path.replace(`/${locale}`, `/${altLocale}`)
---
<a href={altPath} class="lang-switch">
  {locale === 'de' ? 'EN' : 'DE'}
</a>
```

---

## Qualitaets-Checks (vor jedem Deploy)

```bash
# Build muss durchlaufen
npm run build

# Lighthouse Score (alle > 90)
npx lighthouse https://flexen.app --output=json

# HTML Validation
npx html-validate dist/

# Broken Links
npx broken-link-checker https://flexen.app

# Bundle Size Check
npx bundlephobia <package-name>
```