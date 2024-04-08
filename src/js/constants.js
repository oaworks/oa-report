// ========================
// Constants/configurations
// ========================

/**
 * The API endpoint for the orgindex. 
 * @type {string}
 */
export const ELEVENTY_API_ENDPOINT =  document.body.getAttribute('data-api-endpoint');

/**
 * Base URL for the API endpoint.
 * This serves as the foundational URL upon which all other endpoints are built.
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
 * Utilizes the BASE_URL as its foundational part and appends specific parameters for this endpoint.
 * @type {string}
 */
export const QUERY_BASE = `${API_BASE_URL}works?size=100&`;

/**
 * Endpoint for counting the number of works.
 * Utilizes the BASE_URL as its foundational part and appends specific parameters for this endpoint.
 * @type {string}
 */
export const COUNT_QUERY_BASE = `${API_BASE_URL}works/count?`;

/**
 * Endpoint for exporting works data in CSV format.
 * Utilizes the BASE_URL as its foundational part and appends specific parameters for this endpoint.
 * @type {string}
 */
export const CSV_EXPORT_BASE = `${API_BASE_URL}works.csv?size=all&`;

/**
 * Endpoint for sending articles via email.
 * Utilizes the BASE_URL as its foundational part and appends specific parameters for this endpoint.
 * @type {string}
 */
export const ARTICLE_EMAIL_BASE = `${API_BG_BASE_URL}email/`;

/**
 * Options for displaying dates in a human-readable format.
 * @type {{day: string, month: string, year: string}}
 */
export const READABLE_DATE_OPTIONS = {
  day: "numeric",
  month: "short",
  year: "numeric"
};

/**
 * The user's locale, derived from the navigator languages or language.
 * @type {string}
 */
export const USER_LOCALE = navigator.languages && navigator.languages.length 
                        ? navigator.languages[0] 
                        : navigator.language;

/**
 * Class names for the report’s top-nav date or year selection buttons.
 * This constant provides TailwindCSS classes for the different states of the
 * date selection buttons, including 'enabled', 'disabled', and 'active'.
 */
export const DATE_SELECTION_BUTTON_CLASSES = {
  enabled: "block p-2 border mt-1 mr-1 md:mt-0 md:mr-3 md:border-b-0 border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 js_year_select",
  disabled: "block p-2 border mt-1 mr-1 md:mt-0 md:mr-3 md:border-b-0 bg-white text-neutral-900 opacity-50 cursor-not-allowed js_year_select",
  active: "p-2 border mt-1 mr-1 md:mt-0 md:mr-3 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 md:border-b-0 bg-neutral-900 text-white font-semibold border-neutral-900 js_year_select"
}

/**
 * Mapping of explore item IDs to their display name and tooltip information.
 * @type {Object.<string, {singular: string, plural: string, tooltip: string}>}
 */
export const EXPLORE_ITEMS_LABELS = {
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
  },
  "article_oa_type": {
    singular: "Article <span class='uppercase'>OA</span> type",
    plural: "Article <span class='uppercase'>OA</span> types"
  },
  "journal_oa_type": {
    singular: "Journal <span class='uppercase'>OA</span> type",
    plural: "Journal <span class='uppercase'>OA</span> types"
  },
  "data_availability_statement": {
    singular: "Data availability statement",
    plural: "Data availability statements"
  },
  "articles_cie": {
    singular: "Article (<span class='uppercase'>CIE</span>)",
    plural: "Articles (<span class='uppercase'>CIE</span>)"
  },
  "publisher_license": {
    singular: "Publisher license",
    plural: "Publisher licenses"
  },
  "repository_license": {
    singular: "Repository license",
    plural: "Repository licenses"
  },
  "preprint_server": {
    singular: "Preprint server",
    plural: "Preprint servers"
  },
  "articles_with_apcs": {
    singular: "Article with <span class='uppercase'>APC</span>s",
    plural: "Articles with <span class='uppercase'>APC</span>s"
  },
  "all_lab_head": {
    singular: "All lab head",
    plural: "All lab heads"
  },
  "freeman_hrabowski_scholar": {
    singular: "Freeman Hrabowski scholar",
    plural: "Freeman Hrabowski scholars"
  },
  "janelia_lab_head": {
    singular: "Janelia Lab head",
    plural: "Janelia Lab heads"
  },
  "dataset_license": {
    singular: "Dataset license",
    plural: "Dataset licenses"
  },
  "software_license": {
    singular: "Software license",
    plural: "Software licenses"
  },
  "dataset_location": {
    singular: "Dataset location",
    plural: "Dataset locations"
  },
  "software_location": {
    singular: "Software location",
    plural: "Software locations"
  }
};

