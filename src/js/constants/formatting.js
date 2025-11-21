// =================================================
// constants/formatting.js
// Locale and date formatting
// =================================================

/**
 * Options for displaying dates in a human-readable format.
 * @type {{day: string, month: string, year: string}}
 */
export const READABLE_DATE_OPTIONS = {
  day: "numeric",
  month: "short",
  year: "numeric"
};

/**
 * The user's locale, derived from the navigator languages or language.
 * @type {string}
 */
export const USER_LOCALE = navigator.languages && navigator.languages.length
  ? navigator.languages[0]
  : navigator.language;
