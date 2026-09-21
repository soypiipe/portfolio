/** Picks the current-locale value out of a `{ es, en }` pair — works for
 * plain strings (LocalizedText) and arrays (LocalizedList) alike. */
export function useLocalized() {
  const { locale } = useI18n()

  function pick<T>(value: { es: T; en: T }): T {
    return locale.value === 'en' ? value.en : value.es
  }

  return { pick }
}
