import { gsap } from 'gsap'
import { prefersReducedMotion } from './animations'

/**
 * Custom cursor effect (desktop only):
 * - Small circle (12px) follows mouse with smooth lerp via gsap.quickTo
 * - Over links/buttons: grows to 32px, semi-transparent
 * - Over .btn-glow: cursor hides, uses native pointer
 * - Respects prefers-reduced-motion
 */
export function initCustomCursor(): void {
  // Don't init on touch devices or if reduced motion preferred
  if ('ontouchstart' in window || prefersReducedMotion()) return

  const cursor = document.getElementById('custom-cursor')
  if (!cursor) return

  // gsap.quickTo for smooth lerp following
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' })
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' })

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    xTo(e.clientX)
    yTo(e.clientY)
  })

  // Show cursor when mouse enters viewport
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.3 })
  })

  // Hide cursor when mouse leaves viewport
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 })
  })

  // Interactive elements: links, buttons (but not .btn-glow)
  const interactiveSelector = 'a:not(.btn-glow), button:not(.btn-glow), [role="button"]:not(.btn-glow), summary'

  // Delegate hover via event delegation for performance
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement

    // Check if over a .btn-glow element
    if (target.closest('.btn-glow')) {
      gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.2 })
      document.body.style.cursor = 'pointer'
      return
    }

    // Check if over an interactive element
    if (target.closest(interactiveSelector)) {
      gsap.to(cursor, {
        width: 32,
        height: 32,
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      })
      return
    }
  })

  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement

    if (target.closest('.btn-glow')) {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 })
      document.body.style.cursor = ''
      return
    }

    if (target.closest(interactiveSelector)) {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      return
    }
  })

  // Make cursor visible
  cursor.style.display = 'block'
}
