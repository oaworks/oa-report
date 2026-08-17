require('dotenv').config();

/**
 * Label for the environment the site is currently running in, or '' on the live site.
 * @param {string} baseUrl
 * @returns {string}
 */
function envLabel(baseUrl) {
  const url = (baseUrl || '').toLowerCase();
  if (url.includes('staging.oa.report') || url.includes('stg.oa.report')) return 'stg (Cloudflare)';
  if (url.includes('dev.oa.report')) return 'dev (Cloudflare)';
  if (url.includes('localhost') || url.includes('127.0.0.1')) return 'localhost';
  return '';
}

/**
 * Label for the API host(s) the site is currently querying.
 * @param {string} orgsHost
 * @param {string} worksHost
 * @returns {string}
 */
function apiLabel(orgsHost, worksHost) {
  if (!orgsHost && !worksHost) return '';
  if (orgsHost === worksHost) return `<code>${orgsHost}</code> endpoint`;
  return `orgs <code>${orgsHost || '?'}</code> endpoint &middot; works <code>${worksHost || '?'}</code> endpoint`;
}

module.exports = {
  label: envLabel(process.env.ELEVENTY_BASE_URL),
  api: apiLabel(process.env.ELEVENTY_API_HOST_ORGS, process.env.ELEVENTY_API_HOST_WORKS),
};
