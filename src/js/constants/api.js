// =================================================
// constants/api.js
// API endpoints and base URLs
// =================================================

const bodyDataset = document.body.dataset;

/**
 * The host selector for org index requests.
 * @type {string}
 */
export const API_HOST_ORGS = bodyDataset.apiHostOrgs;

/**
 * The host selector for works requests.
 * @type {string}
 */
export const API_HOST_WORKS = bodyDataset.apiHostWorks;

/**
 * Base URL for org index requests.
 * @type {string}
 */
export const ORGS_REPORT_API_BASE_URL = `https://${API_HOST_ORGS}.oa.works/report/`;

/**
 * Base URL for org index bg requests.
 * @type {string}
 */
export const ORGS_REPORT_BG_API_BASE_URL = `https://bg.${API_HOST_ORGS}.oa.works/report/`;

/**
 * Base URL for works requests.
 * @type {string}
 */
export const WORKS_REPORT_API_BASE_URL = `https://${API_HOST_WORKS}.oa.works/report/`;

/**
 * Base URL for works bg requests.
 * @type {string}
 */
export const WORKS_REPORT_BG_API_BASE_URL = `https://bg.${API_HOST_WORKS}.oa.works/report/`;

/**
 * Endpoint for querying works with a default size of 100.
 * @type {string}
 */
export const QUERY_BASE = `https://beta.oa.works/report/works?size=100&`;

/**
 * Endpoint for counting the number of works.
 * @type {string}
 */
export const COUNT_QUERY_BASE = `https://beta.oa.works/report/works/count?`;

/**
 * Endpoint for exporting works data in CSV format.
 * @type {string}
 */
export const CSV_EXPORT_BASE = `https://beta.oa.works/report/works.csv?size=all&`;

/**
 * Endpoint for sending articles via email.
 * @type {string}
 */
export const ARTICLE_EMAIL_BASE = `${WORKS_REPORT_BG_API_BASE_URL}email/`;
