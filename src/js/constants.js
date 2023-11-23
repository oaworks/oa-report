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
 * Mapping of explore item IDs to their display name and tooltip information.
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
  },
  "journal": {
    singular: "Journal",
    plural: "Journals",
    tooltip: "Discover information about journals"
  },
  "publisher": {
    singular: "Publisher",
    plural: "Publishers"
  },
  "oa_status": {
    singular: "OA status",
    plural: "OA statuses"
  },
  "author": {
    singular: "Author",
    plural: "Authors"
  },
  "subject": {
    singular: "Subject",
    plural: "Subjects"
  },
  "institution": {
    singular: "Institution",
    plural: "Institutions"
  },
  "country": {
    singular: "Country",
    plural: "Countries"
  },
  "co_funder": {
    singular: "Co-funder",
    plural: "Co-funders"
  }
};

/**
 * Maps term-based objects like 'grant', 'publisher', 'author', etc. to human-readable names and corresponding keys.
 * Used for displaying data in a user-friendly format.
 * @type {{[key: string]: { pretty: string, key: string }}}
 */
export const termBasedDataHeaders = {
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

/**
 * Maps article-based objects to human-readable names and corresponding keys.
 * Used for displaying data in a user-friendly format.
 * @type {{[key: string]: { pretty: string, key: string }}}
 */
export const articleBasedDataHeaders = {
  "DOI": { pretty: "DOI", key: "published_date" },
  "supplements.is_compliant__bmgf": { pretty: "", key: "published_date" },
  "supplements.grantid__bmgf": { pretty: "", key: "published_date" },
  "title": { pretty: "", key: "published_date" },
  "publisher": { pretty: "", key: "published_date" },
  "journal": { pretty: "", key: "published_date" },
  "issn": { pretty: "", key: "published_date" },
  "published_date": { pretty: "", key: "published_date" },
  "published_year": { pretty: "", key: "published_date" },
  "PMCID": { pretty: "", key: "published_date" },
  "authorships.institutions.display_name": { pretty: "", key: "published_date" },
  "funder.name": { pretty: "", key: "published_date" },
  "is_oa": { pretty: "", key: "published_date" },
  "oa_status": { pretty: "", key: "published_date" },
  "journal_oa_type": { pretty: "", key: "published_date" },
  "supplements.publisher_license_best": { pretty: "", key: "published_date" },
  "has_repository_copy": { pretty: "", key: "published_date" },
  "supplements.repository_license_best": { pretty: "", key: "published_date" },
  "repository_version": { pretty: "", key: "published_date" },
  "repository_url": { pretty: "", key: "published_date" },
  "supplements.is_approved_repository__bmgf": { pretty: "", key: "published_date" },
  "supplements.is_preprint": { pretty: "", key: "published_date" },
  "can_archive": { pretty: "", key: "published_date" },
  "version": { pretty: "", key: "published_date" },
  "concepts.display_name": { pretty: "", key: "published_date" },
  "subject": { pretty: "", key: "published_date" },
  "supplements.program__bmgf": { pretty: "", key: "published_date" },
  "supplements.has_data_availability_statement": { pretty: "", key: "published_date" },
  "cited_by_count": { pretty: "", key: "published_date" },
  "author_email_name": { pretty: "", key: "published_date" },
  "email": { pretty: "", key: "published_date" },
  "supplements.invoice_date": { pretty: "", key: "published_date" },
  "supplements.invoice_number": { pretty: "", key: "published_date" },
  "supplements.apc_cost": { pretty: "", key: "published_date" },
  "supplements.oasupport.status": { pretty: "", key: "published_date" },
  "supplements.sheets": { pretty: "", key: "published_date" },
  "supplements.is_new__bmgf": { pretty: "", key: "published_date" },
  "supplements.dev.data.has_shared_data": { pretty: "", key: "published_date" },
  "supplements.dev.data.has_open_data": { pretty: "", key: "published_date" },
  "supplements.dev.data.doi": { pretty: "", key: "published_date" },
  "supplements.dev.data.url": { pretty: "", key: "published_date" },
  "supplements.dev.data.accession": { pretty: "", key: "published_date" },
  "supplements.dev.data.location": { pretty: "", key: "published_date" },
  "supplements.dev.data.licence": { pretty: "", key: "published_date" },
  "supplements.dev.data.evidence": { pretty: "", key: "published_date" },
  "supplements.dev.code.has_made_code": { pretty: "", key: "published_date" },
  "supplements.dev.code.has_shared_code": { pretty: "", key: "published_date" },
  "supplements.dev.code.has_open_code": { pretty: "", key: "published_date" },
  "supplements.dev.code.doi": { pretty: "", key: "published_date" },
  "supplements.dev.code.url": { pretty: "", key: "published_date" },
  "supplements.dev.code.accession": { pretty: "", key: "published_date" },
  "supplements.dev.code.location": { pretty: "", key: "published_date" },
  "supplements.dev.code.licence": { pretty: "", key: "published_date" },
  "supplements.dev.code.evidence": { pretty: "", key: "published_date" },
  "supplements.is_original_research": { pretty: "", key: "published_date" },
  "supplements.data_availability_statement_category": { pretty: "", key: "published_date" }
}

/**
 * Class names for table header columns in the data explore section.
 */
export const dataTableHeaderClasses = {
  firstHeaderCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom",
  secondHeaderCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom break-words",
  otherHeaderCols: "border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right"
};

/**
 * Class names for table body columns in the data explore section.
 */
export const dataTableBodyClasses = {
  firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left",
  secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate",
  otherCols: "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"
};