/**
 * Mapping of explore filter IDs to human-readable labels and their corresponding tooltips. 
 * Used in both terms-based and articles-based tables.
 * @type {Object.<string, string>}
 */
export const EXPLORE_FILTERS_LABELS = {
  "is_paper": {
    label: "All articles",
    info: "Short help text",
    details: ""
  },
  "is_preprint": {
    label: "Preprints",
    info: "Short help text",
    details: ""
  },
  "is_authored": {
    label: "Authored",
    info: "Short help text",
    details: ""
  },
  "is_covered_by_policy": {
    label: "Covered by <span class='uppercase'>OA</span> policy",
    info: "Short help text",
    details: ""
  },
  "is_covered_by_current_policy": {
    label: "Covered by current <span class='uppercase'>OA</span> policy",
    info: "Short help text",
    details: ""
  },
  "is_covered_by_old_policy": {
    label: "Covered by old <span class='uppercase'>OA</span> policy",
    info: "Short help text",
    details: ""
  },
  "is_compliant": {
    label: "Covered by & compliant with <span class='uppercase'>OA</span> policy",
    info: "Short help text",
    details: ""
  },
  "is_compliant_all_works": {
    label: "Compliant with <span class='uppercase'>OA</span> policy",
    info: "Short help text",
    details: ""
  },
  "is_original_research": {
    label: "Original research",
    info: "Short help text",
    details: ""
  },
  "with_grant_id": {
    label: "With grant <span class='uppercase'>ID</span>",
    info: "Short help text",
    details: ""
  },
  "is_found_by_external_sources": {
    label: "Found by external sources",
    info: "Short help text",
    details: ""
  },
  "is_found_only_by_external_sources": {
    label: "Found only by external sources",
    info: "Short help text",
    details: ""
  },
  "is_found_only_by_oareport": {
    label: "Found only by <span class='uppercase'>OA</span>.<span class='uppercase'>R</span>eport",
    info: "Short help text",
    details: ""
  },
  "is_found_by_all_sources": {
    label: "Found by all sources",
    info: "Short help text",
    details: ""
  },
  "has_data_availability_statement": {
    label: "Has data availability statement",
    info: "Short help text",
    details: ""
  },
  "has_apc": {
    label: "Paid via APC",
    info: "Short help text",
    details: ""
  },
  "is_under_transitional_agreement": {
    label: "Paid via transitional agreement",
    info: "Short help text",
    details: ""
  },
  "is_funded": {
    label: "Funded",
    info: "Short help text",
    details: ""
  },
  "has_shared_data": {
    label: "Shared data",
    info: "Short help text",
    details: ""
  },
  "has_shared_code": {
    label: "Shared code",
    info: "Short help text",
    details: ""
  },
  "has_data": {
    label: "With data",
    info: "Short help text",
    details: ""
  },
  "has_code": {
    label: "With code",
    info: "Short help text",
    details: ""
  }
};

/**
 * Mapping of explore table headers to human-readable labels and their corresponding tooltips.
 * For terms-based tables
 */
