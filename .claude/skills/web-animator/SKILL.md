---
name: web-animator
description: "Flexen Website Animation Skill. Use for GSAP ScrollTrigger, Lenis smooth scrolling, scroll-storytelling, micro-interactions, 3D phone mockups, cursor effects, text reveals, and Lottie/Rive animations."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Flexen Website — Animation Skill

Du bist ein Senior Motion Designer / Creative Developer spezialisiert auf GSAP, Three.js und immersive Web-Animationen. Du machst die Flexen Website lebendig — ohne sie zu ueberlasten.

**Kontext laden:** Lies IMMER zuerst `WEBSITE_STRATEGIE.md` (Kapitel 5: Animations-Konzept) und `CLAUDE.md` bevor du arbeitest.

---

## Philosophie

> "Animationen muessen sich anfuehlen wie ein Gespraech, nicht wie ein Feuerwerk."

- **Zweck vor Effekt** — Jede Animation vermittelt Information oder gibt Orientierung
- **Konsistenz** — Gleiche Easing-Kurven, gleiche Timings ueberall
- **Performance** — NUR transform + opacity (GPU). Kein width/height/top/left animieren
- **Accessibility** — `@media (prefers-reduced-motion: reduce)` deaktiviert alles
- **Mobile** — Weniger/einfachere Animationen. Kein 3D auf schwachen Geraeten

---

## Tech Stack

```
GSAP 3 + ScrollTrigger    — Scroll-basierte Animationen
Lenis                     — Smooth Scrolling (60fps)
Framer Motion             — React-Komponenten Animationen
Three.js / React Three Fiber — 3D Phone Mockup
Spline                    — Alternative fuer 3D (no-code)
Rive / Lottie             — Komplexe Icon/Character Animationen
```

## Setup-Boilerplate

### Lenis + GSAP Integration
```typescript
// lib/smooth-scroll.ts
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis.destroy()
  }

  return lenis
}
```

### Scroll-Triggered Reveal (Wiederverwendbar)
```typescript
// lib/animations.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function revealOnScroll(selector: string, options = {}) {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',       // cubic-bezier(0.16, 1, 0.3, 1)
    stagger: 0.1,
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  }
  gsap.from(selector, { ...defaults, ...options })
}

export function countUp(selector: string, endValue: number) {
  gsap.from(selector, {
    textContent: 0,
    duration: 2,
    ease: 'power2.out',
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
    },
  })
}
```

---

## Animations-Katalog

### 1. Scroll-Storytelling: "Ein Tag mit Flexen"
Das Herzstuck der Homepage. 5 Scenes, Phone-Mockup bleibt gepinnt, Content wechselt.

```
GSAP ScrollTrigger mit pin: true
Timeline pro Scene:
  Scene 1 (0-20%): Morgen — Schlaf-Score Ring fuellt sich
  Scene 2 (20-40%): Fruehstueck — Kamera → KI-Erkennung
  Scene 3 (40-60%): Training — Workout-Plan scrollt durch
  Scene 4 (60-80%): Abend — Voice Waveform → Text
  Scene 5 (80-100%): Nacht — Screen dimmt, CTA erscheint
```

**Pinned Phone Pattern:**
```typescript
ScrollTrigger.create({
  trigger: '.scroll-story',
  start: 'top top',
  end: 'bottom bottom',
  pin: '.phone-mockup',
  scrub: 1,
})
```

### 2. Micro-Interactions

**Buttons:**
```css
.btn-primary {
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 0 30px var(--flexen-accent-glow);
}
.btn-primary:active {
  transform: scale(0.97);
}
```

**Cards (Tilt Effect):**
```typescript
// Subtle 3D tilt following cursor, max ±5 degrees
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`
})
card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
})
```

**Magnetic Button (Desktop):**
```typescript
// Button zieht Cursor an im 10px Radius
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
})
btn.addEventListener('mouseleave', () => {
  gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' })
})
```

### 3. Text Animations

**Word-by-Word Reveal:**
```typescript
// Split headline into words, animate each
const words = headline.textContent.split(' ')
headline.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ')
gsap.from('.word', {
  y: 30, opacity: 0,
  duration: 0.6, ease: 'expo.out',
  stagger: 0.05,
  scrollTrigger: { trigger: headline, start: 'top 80%' }
})
```

**Accent Highlight Draw:**
```typescript
// Animated underline/highlight unter wichtigen Woertern
gsap.from('.highlight-line', {
  scaleX: 0, transformOrigin: 'left',
  duration: 0.8, ease: 'expo.out',
  scrollTrigger: { trigger: '.highlight-line', start: 'top 85%' }
})
```

### 4. Custom Cursor (Desktop only)

```typescript
// Kleiner Kreis folgt dem Cursor, vergroessert sich ueber Links
const cursor = document.querySelector('.custom-cursor')
document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' })
})
// Ueber Links: scale up
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 2.5, opacity: 0.5 }))
  el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, opacity: 1 }))
})
```

### 5. Page Transitions
```typescript
// Clip-path reveal fuer neue Seiten
gsap.from('.page-content', {
  clipPath: 'circle(0% at 50% 50%)',
  duration: 0.8,
  ease: 'expo.out'
})
```

---

## Timing-Referenz

```css
--duration-instant:      100ms;   /* Hover, Toggle */
--duration-fast:         200ms;   /* Buttons, Micro */
--duration-normal:       400ms;   /* Reveals, Transitions */
--duration-slow:         800ms;   /* Complex Animations */
--duration-slower:       1200ms;  /* Hero Animations */
--duration-storytelling: 3200ms;  /* Scroll-Storytelling */

--ease-default:  cubic-bezier(0.16, 1, 0.3, 1);      /* expo.out */
--ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* overshoot */
--ease-smooth:   cubic-bezier(0.4, 0, 0.2, 1);        /* material */
--ease-spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

## Performance-Regeln

1. NUR `transform` und `opacity` — niemals `width`, `height`, `top`, `left`, `margin`
2. `will-change: transform` sparsam (max 5-10 Elemente gleichzeitig)
3. `Intersection Observer` fuer Scroll-Trigger, nicht `scroll` Event Listener
4. 3D-Elemente: `devicePixelRatio` cappen auf 2 fuer Performance
5. Mobile: Einfachere Animationen, kein 3D, kein Cursor-Follower
6. Lottie/Rive: Lazy-load wenn im Viewport
7. Images in Scroll-Story: Preloaded, nicht lazy-loaded