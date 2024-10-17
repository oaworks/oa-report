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
        600: '#e65353',
        700: '#cc4040',
        800: '#b32e2e',
        900: '#992222',
      },
      'neutral': {
        50:  '#F9F9FA',
        100: '#F0F0F1',
        200: '#E2E3E5',
        300: '#C8C9CC',
        400: '#ABADB0',
        500: '#8F9094',
        600: '#727377',
        700: '#5A5B5E',
        800: '#434446',
        900: '#2E2E2F',
      },
      // Complementary colors
      'navy-blue': {
        100: '#e0e6ea',
        200: '#99b1c2',
        300: '#002237',
        400: '#001d30',
        500: '#001424',
        600: '#000c16',
      },
      'light-blue': {
        100: '#e6f2ff',
        200: '#d0e7ff',
        300: '#b8d4ff',
        400: '#90baff',
        500: '#7099e0',
        600: '#5a7fcc',
      },
      'coral-peach': {
        100: '#ffe8e1',
        200: '#ffd6ca',
        300: '#ffb39d',
        400: '#ff937b',
        500: '#e07668',
        600: '#cc614f',
      },
      'forest-green': {
        100: '#e7f2eb',
        200: '#cce1d4',
        300: '#59836a',
        400: '#3d6a51',
        500: '#2e5441',
        600: '#243f33',
      },
      'yellow': {
        100: '#fff2da',
        200: '#ffdeab',
        300: '#ffc978',
        400: '#ffb060',
        500: '#e69d55',
        600: '#cc8b4c',
      }
    },
  },
}