export const EXPLORE_HEADER_TERMS_LABELS = {
  "compliant": {
    label: "Compliant",
    info: "Publications that comply with the requirements of the Open Access policy, even if they are not covered by said policy.",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref and OpenAlex."
  },
  "covered_by_policy": {
    label: "Covered by policy",
    info: "Publications that are covered by the Open Access Policy.",
    details: "When a grant ID was available, we checked if the grant was covered by the Open Access policy using a list provided by IDRC staff."
  },
  "free_to_read": {
    label: "Free-to-read",
    info: "Publications that are free to read on the publisher’s website or any online repository, including temporarily accessible articles (“bronze Open Access”).",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref and OpenAlex."
  },
  "in_repository": {
    label: "In repository",
    info: "Publications that have a copy of the work freely available and discoverable in any repository.",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref and OpenAlex."
  },
  "mean_apc_amount": {
    label: "Mean APC amount"
  },
  "mean_citations": {
    label: "Mean citations",
    info: "The mean (i.e. average) number of citations of these publications",
    details: "We used data from OpenAlex's <code>cited_by_count</code>."
  },
  "median_apc_amount": {
    label: "Median APC amount"
  },
  "open_access": {
    label: "Open Access",
    info: "Publications that are free and CC BY or CC0 (in the public domain) on the publisher’s website, a repository or a preprint server.",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref, OpenAlex, Europe PMC and manual checks (as required). If a work has the required license at any location it is considered Open Access."
  },
  "publications": {
    label: "Publications",
    info: "Academic research articles found (including peer-reviewed research, reviews, editorials, etc.)",
    details: "CrossRef, OpenAlex, PubMed, and Europe PMC were searched for articles authored by or funded by IDRC using a variety of IDs (e.g ROR: 0445x0472 Fundref: 10.13039/501100000193) and aliases (International Development Research Centre, International Development Research Center, Centre de recherches pour le développement international) across all of time. An export of the IDRC Digital Library was utilized by the tool. Items with type “Journal Article” or “Abstract” were matched to DOIs. Results were deduplicated and ingested into OA.Report. Results were reviewed by a mix of manual and automated means to remove false positives (e.g mentions in full text, incorrect matches of IDRCs name)."
  },
  "total_apc_amount": {
    label: "Total APC amount"
  },
  "total_citations": {
    label: "Total citations",
    info: "Number of citations the publications received."
  },
  "unknown_data_status": {
    label: "Unknown data status"
  },
  "unknown_code_status": {
    label: "Unknown code status"
  },
  "unknown_shared_data_status": {
    label: "Unknown shared data status"
  },
  "unknown_shared_code_status": {
    label: "Unknown shared code status"
  },
  "with_apc": {
    label: "With APC<span class='lowercase'>s</span>"
  },
  "with_data": {
    label: "With data"
  },
  "with_code": {
    label: "With code"
  },
  "with_data_accession_number": {
    label: "With data accession number"
  },
  "with_code_accession_number": {
    label: "With code accession number"
  },
  "with_data_availability_statement": {
    label: "With data availability statement",
    info: "Publications that have a data availability statement. Data availability statements (or 'data access statement', 'resource availability statements', 'code availability statements') tell a reader where the research data or code associated with a paper is available, and how they can be accessed. This figure doesn’t tell you what type of data availability statement is provided (e.g whether there is Open Data or no data at all).",
    details: "To check if a paper has a data availability statement, we use data from PubMed’s data availability filter and review articles manually."
  },
  "with_data_dois": {
    label: "With data DOI<span style='text-transform: lowercase;'>s</span>"
  },
  "with_code_dois": {
    label: "With code DOI<span style='text-transform: lowercase;'>s</span>"
  },
  "with_dois": {
    label: "With DOI<span style='text-transform: lowercase;'>s</span>"
  },
  "with_fundref_dois": {
    label: "With FundRef DOI<span style='text-transform: lowercase;'>s</span>"
  },
  "with_grant_dois": {
    label: "With grant DOI<span style='text-transform: lowercase;'>s</span>"
  },
  "with_grant_id": {
    label: "With grant ID<span style='text-transform: lowercase;'>s</span>",
    info: "Publications that provided the grant ID for the grant you provide them.",
    details: "We found and normalized data from Crossref to find data provided by publisher. Where this wasn’t possible, we manually collected the funding statement. The grant ID was then extracted & normalized the grant ID using a mix of automated tools and manual review."
  },
  "with_open_data": {
    label: "With Open Data"
  },
  "with_open_code": {
    label: "With Open Code"
  },
  "with_open_data_in_repository": {
    label: "With Open Data in repository"
  },
  "with_open_code_in_repository": {
    label: "With Open Code in repository"
  },
  "with_orcids": {
    label: "With ORC<span style='text-transform: lowercase;'>i</span>D<span style='text-transform: lowercase;'>s</span>"
  },
  "with_preprint": {
    label: "With preprint",
    info: "Publications that have a preprint associated with them.",
    details: "We used data from Unpaywall and Crossref."
  },
  "with_peer_reviewed_version": {
    label: "With peer reviewed version",
    info: "Preprints that have a peer reviewed version associated with them.",
    details: "We used data from Unpaywall and Crossref."
  },
  "with_rors": {
    label: "With ROR<span style='text-transform: lowercase;'>s</span>"
  },
  "with_shared_data": {
    label: "With shared data"
  },
  "with_shared_code": {
    label: "With shared code"
  },
  "with_shared_data_in_repository": {
    label: "With shared data in repository"
  },
  "with_shared_code_in_repository": {
    label: "With shared code in repository"
  },
  "without_data": {
    label: "Without data"
  },
  "without_code": {
    label: "Without code"
  },
  "without_data_availability_statement": {
    label: "Without data availability statement"
  },
  "without_shared_data": {
    label: "Without shared data"
  },
  "without_shared_code": {
    label: "Without shared code"
  }
}

/**
 * Mapping of explore table headers to human-readable labels and their corresponding tooltips.
 * For articles-based tables
 */
