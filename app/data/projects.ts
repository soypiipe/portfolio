import type { LocalizedText, LocalizedList, Achievement, StackItem } from './experience'

export interface ProjectLink {
  label: LocalizedText
  url: string
}

export interface Project {
  id: string
  nameKey: string
  // Tag corto — viene del campo "Status" real de docs/content.md (proyecto
  // real vs. propio), no una frase de contexto inventada.
  kindKey: string
  // Descripción corta vía i18n. Usada cuando `summary` no está presente.
  descriptionKey?: string
  technologies: StackItem[]

  // Campos opcionales, más ricos — solo los usan proyectos con historia
  // propia que contar (ver notify-engine). Inline {es,en} en vez de i18n
  // plano porque son textos largos/estructurados, igual que experience.ts.
  role?: LocalizedText
  startDate?: string
  endDate?: string | null
  current?: boolean
  summary?: LocalizedText
  responsibilities?: LocalizedList
  achievements?: Achievement[]
  links?: ProjectLink[]
}

// Miattend y Amadia Technology: los dos confirmados en docs/content.md, tal
// cual estaban (no se tocaron). El "tercer proyecto" de content.md sigue
// como "TO BE CONFIRMED" — no se inventa.
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
  },
  {
    id: 'notify-engine',
    nameKey: 'projects.notifyEngine.name',
    kindKey: 'projects.notifyEngine.kind',
    role: { es: 'Autor único, de punta a punta', en: 'Solo author, end-to-end' },
    startDate: '2026-05',
    endDate: null,
    current: true,
    summary: {
      es: 'Motor de notificaciones multicanal construido desde cero como case study de arquitectura: backends de cola y canales de entrega intercambiables en runtime, con trazabilidad distribuida de punta a punta.',
      en: 'Multi-channel notification engine built from scratch as an architecture case study: runtime-swappable queue backends and delivery channels, with end-to-end distributed tracing.'
    },
    responsibilities: {
      es: [
        'Diseñé y construí de punta a punta un motor de notificaciones asíncrono en NestJS, con procesamiento por colas, reintentos automáticos y manejo de dead-letter.',
        'Implementé una capa de abstracción de colas (Adapter pattern, BullMQ/SQS intercambiables) y de canales de entrega (Strategy pattern, email/Slack/SMS), sin acoplar la lógica de negocio a ninguna implementación concreta.',
        'Instrumenté el sistema con OpenTelemetry, exportando trazas a Grafana Tempo, cubriendo ambos caminos asíncronos de procesamiento.',
        'Ejecuté una auditoría de seguridad estructurada sobre el propio proyecto y resolví los hallazgos críticos: autenticación por API key, rate limiting, idempotencia contra envíos duplicados y una vulnerabilidad real de una dependencia npm.'
      ],
      en: [
        'Designed and built an asynchronous notification engine end-to-end in NestJS, with queue-based processing, automatic retries and dead-letter handling.',
        'Implemented a queue abstraction layer (Adapter pattern, swappable BullMQ/SQS) and a delivery abstraction layer (Strategy pattern, email/Slack/SMS), keeping business logic decoupled from any concrete implementation.',
        'Instrumented the system with OpenTelemetry, exporting traces to Grafana Tempo, covering both asynchronous processing paths.',
        'Ran a structured self-audit against my own codebase and resolved the critical findings: API-key authentication, rate limiting, idempotency against duplicate sends, and a real npm dependency vulnerability.'
      ]
    },
    achievements: [
      {
        title: { es: 'Colas intercambiables sin tocar lógica de negocio', en: 'Swappable queues without touching business logic' },
        description: {
          es: 'BullMQ (Redis) y AWS SQS conviven detrás de una interfaz común (IQueue). El backend activo se decide con una sola variable de entorno; cuando SQS está activo, la app no intenta conectarse a Redis en absoluto.',
          en: 'BullMQ (Redis) and AWS SQS sit behind a single IQueue interface. The active backend is chosen with one environment variable; when SQS is active, the app makes no attempt to connect to Redis at all.'
        },
        metric: {
          es: 'Un solo env var para cambiar de backend de colas',
          en: 'One environment variable to switch queue backends'
        }
      },
      {
        title: { es: 'Autoauditoría de seguridad y remediación', en: 'Security self-audit and remediation' },
        description: {
          es: 'Detecté que el endpoint principal operaba como open relay sin autenticación (podía usarse para enviar HTML arbitrario a través de mi cuenta de Resend). Implementé auth por API key, rate limiting e idempotencia para evitar envíos duplicados en reintentos.',
          en: 'Found that the main endpoint operated as an unauthenticated open relay (could be used to send arbitrary HTML through my Resend account). Implemented API-key auth, rate limiting and idempotency to prevent duplicate sends on retry.'
        },
        metric: {
          es: 'Resueltos los hallazgos críticos de la auditoría',
          en: 'Critical audit findings resolved'
        }
      },
      {
        title: { es: 'Trazabilidad distribuida en ambos caminos asíncronos', en: 'Distributed tracing across both async paths' },
        description: {
          es: 'Centralicé la lógica de envío en un único método de servicio compartido por el worker de BullMQ y el consumidor de SQS, garantizando trazas OpenTelemetry idénticas sin importar qué backend procesó la notificación.',
          en: 'Centralized the sending logic into a single service method shared by the BullMQ worker and the SQS consumer, guaranteeing identical OpenTelemetry traces regardless of which backend processed the notification.'
        },
        metric: {
          es: 'Trazas end-to-end en Grafana Tempo para ambos backends',
          en: 'End-to-end traces in Grafana Tempo for both backends'
        }
      }
    ],
    technologies: [
      { name: 'NestJS', icon: 'simple-icons:nestjs' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'TypeORM', icon: 'simple-icons:typeorm' },
      { name: 'BullMQ', icon: 'lucide:layers' },
      { name: 'AWS SQS', icon: 'simple-icons:amazonaws' },
      { name: 'Redis', icon: 'simple-icons:redis' },
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'OpenTelemetry', icon: 'simple-icons:opentelemetry' },
      { name: 'Grafana Tempo', icon: 'simple-icons:grafana' },
      { name: 'Resend', icon: 'simple-icons:resend' },
      { name: 'Slack API', icon: 'simple-icons:slack' }
    ],
    // Solo el repo — "case study" del JSON original era el mismo repo con
    // #readme, no un destino distinto, así que un solo link evita redundancia.
    // liveDemo venía null, se omite.
    links: [
      { label: { es: 'Ver código', en: 'View code' }, url: 'https://github.com/soypiipe/notify-engine' }
    ]
  }
]
