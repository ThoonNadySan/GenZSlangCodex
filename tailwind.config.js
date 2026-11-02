/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#21164d',
        night: '#151136',
        plum: '#3c2578',
        lilac: '#b7a5ff',
        mint: '#86f0ce',
        gold: '#ffd36e',
        coral: '#ff8b89'
      },
      boxShadow: {
        glow: '0 0 34px rgba(134,240,206,.22)',
        card: '0 14px 40px rgba(21,17,54,.2)'
      }
    }
  },
  plugins: []
}
