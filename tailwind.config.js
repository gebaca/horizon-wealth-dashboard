/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Fondos
        'bg-primary': 'var(--color-bg-primary)',
        'bg-card': 'var(--color-bg-card)',
        'bg-sidebar': 'var(--color-bg-sidebar)',
        'bg-subtle': 'var(--color-bg-subtle)',

        // Bordes
        'border-base': 'var(--color-border)',
        'border-light': 'var(--color-border-light)',

        // Acción
        accent: 'var(--color-accent)',
        'accent-muted': 'var(--color-accent-muted)',

        // Semánticos
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',

        // Texto
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
      },
    },
  },
  plugins: [],
};
