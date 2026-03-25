import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './animations'

gsap.registerPlugin(ScrollTrigger)

/**
 * Day Story scroll animations:
 * - Each .day-scene fades in when scrolling into view
 * - Time label first, then title, then description
 * - Mockup slides in from alternate sides (left/right)
 * - Mobile: simple fade-in-up only
 */
export function initDayStoryAnimation(): void {
  const scenes = gsap.utils.toArray<HTMLElement>('.day-scene')
  if (scenes.length === 0) return

  if (prefersReducedMotion()) {
    scenes.forEach((scene) => {
      scene.style.opacity = '1'
      scene.style.transform = 'none'
      const children = scene.querySelectorAll<HTMLElement>('.day-time, .day-title, .day-description, .day-mockup')
      children.forEach((child) => {
        child.style.opacity = '1'
        child.style.transform = 'none'
      })
    })
    return
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches

  scenes.forEach((scene, index) => {
    const time = scene.querySelector<HTMLElement>('.day-time')
    const title = scene.querySelector<HTMLElement>('.day-title')
    const description = scene.querySelector<HTMLElement>('.day-description')
    const mockup = scene.querySelector<HTMLElement>('.day-mockup')

    // Set initial hidden state for text elements
    const textElements = [time, title, description].filter(Boolean) as HTMLElement[]
    textElements.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      el.style.willChange = 'transform, opacity'
    })

    if (mockup) {
      mockup.style.opacity = '0'
      mockup.style.willChange = 'transform, opacity'
      if (isMobile) {
        mockup.style.transform = 'translateY(24px)'
      } else {
        // Alternate slide direction: even from right, odd from left
        const direction = index % 2 === 0 ? 40 : -40
        mockup.style.transform = `translateX(${direction}px)`
      }
    }

    // Build per-scene timeline
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      scrollTrigger: {
        trigger: scene,
        start: 'top 80%',
        once: true,
      },
    })

    if (time) {
      tl.to(time, { opacity: 1, y: 0, duration: 0.5 })
    }

    if (title) {
      tl.to(title, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')
    }

    if (description) {
      tl.to(description, { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')
    }

    if (mockup) {
      tl.to(
        mockup,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
        },
        isMobile ? '-=0.3' : '-=0.5',
      )
    }
  })
}
