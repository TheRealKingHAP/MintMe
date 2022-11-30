/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'dark-mode-background': {
          100: '#999999',
          200: '#888888',
          300: '#777777',
          400: '#666666',
          500: '#555555',
          'hover-color': '#3A3B3C',
          'card-color': '#242526',
          'background': '#18191A',
        }
      },
      textColor: {
        'dark-primary': '#E4E6EB',
        'dark-secondary': '#B0B3B8'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
