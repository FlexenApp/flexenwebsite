# Minimal Hub Polish — Design Direction

**Date:** 2026-05-08
**Scope:** `MinimalLanding.astro` (Flexen UG hub, MINIMAL_LAUNCH mode) + new `MinimalLegalLayout` for Impressum/Datenschutz/AGB
**Status:** Direction (no code yet)
**Author:** ui-designer

---

## 1. Atmosphere & Mood

The page should feel like the **first frame of a Linear changelog crossed with the cold-open of a Stripe product page** — quiet, confident, no sell. The Apollo-Era reference is right but pulled hard toward restraint: the glow on the horizon is there because something is being built behind it, not because the page wants attention. Two products. Two characters. One studio that respects your time.

Concretely: dark, breathing, slightly humid (not the dry vacuum of a typical SaaS hero). Grain over the gradient so the dark never reads as flat PNG. Type that holds still. Motion that only happens when you ask for it (hover, focus, submit). No ambient particle bullshit, no looping mesh, no "AI startup gradient blob" — that is exactly the Replika/Linear-clone trap our persona deletes in 3 seconds.

**One-liner:** *Studio building two things, both quiet.*

---

## 2. Hero Treatment — Concrete Improvements

Current state: centered eyebrow-pill + h1 + subline + two flat radial blobs at fixed positions. Reads template. The blobs are the worst offender — they're symmetric (left-1/4 + right-1/4), same blur, same size, opposite tint. AI-default symmetry.

### Take

- **GRAIN/NOISE — yes, mandatory.** Add a 1-tile SVG noise overlay at ~3% opacity over the whole `.gradient-hero`. Single 200×200 base64 SVG turbulence, `mix-blend-mode: overlay`, fixed (not animated). This single move kills 60% of the "template" feeling because it makes the dark background feel like a print surface instead of a CSS gradient. Cost: ~1 KB inline. Ref: same trick Linear, Vercel, Resend all use.
- **CONIC ORB — yes, replace the two radial blobs.** One off-center orb, top-right, ~720px, conic-gradient from `#006DDB` through `#143d5a` back through `#52BAE3` over ~280deg, blurred 140px, opacity 35%. Slow rotation 60s linear (transform: rotate only — GPU-safe), pause on `prefers-reduced-motion`. The conic — not radial — gives subtle directional light, like a cool sun behind a hill. Reject the second blob entirely; asymmetry is the brand-signal here.
- **AMBIENT PULSE — no.** Pulsing the orb opacity reads gimmicky and fights the calm-mood brief. The 60s rotation already provides life. One motion source, not two.
- **KINETIC TYPOGRAPHY — half-yes.** Reject letter-by-letter reveal (overdone, Stripe-2022). Do this instead: **mask-reveal of the headline on load** using `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`, 900ms `expo.out`, with a 300ms staggered offset on the second line if the headline wraps. The eyebrow fades in 200ms before, the subline 200ms after. That's it. No variable-font axis play — Space Grotesk's variable-axis is weight-only and pushing weight on a hero headline reads as a tech-demo, not a brand.
- **SCROLL-LOCKED PARALLAX — no.** The page is one viewport tall on desktop. Parallax needs scroll-distance to feel like anything. Save it for the legal pages where there's actual content to push past.
- **EYEBROW PILL — replace.** "Flexen UG · Building" in a glassmorphism pill is the most generic move on the page. See §7.

### What the hero reveals (load sequence)

```
t=0ms      grain layer fades in (200ms)
t=100ms    orb fades in 0→35% (600ms)
t=200ms    eyebrow fades in (small slide-up 8px)
t=400ms    headline mask-reveal (900ms expo.out)
t=900ms    subline fades + slides up 12px (500ms)
t=1100ms   product cards stagger-fade (.stagger-children)
t=1400ms   form fades in
```

Total: under 2 seconds. After that the page is still. No looping decoration except the 60s orb rotation.

---

## 3. Product Card Treatment

The cards must do two jobs at once: **be unified as siblings on the same hub** AND **carry a hint of their product's brand character**. Right now they're identical-shell-different-tint, which is the lazy answer. Better: same skeleton, same border treatment, same typography rhythm — but two different *interaction personalities*.

### Shared rules (both cards)

