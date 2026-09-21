# UX/UI Specification — Diego Amado Portfolio

## 1. Product concept

The portfolio presents Diego Amado as a **modern software engineer who builds systems**, not simply as a developer listing technologies.

Core idea:

> More than writing code, I design systems.

The visual language should communicate:
- engineering
- clarity
- maturity
- technical depth
- curiosity
- real-world building

The website should feel closer to a premium digital product than to a conventional CV.

---

## 2. Art direction

### Visual keywords

- dark
- cinematic
- editorial
- technical
- restrained
- human
- modern

### Avoid

- AI-looking gradients
- purple/blue "AI SaaS" aesthetic
- excessive neon
- glassmorphism everywhere
- excessive rounded cards
- generic stock illustrations
- abstract 3D blobs
- noisy backgrounds
- excessive terminal decoration

The design can contain subtle technical references such as grids, coordinates, section numbers and code fragments, but they must remain secondary.

---

## 3. Color options

### Approved — Charcoal + Rust

Chosen after exploring the Hero in Stitch (3 concepts × several color systems). Use this as the implementation palette; the options below are earlier exploration, kept for reference.

- Background: `#0C0A09`
- Surface: `#171310`
- Primary text: `#F1EEE9`
- Secondary text: `#A79E96`
- Accent: `#B9502C` (muted burnt terracotta — used only for small indicators, links, focus states, never large fills)
- Border: `#2C2620`

Flat colors only. No gradients. The background grid pattern (see §6 Hero) carries a very slow, seamless drift animation (`70s` loop, one grid cell of displacement) — subtle ambient motion, disabled under `prefers-reduced-motion`.

### Option A — Rejected: Graphite + Teal

Initial recommendation. Dropped after Stitch exploration revealed the whole system (background, surfaces, hairlines, and the reference hero photo's own color grade) carried a persistent green/teal bias that felt "verdoso" even after swapping the accent — not just the accent color, but the neutrals themselves. Kept here only as a record of what to avoid.

- Background: `#0A0F10`
- Surface: `#101718`
- Surface elevated: `#151D1E`
- Primary text: `#F2F3EF`
- Secondary text: `#A9B1AE`
- Muted text: `#6F7976`
- Accent: `#36BFC0`
- Accent secondary: `#8CCF9A`
- Border: `#24302F`

### Option B — Neutral + Cobalt

If the first palette feels too green:

- Background: `#0B0D10`
- Surface: `#12151A`
- Primary text: `#F4F4F2`
- Secondary text: `#A8ADB5`
- Accent: `#4D8DFF`
- Secondary accent: `#8FAFFF`
- Border: `#272C34`

### Option C — Warm Technical

If a less "tech startup" feeling is desired:

- Background: `#11100E`
- Surface: `#181715`
- Primary text: `#F1EEE7`
- Secondary text: `#AAA59B`
- Accent: `#C4D36A`
- Secondary accent: `#D8A86B`
- Border: `#302F2A`

Do not mix palettes. The implementation must expose semantic tokens rather than hardcoding color values inside components.

---

## 4. Typography

Use a modern sans-serif with strong display weight and excellent readability.

Suggested:
- Inter
- Geist
- Manrope

Do not use futuristic display fonts.

Hierarchy:

Display:
- desktop: large, approximately 64–88px depending on viewport
- mobile: approximately 42–52px

H1 should be visually dominant.

Body:
- 16–18px
- comfortable line-height

Small labels:
- uppercase
- letter spacing
- restrained

---

## 5. Navigation

Desktop:

Left:
`DA` monogram + `Diego Amado`

Center:
`Inicio`
`Sobre mí`
`Proyectos`
`Experiencia`
`Stack`
`Contacto`

Right:
`ES / EN`
`Descargar CV`
`Hablemos`

Mobile:
- DA + Diego Amado
- menu button
- full-screen or large clean mobile menu

Active navigation state should be a small underline or color change, not a pill.

---

## 6. Hero

The hero is the most important screen.

Composition:

Left:
- small eyebrow: `INGENIERO DE SISTEMAS · SOFTWARE ENGINEER`
- large name: `Diego Amado`
- short statement
- supporting line
- CTAs
- availability

Right/background:
- cinematic workspace image
- laptop/code
- mountain/environment
- dog as a subtle personal detail

The image should not overpower the text.

Approved technical treatment (from Stitch exploration, "Technical" concept):
- Faint full-bleed background grid (48px cells, 1px hairlines) with a very slow seamless drift animation (`70s` loop, disabled under `prefers-reduced-motion`) — the one deliberate ambient-motion detail in the hero.
- Hero photo sits in a thin "viewfinder" frame (hairline border + small corner brackets), not a big glossy banner.
- Small monospace metadata around the layout (coordinates, index numbers, status tags) as secondary technical texture — stays subordinate to the headline.

Possible hero copy:

ES:
> Construyo sistemas digitales que convierten problemas complejos en soluciones simples.

EN:
> I build digital systems that turn complex problems into simple solutions.

Supporting:
> Desarrollo web, automatización e inteligencia artificial para resolver problemas reales.

Do not present unverified metrics in the hero.

---

## 7. About

Heading:

> Más que escribir código, diseño sistemas.

Content should explain:
- systems engineering background
- software development
- automation
- AI
- solving real problems
- continuous learning

Use 3–5 concise capability statements rather than a large biography.

Possible micro-labels:
- Análisis
- Desarrollo
- Automatización
- IA
- Aprendizaje continuo

---

## 8. Stack

Do not create a wall of logos.

Group technologies by purpose:

### Frontend
Vue.js
React
Angular
TypeScript

### Backend
Node.js
NestJS
Python
.NET

### Data
SQL Server
PostgreSQL
MySQL
MongoDB

### Infrastructure
Docker
Linux
Nginx
AWS
CI/CD

### Tools
Git
GitHub
VS Code

The section should communicate breadth while keeping the hierarchy clear.

---

## 9. Projects

Title:

> Proyectos seleccionados

Principle:
Show what was built and why, not only the stack.

Each project card should contain:
- project image
- name
- one-line problem/context
- concise description
- technologies
- external/detail action

Initial project placeholders:
1. Miattend
2. Amadia Technology
3. Third project — TO BE CONFIRMED

Do not invent the third project.

Projects should later support a detail/case-study page if useful.

---

## 10. Experience

Use a horizontal timeline on desktop and vertical timeline on mobile.

Each entry:
- date
- role
- company/project
- 1–2 lines describing actual responsibilities

Do not invent dates or titles. Use placeholders until the real CV information is provided.

---

## 11. Contact

Keep it simple.

Headline:
> ¿Tienes un proyecto en mente?

Supporting:
> Hablemos sobre cómo puedo ayudarte.

Actions:
- Email
- WhatsApp
- LinkedIn
- GitHub
- CV

Avoid fake contact information. Use placeholders until provided.

---

## 12. Footer

Small and quiet.

`Diego Amado`
`Ingeniero de Sistemas · Software Engineer`

Navigation links.

Copyright year should be generated dynamically.

---

## 13. Responsive behavior

Mobile is not a compressed desktop.

Mobile priorities:
1. name
2. statement
3. CTA
4. hero visual
5. projects
6. about
7. stack
8. experience
9. contact

Do not let decorative elements reduce content readability.

---

## 14. Accessibility

- semantic HTML
- proper heading hierarchy
- keyboard navigation
- visible focus
- sufficient contrast
- descriptive alt text
- reduced motion support
- buttons vs links used correctly
- no information conveyed only by color
