/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        desk: '900px',
      },
      colors: {
        desktop: 'var(--bg-desktop)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        hover: 'var(--bg-hover)',
        'os-border': 'var(--border)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        dim: 'var(--text-dim)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        window: '0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px var(--border)',
        'window-light': '0 20px 48px rgba(0,0,0,0.15), 0 0 0 1px var(--border)',
        dock: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px var(--border)',
      },
    },
  },
  plugins: [],
}