- Add `.card-hover` class — gives free 3° tilt + cursor-tracking radial highlight from `card-tilt.ts`. Already built.
- The corner blob (currently `-right-12 -top-12 h-40 w-40`) is too small and too blurred — reads as an afterthought. **Enlarge to ~360px, move to bleed off the bottom-right corner instead of top-right** (light coming from below the card, like a glow under glass). Opacity steps: 0.18 idle → 0.34 hover (450ms ease-out).
- Replace `transition-colors` on the article element with a **gradient-stroke border** that animates on hover. Technique: `border-image` is fragile, so use a `::before` pseudo with a 1px conic-gradient mask. Idle: stroke uses `rgba(255,255,255,0.10)` solid. Hover: stroke fades to a 200deg arc of the brand-tint over 600ms. The card looks like it's being lit from inside.
- Status badge: replace static pill with a **subtle 2-state**: tiny dot prefix that pulses *only on the active card* (the one with `data-product-card="flexen"` since Flexen is in private beta, real status). Pluto's badge says "Coming soon" — no pulse, just static. The pulse uses `transform: scale()` not size, 2.4s cycle, `opacity` 0.4↔1. One pulsing dot on the page is signal; two pulses would be noise.

### Flexen card character (electric blue, gym discipline)

- Tilt response: snappier — override `card-tilt.ts` defaults via a data attribute or per-card config. `duration: 0.2`, `ease: 'power3.out'`. Reads as crisp, athletic.
- Cursor-tracking highlight: tighter radial (`60%` falloff, currently 60% — keep) but use `rgba(0, 109, 219, 0.14)` instead of the default `74,125,255` which doesn't match Flexen accent. **Action item: card-tilt.ts highlight color should be configurable via `data-card-glow` attribute.**
- Internal blob slow-drift: not needed. Flexen card stays disciplined — tilt + highlight is enough. Adding a third motion source overcrowds.

### Pluto card character (warm-companion, library calm, deep-teal)

Pluto's brand is warm-sandy + deep-teal, but on this dark hub we don't betray Flexen-UG's color system — instead we let Pluto's character show through *temperament*, not pigment.

- Tilt response: slower, softer. `duration: 0.5`, `ease: 'power2.out'`. The card moves like it's underwater compared to Flexen.
- Use cyan `#67E8F9` as the tint (already in code). But add **a second, much fainter warm-amber undertone** in the corner blob — not visible at idle, only on hover, blooming up underneath the cyan. Technique: stack two radial-gradients, hover-only opacity on the warm one. Hex: `#C9A47A` at 8% opacity. This is the *only* warm element on the page; it does the entire job of telling persona "Pluto is the considered one."
- Internal slow-drift: yes, here it earns its place. The Pluto-corner-blob slowly translates within a 12px envelope over 9s, feeling like breath. Flexen card stays put. The asymmetry between the cards' inner motion = the studio has range.

### Why this works

The cards become a small typological statement: Flexen = quick, athletic, blue. Pluto = considered, slower, with warmth hiding underneath. Same skeleton, two different metabolisms. That's the studio.

---

## 4. Form Treatment

Current state: native checkboxes with `accent-` color, plain rounded inputs, gradient button with `hover:scale-[1.02]`. Functional. Bland. The button-scale-on-hover is everywhere.

### Take

- **Custom checkbox / segmented control.** Drop the `<input type=checkbox>` accent-styled approach — the native macOS rendering of `accent-cyan-300` is muddy and doesn't match anything else on the page. Replace with a **two-toggle segmented control**: the existing labels become pill-buttons that look "off" (border/bg subtle) and "on" (brand-tinted border, brand-tint bg ~10%, small filled-checkmark-icon appears via SVG `path` clip-path reveal, 240ms `expo.out`). The hidden `<input>` stays for accessibility. Keyboard: arrow-keys move between products like a radio group, space toggles. Both can be on (it's `aria-checked` on each, not a single selection). This is the form's signature element — give it the most polish.
- **Input focus state — yes, animate it.** On focus: the border doesn't just change color, it draws. Technique: `::after` pseudo with a left→right scaleX(0)→scaleX(1) line at the bottom of the input, 320ms `expo.out`, in `--color-flexen-accent-light`. The full border still highlights but the underline-draw gives the input character. On blur, scaleX returns to 0 over 200ms.
- **Button: replace `hover:scale-[1.02]`.** Use `[data-magnetic]` from `magnetic-button.ts` — already built, gives the button a subtle pull toward the cursor (8px max), elastic spring back on leave. Drop the scale-on-hover entirely; magnetic + a `2px` translateY on `:active` is enough.
- **Submit micro-interaction.** During the `await fetch`, the button label becomes `…` (current behavior, fine). Add: the gradient-fill of the button shifts hue subtly during pending state — animate the gradient `background-position` from `0% 0%` to `100% 0%` over 1200ms infinite. Stops on success/error. Reads as "the button is thinking" without being a spinner.
- **Success state — checkmark, not confetti.** Hard reject confetti. Confetti on a quiet, considered design destroys it. Instead: the entire form area shrinks slightly (`scale: 0.98`, 240ms), the status text fades in with a small `✓` glyph in `--color-flexen-accent-light` to its left, and a one-shot 800ms ambient pulse (opacity 0→0.5→0) on the conic orb in the hero — a *barely visible* ack from the page itself. That last detail is the whole reason this design feels like care instead of templates.
- **Error state.** Single 6px horizontal shake on the input or product-toggles (`gsap.fromTo x: -6 → 0, ease: elastic.out, duration: 0.4`). Status text in `text-red-300` already in code — keep.
- **Microcopy + consent text.** Currently lives below the button. Tighten visual rhythm: microcopy in `text-white/55`, consent in `text-white/35`, both `text-caption` size. Currently the consent-line breaks awkwardly at "zu." in DE — see §7.

