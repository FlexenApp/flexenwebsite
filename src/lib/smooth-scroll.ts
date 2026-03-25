import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance: Lenis | null = null

/**
 * Initialize Lenis smooth scrolling with GSAP ScrollTrigger integration
 */
export function initSmoothScroll(): Lenis | null {
  if (lenisInstance) return lenisInstance

  // Skip on reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
    infinite: false,
  })

  // Connect Lenis to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update)

  // Use GSAP ticker for Lenis RAF
  gsap.ticker.add((time: number) => {
    lenisInstance?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenisInstance
}

/**
 * Destroy Lenis instance (cleanup)
 */
export function destroySmoothScroll(): void {
  lenisInstance?.destroy()
  lenisInstance = null
}

export { lenisInstance }
