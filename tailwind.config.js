/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        sage: {
          50:  '#f4f8f4', 100: '#e6f0e6', 200: '#cde1cd', 300: '#a7c9a7',
          400: '#7aab7a', 500: '#558c55', 600: '#407040', 700: '#345934',
          800: '#2b472b', 900: '#243b24', 950: '#111f11',
        },
        stone: {
          50:  '#faf9f7', 100: '#f2f0ec', 200: '#e5e1d8', 300: '#d2ccbf',
          400: '#b8af9e', 500: '#9e9080', 600: '#867769', 700: '#6e6156',
          800: '#5c5149', 900: '#4d4540', 950: '#292320',
        },
        cream: '#FBF8F3',
        moss:  '#3D5A3E',
        sand:  '#E8DFD0',
        clay:  '#C4A882',
        mist:  '#D4E8D4',
        leaf:  '#5C8A5C',
        dusk:  '#8B6F8B',
      },
      backgroundImage: {
        'gradient-wellness': 'linear-gradient(135deg, #f4f8f4 0%, #FBF8F3 50%, #e6f0e6 100%)',
        'gradient-hero':    'linear-gradient(160deg, #243b24 0%, #3D5A3E 40%, #558c55 100%)',
        'gradient-card':    'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(244,248,244,0.8) 100%)',
        'gradient-cta':     'linear-gradient(135deg, #3D5A3E 0%, #558c55 100%)',
      },
      boxShadow: {
        'card':       '0 2px 20px rgba(61,90,62,0.08), 0 1px 4px rgba(61,90,62,0.04)',
        'card-hover': '0 8px 40px rgba(61,90,62,0.14), 0 2px 8px rgba(61,90,62,0.06)',
        'glow':       '0 0 40px rgba(85,140,85,0.2)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        float:     { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
      },
    },
  },
  plugins: [],
}
