module.exports = {
  content: [
    './src/_includes/**/*.{njk,svg}',
    './src/**/*.njk',
    './src/*.njk',
    './src/js/*.js',
    './.eleventy.js',
  ],
  safelist: [],
  theme: {
    fontFamily: {
      sans: ['Inter var', 'Inter', 'sans-serif'],
      serif: ['serif'],
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.025em',
      tight: '-.015em',
      normal: '0',
      wide: '.015em',
      wider: '.025em',
      widest: '.075em',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#fff',
      'carnation': {
        100: '#f4f0f0',
        200: '#fecfcf',
        300: '#ffaeac',
        400: '#ff8b89',
        500: '#ff6666',
      },
      'neutral': {
        50:  '#F8F8F9',
        100: '#ECEDEE',
        200: '#DADADD',
        300: '#C5C6C9',
        400: '#A7A9AD',
        500: '#8F9094',
        600: '#76777B',
        700: '#5D5E61',
        800: '#464648',
        900: '#2E2E2F',
      }
    },
  },
}
