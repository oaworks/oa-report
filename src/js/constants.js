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
 * Maps "group by" keys to human-readable names for various data categories.
 * @type {{[key: string]: { id: string, singular: string, plural: string }}}
 */
export const groupByKeyNames = {
  "supplements.grantid__bmgf": { 
    id: "grant",
    singular: "Grant", 
    plural: "Grants" 
  },
  "publisher": { 
    id: "publisher",
    singular: "Publisher", 
    plural: "Publishers" 
  },
  "concepts.display_name": { 
    id: "concept",
    singular: "Concept", 
    plural: "Concepts" 
  },
  "oa_status": { 
    id: "oa_status",
    singular: "Open Access status", 
    plural: "Open Access statuses" 
  },
  "supplements.program__bmgf": { 
    id: "program",
    singular: "Program", 
    plural: "Programs" 
  },
  "authorships.institutions.display_name": { 
    id: "institution",
    singular: "Institution", 
    plural: "Institutions" 
  },
  "authorships.institutions.country_code": { 
    id: "country",
    singular: "Country", 
    plural: "Countries" 
  },
  "journal": { 
    id: "journal",
    singular: "Journal", 
    plural: "Journals" 
  },
  "funder.name": { 
    id: "funder",
    singular: "Co-funder", 
    plural: "Co-funders" 
  },
  "publisher_license": { 
    id: "publisher_license",
    singular: "Publisher license", 
    plural: "Publisher licenses" 
  },
  "authorships.author.orcid": { 
    id: "author",
    singular: "Author", 
    plural: "Authors" 
  }
};
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
// console.log(groupByHeaderNames["is_oa"]);  // Outputs: "Open Access articles"
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