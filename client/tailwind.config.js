/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        slidein: {
          '0%': { transform: 'translateX(-650px)', opacity: '0' },
          '100%': { transform: 'translateX(0))', opacity: '1' },
        },
        fadeout: {
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'slide-in': 'slidein 0.3s linear',
        'fade-out': 'fadeout 1s linear 3s forwards',
      },
    },
  },
  plugins: [],
}

