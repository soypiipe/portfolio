export interface ProjectTech {
  name: string
  icon: string
}

export interface Project {
  id: string
  nameKey: string
  // Tag corto — viene del campo "Status" real de docs/content.md (proyecto
  // real vs. propio), no una frase de contexto inventada.
  kindKey: string
  descriptionKey: string
  technologies: ProjectTech[]
  // No hay URL pública confirmada todavía para ninguno de los dos — se
  // omite en vez de inventar un link. Agregar cuando Diego la confirme.
  href?: string
}

// Solo los dos proyectos confirmados en docs/content.md. El "tercer
// proyecto" sigue como "TO BE CONFIRMED" ahí — no se inventa.
export const projects: Project[] = [
  {
    id: 'miattend',
    nameKey: 'projects.miattend.name',
    kindKey: 'projects.miattend.kind',
    descriptionKey: 'projects.miattend.description',
    technologies: [
      { name: 'Vue.js', icon: 'simple-icons:vuedotjs' },
      { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
      { name: 'SQL Server', icon: 'simple-icons:microsoftsqlserver' }
    ]
  },
  {
    id: 'amadia',
    nameKey: 'projects.amadia.name',
    kindKey: 'projects.amadia.kind',
    descriptionKey: 'projects.amadia.description',
    technologies: [
      { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
      { name: 'IA', icon: 'lucide:sparkles' },
      { name: 'WhatsApp', icon: 'simple-icons:whatsapp' },
      { name: 'RAG', icon: 'lucide:database' }
    ]
  }
]
