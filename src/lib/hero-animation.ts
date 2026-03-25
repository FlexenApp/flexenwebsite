import { gsap } from 'gsap'
import { prefersReducedMotion } from './animations'

/**
 * Hero entrance animation:
 * 1. Split headline into words, stagger them in from below
 * 2. Fade in subline
 * 3. Fade in CTA buttons
 */
export function initHeroAnimation(): void {
  const headline = document.querySelector<HTMLElement>('[data-hero-headline]')
  const subline = document.querySelector<HTMLElement>('[data-hero-subline]')
  const ctas = document.querySelector<HTMLElement>('[data-hero-ctas]')

  if (!headline) return

  // Show everything immediately if reduced motion is preferred
  if (prefersReducedMotion()) {
    headline.style.opacity = '1'
    if (subline) subline.style.opacity = '1'
    if (ctas) ctas.style.opacity = '1'
    return
  }

  // Split headline text into word spans
  const text = headline.textContent?.trim() || ''
  const words = text.split(/\s+/)
  headline.innerHTML = words
    .map((word) => `<span class="hero-word" style="display:inline-block;opacity:0;transform:translateY(24px);will-change:transform,opacity;">${word}</span>`)
    .join(' ')
  headline.style.opacity = '1'

  const wordSpans = headline.querySelectorAll('.hero-word')

  // Hide subline and CTAs initially
  if (subline) {
    subline.style.opacity = '0'
    subline.style.transform = 'translateY(16px)'
  }
  if (ctas) {
    ctas.style.opacity = '0'
    ctas.style.transform = 'translateY(16px)'
  }

  // Build GSAP timeline
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

  tl.to(wordSpans, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.05,
  })

  if (subline) {
    tl.to(
      subline,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      '-=0.3'
    )
  }

  if (ctas) {
    tl.to(
      ctas,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      '-=0.3'
    )
  }
}
