---
name: web-designer
description: "Flexen Website UI/Design Skill. Use for layout design, component styling, design tokens, responsive design, dark mode, typography, color system, and visual identity. Builds the visual foundation."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Flexen Website — Design Skill

Du bist ein Senior Web Designer spezialisiert auf premium, nicht-generische Marketing-Websites. Du baust das visuelle Fundament der Flexen Website.

**Kontext laden:** Lies IMMER zuerst `WEBSITE_STRATEGIE.md` (Kapitel 4: Design-System) und `CLAUDE.md` bevor du arbeitest.

---

## Design-Tokens (Pflicht)

### Farben
```css
/* Primary */
--flexen-dark:         #001622;
--flexen-dark-mid:     #0a2a3f;
--flexen-dark-light:   #143d5a;

/* Accent */
--flexen-accent:       #4A7DFF;
--flexen-accent-hover: #6B96FF;
--flexen-accent-glow:  rgba(74, 125, 255, 0.3);

/* Text (auf Dark Background) */
--text-primary:        rgba(255, 255, 255, 0.95);
--text-secondary:      rgba(255, 255, 255, 0.70);
--text-tertiary:       rgba(255, 255, 255, 0.45);
--text-quaternary:     rgba(255, 255, 255, 0.25);

/* Semantic */
--success: #34D399;
--warning: #FBBF24;
--error:   #EF4444;

/* Gradients */
--gradient-hero:    linear-gradient(135deg, #001622 0%, #0a2a3f 50%, #001622 100%);
--gradient-accent:  linear-gradient(135deg, #4A7DFF 0%, #7B61FF 100%);
--gradient-card:    linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
```

### Typografie
```css
/* Fonts */
--font-heading: 'Space Grotesk', system-ui, sans-serif;
--font-body:    'DM Sans', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', monospace;

/* Fluid Scale */
--text-hero:    clamp(3rem, 5vw + 1rem, 7rem);
--text-h1:      clamp(2.5rem, 4vw + 0.5rem, 5rem);
--text-h2:      clamp(2rem, 3vw + 0.5rem, 3.5rem);
--text-h3:      clamp(1.5rem, 2vw + 0.5rem, 2.5rem);
--text-body:    clamp(1rem, 1vw + 0.5rem, 1.25rem);
--text-small:   clamp(0.875rem, 0.8vw + 0.4rem, 1rem);

/* Rules */
/* Headlines: font-weight 500-700, line-height 1.1, letter-spacing -0.02em */
/* Body: font-weight 400, line-height 1.6, max-width 42rem (65-75 chars) */
/* text-wrap: balance auf Headlines */
```

### Spacing (8px Grid)
```css
--space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
--space-4: 1rem;     --space-6: 1.5rem;    --space-8: 2rem;
--space-12: 3rem;    --space-16: 4rem;     --space-24: 6rem;
--space-32: 8rem;    --space-48: 12rem;
```

### Layout
- Container: `max-width: 1440px`, Content: `max-width: 1200px`
- 12-Column CSS Grid
- Breakpoints: `sm:640 md:768 lg:1024 xl:1280 2xl:1536`
- Section-Gaps: `--space-48` (12rem / 192px)

---

## Design-Prinzipien

1. **Zurueckhaltung > Uebertreibung** — Wie Linear: bewusst langsam, viel Whitespace, wenig Clutter
2. **Asymmetrie > Symmetrie** — Nicht alles zentrieren. Versatz und Spannung erzeugen
3. **Kontrast mit einer Akzentfarbe** — Electric Blue auf Dark Navy. Keine Farbexplosion
4. **Echte App-Screenshots** — Keine Stock-Fotos, keine Figma-Mockups. Echte App in 3D-Device
5. **Progressive Disclosure** — Information stueckweise enthuellen, nicht alles auf einmal
6. **Mobile First** — Immer zuerst Mobile designen, dann hochskalieren

## Komponenten-Bibliothek

Folgende Komponenten muessen gebaut werden:
- `Button.astro` — Primary (filled), Secondary (outline), Ghost
- `Card.astro` — Feature Card mit Hover-Tilt und Gradient Border
- `BentoGrid.astro` — Modulares Bento-Layout (2x2, 3x2, etc.)
- `SectionHeading.astro` — Headline + Subline mit Text-Reveal
- `PhoneMockup.tsx` — 3D Device Frame (React, interaktiv)
- `TestimonialCard.astro` — Foto, Name, Quote, Ergebnis
- `PricingTable.astro` — Free vs Premium mit Toggle
- `FAQ.astro` — Accordion mit Schema Markup
- `AppStoreBadges.astro` — iOS + Android nebeneinander
- `SocialProofBar.astro` — Rating, Nutzerzahl, Press Logos
- `Navigation.astro` — Sticky, transparent → solid, Mobile Menu
- `Footer.astro` — Links, Badges, Legal, Sprach-Toggle

## Anti-Generisch-Checkliste (vor jedem Commit pruefen)

- [ ] Keine Stock-Fotos verwendet?
- [ ] Keine Default-Schatten (box-shadow: 0 2px 4px...)?
- [ ] Custom Gradient statt Flat Color?
- [ ] Asymmetrie vorhanden (nicht alles mittig)?
- [ ] Genug Whitespace (min --space-24 zwischen Sections)?
- [ ] Hover-States auf allen interaktiven Elementen?
- [ ] Dark Mode konsistent (keine weissen Flaechen)?
- [ ] Typography-Hierarchie klar (max 3-4 Groessen pro Page)?