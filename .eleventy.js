// .env file to be used with environment variables
require('dotenv').config();

const { DateTime } = require("luxon");

// HTML minifier
const htmlmin = require("html-minifier");

// Markdown
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
};
const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

// Feather icon set
const feather = require('feather-icons');
const iconShortcode       = (icon) => feather.icons[icon].toSvg({ class: 'inline-block' });
const iconShortcodeSmall  = (icon) => feather.icons[icon].toSvg({ class: 'inline-block h-4' });

const now = String(Date.now());

// ───────────────────────────────────────────────────────────
// Main Eleventy config
// ───────────────────────────────────────────────────────────
module.exports = function (eleventyConfig) {

  /* ─── Add the missing Nunjucks `date` filter ───────────── */
  eleventyConfig.addFilter("date", (value, fmt = "LLL d, yyyy") =>
    DateTime.fromISO(value, { zone: "utc" }).toFormat(fmt)
  );

  /* ─── Markdown setup ───────────────────────────────────── */
  eleventyConfig.setLibrary('md', markdownLib);

  /* ─── Global ENV vars ──────────────────────────────────── */
  eleventyConfig.addGlobalData('env', process.env);

  /* ─── Feather icons ────────────────────────────────────── */
  eleventyConfig.addShortcode('icon',        iconShortcode);
  eleventyConfig.addShortcode('icon_small',  iconShortcodeSmall);

  /* ─── Passthrough files ───────────────────────────────── */
  eleventyConfig.addPassthroughCopy({
    "./node_modules/axios/dist/axios.min.js": "/js/axios.min.js"
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/sal.js/dist/sal.css": "sal.css",
    "./node_modules/sal.js/dist/sal.js":  "/js/sal.js",
  });

  /* ─── Watch Tailwind sources ───────────────────────────── */
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js');
  eleventyConfig.addWatchTarget('./styles/input.css');
  eleventyConfig.addShortcode('version', () => now);

  /* ─── Minify HTML output ───────────────────────────────── */
  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments:  true,
        collapseWhitespace: true
      });
    }
    return content;
  });

  /* ─── Enable CORS in BrowserSync ───────────────────────── */
  eleventyConfig.setBrowserSyncConfig({
    middleware: function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    }
  });

  /* ─── Static asset passthroughs ────────────────────────── */
  eleventyConfig.addPassthroughCopy({
    "./src/js/oaworksKeys.js": "/js/oaworksKeys.js",
    "./src/js/popper.min.js": "/js/popper.min.js",
    "./src/js/tippy-bundle.umd.min.js": "/js/tippy-bundle.umd.min.js"
  });
  eleventyConfig.addPassthroughCopy('./src/css/');
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/favicons/');
  eleventyConfig.addPassthroughCopy('./src/temp/');
  eleventyConfig.addPassthroughCopy("./src/*.xml");
  eleventyConfig.addPassthroughCopy("./src/*.txt");
  eleventyConfig.addPassthroughCopy("./_redirects");

  /* ─── WebP helper shortcode (unchanged) ────────────────── */
  eleventyConfig.addShortcode("webpImg", function (filename, altText, width, height, classes = '', loading = false) {
    const webpFilename = filename.replace(/\.[^.]+$/, ".webp");

    // Call checkWebPSupport() here to determine WebP support
    let hasWebPSupport = false;
    checkWebPSupport(() => { hasWebPSupport = true; });

    const imgClasses  = classes ? `class="${classes}"` : '';
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

  function checkWebPSupport(callback) {
    const img = new (require('canvas').Image)();
    img.onerror = () => callback(false);
    img.onload  = () => callback(true);
    img.src     = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  }

  /* ─── Liquid options ───────────────────────────────────── */
  eleventyConfig.setLiquidOptions({ dynamicPartials: true });

  /* ─── Directories ──────────────────────────────────────── */
  return {
    dir: {
      input:  'src',
      output: 'dist'
    }
  };
};
