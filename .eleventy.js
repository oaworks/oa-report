// .env file to be used with environment variables
require('dotenv').config();

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
const feather = require('feather-icons');
const iconShortcode = (icon) => feather.icons[icon].toSvg({ class: 'inline-block duration-500'});
const iconShortcodeSmall = (icon) => feather.icons[icon].toSvg({ class: 'inline-block h-4 duration-500'});

// TailwindCSS
const htmlmin = require('html-minifier');
const now = String(Date.now());

// CSS minifier
// const cssmin = require('cssmin');

// Configs
module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib);
  
  // Make .env variables to templates 
  eleventyConfig.addGlobalData('env', process.env);

  // Add NJK template tag to access feathericons
  eleventyConfig.addShortcode('icon', iconShortcode);
  eleventyConfig.addShortcode('icon_small', iconShortcodeSmall);

  // Get Axios and place in assets dir to use client-side
  eleventyConfig.addPassthroughCopy({
        "./node_modules/axios/dist/axios.min.js": "/js/axios.min.js"
    });

  // Watch tailwindCSS
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js');
  eleventyConfig.addWatchTarget('./styles/input.css');
  eleventyConfig.addShortcode('version', function () {
    return now;
  });
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Enable CORS
  eleventyConfig.setBrowserSyncConfig({
  middleware: function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    }
  });

  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/js/');
  eleventyConfig.addPassthroughCopy('./src/css/');
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/media/');
  eleventyConfig.addPassthroughCopy('./src/favicons/');
  eleventyConfig.addPassthroughCopy("./src/*.xml");
  eleventyConfig.addPassthroughCopy("./src/*.txt");

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
