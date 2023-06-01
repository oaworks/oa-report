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
        50:  '#e9e9e9',
        100: '#d3d2d2',
        200: '#bdbcbc',
        300: '#a7a6a5',
        400: '#92908f',
        500: '#7c7978',
        600: '#666362',
        700: '#504d4b',
        800: '#3a3635',
        900: '#24201e',
      }
    },
  },
}
