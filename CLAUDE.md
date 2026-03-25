# Flexen Website

Premium Marketing-Website fuer die Flexen Fitness App. Kein generisches Template — handcrafted mit Scroll-Storytelling, 3D-Mockups und interaktiven Elementen.

## Tech Stack
- **Framework:** Astro 5 + React Islands (interaktive Komponenten)
- **Styling:** Tailwind CSS 4
- **Animationen:** GSAP + ScrollTrigger (Scroll-Animationen), Framer Motion (React UI)
- **Smooth Scroll:** Lenis
- **3D:** Spline oder Three.js / React Three Fiber
- **Complex Animations:** Rive oder Lottie
- **Hosting:** Vercel (Edge, globales CDN)
- **Analytics:** Plausible (cookieless, DSGVO-konform)
- **CMS:** Astro Content Collections (Markdown-basiert)

## Design-System
- **Dark Mode Default** — Background: `#001622`
- **Akzentfarbe:** Electric Blue `#4A7DFF`
- **Fonts:** Space Grotesk (Headlines) + DM Sans (Body)
- **Spacing:** 8px Grid
- **Max-Width:** 1440px Container, 1200px Content

## Regeln
- IMMER `@media (prefers-reduced-motion: reduce)` bei Animationen
- KEINE Stock-Fotos — echte App-Screenshots oder Custom Illustrations
- NUR `transform` und `opacity` animieren (GPU-beschleunigt)
- Responsive: Mobile First, Breakpoints 640/768/1024/1280/1536px
- Bilder: WebP/AVIF mit Fallback, `loading="lazy"` unter dem Fold
- Fonts: Max 2 Familien, Variable Fonts bevorzugen, `font-display: swap`
- Deutsche Seiten: `<html lang="de">`, Englische: `<html lang="en">`
- JEDE Seite braucht: Meta Tags, OG Tags, Canonical, hreflang

## Rechtlich (PFLICHT vor Launch)
- Impressum (innerhalb 2 Klicks erreichbar)
- Datenschutzerklaerung
- Cookie Consent Banner (TTDSG-konform)
- Preise inkl. MwSt.

## Projektstruktur
```
src/
  components/       — Astro + React Komponenten
  layouts/          — Base Layout, Blog Layout
  pages/            — index, features, preise, blog, impressum, datenschutz
  content/          — Markdown Blog Posts
  styles/           — CSS Variables, Animations
  lib/              — GSAP Setup, Lenis, Utilities
  assets/           — Images, Fonts, Lottie/Rive Files
  i18n/             — de.json, en.json
public/
  fonts/
  images/
  og/               — Open Graph Images
```

## Strategie-Dokument
Komplette Recherche und Planung: `WEBSITE_STRATEGIE.md`

## Skills
4 spezialisierte Skills fuer paralleles Arbeiten:
- `/web-designer` — UI/Layout/Design-System
- `/web-animator` — GSAP, Scroll-Animations, 3D, Micro-Interactions
- `/web-developer` — Astro/React Komponenten, Routing, SEO, Performance
- `/web-content` — Texte, Blog, SEO-Content, i18n, Legal Pages
