import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
      },
      colors: {
        brand: {
          primary: '#C9A96E',
          secondary: '#2D2D2D',
          accent: '#F5EDE0',
          soft: '#F9F3EC',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(45, 45, 45, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
