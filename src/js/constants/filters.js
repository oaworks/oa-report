// =================================================
// constants/filters.js
// Filter field labels and icons for search-to-filter
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

export const FIELD_ICON_MAP = new Map([
  ["authorships.institutions.display_name", "bank"],
  ["journal", "books"],
  ["supplements.host_venue.display_name", "cloud-arrow-up"],
  ["supplements.publisher_simple", "books"],
  ["concepts.display_name", "tag"],
  ["supplements.grantid", "currency-circle-dollar"],
  ["supplements.program", "squares-four"],
  ["authorships.author.display_name", "users"],
  ["authorships.author.orcid", "identification-badge"]
]);
