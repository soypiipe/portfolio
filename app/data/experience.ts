export interface LocalizedText {
  es: string
  en: string
}

export interface LocalizedList {
  es: string[]
  en: string[]
}

export interface Achievement {
  title: LocalizedText
  description: LocalizedText
  metric: LocalizedText
}

export interface StackItem {
  name: string
  icon: string
}

export interface ExperienceEntry {
  id: string
  company: string
  companyCountry: LocalizedText
  role: LocalizedText
  modality: LocalizedText
  location: LocalizedText
  /** YYYY-MM */
  startDate: string
  /** YYYY-MM, null when `current` is true */
  endDate: string | null
  current: boolean
  summary: LocalizedText
  responsibilities: LocalizedList
  achievements: Achievement[]
  stack: StackItem[]
  featured: boolean
}

// Historial real, confirmado por Diego (2026-09-21). Nada acá es inventado
// o parafraseado más allá de traducir/tipar lo que él mismo entregó.
export const experience: ExperienceEntry[] = [
  {
    id: 'mia-advanced-systems',
    company: 'Mia Advanced Systems',
    companyCountry: { es: 'España', en: 'Spain' },
    role: { es: 'Ingeniero Full Stack', en: 'Full Stack Engineer' },
    modality: { es: 'Remoto', en: 'Remote' },
    location: { es: 'España (remoto desde Colombia)', en: 'Spain (remote from Colombia)' },
    startDate: '2022-08',
    endDate: '2026-05',
    current: false,
    summary: {
      es: 'Desarrollo full stack con foco en backend, DevOps e infraestructura. Referente técnico del equipo durante cuatro años.',
      en: 'Full stack development focused on backend, DevOps and infrastructure. Technical reference for the team for four years.'
    },
    responsibilities: {
      es: [
        'Construí y mantuve servicios backend en NestJS y TypeScript: diseño de APIs REST, validación de datos y comunicación entre servicios en múltiples ambientes.',
        'Desarrollé funcionalidades de punta a punta con frontends en Vue y Angular: formularios complejos, tablas de datos, filtros y consumo de APIs en tiempo real.',
        'Desplegué y administré servicios de AWS (EC2, S3, ECR, Lambda, CloudFront) y configuré entornos de desarrollo y producción, en la nube y on-premise.',
        'Diagnostiqué y resolví incidentes en producción relacionados con configuración, variables de entorno, conectividad entre servicios y comportamiento en runtime.'
      ],
      en: [
        'Built and maintained NestJS/TypeScript backend services: REST API design, data validation and inter-service communication across multiple environments.',
        'Delivered end-to-end features with Vue and Angular frontends: complex forms, data tables, filtering and real-time API consumption.',
        'Deployed and managed AWS services (EC2, S3, ECR, Lambda, CloudFront) and configured development and production environments, both cloud and on-premise.',
        'Diagnosed and resolved production incidents involving configuration, environment variables, service connectivity and runtime behaviour.'
      ]
    },
    achievements: [
      {
        title: { es: 'Sistema self-service de certificados', en: 'Self-service certificate system' },
        description: {
          es: 'Construí la mayor parte del sistema de certificados laborales y de retenciones. La API empezó en .NET y la migré a NestJS con procesamiento por colas en RabbitMQ: recibe la solicitud, la encola, consume una API externa, genera los documentos, actualiza estados en base de datos, los empaqueta en un ZIP cifrado y los entrega.',
          en: 'Built most of the payroll and tax-retention certificate system. The API started in .NET and I migrated it to NestJS with queue-based processing on RabbitMQ: it receives the request, queues it, calls an external API, generates the documents, updates statuses in the database, packages them into an encrypted ZIP and delivers them.'
        },
        metric: {
          es: 'De varios días de gestión manual por correo a entrega inmediata',
          en: 'From several days of manual email handling to immediate delivery'
        }
      },
      {
        title: { es: 'Pipelines de CI/CD', en: 'CI/CD pipelines' },
        description: {
          es: 'Diseñé e implementé los pipelines de CI/CD del equipo con GitHub Actions y Docker, eliminando pasos manuales y los errores asociados.',
          en: "Designed and implemented the team's CI/CD pipelines with GitHub Actions and Docker, removing manual steps and related errors."
        },
        metric: {
          es: 'Despliegue de ~20 minutos manuales a ~5 automatizados',
          en: 'Deployments from ~20 manual minutes to ~5 automated'
        }
      }
    ],
    stack: [
      { name: 'NestJS', icon: 'simple-icons:nestjs' },
      { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: '.NET', icon: 'simple-icons:dotnet' },
      { name: 'Vue', icon: 'simple-icons:vuedotjs' },
      { name: 'Angular', icon: 'simple-icons:angular' },
      { name: 'RabbitMQ', icon: 'simple-icons:rabbitmq' },
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'MySQL', icon: 'simple-icons:mysql' },
      { name: 'MongoDB', icon: 'simple-icons:mongodb' },
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'GitHub Actions', icon: 'simple-icons:githubactions' },
      { name: 'AWS', icon: 'simple-icons:amazonaws' },
      { name: 'Python', icon: 'simple-icons:python' }
    ],
    featured: true
  },
  {
    id: 'interactivo-contact-center',
    company: 'Interactivo Contact Center',
    companyCountry: { es: 'Colombia', en: 'Colombia' },
    role: { es: 'Ingeniero de Soluciones de Software', en: 'Software Solutions Engineer' },
    modality: { es: 'Híbrido', en: 'Hybrid' },
    location: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
    startDate: '2019-07',
    endDate: '2022-08',
    current: false,
    summary: {
      es: 'Aplicaciones full stack con Node.js e integración con sistemas internos y plataformas CRM.',
      en: 'Full stack applications with Node.js and integrations with internal systems and CRM platforms.'
    },
    responsibilities: {
      es: [
        'Entregué aplicaciones full stack con Node.js y Express alineadas con los requerimientos del negocio.',
        'Integré APIs REST con sistemas internos y plataformas CRM, con manejo de errores, flujos de autenticación y capas de transformación de datos.',
        'Identifiqué cuellos de botella mediante profiling y apliqué optimización de consultas, estrategias de caché y mejoras de arquitectura.',
        'Realicé pruebas funcionales y de integración junto al equipo de QA para asegurar la estabilidad en producción.'
      ],
      en: [
        'Delivered full stack applications with Node.js and Express aligned with business requirements.',
        'Integrated REST APIs with internal systems and CRM platforms, with error handling, authentication flows and data transformation layers.',
        'Identified performance bottlenecks through profiling and applied query optimization, caching strategies and architectural improvements.',
        'Performed functional and integration testing alongside QA to ensure production stability.'
      ]
    },
    achievements: [],
    stack: [
      { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
      { name: 'Express', icon: 'simple-icons:express' },
      { name: 'JavaScript', icon: 'simple-icons:javascript' },
      { name: 'REST APIs', icon: 'lucide:webhook' },
      { name: 'SQL', icon: 'lucide:database' }
    ],
    featured: false
  },
  {
    id: 'grupo-meiko',
    company: 'Grupo Meiko',
    companyCountry: { es: 'Colombia', en: 'Colombia' },
    role: { es: 'Desarrollador Junior', en: 'Junior Developer' },
    modality: { es: 'Presencial', en: 'On-site' },
    location: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
    startDate: '2018-02',
    endDate: '2019-05',
    current: false,
    summary: {
      es: 'Desarrollo web corporativo, estandarización de entornos y visualización de datos.',
      en: 'Corporate web development, environment standardization and data visualization.'
    },
    responsibilities: {
      es: [
        'Desarrollé módulos e interfaces dinámicas para el sitio web corporativo.',
        'Introduje Docker en el equipo para estandarizar los entornos de desarrollo local.',
        'Construí dashboards y visualizaciones de KPIs en QlikView y apoyé procesos de carga de datos.'
      ],
      en: [
        'Developed modules and dynamic interfaces for the corporate website.',
        'Introduced Docker to the team to standardize local development environments.',
        'Built KPI dashboards and visualizations in QlikView and supported data loading processes.'
      ]
    },
    achievements: [],
    stack: [
      { name: 'JavaScript', icon: 'simple-icons:javascript' },
      { name: 'HTML', icon: 'simple-icons:html5' },
      { name: 'CSS', icon: 'simple-icons:css3' },
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'QlikView', icon: 'simple-icons:qlik' }
    ],
    featured: false
  }
]
