/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Emerald / teal primary with dark background
        primary: '#10b981', // emerald
        accent: '#14b8a6', // teal accent
        neutral: '#0f172a',
        muted: '#94a3b8',
        lightbg: '#f8fafc'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 6px 24px rgba(15, 23, 42, 0.08)'
      },
      borderRadius: {
        xl: '1rem'
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(.2,.8,.2,1)'
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate3d(-10%, -10%, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(10%, 10%, 0) rotate(180deg)' },
          '100%': { transform: 'translate3d(-10%, -10%, 0) rotate(360deg)' }
        }
      },
      animation: {
        aurora: 'aurora 18s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
