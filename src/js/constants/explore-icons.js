// =================================================
// constants/explore-icons.js
// Explore breakdown + filter icons
// =================================================

export const ALLOWED_TERMS = new Map([
  // ["authorships.author.display_name", "Authors"], // TODO: discuss with Joe when to enable
  // ["authorships.author.orcid", "Authors (ORCID)"], // TODO: discuss with Joe when to enable
  ["concepts.display_name", "Subjects"],
  ["authorships.institutions.display_name", "Institutions"],
  ["journal", "Journals"],
  ["supplements.publisher_simple", "Publishers"],
  ["supplements.host_venue.display_name", "Preprint servers"],
  ["supplements.grantid", "Grants"],
  ["supplements.program", "Programs"]
]);

export const EXPLORE_ICONS = {
  articles: "note",
  preprint: "note-pencil",
  preprints: "note-pencil",
  unique_publication: "note-blank",
  journal: "notebook",
  publisher: "books",
  institution: "bank",
  subject: "tag",
  grant: "currency-circle-dollar",
  program: "squares-four",
  author: "users",
  preprint_server: "cloud-arrow-up",
  year: "calendar-blank",
  country: "globe",
  language: "translate",
  funder: "hand-coins",
  articles_with_apcs: "receipt",
  article_oa_type: "file-lock",
  journal_oa_type: "folder-lock"
};

export const FILTER_FIELD_TO_EXPLORE = {
  "authorships.institutions.display_name": "institution",
  "journal": "journal",
  "supplements.publisher_simple": "publisher",
  "supplements.host_venue.display_name": "preprint_server",
  "concepts.display_name": "subject",
  "supplements.grantid": "grant",
  "supplements.program": "program",
  "authorships.author.display_name": "author",
  "authorships.author.orcid": "author"
};

/**
 * Returns the icon name for a breakdown id.
 *
 * @param {string} id - The breakdown id.
 * @returns {string|undefined} - The icon name.
 */
export const iconForExploreId = (id = "") => EXPLORE_ICONS[id];

/**
 * Returns the icon name for a given filter field.
 *
 * @param {string} field - The field name.
 * @returns {string|undefined} - The icon name associated with the field, or undefined if not found.
 */
export const iconForField = (field = "") => {
  const base = field.replace(/\.keyword$/i, "");
  if (base.startsWith("supplements.grantid__")) return EXPLORE_ICONS.grant;
  if (base.startsWith("supplements.program__")) return EXPLORE_ICONS.program;
  const mapped = FILTER_FIELD_TO_EXPLORE[base];
  return mapped ? EXPLORE_ICONS[mapped] : undefined;
};
