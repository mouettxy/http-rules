/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        100: '#b3c7f7',
        DEFAULT: '#0073E6',
      },
      gray: {
        50: '#f7f7f7',
        100: '#f2f2f2',
        200: '#eaeaea',
        300: '#dddddd',
        400: '#c9c9c9',
        500: '#a8a8a8',
        600: '#898989',
        700: '#6c6c6c',
        800: '#535353',
        900: '#3d3d3d',
        1000: '#2a2a2a',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
