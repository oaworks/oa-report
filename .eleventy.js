// Markdown
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
}
const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs)

// Feather icon set
const feather = require('feather-icons')
const iconShortcode = (icon) => feather.icons[icon].toSvg({ class: 'inline-block'});
const iconShortcodeSmall = (icon) => feather.icons[icon].toSvg({ class: 'inline-block h-4'});

// Configs
module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib);

  // Add NJK template tag to access feathericons
  eleventyConfig.addShortcode('icon', iconShortcode);
  eleventyConfig.addShortcode('icon_small', iconShortcodeSmall);

  // Watch tailwindCSS
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js');
  eleventyConfig.addWatchTarget('./styles/tailwind.css');

  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/media/');
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/favicons/');
 
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
