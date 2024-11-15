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
      'blue': {
        100: '#E6F2FF',
        200: '#D0E7FF',
        300: '#A9D0FF',
        400: '#719ECE', // Accent option
        500: '#5A7FCC',
        600: '#4A6AB2',
      },
      'green': {
        100: '#E7F2EB',
        200: '#CCE1D4',
        300: '#59836A', // Accent option
        400: '#3D6A51',
        500: '#2E5441',
        600: '#243F33',
      },
      'yellow': {
        100: '#FFF7DA',
        200: '#FFE8AB',
        300: '#FFD97A',
        400: '#FFBF60', // Accent option
        500: '#E69D55',
        600: '#CC8B4C',
      },
    },
  },
}
