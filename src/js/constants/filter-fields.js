// =================================================
// constants/filter-fields.js
// Explore breakdown + filter field metadata
// =================================================

import { COUNTRY_CODES, LANGUAGE_CODES, LICENSE_CODES } from "../constants.js";

export const SEARCH_FILTER_FIELDS = [
  { field: "authorships.author.display_name", label: "Authors (Name)", iconKey: "author", alphaSort: true },
  { field: "authorships.author.orcid", label: "Authors (ORCID)", iconKey: "author", alphaSort: false },
  { field: "concepts.display_name", label: "Subjects", iconKey: "subject", alphaSort: true },
  { field: "authorships.institutions.display_name", label: "Institutions", iconKey: "institution", alphaSort: true },
  { field: "journal", label: "Journals", iconKey: "journal", alphaSort: true },
  { field: "supplements.publisher_simple", label: "Publishers", iconKey: "publisher", alphaSort: true },
  { field: "supplements.host_venue.display_name", label: "Preprint servers", iconKey: "preprint_server", alphaSort: true },
  { field: "supplements.grantid", label: "Grants", iconKey: "grant", alphaSort: false },
  { field: "supplements.program", label: "Programs", iconKey: "program", alphaSort: false },
  { field: "openalx.language", label: "Languages", iconKey: "language", alphaSort: true, codes: LANGUAGE_CODES, filterListHidden: true },
  { field: "supplements.publisher_license_best", label: "Publisher licenses", iconKey: "publisher_license", alphaSort: true, filterListHidden: true, suffix: "(publisher)", codes: LICENSE_CODES },
  { field: "supplements.repository_license_best", label: "Repository licenses", iconKey: "repository_license", alphaSort: true, filterListHidden: true, suffix: "(repository)", codes: LICENSE_CODES },
  { field: "authorships.institutions.country_code", label: "Countries", iconKey: "country", alphaSort: true, codes: COUNTRY_CODES, filterListHidden: true },
  { field: "openalx.funders.display_name", label: "Funders", iconKey: "funder", alphaSort: true, filterListHidden: true },
  { field: "openalx.open_access.oa_status", label: "Journal article OA types", iconKey: "article_oa_type", alphaSort: true, filterListHidden: true, suffix: "(article OA)" },
  { field: "oa_status", label: "Journal article OA types", iconKey: "article_oa_type", alphaSort: true, filterListHidden: true, suffix: "(article OA)" },
  { field: "journal_oa_type", label: "Journal OA types", iconKey: "journal_oa_type", alphaSort: true, filterListHidden: true, suffix: "(journal OA)" }
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
  author_name: "users",
  preprint_server: "cloud-arrow-up",
  year: "calendar-blank",
  country: "globe",
  language: "translate",
  funder: "hand-coins",
  articles_with_apcs: "receipt",
  article_oa_type: "lock",
  journal_oa_type: "folder-lock",
  publisher_license: "certificate",
  repository_license: "certificate"
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
