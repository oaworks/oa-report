// =================================================
// constants/api.js
// API endpoints and base URLs
// =================================================

/**
 * The API endpoint for the orgindex.
 * @type {string}
 */
export const ELEVENTY_API_ENDPOINT = document.body.getAttribute('data-api-endpoint');

/**
 * Base URL for the API endpoint.
 * @type {string}
 */
export const API_BASE_URL = `https://${ELEVENTY_API_ENDPOINT}.oa.works/report/`;

/**
 * Base URL for the bg API endpoint.
 * @type {string}
 */
export const API_BG_BASE_URL = `https://bg.${ELEVENTY_API_ENDPOINT}.oa.works/report/`;

/**
 * Endpoint for querying works with a default size of 100.
 * @type {string}
 */
export const QUERY_BASE = `${API_BASE_URL}works?size=100&`;

/**
 * Endpoint for counting the number of works.
 * @type {string}
 */
export const COUNT_QUERY_BASE = `${API_BASE_URL}works/count?`;

/**
 * Endpoint for exporting works data in CSV format.
 * @type {string}
 */
export const CSV_EXPORT_BASE = `${API_BASE_URL}works.csv?size=all&`;

/**
 * Endpoint for sending articles via email.
 * @type {string}
 */
export const ARTICLE_EMAIL_BASE = `${API_BG_BASE_URL}email/`;
