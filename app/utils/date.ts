/** Formats a "YYYY-MM" string as a localized short month + year (e.g. "Aug 2022" / "ago de 2022"). */
export function formatMonth(ym: string, locale: string) {
  const parts = ym.split('-')
  const year = Number(parts[0])
  const month = Number(parts[1])
  const date = new Date(year, month - 1, 1)
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-CO', {
    month: 'short',
    year: 'numeric'
  }).format(date)
}

/** Formats a start/end pair as "Aug 2022 — Present" style range. */
export function formatDateRange(
  startDate: string,
  endDate: string | null | undefined,
  current: boolean | undefined,
  locale: string,
  presentLabel: string
) {
  const start = formatMonth(startDate, locale)
  const end = current || !endDate ? presentLabel : formatMonth(endDate, locale)
  return `${start} — ${end}`
}
