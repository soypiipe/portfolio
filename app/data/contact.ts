// Contact channels for the Contact section. `href` is omitted while a
// channel isn't confirmed — the UI then renders it as an inert, dimmed
// label (no broken link, no invented data).
export interface ContactAction {
  key: 'email' | 'whatsapp' | 'linkedin' | 'github' | 'cv'
  icon: string
  href?: string
  // Opens in a new tab (web profiles). mailto: stays in the same tab.
  external?: boolean
}

export const contactActions: ContactAction[] = [
  { key: 'email', icon: 'lucide:mail', href: 'mailto:diego_amado@outlook.com' },
  { key: 'whatsapp', icon: 'simple-icons:whatsapp', href: 'https://wa.me/573214048069', external: true },
  { key: 'linkedin', icon: 'simple-icons:linkedin', href: 'https://www.linkedin.com/in/diegoamadodev', external: true },
  { key: 'github', icon: 'simple-icons:github', href: 'https://github.com/soypiipe', external: true },
  // No CV PDF yet (Fase 8). Add `href: '/cv/diego-amado-cv.pdf'` once it exists.
  { key: 'cv', icon: 'lucide:file-down' }
]
