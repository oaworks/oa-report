// .env file to be used with environment variables
require('dotenv').config();

const { DateTime } = require("luxon");

// HTML minifier
const { minify } = require("html-minifier-terser");

// Markdown
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
};
const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

// Phosphor icon set
const iconShortcode = (icon) => `<i class="ph ph-${icon} inline-block" aria-hidden="true"></i>`;
const iconShortcodeSmall = (icon) => `<i class="ph ph-${icon} inline-block text-[16px] leading-none" aria-hidden="true"></i>`;

const now = String(Date.now());

// ───────────────────────────────────────────────────────────
// Main Eleventy config
// ───────────────────────────────────────────────────────────
module.exports = async function (eleventyConfig) {

  /* ─── Add the missing Nunjucks `date` filter ───────────── */
  eleventyConfig.addFilter("date", (value, fmt = "LLL d, yyyy") =>
    DateTime.fromISO(value, { zone: "utc" }).toFormat(fmt)
  );

  /* ─── Thousands separators for static figures, e.g. 4,800 ─ */
  eleventyConfig.addFilter("number", (value) =>
    Number(value).toLocaleString("en-GB")
  );

  /**
   * Formats a { start, end } ISO date range, e.g. "1 Jan – 3 Nov 2026"
   * or "1 Jul 2025 – 30 Jun 2026". A full calendar year shows as "2025".
   */
  const formatDateRange = ({ start, end }) => {
    const s = DateTime.fromISO(start, { zone: "utc" });
    const e = DateTime.fromISO(end, { zone: "utc" });
    if (s.year === e.year && s.toFormat("LLdd") === "0101" && e.toFormat("LLdd") === "1231") return String(s.year);
    return s.year === e.year
      ? `${s.toFormat("d LLL")} – ${e.toFormat("d LLL yyyy")}`
      : `${s.toFormat("d LLL yyyy")} – ${e.toFormat("d LLL yyyy")}`;
  };
  eleventyConfig.addFilter("dateRange", formatDateRange);

  /**
   * Describes a comparison period relative to the period shown,
   * e.g. "vs same period in 2025", or the full range when it isn’t a year earlier.
   */
  eleventyConfig.addFilter("comparedWith", (period, comparison) => {
    const yearEarlier = (iso) => DateTime.fromISO(iso, { zone: "utc" }).minus({ years: 1 }).toISODate();
    const isYearEarlier = yearEarlier(period.start) === comparison.start && yearEarlier(period.end) === comparison.end;
    const label = formatDateRange(comparison);
    if (!isYearEarlier || /^\d{4}$/.test(label)) return `vs ${label}`;
    const sameYear = comparison.start.slice(0, 4) === comparison.end.slice(0, 4);
    return sameYear ? `vs same period in ${comparison.start.slice(0, 4)}` : "vs same period a year earlier";
  });

  /* ─── Markdown setup ───────────────────────────────────── */
  eleventyConfig.setLibrary('md', markdownLib);

  /* ─── Global ENV vars ──────────────────────────────────── */
  eleventyConfig.addGlobalData('env', process.env);

  /* ─── Phosphor icons ───────────────────────────────────── */
  eleventyConfig.addShortcode('icon',        iconShortcode);
  eleventyConfig.addShortcode('icon_small',  iconShortcodeSmall);

  /* ─── Shared JS constants exposed to templates ─────────── */
  eleventyConfig.addGlobalData('uiClasses', await import('./src/js/constants/ui.js'));

  /* ─── Passthrough files ───────────────────────────────── */
  eleventyConfig.addPassthroughCopy({
    "./node_modules/axios/dist/axios.min.js": "/js/axios.min.js"
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@phosphor-icons/web/src/regular/style.css": "/phosphor/style.css"
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@phosphor-icons/web/src/fill/Phosphor-Fill.woff2": "/phosphor/Phosphor.woff2",
    "./node_modules/@phosphor-icons/web/src/fill/Phosphor-Fill.woff": "/phosphor/Phosphor.woff",
    "./node_modules/@phosphor-icons/web/src/fill/Phosphor-Fill.ttf": "/phosphor/Phosphor.ttf",
    "./node_modules/@phosphor-icons/web/src/fill/Phosphor-Fill.svg": "/phosphor/Phosphor.svg"
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
  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return await minify(content, {
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
  });
  eleventyConfig.addPassthroughCopy('./src/css/');
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/favicons/');
  eleventyConfig.addPassthroughCopy('./src/temp/');
  eleventyConfig.addPassthroughCopy("./src/*.xml");
  eleventyConfig.addPassthroughCopy("./src/*.txt");
  eleventyConfig.addPassthroughCopy("./_redirects");

  /* ─── WebP helper shortcode ────────────────────────────── */
  eleventyConfig.addShortcode("webpImg", function (filename, altText, width, height, classes = '', loading = false, fetchPriority = false) {
    const webpFilename = filename.replace(/\.[^.]+$/, ".webp");

    const imgClasses  = classes ? `class="${classes}"` : '';
    const loadingAttr = loading ? 'loading="lazy"' : '';
    const fetchPriorityAttr = fetchPriority ? 'fetchpriority="high"' : '';

    return `<picture>
              <source srcset="${webpFilename}" type="image/webp">
              <img src="${filename}" alt="${altText}" width="${width}" height="${height}" ${imgClasses} ${loadingAttr} ${fetchPriorityAttr}>
            </picture>`;
  });

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