export const EXPLORE_HEADER_ARTICLES_LABELS = {
  "author_email_name": {
    label: "",
    info: ""
  },
  "authorships.author.display_name": {
    label: "Author(s)",
    info: ""
  },
  "authorships.author.orcid": {
    label: "ORCiD<span class='lowercase'>s</span>",
    info: ""
  },
  "authorships.institutions.display_name": {
    label: "Institution(s)",
    info: ""
  },
  "authorships.institutions.ror": {
    label: "ROR<span class='lowercase'>s</span>",
    info: ""
  },
  "can_archive": {
    label: "Archivable?",
    info: ""
  },
  "cited_by_count": {
    label: "Cited by",
    info: ""
  },
  "concepts.display_name": {
    label: "Concepts",
    info: ""
  },
  "DOI": {
    label: "DOI",
    info: ""
  },
  "email": {
    label: "Email",
    info: ""
  },
  "funder.name": {
    label: "Funder(s)",
    info: ""
  },
  "has_repository_copy": {
    label: "In repository?",
    info: ""
  },
  "is_oa": {
    label: "Open Access?",
    info: ""
  },
  "issn": {
    label: "ISSN",
    info: ""
  },
  "journal_oa_type": {
    label: "Journal <span class='uppercase'>OA</span> type",
    info: ""
  },
  "journal": {
    label: "Journal",
    info: ""
  },
  "oa_status": {
    label: "OA status",
    info: ""
  },
  "PMCID": {
    label: "PMCID",
    info: ""
  },
  "published_date": {
    label: "Published date",
    info: ""
  },
  "published_year": {
    label: "Published year",
    info: ""
  },
  "publisher": {
    label: "Publisher",
    info: ""
  },
  "repository_url": {
    label: "Repository URL",
    info: ""
  },
  "repository_version": {
    label: "Repository version",
    info: ""
  },
  "subject": {
    label: "Subject",
    info: ""
  },
  "apc_cost": {
    label: "APC<span class='lowercase'>s</span>",
    info: ""
  },
  "data_availability_statement_category": {
    label: "Data availability statement category",
    info: ""
  },
  "dev.code.accession": {
    label: "Code accession number",
    info: ""
  },
  "dev.code.doi": {
    label: "Code DOI",
    info: ""
  },
  "dev.code.evidence": {
    label: "Code evidence",
    info: ""
  },
  "dev.code.has_made_code": {
    label: "Generated code?",
    info: ""
  },
  "dev.code.has_open_code": {
    label: "Open code?",
    info: ""
  },
  "dev.code.has_shared_code": {
    label: "Shared code?",
    info: ""
  },
  "dev.code.licence": {
    label: "Code license",
    info: ""
  },
  "dev.code.location": {
    label: "Code location",
    info: ""
  },
  "dev.code.url": {
    label: "Code URL",
    info: ""
  },
  "dev.data.accession": {
    label: "Data accession number(s)",
    info: ""
  },
  "dev.data.doi": {
    label: "Data DOI",
    info: ""
  },
  "dev.data.evidence": {
    label: "Data evidence",
    info: ""
  },
  "dev.data.has_open_data": {
    label: "Open data?",
    info: ""
  },
  "dev.data.has_shared_data": {
    label: "Shared data?",
    info: ""
  },
  "dev.data.licence": {
    label: "Data license",
    info: ""
  },
  "dev.data.location": {
    label: "Data location",
    info: ""
  },
  "dev.data.url": {
    label: "Data URL",
    info: ""
  },
  "grantid": {
    label: "Grant ID",
    info: ""
  },
  "has_data_availability_statement": {
    label: "Data availability statement?",
    info: ""
  },
  "invoice_date": {
    label: "Invoice date",
    info: ""
  },
  "invoice_number": {
    label: "Invoice number",
    info: ""
  },
  "invoice_year": {
    label: "Invoice year",
    info: ""
  },
  "is_approved_repository": {
    label: "Approved repository?",
    info: ""
  },
  "is_compliant": {
    label: "Compliant?",
    info: ""
  },
  "is_new": {
    label: "New?",
    info: ""
  },
  "is_original_research": {
    label: "Original research?",
    info: ""
  },
  "is_preprint_of": {
    label: "Preprint of",
    info: ""
  },
  "is_preprint": {
    label: "Preprint?",
    info: ""
  },
  "oasupport.status": {
    label: "OA.Support status",
    info: ""
  },
  "program": {
    label: "Program",
    info: ""
  },
  "publisher_license_best": {
    label: "Publisher license (best)",
    info: ""
  },
  "publisher_simple": {
    label: "Publisher (simple)",
    info: ""
  },
  "repository_license_best": {
    label: "Repository license (best)",
    info: ""
  },
  "sheets": {
    label: "Sheets",
    info: ""
  },
  "title": {
    label: "Title",
    info: ""
  },
  "version": {
    label: "Version",
    info: ""
  }
}

