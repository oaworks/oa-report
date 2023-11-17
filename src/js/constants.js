// ========================
// Constants/configurations
// ========================

export const readableDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
};

// Detect the user's locale
export const userLocale = navigator.languages && navigator.languages.length 
                        ? navigator.languages[0] 
                        : navigator.language;


/**
 * Mapping of explore item IDs to their display and tooltip information.
 * @type {Object.<string, {singular: string, plural: string, tooltip: string}>}
 */
export const exploreItem = {
  "articles": {
    singular: "Article",
    plural: "Articles",
    tooltip: "Explore various articles"
  },
  "grant": {
    singular: "Grant",
    plural: "Grants",
    tooltip: "View grant-related data"
  },
  "author": {
    singular: "Author",
    plural: "Authors",
    tooltip: "Discover information about authors"
  },
  "year": {
    singular: "Year",
    plural: "Years",
    tooltip: "Discover information about years"
  }
};

/**
 * Maps "group by" keys to human-readable names for various data categories.
 * @type {{[key: string]: { id: string, singular: string, plural: string }}}
 */
// export const groupByKeyNames = {
//   "articles": { 
//     singular: "Article", 
//     plural: "Articles" 
//   },
//   "grant": { 
//     singular: "Grant", 
//     plural: "Grants" 
//   },
//   "author": { 
//     singular: "Author", 
//     plural: "Authors" 
//   }
// };
// Example usage:
// console.log(groupByKeyNames["supplements.grantid__bmgf"].id);  // Outputs: "grant"
// console.log(groupByKeyNames["supplements.grantid__bmgf"].singular);  // Outputs: "Grant"
// console.log(groupByKeyNames["supplements.grantid__bmgf"].plural);    // Outputs: "Grants"

/**
 * Maps "group by" headers to human-readable names and corresponding keys.
 * Used for displaying data in a user-friendly format.
 * @type {{[key: string]: { pretty: string, key: string }}}
 */
export const groupByHeaderNames = {
  "articles_published": { pretty: "Articles published", key: "doc_count" },
  "is_compliant_articles": { pretty: "Compliant articles", key: "doc_count" },
  "is_free_to_read": { pretty: "Free-to-read articles", key: "doc_count" },
  "is_oa": { pretty: "Open Access articles", key: "doc_count" },
  "has_repository_version": { pretty: "Repository version", key: "doc_count" },
  "has_approved_repository_version": { pretty: "Approved repository version", key: "doc_count" },
  "has_preprint_version": { pretty: "Preprint version", key: "doc_count" },
  "has_data_availability_statement": { pretty: "Data availability statement", key: "doc_count" },
  "has_no_data_availability_statement": { pretty: "No data availability statement", key: "doc_count" },
  "has_apc": { pretty: "With APCs", key: "doc_count" },
  "total_apcs_paid": { pretty: "Total APCs paid", key: "value" },
  "average_apcs_paid_raw": { pretty: "Average APCs paid", key: "value" },
  "median_apcs_paid_raw": { pretty: "Median APCs paid", key: "values['50.0']" },
  "has_grantid": { pretty: "With grant ID", key: "doc_count" }
}
// Example usage:
// console.log(groupByHeaderNames["is_oa"].pretty);  // Outputs: "Open Access articles"
// console.log(groupByHeaderNames["is_oa"].key);  // Outputs: "doc_count"

/**
 * Class names for different table columns in the data explore section.
 */
export const dataTableClasses = {
  firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left",
  secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate",
  otherCols: "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"
};