---

## 5. Nav Consistency Fix — `MinimalLegalLayout`

The current bug: clicking Impressum from the dark hub lands on a white page with the OLD `Navigation.astro` (Features/Preise/Blog/About) — that nav doesn't exist in the studio's reality during MINIMAL_LAUNCH. Fix architecturally with a `MinimalLegalLayout.astro` that:

### Visual treatment

- **Solid `#001622` background, no gradient hero.** Legal is reading-heavy. The 135deg gradient `gradient-hero` reads as marketing-page styling and fights long-form German legal prose. Use the flat dark instead. Keep the **grain noise overlay** — it's the brand-thread that ties legal pages back to the hub without the gradient theatrics.
- **No conic orb.** The orb is a hero-only signature.
- **Top bar:** identical to MinimalLanding's — logo left, language switch right, same `py-6 md:py-8` spacing. No marketing nav. This is the consistency fix the user described.
- **Footer:** identical to MinimalLanding's — same `border-t border-white/5`, same legal-links nav, same copyright line. Symmetric bookends across hub and legal.

### Typography for legal text on dark

- **Body: DM Sans, not Space Grotesk.** Space Grotesk on long-form prose at body size becomes a wall — its low x-height + tight tracking work for headlines, fail at 400 words of `§3.2 Datenverarbeitung`. DM Sans 400/16px / 1.7 line-height is the right body face here.
- **Headings: Space Grotesk 600**, smaller than hub (h1 ~clamp(2rem, 3vw+0.5rem, 3rem)) — legal pages are not heroes.
- **Reject all-caps eyebrow on legal pages.** It's a marketing tic. Section labels in DM Sans 500, sentence-case, `text-white/60`.
- **Color hierarchy:** body in `rgba(255,255,255,0.85)` (brighter than the hub's `0.7` because it's reading text — needs more contrast over long durations), secondary in `0.55`, headings in `0.95`, links in `--color-flexen-accent-light` with `text-decoration: underline; text-underline-offset: 4px;`.
- **Max-width:** 65ch. Legal text needs reading-comfortable line-length — currently the marketing layout's `max-content` (1200px) makes German legal paragraphs unreadable.
- **Section headings get a 2px left-border** in `--color-flexen-accent` at 30% opacity. This single ornament gives the legal page enough character to feel handcrafted without overdesign.

### Page-enter animation

- Single `.reveal` on the article's first `h1`. No stagger on every paragraph — that's marketing-website behavior and it makes legal pages feel like they're trying to sell something. Reading content should arrive plainly.

---

## 6. Concrete Implementation Hints

| Element | Technique | API / Hook |
|---|---|---|
| Grain overlay | inline base64 SVG turbulence, `position: fixed; inset: 0; mix-blend-mode: overlay; opacity: 0.03; pointer-events: none;` | pure CSS, no JS |
| Conic orb (idle) | `background: conic-gradient(from 200deg, #006DDB, #143d5a, #52BAE3, #006DDB);` filtered with `filter: blur(140px)` | static |
| Conic orb (rotation) | `gsap.to('.hero-orb', { rotation: 360, duration: 60, repeat: -1, ease: 'none' })` — guard with `prefersReducedMotion()` from `animations.ts` | GSAP |
| Headline mask-reveal | `gsap.fromTo(h1, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)', duration: 0.9, ease: 'expo.out' })` | GSAP, on load not scroll |
| Hero load-sequence | `gsap.timeline()` with explicit timing per §2 | GSAP timeline |
| Card tilt | `class="card-hover"` | existing `card-tilt.ts` |
| Per-card glow color | extend `card-tilt.ts` to read `data-card-glow="0,109,219"` and feed into `radial-gradient(... rgba(${dataset.cardGlow}, 0.14) ...)` | small refactor |
| Card border-stroke arc on hover | `::before { background: conic-gradient(...); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; }` toggling opacity on `:hover` | pure CSS |
| Pluto inner-blob breath | `gsap.to('.pluto-glow', { x: 12, y: -8, duration: 9, yoyo: true, repeat: -1, ease: 'sine.inOut' })` — guard reduced-motion | GSAP |
| Status-dot pulse (Flexen only) | CSS `@keyframes` on `transform: scale(1) → scale(1.4)` + `opacity 1 → 0.4`, 2.4s `infinite` | pure CSS, scoped to `[data-product-card="flexen"] .status-dot` |
| Custom checkbox toggle | Hidden `<input>` + label; checkmark SVG with `stroke-dasharray` reveal on `:has(input:checked)` | CSS `:has()` selector — fully supported in Astro target browsers |
| Input underline-draw on focus | `::after` pseudo, `transform: scaleX(0); transform-origin: left;` → focus `scaleX(1)`, `transition: transform 320ms var(--ease-default)` | pure CSS |
| Magnetic submit button | add `data-magnetic` attribute to button | existing `magnetic-button.ts` |
| Pending button gradient-shift | `background-size: 200% 100%; animation: gradient-shift 1.2s linear infinite paused;` toggle `running` via JS during fetch | CSS keyframes |
| Success ack — orb pulse | `gsap.fromTo('.hero-orb', { opacity: 0.35 }, { opacity: 0.55, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' })` | GSAP one-shot |
| Error shake | `gsap.fromTo(target, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' })` | GSAP |

