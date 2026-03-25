/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#020205',
        surface: '#0a0a0f',
        'cyber-lime': '#ccff00',
        'electric-violet': '#8b5cf6',
        'hyper-gold': '#fbbf24',
        'neon-rose': '#ff0055',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
