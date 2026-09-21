export interface StackItem {
  name: string
  // Iconify name. `simple-icons:*` = brand logo (renders monochrome via
  // currentColor, matches our palette instead of showing brand colors).
  // `lucide:*` = generic concept icon, for things that aren't a single brand.
  icon: string
}

export interface StackCategory {
  id: string
  labelKey: string
  items: StackItem[]
}

// Technology names are proper nouns — not translated. Grouping mirrors
// docs/ux-ui.md §8 (avoid a generic wall-of-logos: group by purpose, icons
// stay small and monochrome next to the name, not the main event).
export const stackCategories: StackCategory[] = [
  {
    id: 'frontend',
    labelKey: 'stack.categories.frontend',
    items: [
      { name: 'Vue.js', icon: 'simple-icons:vuedotjs' },
      { name: 'React', icon: 'simple-icons:react' },
      { name: 'Angular', icon: 'simple-icons:angular' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' }
    ]
  },
  {
    id: 'backend',
    labelKey: 'stack.categories.backend',
    items: [
      { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
      { name: 'NestJS', icon: 'simple-icons:nestjs' },
      { name: 'Python', icon: 'simple-icons:python' },
      { name: '.NET', icon: 'simple-icons:dotnet' }
    ]
  },
  {
    id: 'data',
    labelKey: 'stack.categories.data',
    items: [
      { name: 'SQL Server', icon: 'simple-icons:microsoftsqlserver' },
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'MySQL', icon: 'simple-icons:mysql' },
      { name: 'MongoDB', icon: 'simple-icons:mongodb' }
    ]
  },
  {
    id: 'infra',
    labelKey: 'stack.categories.infra',
    items: [
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'Linux', icon: 'simple-icons:linux' },
      { name: 'Nginx', icon: 'simple-icons:nginx' },
      { name: 'AWS', icon: 'simple-icons:amazonaws' },
      { name: 'CI/CD', icon: 'lucide:workflow' }
    ]
  },
  {
    id: 'tools',
    labelKey: 'stack.categories.tools',
    items: [
      { name: 'Git', icon: 'simple-icons:git' },
      { name: 'GitHub', icon: 'simple-icons:github' },
      { name: 'VS Code', icon: 'simple-icons:visualstudiocode' }
    ]
  },
  {
    id: 'ai',
    labelKey: 'stack.categories.ai',
    items: [
      { name: 'Claude Code', icon: 'simple-icons:claude' },
      { name: 'Claude.ai', icon: 'simple-icons:claude' },
      { name: 'OpenAI', icon: 'simple-icons:openai' }
    ]
  }
]
