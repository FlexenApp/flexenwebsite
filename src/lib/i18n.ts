import de from '../i18n/de.json'
import en from '../i18n/en.json'

type Locale = 'de' | 'en'

const translations: Record<Locale, Record<string, unknown>> = { de, en }

/**
 * Get a nested translation value by dot-separated key
 * Example: t('de', 'hero.headline')
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split('.')
  let result: unknown = translations[locale]

  for (const k of keys) {
    if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[k]
    } else {
      return key // Fallback: return key itself
    }
  }

  return typeof result === 'string' ? result : key
}

/**
 * Get a full translation object by dot-separated key
 */
export function tObject(locale: Locale, key: string): unknown {
  const keys = key.split('.')
  let result: unknown = translations[locale]

  for (const k of keys) {
    if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[k]
    } else {
      return undefined
    }
  }

  return result
}

/**
 * Generate localized path
 */
export function localePath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${cleanPath}`
}

/**
 * Get the alternate locale
 */
export function altLocale(locale: Locale): Locale {
  return locale === 'de' ? 'en' : 'de'
}

/**
 * Get locale from URL pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'de'
}

export type { Locale }
