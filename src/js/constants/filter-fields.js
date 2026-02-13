// =================================================
// constants/filter-fields.js
// Explore breakdown + filter field metadata
// =================================================

export const SEARCH_FILTER_FIELDS = [
  // { field: "authorships.author.display_name", label: "Authors", alphaSort: true }, // TODO: discuss with Joe when to enable
  { field: "authorships.author.orcid", label: "Authors (ORCID)", alphaSort: false },
  { field: "concepts.display_name", label: "Subjects", iconKey: "subject", alphaSort: true },
  { field: "authorships.institutions.display_name", label: "Institutions", iconKey: "institution", alphaSort: true },
  { field: "journal", label: "Journals", iconKey: "journal", alphaSort: true },
  { field: "supplements.publisher_simple", label: "Publishers", iconKey: "publisher", alphaSort: true },
  { field: "supplements.host_venue.display_name", label: "Preprint servers", iconKey: "preprint_server", alphaSort: true },
  { field: "supplements.grantid", label: "Grants", iconKey: "grant", alphaSort: false },
  { field: "supplements.program", label: "Programs", iconKey: "program", alphaSort: false }
];

export const SEARCH_FILTER_FIELD_MAP = new Map(
  SEARCH_FILTER_FIELDS.map((entry) => [entry.field, entry])
);

export const FILTER_FIELD_ICONS = {
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

const SEARCH_FILTER_ICON_KEYS = new Map(
  SEARCH_FILTER_FIELDS.map((entry) => [entry.field, entry.iconKey]).filter(([, iconKey]) => iconKey)
);

/**
 * Returns the icon name for a breakdown id.
 *
 * @param {string} id - The breakdown id.
 * @returns {string|undefined} - The icon name.
 */
export const iconForFilterId = (id = "") => FILTER_FIELD_ICONS[id];

/**
 * Returns the icon name for a given filter field.
 *
 * @param {string} field - The field name.
 * @returns {string|undefined} - The icon name associated with the field, or undefined if not found.
 */
export const iconForField = (field = "") => {
  const base = field.replace(/\.keyword$/i, "");
  if (base.startsWith("supplements.grantid__")) return FILTER_FIELD_ICONS.grant;
  if (base.startsWith("supplements.program__")) return FILTER_FIELD_ICONS.program;
  const mapped = SEARCH_FILTER_ICON_KEYS.get(base);
  return mapped ? FILTER_FIELD_ICONS[mapped] : undefined;
};
