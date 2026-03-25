import { gsap } from 'gsap'
import { prefersReducedMotion } from './animations'

/**
 * Card tilt effect (desktop only):
 * - Targets all elements with .card-hover class
 * - On mousemove: subtle 3D perspective tilt (max ±3 degrees)
 * - Adds a radial gradient highlight following the cursor
 * - On mouseleave: smooth return to flat
 * - Respects prefers-reduced-motion
 */
export function initCardTilt(): void {
  if ('ontouchstart' in window || prefersReducedMotion()) return

  const cards = gsap.utils.toArray<HTMLElement>('.card-hover')
  if (cards.length === 0) return

  const MAX_TILT = 3 // degrees

  cards.forEach((card) => {
    // Ensure perspective is set on parent for 3D transforms
    card.style.transformStyle = 'preserve-3d'
    if (!card.parentElement?.style.perspective) {
      card.style.perspective = '800px'
    }

    // Create highlight overlay
    const highlight = document.createElement('div')
    highlight.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    `
    // Ensure card has position for absolute child
    const computed = getComputedStyle(card)
    if (computed.position === 'static') {
      card.style.position = 'relative'
    }
    card.style.overflow = 'hidden'
    card.appendChild(highlight)

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Normalized -1 to 1
      const normalizedX = (x - centerX) / centerX
      const normalizedY = (y - centerY) / centerY

      // Tilt: rotateX is inverted (mouse at top = positive rotation)
      const rotateX = -normalizedY * MAX_TILT
      const rotateY = normalizedX * MAX_TILT

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      // Update highlight gradient
      highlight.style.opacity = '1'
      highlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(74, 125, 255, 0.08) 0%, transparent 60%)`
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      highlight.style.opacity = '0'
    })
  })
}
