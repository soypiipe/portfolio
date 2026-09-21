import type { Config } from 'tailwindcss'

// Paleta aprobada: Charcoal + Rust (ver docs/ux-ui.md §3).
// Tokens centralizados aquí a propósito: si más adelante se decide una
// paleta distinta, solo se tocan estos valores, no los componentes.
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
      animation: {
        'grid-drift': 'grid-drift 70s linear infinite'
      },
      keyframes: {
        'grid-drift': {
          from: { backgroundPosition: '0px 0px' },
          to: { backgroundPosition: '48px 48px' }
        }
      }
    }
  }
} satisfies Config
