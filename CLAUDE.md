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

Implement in this order:

1. Navigation
2. Hero
3. About
4. Technology / Stack
5. Selected Projects
6. Experience
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

## Development behavior

Work in phases. Do not build the whole site in one giant step.

Phase 1: scaffold and design tokens.
Phase 2: navigation + hero.
Phase 3: about + stack.
Phase 4: projects.
Phase 5: experience + contact.
Phase 6: bilingual content.
Phase 7: motion + responsive polish.
Phase 8: SEO/accessibility/performance.
Phase 9: final visual QA.

At the end of every phase:
- run the relevant checks
- inspect the result
- report what changed
- identify unresolved placeholders

Do not silently invent missing content.
