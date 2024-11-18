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
      serif: ['Redaction', 'serif'],
      degraded: ["'Redaction 20'", 'serif']  // Redaction 20 (degraded) styles
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
        100: '#F4F0F0', // Very light, subtle background
        200: '#F9CFCF',
        300: '#F79E9E',
        400: '#F66E6E', // Accent option
        500: '#E64E4E', // Primary action color
        600: '#CC4242', // Darker variant for hover
        700: '#B23636',
        800: '#992C2C',
        900: '#802323', // Deepest shade for text or strong accents
      },
      // Accent colours 
      'yellow': {
        DEFAULT: '#FFC72C',
        light: '#FFE7A1',
      },
      'green': {
        DEFAULT: '#2CA58D',
        light: '#A8D7C5',
      },
      'blue': {
        DEFAULT: '#3878FF',
        light: '#B8D5FF',
      },
      'purple': {
        DEFAULT: '#7D4DD3',
        light: '#D8BFF7',
      },
      'peach': {
        DEFAULT: '#F8B195',
        light: '#FFE2D5',
      },
      'neutral': {
        50:  '#F9F9FA',
        100: '#F7F7F8',
        200: '#E2E3E5',
        300: '#C8C9CC',
        400: '#ABADB0',
        500: '#8F9094',
        600: '#727377',
        700: '#5A5B5E',
        800: '#434446',
        900: '#2E2E2F',
      },
    },
  },
}
