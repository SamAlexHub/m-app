/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#031E1B',
          900: '#062E2A', // Primary Background
          800: '#0E453F', // Secondary Background / Card Base
          700: '#145A53',
          600: '#1E756C',
          500: '#2A9D90',
        },
        gold: {
          400: '#E7C87D',
          500: '#D6A24A', // Royal Gold Accent
          600: '#B88432',
          glow: 'rgba(214, 162, 74, 0.4)',
        },
        champagne: '#F8E8CD',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(214, 162, 74, 0.35)',
        'gold-halo': '0 0 40px rgba(214, 162, 74, 0.5)',
        'emerald-card': '0 20px 40px rgba(3, 30, 27, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle, rgba(214,162,74,0.2) 0%, rgba(6,46,42,0) 70%)',
        'radial-emerald': 'radial-gradient(circle, rgba(14,69,63,0.8) 0%, rgba(6,46,42,1) 100%)',
        'gold-linear': 'linear-gradient(135deg, #F8E8CD 0%, #D6A24A 50%, #B88432 100%)',
      }
    },
  },
  plugins: [],
}
