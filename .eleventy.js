const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const feather = require('feather-icons')

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
}

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs)

const iconShortcode = (icon) => feather.icons[icon].toSvg({ class: 'block m-auto'});

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib);

  // Add NJK template tag to access feathericons
  eleventyConfig.addShortcode('icon', iconShortcode);

  // Watch tailwindCSS
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js');
  eleventyConfig.addWatchTarget('./styles/tailwind.css');

  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/media/');
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/js/');
  eleventyConfig.addPassthroughCopy('./src/favicons/');
  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })
 
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
};
};
