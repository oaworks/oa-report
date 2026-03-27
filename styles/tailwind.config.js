const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/_includes/**/*.{njk,svg}',
    './src/_data/*.json',
    './src/**/*.njk',
    './src/*.njk',
    './src/js/**/*.js',
    './.eleventy.js',
  ],
  safelist: [],
  theme: {
    fontFamily: {
      sans: ['Inter var', 'Inter', 'sans-serif'],
      serif: ['Redaction', 'serif'],
      degraded: ["'Redaction 20'", 'serif'] // Redaction 20 (degraded) styles
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
      'white': 'rgb(255, 255, 255)',
      'carnation': {
        100: 'rgb(244, 240, 240)', // Very light, subtle background
        200: 'rgb(249, 207, 207)',
        300: 'rgb(247, 158, 158)',
        400: 'rgb(246, 110, 110)', // Accent option
        500: 'rgb(230, 78, 78)', // Primary action colour
        600: 'rgb(204, 66, 66)', // Darker variant for hover
        700: 'rgb(178, 54, 54)',
        800: 'rgb(153, 44, 44)',
        900: 'rgb(128, 35, 35)', // Deepest shade for text or strong accents
      },
      'oa': {
        gold: {
          DEFAULT: 'rgb(255, 209, 92)',
          border: 'rgb(196, 148, 28)',
        },
        green: {
          DEFAULT: 'rgb(92, 194, 169)',
          border: 'rgb(30, 129, 108)',
        },
        closed: {
          DEFAULT: 'rgb(46, 46, 47)',
          border: 'rgb(26, 26, 27)',
        },
        bronze: {
          DEFAULT: 'rgb(205, 127, 50)',
          border: 'rgb(154, 89, 26)',
        },
        diamond: {
          DEFAULT: 'rgb(187, 232, 240)',
          border: 'rgb(108, 191, 204)',
        },
        hybrid: {
          border: 'rgb(26, 26, 27)',
        },
        transformative: {
          DEFAULT: 'rgb(255, 209, 92)',
          border: 'rgb(26, 26, 27)',
        },
      },
      'neutral': {
        50:  'rgb(249, 249, 250)',
        100: 'rgb(247, 247, 248)',
        200: 'rgb(226, 227, 229)',
        300: 'rgb(200, 201, 204)',
        400: 'rgb(171, 173, 176)',
        500: 'rgb(143, 144, 148)',
        600: 'rgb(114, 115, 119)',
        700: 'rgb(90, 91, 94)',
        800: 'rgb(67, 68, 70)',
        900: 'rgb(46, 46, 47)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        '.bg-oa-hybrid': {
          backgroundImage: `linear-gradient(
            90deg,
            ${theme('colors.oa.closed.DEFAULT')} 0%,
            ${theme('colors.oa.closed.DEFAULT')} 50%,
            ${theme('colors.white')} 50%,
            ${theme('colors.white')} 100%
          )`,
        },
        '.bg-oa-transformative': {
          backgroundImage: `linear-gradient(
            90deg,
            ${theme('colors.oa.closed.DEFAULT')} 0%,
            ${theme('colors.oa.closed.DEFAULT')} 25%,
            rgb(96, 74, 44) 25%,
            rgb(96, 74, 44) 50%,
            rgb(170, 112, 40) 50%,
            rgb(170, 112, 40) 75%,
            ${theme('colors.oa.transformative.DEFAULT')} 75%,
            ${theme('colors.oa.transformative.DEFAULT')} 100%
          )`,
        },
      });

      // Flatten the theme colours and ignore `DEFAULT`
      const flattenColours = (colors, prefix = '') =>
        Object.entries(colors).reduce((acc, [key, value]) => {
          if (typeof value === 'object' && value !== null) {
            // If the current key is `DEFAULT`, don't append a `-`
            Object.assign(
              acc,
              flattenColours(value, key === 'DEFAULT' ? prefix : `${prefix}${key}-`)
            );
          } else {
            // Append the key directly; `DEFAULT` uses the current prefix only
            acc[`${prefix}${key === 'DEFAULT' ? '' : key}`] = value;
          }
          return acc;
        }, {});
      
      // Get flattened colours
      const flattenedColours = flattenColours(theme('colors'));

      // Remove trailing `-` from the colour names
      Object.keys(flattenedColours).forEach(key => {
        if (key.endsWith('-')) {
          flattenedColours[key.slice(0, -1)] = flattenedColours[key];
          delete flattenedColours[key];
        }
      });
      
      // Use matchUtilities to dynamically generate `highlight-{colour}` classes
      matchUtilities(
        {
          highlight: (value) => {
            const rgbValue = value.match(/\d+, \d+, \d+/)[0]; // Extract the RGB part
            return {
              borderRadius: '0.8em 0.3em',
              backgroundImage: `linear-gradient(
                to right,
                rgba(${rgbValue}, 0.2), 
                rgba(${rgbValue}, 0.5) 4%, 
                rgba(${rgbValue}, 0.3)
              )`,
            };
          },          
        },
        { values: flattenedColours }
      );
    })
  ]
};