/**
 * Class names for table header (<thead>) columns in the data explore section.
 * This constant provides TailwindCSS classes for different types of data tables, 
 * including 'terms' and 'articles', with each type having its own set of classes 
 * for 'firstHeaderCol', 'secondHeaderCol', and 'otherHeaderCols'.
 * 
 * @constant
 * @type {Object}
 * @property {Object} terms - CSS classes for the 'terms' type table headers.
 * @property {string} terms.firstHeaderCol - Class for the first header column in 'terms' table.
 * @property {string} terms.secondHeaderCol - Class for the second header column in 'terms' table.
 * @property {string} terms.otherHeaderCols - Class for other header columns in 'terms' table.
 * @property {Object} articles - CSS classes for the 'articles' type table headers.
 * @property {string} articles.firstHeaderCol - Class for the first header column in 'articles' table.
 * @property {string} articles.secondHeaderCol - Class for the second header column in 'articles' table.
 * @property {string} articles.otherHeaderCols - Class for other header columns in 'articles' table.
 */
export const DATA_TABLE_HEADER_CLASSES = {
  terms: {
    firstHeaderCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom",
    secondHeaderCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-600 p-2 w-24 md:w-32 align-bottom break-words",
    otherHeaderCols: "border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right"
  },
  articles: {
    firstHeaderCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 lg:w-80 align-bottom",
    secondHeaderCol: "border-b border-neutral-500 sticky left-32 md:left-60 lg:left-80 bg-neutral-600 p-2 w-24 md:w-32 align-bottom break-words",
    otherHeaderCols: "border-b border-r border-b-neutral-500 border-r-neutral-700 p-2 w-64 max-w-4xl align-bottom break-words"
  }
};

/**
 * Class names for table body (<tbody>) columns in the data explore section.
 * This constant provides TailwindCSS classes for different types of data tables, 
 * including 'terms' and 'articles', with each type having its own set of classes 
 * for 'firstCol', 'secondCol', and 'otherCols'.
 * 
 * @constant
 * @type {Object}
 * @property {Object} terms - CSS classes for the 'terms' type tables.
 * @property {string} terms.firstCol - Class for the first column in 'terms' table.
 * @property {string} terms.secondCol - Class for the second column in 'terms' table.
 * @property {string} terms.otherCols - Class for other columns in 'terms' table.
 * @property {Object} articles - CSS classes for the 'articles' type tables.
 * @property {string} articles.firstCol - Class for the first column in 'articles' table.
 * @property {string} articles.secondCol - Class for the second column in 'articles' table.
 * @property {string} articles.otherCols - Class for other columns in 'articles' table.
 */
export const DATA_TABLE_BODY_CLASSES = {
  terms: {
    firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left",
    secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-600 p-2 whitespace-nowrap truncate",
    otherCols: "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"
  },
  articles: {
    firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 break-words",
    secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 lg:left-80 bg-neutral-600 p-2 whitespace-nowrap truncate",
    otherCols: "border-b border-r border-b-neutral-500 border-r-neutral-700 p-2 whitespace-nowrap truncate hover:bg-neutral-600"
  }
};

/**
 * Maps ISO 3166-1 alpha-2 country codes to country names.
 * @type {Object.<string, string>}
 */
