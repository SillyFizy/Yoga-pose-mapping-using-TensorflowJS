/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
      './src/**/*.{js,jsx,vue,ts}'
  ],
  theme: {
    extend: {
        colors:{
            'amaranth': {
                '50': '#fff1f4',
                '100': '#ffe4ea',
                '200': '#fecdd8',
                '300': '#fda4b8',
                '400': '#fb718f',
                '500': '#f43f67',
                '600': '#e11d48',
                '700': '#be1238',
                '800': '#9f1231',
                '900': '#88132d',
                '950': '#4c0515',
            },
        }
    },
  },
  plugins: [],
}

