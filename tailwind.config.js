/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gh-dark': '#0D1117',
        'gh-text': '#C9D1D9',
        'gh-true': '#2EA043',
        'gh-false': '#DA3633',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 0.3s ease-in-out',
        'hit': 'hit 0.2s ease-in-out',
        'pulse-fast': 'pulse 0.5s ease-in-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        hit: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: '#2EA043' },
        },
      },
    },
  },
  plugins: [],
}
