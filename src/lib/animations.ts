import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Initialize scroll-triggered reveal animations for .reveal elements
 */
export function initScrollReveal(): void {
  if (prefersReducedMotion()) {
    // Show everything immediately
    document.querySelectorAll('.reveal').forEach((el) => {
      ;(el as HTMLElement).style.opacity = '1'
      ;(el as HTMLElement).style.transform = 'none'
    })
    return
  }

  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    )
  })
}

/**
 * Initialize staggered children animations
 */
export function initStaggerReveal(): void {
  if (prefersReducedMotion()) return

  gsap.utils.toArray<HTMLElement>('.stagger-children').forEach((container) => {
    const children = container.children

    gsap.fromTo(
      children,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once: true,
        },
      },
    )
  })
}

/**
 * CountUp animation for stat numbers
 */
export function initCountUp(): void {
  if (prefersReducedMotion()) return

  gsap.utils.toArray<HTMLElement>('[data-count-target]').forEach((el) => {
    const target = parseInt(el.dataset.countTarget || '0', 10)
    const suffix = el.dataset.countSuffix || ''
    const obj = { value: 0 }

    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        el.textContent = Math.round(obj.value).toLocaleString('de-DE') + suffix
      },
    })
  })
}

/**
 * Initialize all animations
 */
export function initAllAnimations(): void {
  initScrollReveal()
  initStaggerReveal()
  initCountUp()

  // Desktop-only interactive effects (touch devices excluded)
  if (!('ontouchstart' in window)) {
    import('./custom-cursor').then((m) => m.initCustomCursor())
    import('./magnetic-button').then((m) => m.initMagneticButtons())
    import('./card-tilt').then((m) => m.initCardTilt())
  }
}

export { gsap, ScrollTrigger }