All animations must inherit the `prefersReducedMotion()` guard already used in `animations.ts`. No exceptions.

---

## 7. Slop-Frei Audit

Concrete things on `MinimalLanding.astro` that read template-y, with the fix:

1. **Symmetric dual radial-blobs (lines 116–125).** Twin glows at `left-1/4 top-1/3` and `right-1/4 top-2/3`, one accent + one accent-light, identical size and blur. This is *AI-Slop-Blacklist §10 — Animated Background Mesh* in static form. **Fix:** single asymmetric conic orb, top-right, see §2.

2. **Glassmorphism eyebrow pill (lines 134–138).** `border border-white/15 bg-white/5 px-4 py-1.5 ... uppercase tracking-[0.18em] backdrop-blur-sm` — this exact pill appears on every Y-Combinator landing page since 2023. *Slop-Blacklist §9 — Excessive Glass-Morphism.* **Fix:** replace with a plain inline `eyebrow` — DM Sans 500, 13px, `text-white/55`, sentence-case "Flexen UG, building two things." A label, not a chip. Period.

3. **`hover:scale-[1.02]` on the gradient button (line 261).** The default LLM micro-interaction. Every Tailwind tutorial since 2022. **Fix:** magnetic-button + `:active` translateY, see §4.

4. **"Tools that make your day better." headline.** *Slop-Blacklist §5* — "make your day better" is on the soft edge of the generic-marketing list. It's not "awesome" but it's the same mode: superlative-without-content. **Suggested rewrite (notify content-marketer):** "Two small things, both in private beta." or "A studio building two AI tools. Pick what's interesting." or — strongest — keep the *concrete* line that's currently in the subline copy ("We build small, focused AI tools — currently two of them.") and *promote it to the headline*. The current headline is the weakest copy on the page; the subline does the headline's job.

5. **Native `accent-cyan-300` checkboxes (lines 227, 239).** Native checkbox + accent-color is the low-effort move. Looks different on macOS / Windows / iOS (Slop-Blacklist concern: Browser-Rendering inkonsistent). **Fix:** custom segmented-toggle, see §4.

6. **DE consent line wraps weirdly.** "Mit der Anmeldung stimmst du unserer [Datenschutzerklärung] zu." — the `zu.` lives outside the `<a>` and breaks visually. **Fix:** content-marketer rewrite as "Mit der Anmeldung akzeptierst du unsere [Datenschutzerklärung]." — no trailing preposition orphan. Same treatment EN: "By signing up you accept our [Privacy Policy]."

---

## Notify

- **content-marketer:** Headline is weak (item §7.4). Consent-line orphan in DE (item §7.6). Eyebrow rewrite to sentence-case label (§7.2).
- **a11y:** New segmented-control checkbox needs full keyboard + `aria-checked` audit. New input-focus underline must not replace native focus-ring contrast — keep the existing `:focus-visible` outline (lines 299–305 of global.css). Conic orb at 35% opacity over `#001622` — verify text contrast unaffected (it's behind the content layer with `relative z-10`, should be fine).
- **web-animator:** Implement the load-sequence timeline (§2), card-tilt per-card glow color refactor (§6), Pluto inner-blob breath (§3).
- **web-developer:** Build `MinimalLegalLayout.astro` (§5), wire `MINIMAL_LAUNCH` env to swap layout in legal pages.

---

## Out of Scope (explicit rejects)

- No confetti on success.
- No animated mesh / floating orbs.
- No purple/violet anywhere.
- No SVG-drawn imagery (rocket icons, decorative scribbles).
- No emoji in UI chrome.
- No "Powered by AI" badges.
- No second decorative shadow per view (cards already have an internal blob — that's the one).
- No variable-font weight-axis play on the headline.
