# Diego Amado — Portfolio

## Mission

Build a premium personal portfolio for **Diego Amado**, Systems Engineer / Software Engineer.

The portfolio must feel like a real product designed by a developer/designer, not an AI-generated template.

Primary goals:
1. Present Diego as a modern software engineer who builds real systems.
2. Showcase selected projects through outcomes and technical depth.
3. Support both Spanish and English.
4. Make the site fast, accessible, responsive and SEO-friendly.
5. Create a visual identity that can later become Diego's personal brand.

## Non-negotiable visual direction

- Dark, cinematic, editorial and technical.
- Minimal visual language.
- Strong typography.
- Large negative space.
- Subtle motion only.
- No visual noise.
- No gradients.
- No excessive glassmorphism.
- No floating 3D objects just for decoration.
- No generic "AI portfolio" aesthetic.
- No excessive glowing borders.
- No giant walls of technology logos.
- No template-like repeated rounded cards.
- Do not invent professional experience, projects, metrics or clients.
- Use placeholders where information is missing and mark them clearly for replacement.

## Brand details

Display name:
**Diego Amado**

Professional positioning:
**Software Engineer · AI · Automation**

Secondary positioning:
**Ingeniero de Sistemas · Software Engineer**

The top-left brand mark is a minimalist **DA** monogram. Keep it small and refined.

The hero must start visually with:
- DA mark / brand in navigation
- Diego Amado as the dominant personal identifier
- concise positioning
- one strong statement
- primary CTA to projects
- secondary CTA to contact/CV
- availability indicator

A dog is an intentional personal detail in the hero imagery. It should feel natural and subtle, never like a pet-themed website.

## Color system

Default direction:
- Deep graphite / near-black background
- Warm off-white primary text
- Muted cyan/teal accent
- Very restrained green secondary accent

Important: use a flat color system. Do not use gradient backgrounds.

Alternative palettes are documented in `docs/ux-ui.md`. Implement the default palette first, but keep color tokens centralized so another palette can be swapped without changing components.

## Language

Spanish is the primary content language.
English is a complete second locale.

Do not translate literally when a natural English professional expression is better.

## Technology direction

Use:
- Nuxt
- Vue
- TypeScript
- Tailwind CSS
- a lightweight motion library compatible with Vue/Nuxt
- Nuxt i18n
- semantic HTML
- accessible components

Prefer CSS transitions and transforms for simple interactions. Use JavaScript animation only when it materially improves the experience.

Avoid unnecessary dependencies.

## Architecture principles

Use a clean component architecture.

Suggested structure:

app/
  components/
    layout/
    navigation/
    hero/
    about/
    projects/
    experience/
    stack/
    contact/
    ui/
  composables/
  data/
  pages/
  assets/
  layouts/
  i18n/

Keep content/data separate from presentation.

Project cards, technologies, experience and navigation should be driven from typed data where practical.

## Motion rules

Motion should communicate hierarchy.

Allowed:
- hero staggered entrance
- section reveal on scroll
- subtle image movement
- timeline line drawing
- hover elevation of 2–4px
- small icon/arrow transitions
- navigation active-state transitions

Avoid:
- infinite floating animations
- excessive parallax
- bouncing
- spinning
- cursor-following everywhere
- animation that blocks reading
- animation that causes layout shifts

Respect `prefers-reduced-motion`.

## Hero visual

The approved concept uses a cinematic workspace/environment photograph with a laptop/code, mountain landscape and the dog as a subtle personal detail.

The implementation must work even if the final photograph is not available.

Create a clean placeholder image slot with the same aspect ratio and composition.

Do not generate fake professional biography details to fill the space.

## Sections

Final page order (must match the nav's own link order):

1. Navigation
2. Hero
3. About
4. Selected Projects
5. Experience
6. Technology / Stack
7. Contact
8. Footer

The page is intentionally concise. Do not add sections just to make it longer.

## Quality bar

Before considering the first version complete, verify:

- responsive from mobile to large desktop
- keyboard navigation
- visible focus states
- contrast
- reduced motion
- semantic headings
- metadata / Open Graph
- language alternates
- sitemap
- robots.txt
- no console errors
- optimized images
- no layout shift caused by images/fonts
- links have meaningful labels
- mobile navigation works
- no horizontal overflow

## Engineering principles

Standing rules for every session working on this codebase, not just the initial scaffold:

- **Best practices by default.** Follow standard Nuxt/Vue/TypeScript conventions and secure-by-default habits (no secrets committed, no `v-html` on untrusted input, validate anything that touches a form or external data) without being asked each time.
- **Only what's actually needed.** No dependency, abstraction, component, or config gets added "just in case." If a plain `<button>` does the job, it doesn't need a `Button.vue` wrapper yet. Prefer the platform/Nuxt built-ins over a library. This matters as much as the visual direction — don't let the project accumulate unused packages or speculative structure.
- **SEO is not a later phase, it's a default.** Even while a section is still a placeholder, ship it with correct semantic HTML (one `h1`, proper heading order), meaningful `alt` text, and real `useSeoMeta`/`useHead` where relevant — not deferred entirely to the SEO phase. That phase is for the full audit (sitemap, robots, structured data, OG images), not for retrofitting basics that should have been there from Phase 0.

## Development behavior

Work in phases. Do not build the whole site in one giant step.

Phases are defined in `docs/implementation-plan.md`. **`docs/progress.md` is
the live source of truth** for what's actually done, what deviated from plan
and why, and what's next — read it before assuming project state, and update
it as you go (not only when a phase closes). Do not keep a second copy of the
phase list anywhere else, including here — it will drift out of sync.

Workflow for every change, not just at the end of a phase:
- run lint + typecheck + build; fix what they catch before moving on
- keep the dev server running (don't kill it) so changes can be reviewed live
- report what changed and identify unresolved placeholders
- commit at the end of each meaningful unit of work — without AI/assistant
  attribution in the author or commit message

Do not silently invent missing content.
