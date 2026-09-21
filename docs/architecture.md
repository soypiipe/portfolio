# Technical Architecture

## Recommended stack

- Nuxt
- Vue 3
- TypeScript
- Tailwind CSS
- Nuxt i18n
- Motion library compatible with Vue/Nuxt
- Static generation where practical

This is a personal portfolio, so avoid backend infrastructure unless a concrete feature requires it.

## Suggested structure

```text
.
├── CLAUDE.md
├── README.md
├── app/
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── stack/
│   │   ├── projects/
│   │   ├── experience/
│   │   ├── contact/
│   │   └── ui/
│   ├── composables/
│   ├── data/
│   ├── pages/
│   ├── layouts/
│   ├── assets/
│   └── app.vue
├── content/
│   ├── es.json
│   └── en.json
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon/
├── docs/
│   ├── ux-ui.md
│   ├── architecture.md
│   ├── content.md
│   └── implementation-plan.md
└── package.json
```

## Data-driven content

Prefer typed data for:
- projects
- experience
- technologies
- navigation

This makes the portfolio easier to maintain.

## SEO

Implement:
- title
- description
- canonical
- Open Graph
- Twitter/X metadata
- locale metadata
- sitemap
- robots
- structured data for Person where appropriate

Do not claim awards, companies, clients or metrics that have not been provided.

## Images

Use modern image formats when possible.

Optimize:
- dimensions
- compression
- loading priority
- responsive sizes

Hero image should be loaded intelligently because it is above the fold.

## Performance

Target:
- minimal JS
- lazy-load below-fold images
- avoid heavy animation packages if CSS can do the job
- avoid unnecessary client-side rendering
- no layout shift

## Deployment

The project should be compatible with static hosting or a simple Node/Nuxt deployment.

Do not couple it to a specific hosting provider yet.
