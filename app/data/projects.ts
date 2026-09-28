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

// Solo notify-engine, a pedido explícito de Diego. Miattend (2026-09-21) y
// Amadia Technology (2026-09-28, aún sin primer cliente) quedan fuera por
// ahora — siguen reales en docs/content.md y 00-mapa.md, solo no se muestran
// en esta sección todavía.
export const projects: Project[] = [
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
    links: [
      { label: { es: 'Ver código', en: 'View code' }, url: 'https://github.com/soypiipe/notify-engine' }
    ]
  },
  {
    id: 'energy-ai',
    nameKey: 'projects.energyAi.name',
    kindKey: 'projects.energyAi.kind',
    role: { es: 'Autor único, de punta a punta', en: 'Solo author, end-to-end' },
    startDate: '2026-09',
    endDate: '2026-09',
    current: false,
    summary: {
      es: 'Plataforma de gestión energética que convierte lecturas de medidores eléctricos en decisiones operativas: detecta anomalías con un motor estadístico explicable, las prioriza y genera una explicación en lenguaje natural apoyada en un LLM que solo redacta, nunca decide.',
      en: 'Energy management platform that turns electrical meter readings into operational decisions: detects anomalies with an explainable statistical engine, prioritizes them, and generates a natural-language explanation backed by an LLM that only drafts text, never decides.'
    },
    responsibilities: {
      es: [
        'Diseñé y construí de punta a punta un motor de detección de anomalías basado en estadística robusta (mediana y MAD por hora del día), sin machine learning, priorizando la explicabilidad frente a un modelo de caja negra.',
        'Implementé una cola de trabajos sobre PostgreSQL (SELECT ... FOR UPDATE SKIP LOCKED) para el procesamiento asíncrono del análisis, evitando infraestructura de mensajería adicional que el volumen del proyecto no justificaba.',
        'Diseñé la interfaz Explainer con dos implementaciones reales: una plantilla determinista y un cliente compatible con la API de OpenAI, con respaldo automático a la plantilla si el LLM falla o no hay clave configurada.',
        'Construí el backend en Go con la librería estándar (sin framework web ni ORM) y el frontend en Vue 3 con TypeScript, PrimeVue y ECharts, empaquetados con Docker en una build multi-stage sobre una imagen distroless.'
      ],
      en: [
        'Designed and built an anomaly-detection engine end-to-end using robust statistics (median and MAD per hour of day), with no machine learning, favoring explainability over a black-box model.',
        "Implemented a job queue on top of PostgreSQL (SELECT ... FOR UPDATE SKIP LOCKED) for asynchronous analysis processing, avoiding extra messaging infrastructure that the project scale didn't justify.",
        'Designed the Explainer interface with two real implementations: a deterministic template and an OpenAI-compatible LLM client, with automatic fallback to the template if the LLM fails or no key is configured.',
        'Built the backend in Go using only the standard library (no web framework or ORM) and the frontend in Vue 3 with TypeScript, PrimeVue and ECharts, packaged with Docker in a multi-stage build on a distroless image.'
      ]
    },
    achievements: [
      {
        title: { es: 'Detección explicable sin caja negra', en: 'Explainable detection, no black box' },
        description: {
          es: 'Un árbol de reglas basado en baseline por hora, z-score robusto y una razón de consistencia física (kWh / V·I·FP) clasifica cada caso — anomalía real, falso positivo o problema de calidad de datos — con evidencia numérica auditable en cada decisión.',
          en: 'A rule tree based on hourly baselines, a robust z-score, and a physical consistency ratio (kWh / V·I·PF) classifies each case — real anomaly, false positive, or data-quality issue — with auditable numeric evidence behind every decision.'
        },
        metric: {
          es: '4 de 4 anomalías reales detectadas, 0 falsos positivos en los 8 medidores restantes',
          en: '4 of 4 real anomalies detected, 0 false positives across the other 8 meters'
        }
      },
      {
        title: { es: 'Cola de trabajos sin infraestructura adicional', en: 'Job queue with no extra infrastructure' },
        description: {
          es: 'El análisis se procesa de forma asíncrona con un worker en goroutine que reclama trabajo con SKIP LOCKED sobre PostgreSQL, sobrevive a reinicios y recupera ejecuciones atascadas — el patrón de cola sin sumar una pieza más al stack.',
          en: 'Analysis runs asynchronously via a goroutine worker that claims work with SKIP LOCKED on PostgreSQL, survives restarts, and recovers stuck runs — the queue pattern without adding another moving piece to the stack.'
        },
        metric: {
          es: 'Cero infraestructura de mensajería adicional',
          en: 'Zero additional messaging infrastructure'
        }
      },
      {
        title: { es: 'LLM que redacta, nunca decide', en: 'LLM that drafts, never decides' },
        description: {
          es: 'El modelo de lenguaje solo recibe la evidencia ya calculada por el motor determinista y la convierte en texto legible; verifiqué cifra por cifra que las explicaciones generadas coinciden exactamente con la evidencia, y endurecí el prompt para evitar que sugiriera causas no verificadas.',
          en: 'The language model only receives evidence already computed by the deterministic engine and turns it into readable text; I verified figure by figure that the generated explanations exactly match the underlying evidence, and hardened the prompt to prevent it from suggesting unverified causes.'
        },
        metric: {
          es: '0 cifras inventadas en las explicaciones generadas',
          en: '0 fabricated figures in generated explanations'
        }
      }
    ],
    technologies: [
      { name: 'Go', icon: 'simple-icons:go' },
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'Vue', icon: 'simple-icons:vuedotjs' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'PrimeVue', icon: 'simple-icons:primevue' },
      { name: 'ECharts', icon: 'simple-icons:apacheecharts' },
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'JWT', icon: 'lucide:key-round' },
      { name: 'OpenAI-compatible LLM API', icon: 'simple-icons:openai' },
      { name: 'Swagger / OpenAPI', icon: 'simple-icons:swagger' }
    ],
    links: [
      { label: { es: 'Ver código', en: 'View code' }, url: 'https://github.com/soypiipe/energy-ai' }
    ]
  }
]
