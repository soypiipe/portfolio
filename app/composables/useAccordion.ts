/**
 * One-open-at-a-time state for the expandable Experience / Projects rows.
 * Clicking the open row closes it; clicking another closes the previous one.
 */
export function useAccordion() {
  const openId = ref<string | null>(null)

  function toggle(id: string, trigger?: HTMLElement | null) {
    openId.value = openId.value === id ? null : id

    // If the row that was open sat above this one, collapsing it pulls the
    // clicked row up — possibly under the sticky nav. Once the collapse
    // animation (450ms) has finished, bring the row back into view.
    const row = trigger?.closest<HTMLElement>('[data-accordion-item]')
    if (!row || openId.value !== id) return
    setTimeout(() => {
      const top = row.getBoundingClientRect().top
      if (top < 80) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollBy({ top: top - 96, behavior: reduced ? 'auto' : 'smooth' })
      }
    }, 480)
  }

  return { openId, toggle }
}