export const COUNTRY_CODES = {
  "AF": "Afghanistan",
  "AL": "Albania",
  "DZ": "Algeria",
  "AS": "American Samoa",
  "AD": "Andorra",
  "AO": "Angola",
  "AI": "Anguilla",
  "AQ": "Antarctica",
  "AG": "Antigua and Barbuda",
  "AR": "Argentina",
  "AM": "Armenia",
  "AW": "Aruba",
  "AU": "Australia",
  "AT": "Austria",
  "AZ": "Azerbaijan",
  "BS": "Bahamas",
  "BH": "Bahrain",
  "BD": "Bangladesh",
  "BB": "Barbados",
  "BY": "Belarus",
  "BE": "Belgium",
  "BZ": "Belize",
  "BJ": "Benin",
  "BM": "Bermuda",
  "BT": "Bhutan",
  "BO": "Bolivia",
  "BA": "Bosnia and Herzegovina",
  "BW": "Botswana",
  "BV": "Bouvet Island",
  "BR": "Brazil",
  "IO": "British Indian Ocean Territory",
  "BN": "Brunei Darussalam",
  "BG": "Bulgaria",
  "BF": "Burkina Faso",
  "BI": "Burundi",
  "KH": "Cambodia",
  "CM": "Cameroon",
  "CA": "Canada",
  "CV": "Cape Verde",
  "KY": "Cayman Islands",
  "CF": "Central African Republic",
  "TD": "Chad",
  "CL": "Chile",
  "CN": "China",
  "CX": "Christmas Island",
  "CC": "Cocos (Keeling) Islands",
  "CO": "Colombia",
  "KM": "Comoros",
  "CG": "Republic of the Congo",
  "CD": "Democratic Republic of the Congo",
  "CK": "Cook Islands",
  "CR": "Costa Rica",
  "CI": "Cote D'Ivoire",
  "HR": "Croatia",
  "CU": "Cuba",
  "CY": "Cyprus",
  "CZ": "Czech Republic",
  "DK": "Denmark",
  "DJ": "Djibouti",
  "DM": "Dominica",
  "DO": "Dominican Republic",
  "EC": "Ecuador",
  "EG": "Egypt",
  "SV": "El Salvador",
  "GQ": "Equatorial Guinea",
  "ER": "Eritrea",
  "EE": "Estonia",
  "ET": "Ethiopia",
  "FK": "Falkland Islands (Malvinas)",
  "FO": "Faroe Islands",
  "FJ": "Fiji",
  "FI": "Finland",
  "FR": "France",
  "GF": "French Guiana",
  "PF": "French Polynesia",
  "TF": "French Southern Territories",
  "GA": "Gabon",
  "GM": "Gambia",
  "GE": "Georgia",
  "DE": "Germany",
  "GH": "Ghana",
  "GI": "Gibraltar",
  "GR": "Greece",
  "GL": "Greenland",
  "GD": "Grenada",
  "GP": "Guadeloupe",
  "GU": "Guam",
  "GT": "Guatemala",
  "GN": "Guinea",
  "GW": "Guinea-Bissau",
  "GY": "Guyana",
  "HT": "Haiti",
  "HM": "Heard Island and McDonald Islands",
  "VA": "Holy See (Vatican City State)",
  "HN": "Honduras",
  "HK": "Hong Kong",
  "HU": "Hungary",
  "IS": "Iceland",
  "IN": "India",
  "ID": "Indonesia",
  "IR": "Iran",
  "IQ": "Iraq",
  "IE": "Ireland",
  "IL": "Israel",
  "IT": "Italy",
  "JM": "Jamaica",
  "JP": "Japan",
  "JO": "Jordan",
  "KZ": "Kazakhstan",
  "KE": "Kenya",
  "KI": "Kiribati",
  "KP": "North Korea",
  "KR": "South Korea",
  "KW": "Kuwait",
  "KG": "Kyrgyzstan",
  "LA": "Lao People's Democratic Republic",
  "LV": "Latvia",
  "LB": "Lebanon",
  "LS": "Lesotho",
  "LR": "Liberia",
  "LY": "Libya",
  "LI": "Liechtenstein",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "MO": "Macao",
  "MG": "Madagascar",
  "MW": "Malawi",
  "MY": "Malaysia",
  "MV": "Maldives",
  "ML": "Mali",
  "MT": "Malta",
  "MH": "Marshall Islands",
  "MQ": "Martinique",
  "MR": "Mauritania",
  "MU": "Mauritius",
  "YT": "Mayotte",
  "MX": "Mexico",
  "FM": "Micronesia, Federated States of",
  "MD": "Moldova, Republic of",
  "MC": "Monaco",
  "MN": "Mongolia",
  "MS": "Montserrat",
  "MA": "Morocco",
  "MZ": "Mozambique",
  "MM": "Myanmar",
  "NA": "Namibia",
  "NR": "Nauru",
  "NP": "Nepal",
  "NL": "Netherlands",
  "NC": "New Caledonia",
  "NZ": "New Zealand",
  "NI": "Nicaragua",
  "NE": "Niger",
  "NG": "Nigeria",
  "NU": "Niue",
  "NF": "Norfolk Island",
  "MK": "North Macedonia",
  "MP": "Northern Mariana Islands",
  "NO": "Norway",
  "OM": "Oman",
  "PK": "Pakistan",
  "PW": "Palau",
  "PS": "Palestine",
  "PA": "Panama",
  "PG": "Papua New Guinea",
  "PY": "Paraguay",
  "PE": "Peru",
  "PH": "Philippines",
  "PN": "Pitcairn",
  "PL": "Poland",
  "PT": "Portugal",
  "PR": "Puerto Rico",
  "QA": "Qatar",
  "RE": "Reunion",
  "RO": "Romania",
  "RU": "Russia",
  "RW": "Rwanda",
  "SH": "Saint Helena",
  "KN": "Saint Kitts and Nevis",
  "LC": "Saint Lucia",
  "PM": "Saint Pierre and Miquelon",
  "VC": "Saint Vincent and the Grenadines",
  "WS": "Samoa",
  "SM": "San Marino",
  "ST": "Sao Tome and Principe",
  "SA": "Saudi Arabia",
  "SN": "Senegal",
  "SC": "Seychelles",
  "SL": "Sierra Leone",
  "SG": "Singapore",
  "SK": "Slovakia",
  "SI": "Slovenia",
  "SB": "Solomon Islands",
  "SO": "Somalia",
  "ZA": "South Africa",
  "GS": "South Georgia and the South Sandwich Islands",
  "ES": "Spain",
  "LK": "Sri Lanka",
  "SD": "Sudan",
  "SR": "Suriname",
  "SJ": "Svalbard and Jan Mayen",
  "SZ": "Eswatini",
  "SE": "Sweden",
  "CH": "Switzerland",
  "SY": "Syrian Arab Republic",
  "TW": "Taiwan",
  "TJ": "Tajikistan",
  "TZ": "Tanzania",
  "TH": "Thailand",
  "TL": "Timor-Leste",
  "TG": "Togo",
  "TK": "Tokelau",
  "TO": "Tonga",
  "TT": "Trinidad and Tobago",
  "TN": "Tunisia",
  "TR": "Türkiye",
  "TM": "Turkmenistan",
  "TC": "Turks and Caicos Islands",
  "TV": "Tuvalu",
  "UG": "Uganda",
  "UA": "Ukraine",
  "AE": "United Arab Emirates",
  "GB": "United Kingdom",
  "US": "United States of America",
  "UM": "United States Minor Outlying Islands",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VU": "Vanuatu",
  "VE": "Venezuela",
  "VN": "Vietnam",
  "VG": "Virgin Islands, British",
  "VI": "Virgin Islands, U.S.",
  "WF": "Wallis and Futuna",
  "EH": "Western Sahara",
  "YE": "Yemen",
  "ZM": "Zambia",
  "ZW": "Zimbabwe",
  "AX": "Åland Islands",
  "BQ": "Bonaire, Sint Eustatius and Saba",
  "CW": "Curaçao",
  "GG": "Guernsey",
  "IM": "Isle of Man",
  "JE": "Jersey",
  "ME": "Montenegro",
  "BL": "Saint Barthélemy",
  "MF": "Saint Martin (French part)",
  "RS": "Serbia",
  "SX": "Sint Maarten (Dutch part)",
  "SS": "South Sudan",
  "XK": "Kosovo"
}

