// Makes the built embed stylesheet safe to use inside a shadow root on someone else’s page,
// and writes embed-font.css next to it. Usage: node scripts/embed-css.js dist/embed.css

const fs = require('fs');
const path = require('path');

// Redaction Bold cut down to Basic Latin. To rebuild it from the full font:
// pyftsubset src/fonts/redaction/Redaction-Bold.woff2 --flavor=woff2 --layout-features='*'
//   --unicodes="U+0020-007E" --output-file=src/fonts/redaction/Redaction-Bold-embed.woff2
const FONT_FILE = path.join(__dirname, '../src/fonts/redaction/Redaction-Bold-embed.woff2');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/embed-css.js <built css file>');
  process.exit(1);
}

/**
 * Converts rem values to px, so the host page’s root font size can’t resize the cards.
 */
const remToPx = (css) =>
  css.replace(/(\d*\.?\d+)rem\b/g, (_, value) => `${parseFloat(value) * 16}px`);

/**
 * Removes the @supports wrapper around Tailwind’s --tw-* default values, keeping the values.
 */
const unwrapPropertyDefaults = (css) => {
  // Browsers ignore @property inside a shadow root, so its defaults never apply there.
  // Tailwind ships the same defaults as plain declarations, but only for old browsers.
  // Dropping that browser check makes them apply everywhere.
  const layer = css.search(/@layer properties\s*\{/);
  if (layer === -1) return css;
  const supports = css.indexOf('@supports', layer);
  const open = css.indexOf('{', supports);
  if (supports === -1 || open === -1) return css;

  // Only unwrap an @supports that sits directly inside the properties layer
  const layerOpen = css.indexOf('{', layer);
  if (css.slice(layerOpen + 1, supports).trim() !== '') return css;

  let depth = 1;
  let close = open + 1;
  while (close < css.length && depth > 0) {
    if (css[close] === '{') depth++;
    if (css[close] === '}') depth--;
    close++;
  }
  if (depth !== 0) return css;

  return css.slice(0, supports) + css.slice(open + 1, close - 1) + css.slice(close);
};

/**
 * Builds the @font-face rule for the cards’ serif font, with the font file inlined as data.
 */
const fontFaceCss = () => {
  // Fonts declared inside a shadow root are ignored, so this rule goes in the host page itself.
  // As data it needs no request to our host, which other sites’ security policies may block.
  const data = fs.readFileSync(FONT_FILE).toString('base64');
  return `@font-face{font-family:'OAReport Redaction';src:url(data:font/woff2;base64,${data}) format('woff2');font-weight:700;font-style:normal;font-display:swap}`;
};

const built = fs.readFileSync(file, 'utf8');
fs.writeFileSync(file, unwrapPropertyDefaults(remToPx(built)));
fs.writeFileSync(path.join(path.dirname(file), 'embed-font.css'), fontFaceCss());
