import { gsap } from 'gsap'
import { prefersReducedMotion } from './animations'

/**
 * FAQ accordion animation:
 * - Smooth height expand/collapse on details open/close
 * - The "+" icon rotation is handled via CSS group-open:rotate-45
 */
export function initFaqAnimation(): void {
  if (prefersReducedMotion()) return

  const detailsElements = document.querySelectorAll<HTMLDetailsElement>('details')
  if (detailsElements.length === 0) return

  detailsElements.forEach((details) => {
    const summary = details.querySelector('summary')
    const content = details.querySelector<HTMLElement>('summary + *')

    if (!summary || !content) return

    summary.addEventListener('click', (e) => {
      e.preventDefault()

      if (details.open) {
        // Closing animation
        gsap.to(content, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: 'expo.out',
          overflow: 'hidden',
          onComplete() {
            details.open = false
            // Reset inline styles after closing
            gsap.set(content, { clearProps: 'all' })
          },
        })
      } else {
        // Opening animation
        details.open = true

        // Measure natural height
        const naturalHeight = content.offsetHeight

        // Set starting state
        gsap.set(content, {
          height: 0,
          opacity: 0,
          overflow: 'hidden',
        })

        // Animate to natural height
        gsap.to(content, {
          height: naturalHeight,
          opacity: 1,
          duration: 0.4,
          ease: 'expo.out',
          onComplete() {
            // Clear inline styles so layout can reflow naturally
            gsap.set(content, { clearProps: 'height,overflow' })
          },
        })
      }
    })
  })
}