/**
 * Maps ISO 639-1 Alpha-2 language codes to language names.
 * @type {Object.<string, string>}
 */
export const LANGUAGE_CODES = {
  "aa": "Afar",
  "ab": "Abkhazian",
  "ae": "Avestan",
  "af": "Afrikaans",
  "ak": "Akan",
  "am": "Amharic",
  "an": "Aragonese",
  "ar": "Arabic",
  "as": "Assamese",
  "av": "Avaric",
  "ay": "Aymara",
  "az": "Azerbaijani",
  "ba": "Bashkir",
  "be": "Belarusian",
  "bg": "Bulgarian",
  "bh": "Bihari languages",
  "bi": "Bislama",
  "bm": "Bambara",
  "bn": "Bengali",
  "bo": "Tibetan",
  "br": "Breton",
  "bs": "Bosnian",
  "ca": "Catalan",
  "ce": "Chechen",
  "ch": "Chamorro",
  "co": "Corsican",
  "cr": "Cree",
  "cs": "Czech",
  "cu": "Church Slavic",
  "cv": "Chuvash",
  "cy": "Welsh",
  "da": "Danish",
  "de": "German",
  "dv": "Maldivian",
  "dz": "Dzongkha",
  "ee": "Ewe",
  "el": "Greek",
  "en": "English",
  "eo": "Esperanto",
  "es": "Spanish",
  "et": "Estonian",
  "eu": "Basque",
  "fa": "Persian",
  "ff": "Fulah",
  "fi": "Finnish",
  "fj": "Fijian",
  "fo": "Faroese",
  "fr": "French",
  "fy": "Western Frisian",
  "ga": "Irish",
  "gd": "Gaelic",
  "gl": "Galician",
  "gn": "Guarani",
  "gu": "Gujarati",
  "gv": "Manx",
  "ha": "Hausa",
  "he": "Hebrew",
  "hi": "Hindi",
  "ho": "Hiri Motu",
  "hr": "Croatian",
  "ht": "Haitian",
  "hu": "Hungarian",
  "hy": "Armenian",
  "hz": "Herero",
  "ia": "Interlingua",
  "id": "Indonesian",
  "ie": "Interlingue",
  "ig": "Igbo",
  "ii": "Sichuan Yi",
  "ik": "Inupiaq",
  "io": "Ido",
  "is": "Icelandic",
  "it": "Italian",
  "iu": "Inuktitut",
  "ja": "Japanese",
  "jv": "Javanese",
  "ka": "Georgian",
  "kg": "Kongo",
  "ki": "Kikuyu",
  "kj": "Kuanyama",
  "kk": "Kazakh",
  "kl": "Kalaallisut",
  "km": "Central Khmer",
  "kn": "Kannada",
  "ko": "Korean",
  "kr": "Kanuri",
  "ks": "Kashmiri",
  "ku": "Kurdish",
  "kv": "Komi",
  "kw": "Cornish",
  "ky": "Kirghiz",
  "la": "Latin",
  "lb": "Luxembourgish",
  "lg": "Ganda",
  "li": "Limburgan",
  "ln": "Lingala",
  "lo": "Lao",
  "lt": "Lithuanian",
  "lu": "Luba-Katanga",
  "lv": "Latvian",
  "mg": "Malagasy",
  "mh": "Marshallese",
  "mi": "Maori",
  "mk": "Macedonian",
  "ml": "Malayalam",
  "mn": "Mongolian",
  "mr": "Marathi",
  "ms": "Malay",
  "mt": "Maltese",
  "my": "Burmese",
  "na": "Nauru",
  "nb": "Norwegian",
  "nd": "North Ndebele",
  "ne": "Nepali",
  "ng": "Ndonga",
  "nl": "Dutch",
  "nn": "Norwegian",
  "no": "Norwegian",
  "nr": "South Ndebele",
  "nv": "Navajo",
  "ny": "Chichewa",
  "oc": "Occitan",
  "oj": "Ojibwa",
  "om": "Oromo",
  "or": "Oriya",
  "os": "Ossetic",
  "pa": "Panjabi",
  "pi": "Pali",
  "pl": "Polish",
  "ps": "Pushto",
  "pt": "Portuguese",
  "qu": "Quechua",
  "rm": "Romansh",
  "rn": "Rundi",
  "ro": "Romanian",
  "ru": "Russian",
  "rw": "Kinyarwanda",
  "sa": "Sanskrit",
  "sc": "Sardinian",
  "sd": "Sindhi",
  "se": "Northern Sami",
  "sg": "Sango",
  "si": "Sinhala",
  "sk": "Slovak",
  "sl": "Slovenian",
  "sm": "Samoan",
  "sn": "Shona",
  "so": "Somali",
  "sq": "Albanian",
  "sr": "Serbian",
  "ss": "Swati",
  "st": "Sotho, Southern",
  "su": "Sundanese",
  "sv": "Swedish",
  "sw": "Swahili",
  "ta": "Tamil",
  "te": "Telugu",
  "tg": "Tajik",
  "th": "Thai",
  "ti": "Tigrinya",
  "tk": "Turkmen",
  "tl": "Tagalog",
  "tn": "Tswana",
  "to": "Tonga",
  "tr": "Turkish",
  "ts": "Tsonga",
  "tt": "Tatar",
  "tw": "Twi",
  "ty": "Tahitian",
  "ug": "Uighur",
  "uk": "Ukrainian",
  "ur": "Urdu",
  "uz": "Uzbek",
  "ve": "Venda",
  "vi": "Vietnamese",
  "vo": "Volapük",
  "wa": "Walloon",
  "wo": "Wolof",
  "xh": "Xhosa",
  "yi": "Yiddish",
  "yo": "Yoruba",
  "za": "Zhuang",
  "zh": "Chinese",
  "zu": "Zulu"
}

