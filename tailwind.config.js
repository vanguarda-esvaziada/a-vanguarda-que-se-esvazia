/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // paleta do volume impresso: papel, tinta e o vermelho da capa
        tinta: {
          950: '#0b0b0e',
          900: '#111116',
          800: '#17171d',
          700: '#1f1f27',
          600: '#2a2a34',
        },
        papel: {
          100: '#f7f4ee',
          200: '#e8e3d9',
          300: '#c9c4ba',
          400: '#9a978f',
        },
        rubro: {
          400: '#e4756a',
          500: '#c8392c',
          600: '#8f1d14',
          700: '#6d150e',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        leitura: '38rem',
      },
      letterSpacing: {
        titulo: '-0.035em',
        selo: '0.22em',
      },
      keyframes: {
        subir: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'none' },
        },
        pulsar: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        subir: 'subir .7s cubic-bezier(.22,.8,.3,1) both',
        pulsar: 'pulsar 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
