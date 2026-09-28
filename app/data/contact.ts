// Contact channels for the Contact section, plus the CV files (one PDF per
// site language; the CV button always serves the one matching the locale
// the visitor is reading the site in).
export interface ContactAction {
  key: 'email' | 'whatsapp' | 'linkedin' | 'github' | 'cv'
  icon: string
  href: string | { es: string; en: string }
  // Opens in a new tab (web profiles). mailto: and downloads stay in place.
  external?: boolean
  // Triggers a file download instead of opening the file in the browser.
  download?: boolean
}

// PDFs live in public/cv/. Same name pattern per locale so adding a language
// is one more line here.
export const cvHref = {
  es: '/cv/diego-amado-cv-es.pdf',
  en: '/cv/diego-amado-cv-en.pdf'
}

export const contactActions: ContactAction[] = [
  { key: 'email', icon: 'lucide:mail', href: 'mailto:diego_amado_@outlook.com' },
  { key: 'whatsapp', icon: 'simple-icons:whatsapp', href: 'https://wa.me/573214048069', external: true },
  { key: 'linkedin', icon: 'simple-icons:linkedin', href: 'https://www.linkedin.com/in/diegoamadodev', external: true },
  { key: 'github', icon: 'simple-icons:github', href: 'https://github.com/soypiipe', external: true },
  { key: 'cv', icon: 'lucide:file-down', href: cvHref, download: true }
]
