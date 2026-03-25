# Flexen Website — Parallel Workflow Guide

## 4 Skills fuer paralleles Arbeiten

Jeder Skill ist ein spezialisierter Agent der unabhaengig arbeiten kann:

| Skill | Aufgabe | Slash-Command |
|-------|---------|---------------|
| **web-designer** | UI, Layout, Design-System, Komponenten-Styling | `/web-designer` |
| **web-animator** | GSAP, Scroll-Animations, 3D, Micro-Interactions | `/web-animator` |
| **web-developer** | Astro/React, Routing, SEO, Performance, Build | `/web-developer` |
| **web-content** | Texte, Blog, i18n, Legal Pages, Meta Tags | `/web-content` |

## Parallel starten

Oeffne das Projekt in Claude Code (`cd flexenwebsite`), dann kannst du z.B. sagen:

```
Starte 3 Agents parallel:
1. /web-developer — Setz das Astro-Projekt auf mit Tailwind, GSAP, Lenis
2. /web-designer — Erstelle das Design-Token CSS und die Button/Card Komponenten
3. /web-content — Schreib die Homepage-Texte (DE + EN) und Meta Tags
```

Oder fuer eine bestimmte Seite:

```
Bau die Feature-Seite. Starte parallel:
1. /web-developer — Erstelle features.astro mit Layout und Routing
2. /web-designer — Style die Feature-Cards mit Hover-Effekten
3. /web-animator — Bau die Scroll-Reveal-Animationen fuer jede Section
4. /web-content — Schreib die Feature-Texte (DE + EN)
```

## Abhaengigkeiten beachten

Manche Tasks muessen sequentiell laufen:

```
ZUERST (parallel):
  /web-developer → Projekt-Setup (Astro, Tailwind, Ordnerstruktur)
  /web-content   → Alle Texte schreiben (de.json, en.json)

DANN (parallel):
  /web-designer  → Design-Tokens + Komponenten (braucht Projekt-Setup)
  /web-animator  → Animation Setup (braucht Projekt-Setup)

DANN (parallel):
  Alle 4 Skills → Einzelne Seiten bauen
```

## Dateien die jeder Skill kennen muss

- `CLAUDE.md` — Projekt-Regeln und Tech Stack
- `WEBSITE_STRATEGIE.md` — Komplette Recherche und Planung
- Jeder Skill liest automatisch sein SKILL.md mit allen Details

## Typische Aufgabenverteilung

### Neue Seite bauen
1. `/web-content` — Texte + Meta Tags schreiben
2. `/web-developer` — .astro Page + Routing + SEO Schema
3. `/web-designer` — Layout + Responsive + Dark Mode
4. `/web-animator` — Scroll-Animationen + Micro-Interactions

### Bug fixen
- Layout/Responsive → `/web-designer`
- Animation kaputt → `/web-animator`
- Build/SEO/Performance → `/web-developer`
- Text/Uebersetzung → `/web-content`

### Neue Komponente
1. `/web-designer` — Design + Styling
2. `/web-developer` — Astro/React Implementierung
3. `/web-animator` — Hover/Scroll Animationen
