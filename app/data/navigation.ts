export interface NavLink {
  id: string
  href: string
  labelKey: string
}

// Section anchors for the one-page layout. `labelKey` resolves against
// the active locale's nav.* strings (see locales/es.json, locales/en.json).
export const navLinks: NavLink[] = [
  { id: '01', href: '#inicio', labelKey: 'nav.inicio' },
  { id: '02', href: '#sobre-mi', labelKey: 'nav.sobreMi' },
  { id: '03', href: '#proyectos', labelKey: 'nav.proyectos' },
  { id: '04', href: '#experiencia', labelKey: 'nav.experiencia' },
  { id: '05', href: '#stack', labelKey: 'nav.stack' },
  { id: '06', href: '#contacto', labelKey: 'nav.contacto' }
]
