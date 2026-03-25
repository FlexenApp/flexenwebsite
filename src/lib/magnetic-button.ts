import { gsap } from 'gsap'
import { prefersReducedMotion } from './animations'

/**
 * Magnetic button effect (desktop only):
 * - Targets all elements with [data-magnetic]
 * - On mousemove within 80px radius: button subtly moves toward cursor (max ±8px)
 * - On mouseleave: spring back with elastic ease
 * - Respects prefers-reduced-motion
 */
export function initMagneticButtons(): void {
  if ('ontouchstart' in window || prefersReducedMotion()) return

  const buttons = gsap.utils.toArray<HTMLElement>('[data-magnetic]')
  if (buttons.length === 0) return

  const RADIUS = 80
  const MAX_MOVE = 8

  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const dist = Math.sqrt(distX * distX + distY * distY)

      if (dist > RADIUS) return

      // Normalize and scale: closer to center = stronger pull
      const strength = 1 - dist / RADIUS
      const moveX = (distX / RADIUS) * MAX_MOVE * strength
      const moveY = (distY / RADIUS) * MAX_MOVE * strength

      gsap.to(btn, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    })
  })
}
