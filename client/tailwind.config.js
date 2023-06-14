/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'around': '3px 3px 3px #ccc,-1px -1px 3px #ccc,3px 0 3px #ccc, 0 3px 3px #ccc',
        'sub-around': '1px 1px 3px #ccc,0px 0px 3px #ccc,1px 0 3px #ccc, 0 1px 3px #ccc',
        'lg-around': '5px 10px 15px #ccc, 0px 0px 3px #ccc, 1px 0 3px #ccc, 0 1px 3px #ccc',
      },
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