/**
 * Maps custom and Creative Commons license names to their human-readable labels. 
 */
export const LICENSE_CODES = {
  'publisher-specific, author manuscript': {
    name: 'Publisher-specific Open Access'
  },
  'unspecified-oa': {
    name: 'Unspecified Open Access'
  },
  'implied-oa': {
    name: 'Implied Open Access'
  },
  'non-standard-licence': {
    name: 'Non-standard License'
  },
  'cc-by': {
    name: 'Creative Commons Attribution',
    url: 'https://creativecommons.org/licenses/by/4.0/'
  },
  'cc-by-sa': {
    name: 'Creative Commons Attribution-ShareAlike',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/'
  },
  'cc-by-nd': {
    name: 'Creative Commons Attribution-NoDerivs',
    url: 'https://creativecommons.org/licenses/by-nd/4.0/'
  },
  'cc-by-nc': {
    name: 'Creative Commons Attribution-NonCommercial',
    url: 'https://creativecommons.org/licenses/by-nc/4.0/'
  },
  'cc-by-nc-sa': {
    name: 'Creative Commons Attribution-NonCommercial-ShareAlike',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
  },
  'cc-by-nc-nd': {
    name: 'Creative Commons Attribution-NonCommercial-NoDerivs',
    url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/'
  },
  'cc0': {
    name: 'Creative Commons CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
    url: 'https://creativecommons.org/publicdomain/zero/1.0/'
  },
  'pd': {
    name: 'Public Domain',
    url: 'https://creativecommons.org/publicdomain/mark/1.0/'
  },
  'public-domain': {
    name: 'Public Domain',
    url: 'https://creativecommons.org/publicdomain/mark/1.0/'
  }
}
