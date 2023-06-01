// .env file to be used with environment variables
require('dotenv').config();

// HTML minifier
const htmlmin = require("html-minifier");

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

const now = String(Date.now());

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

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content) {
    if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
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
  eleventyConfig.addPassthroughCopy('./src/js/');
  eleventyConfig.addPassthroughCopy('./src/css/');
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/favicons/');
  eleventyConfig.addPassthroughCopy("./src/*.xml");
  eleventyConfig.addPassthroughCopy("./src/*.txt");

  // Add NJK template tag for WebP images (and fallback)
  // Image is included this way: {% webpImg "images/image.jpg", "Alt text here", "Optional custom class here" %}
  eleventyConfig.addShortcode("webpImg", function(filename, altText, width, height, classes = '', loading = false) {
    const webpFilename = filename.replace(/\.[^.]+$/, ".webp");

    // Call checkWebPSupport() here to determine WebP support
    let hasWebPSupport = false;
    checkWebPSupport(function(supported) {
      hasWebPSupport = true;
    });

    const imgClasses = classes ? `class="${classes}"` : '';
    const loadingAttr = loading ? 'loading="lazy"' : '';

    if (hasWebPSupport) {
      return `<picture>
                <source srcset="${webpFilename}" type="image/webp">
                <img src="${filename}" alt="${altText}" width="${width}" height="${height}" ${imgClasses} ${loadingAttr}>
              </picture>`;
    } else {
      return `<img src="${filename}" alt="${altText}" ${imgClasses} ${loadingAttr}>`;
    }
  });

  // Define checkWebPSupport() function 
  function checkWebPSupport(callback) {
    const img = new (require('canvas').Image)();
    img.onerror = function() {
      callback(false);
    };
    img.onload = function() {
      callback(true);
    };
    img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  }

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  });

  // Define output directory when compiling assets
  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
};
};
