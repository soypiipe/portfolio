import type { Config } from 'tailwindcss'

// Paleta aprobada: Charcoal + Rust (ver docs/ux-ui.md §3).
// Tokens centralizados aquí a propósito: si más adelante se decide una
// paleta distinta, solo se tocan estos valores, no los componentes.
//
// Lenguaje de motion (una sola curva y tres duraciones para todo el sitio):
//   --ease-soft (main.css)  → desaceleración suave, sin rebote ni overshoot
//   250ms                   → hover / estados (default de `transition`)
//   450ms                   → expandir / contraer
//   800ms                   → entradas (hero, reveal on scroll)
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0C0A09',
        surface: '#171310',
        'surface-hover': '#2A2623',
        primary: '#F1EEE9',
        secondary: '#A79E96',
        accent: '#B9502C',
        'accent-hover': '#C16545',
        hairline: '#2C2620',
        'hairline-muted': '#1F1B17'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--ease-soft)',
        soft: 'var(--ease-soft)'
      },
      transitionDuration: {
        DEFAULT: '250ms'
      },
      animation: {
        'fade-up': 'fade-up 0.8s var(--ease-soft) both',
        'fade-down': 'fade-down 0.7s var(--ease-soft) both'
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-down': {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  }
} satisfies Config
