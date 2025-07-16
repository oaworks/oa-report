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
  enabled: "block p-2 border rounded-t-sm mt-1 mr-1 md:mt-0 md:mr-3 md:border-b-0 border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 js_year_select",
  disabled: "block p-2 border rounded-t-sm mt-1 mr-1 md:mt-0 md:mr-3 md:border-b-0 bg-white text-neutral-900 opacity-50 cursor-not-allowed js_year_select",
  active: "p-2 border mt-1 mr-1 md:mt-0 md:mr-3 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 md:border-b-0 bg-neutral-900 text-white font-semibold border-neutral-900 js_year_select"
}

/**
 * An array of Insight card configuration objects.
 *
 * Each object in this array defines the settings and text for one Insights card.
 *
 * @constant {Array<Object>}
 * @property {string} numerator - The key for the primary metric (e.g., "is_paper", "is_preprint").
 * @property {?string} denominator - The key for the secondary metric used to form a ratio,
 *     or null if the card displays a single total value.
 * @property {string} denominatorText - The label text to display alongside the denominator value (e.g., "articles", "preprints").
 * @property {string} info - The HTML string used as tooltip content that describes the insight.
 */
export const INSIGHTS_CARDS = [
  {
    // For the total publications card
    numerator: "is_paper",
    denominator: null,
    denominatorText: "articles",
    info: "<p>The total number of articles published by grantees or authors at your organization.</p>"
  },
  {
    numerator: "is_preprint",
    denominator: null,
    denominatorText: "preprints",
    info: "<p>Preprints are early versions of research articles that have not yet been peer-reviewed.</p>"
  },
  {
    numerator: "is_free_to_read",
    denominator: "is_paper",
    denominatorText: "articles",
    info: "<p>Articles that are free to read on the publisher website or any online repository, including temporarily accessible articles (“bronze Open Access”).</p>"
  },
  {
    numerator: "is_free_to_read_preprint",
    denominator: "is_preprint",
    denominatorText: "preprints",
    info: "<p>Preprints that are free to read on the publisher website or any online repository, including temporarily accessible articles (“bronze Open Access”).</p>"
  },
  {
    numerator: "is_compliant",
    denominator: "is_covered_by_policy",
    denominatorText: "articles covered by policy",
    info: `<p class='mb-2'>The percentage of articles covered by <a href='{policyUrl}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a> that are compliant with the policy.</p>`
  },
  {
    numerator: "is_compliant_preprint",
    denominator: "is_covered_by_policy_preprint",
    denominatorText: "preprints covered by policy",
    info: `<p class='mb-2'>The percentage of preprints covered by <a href='{policyUrl}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a> that are compliant with the policy.</p>`
  },
  {
    numerator: "is_oa",
    denominator: "is_paper",
    denominatorText: "articles",
    info: "<p>The number of articles that are free and <a href='https://creativecommons.org/licenses/by/4.0/' class='underline underline-offset-2 decoration-1' target='_blank' rel='noopener'>CC BY</a> <strong class='bold'>or</strong> <a href='https://creativecommons.org/publicdomain/zero/1.0/' class='underline underline-offset-2 decoration-1' target='_blank' rel='noopener'>CC0</a> (in the public domain) on the publisher’s website, a repository or a preprint server.</p>"
  },
  {
    numerator: "has_data_availability_statement",
    denominator: "has_checked_data_availability_statement",
    denominatorText: "articles checked to date",
    info: `<p class='mb-2'>This number tells you how many articles that we’ve analyzed have a data availability statement.</p> <p>To check if a paper has a data availability statement, we use data from PubMed and review articles manually. This figure doesn’t tell you what type of data availability statement is provided (e.g there is Open Data vs there is no data).</p>`
  },
  {
    numerator: "has_data_availability_statement_preprint",
    denominator: "has_checked_data_availability_statement_preprint",
    denominatorText: "preprints checked to date",
    info: `<p class='mb-2'>This number tells you how many preprints that we’ve analyzed have a data availability statement.</p> <p>To check if a paper has a data availability statement, we use data from PubMed and review preprints manually. This figure doesn’t tell you what type of data availability statement is provided (e.g there is Open Data vs there is no data).</p>`
  },
  {
    numerator: "has_open_data",
    denominator: "has_data",
    denominatorText: "articles with data",
    info: "<p class='mb-2'>The percentage of articles that shared any data under a <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>CC0</a> or <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>CC-BY</a> license.</p> <p class='mb-2'>This figure only measures how many articles shared Open Data if they generated data in the first place. It also only measures if any of the datasets generated were open, not if all of them were open.</p> <p>We work with <a href='https://dataseer.ai/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>Dataseer</a>’s data, which uses a combination of machine learning and human review to analyze the articles’ content.</p>"
  },
  {
    numerator: "has_open_code",
    denominator: "has_code",
    denominatorText: "articles with code",
    info: "<p class='mb-2'>The percentage of articles that shared any code under a permissive open-source licence, such as MIT.</p> <p class='mb-2'>This figure measures how many articles shared Open Code if they generated code in the first place. It also only measures if <strong>any parts</strong> of the code generated are open, not if <strong>all</strong> of it is open.</p> <p> We work with <a href='https://dataseer.ai/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>Dataseer</a>’s data, which uses a combination of machine learning and human review to analyze the articles’ content.</p>"
  }
];

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
    "covered_by_policy": {
    singular: "Work covered by policy",
    plural: "Works covered by policy",
    tooltip: "Explore various works covered by your policy"
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
  "program": {
    singular: "Program",
    plural: "Programs"
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
    info: "<p>Scholarly research articles, <strong>including</strong>:</p>\
      <ul class='mb-2 list-disc list-inside'>\
        <li>peer-reviewed research</li>\
        <li>reviews</li>\
        <li>letters</li>\
        <li>editorials</li>\
        <li>methods</li>\
      </ul>\
      <p>This <strong>excludes</strong>:</p>\
      <ul class='list-disc list-inside'>\
        <li>preprints</li>\
        <li>conference proceedings</li>\
      </ul>"
  },
  "is_preprint": {
    label: "Preprints",
    info: "<p>Scholarly research articles that haven’t been peer-reviewed.</p>"
  },
  "is_authored": {
    label: "Authored",
    info: "<p>Scholarly research articles authored by someone at <span class='org-name'></span>, <strong>including</strong>:</p>\
    <ul class='mb-2 list-disc list-inside'>\
      <li>peer-reviewed research</li>\
      <li>reviews</li>\
      <li>letters</li>\
      <li>editorials</li>\
      <li>methods</li>\
    </ul>\
    <p>This <strong>excludes</strong>:</p>\
    <ul class='list-disc list-inside'>\
      <li>preprints</li>\
      <li>conference proceedings</li>\
    </ul>"
  },
  "is_covered_by_policy": {
    label: "Covered by <span class='uppercase'>OA</span> policy",
    info: "<p class='mb-2'>Scholarly research articles covered by <span class='org-name'></span>’s <a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>Open Access policy</a>.</p><p><span class='org-policy-coverage'></span></p>"
  },
  "is_covered_by_current_policy": {
    label: "Covered by current <span class='uppercase'>OA</span> policy",
    info: "<p>Scholarly research articles covered by <span class='org-name'></span>’s most recent <a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>Open Access policy</a>.</p>"
  },
  "is_covered_by_old_policy": {
    label: "Covered by old <span class='uppercase'>OA</span> policy",
    info: "<p>Scholarly research articles covered by an older <span class='org-name'></span> Open Access policy.</p>"
  },
  "is_compliant": {
    label: "Covered by & compliant with <span class='uppercase'>OA</span> policy",
    info: "<p>Scholarly research articles covered by <span class='org-name'></span>’s <a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>Open Access policy</a> and compliant with its terms.</p><p><span class='org-policy-compliance></span></p><p><span class='org-policy-coverage'></span></p>"
  },
  "is_compliant_all_works": {
    label: "Compliant with <span class='uppercase'>OA</span> policy",
    info: "<p>Scholarly research articles that comply with the terms of <span class='org-name'></span>’s <a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>Open Access policy</a>, but are not necessarily covered by it.</p><p><span class='org-policy-compliance'></span></p>"
  },
    "is_not_compliant": {
    label: "Not compliant with <span class='uppercase'>OA</span> policy",
    info: "<p>Works that do not comply with the terms of <span class='org-name'></span>’s <a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>Open Access policy</a>.</p><p><span class='org-policy-compliance'></span></p>"
  },
  "is_original_research": {
    label: "Original research",
    info: "<p>Scholarly research articles, <strong>including only</strong>:</p>\
    <ul class='mb-2 list-disc list-inside'>\
      <li>peer-reviewed research</li>\
    </ul>\
    <p>This <strong>excludes</strong>:</p>\
    <ul class='list-disc list-inside'>\
      <li>reviews</li>\
      <li>editorials</li>\
      <li>methods</li>\
      <li>conference proceedings</li>\
    </ul>"
  },
  "with_grant_id": {
    label: "With grant <span class='uppercase'>ID</span>",
    info: "<p>Scholarly research articles with a grant ID from <span class='org-name'></span>, <strong>including</strong>:</p>\
    <ul class='mb-2 list-disc list-inside'>\
      <li>peer-reviewed research</li>\
      <li>reviews</li>\
      <li>letters</li>\
      <li>editorials</li>\
      <li>methods</li>\
    </ul>\
    <p>This <strong>excludes</strong>:</p>\
    <ul class='mb-2 list-disc list-inside'>\
      <li>preprints</li>\
      <li>conference proceedings</li>\
    </ul>",
    details: "We collect data from the publisher using Crossref, and where this isn’t available we manually collect the funding statement and extract the grant ID. Grant ID data is then cleaned using automated tools and manual review."
  },
  "is_found_by_external_sources": {
    label: "Found by external sources"
  },
  "is_found_only_by_external_sources": {
    label: "Found only by external sources"
  },
  "is_found_only_by_oareport": {
    label: "Found only by <span class='uppercase'>OA</span>.<span class='uppercase'>R</span>eport"
  },
  "is_found_by_all_sources": {
    label: "Found by all sources"
  },
  "has_data_availability_statement": {
    label: "Has data availability statement",
    info: "<p class='mb-2'>Any scholarly research article that has a data availability statement. Data availability statements (i.e. “data access statement”, “resource availability statements”, “code availability statements”) tell a reader where the research data or code associated with an article is available and how they can be accessed. This doesn’t tell you what type of data availability statement is provided (e.g., there is Open Data VS there is no data).</p><p>To check if an article has a data availability statement, we use data from PubMed’s data availability filter and review articles manually.</p>"
  },
  "has_apc": {
    label: "Paid via APC",
    info: "<p>Scholarly research articles that had an article-processing charge (APC) paid by <span class='org-name'></span></p>"
  },
  "is_under_transitional_agreement": {
    label: "Paid via transitional agreement"
  },
  "is_funded": {
    label: "Funded",
    info: "<p>Scholarly research articles funded by <span class='org-name'></span>, <strong>including</strong>:</p>\
    <ul class='mb-2 list-disc list-inside'>\
      <li>peer-reviewed research</li>\
      <li>reviews</li>\
      <li>letters</li>\
      <li>editorials</li>\
      <li>methods</li>\
    </ul>\
    <p>This <strong>excludes</strong>:</p>\
    <ul class='list-disc list-inside'>\
      <li>preprints</li>\
      <li>conference proceedings</li>\
    </ul>"
  },
  "has_shared_data": {
    label: "Shared data"
  },
  "has_shared_code": {
    label: "Shared code"
  },
  "has_data": {
    label: "With data"
  },
  "has_code": {
    label: "With code"
  },
  "is_work": {
    label: "Works",
    info: "<p>Any research output, including articles, preprints, data, and code</p>"
  },
  "is_removed": {
    label: "Removed works",
    info: "<p>Any research output, including articles, preprints, data, and code that has been removed from <span class='org-name'></span>’s OA.Report</p>"
  },
  "has_confirmed_ppmi_data_usage": {
    label: "Confirmed PPMI data usage",
    info: "Articles that mention PPMI in their data availability statement or acknowledgment/funding statement or have an MJFF/ASAP grant ID including “PPMI”."
  },
  "has_confirmed_ppmi_biosample_usage": {
    label: "Confirmed PPMI biosample usage",
    info: "Articles that mention PPMI biospecimen use in their data availability statement or acknowledgment/funding statement."
  },
  "is_authored_and_is_original_research": {
    label: "Authored original research",
    info: "<p>Scholarly research articles authored by someone at <span class='org-name'></span>, <strong>including only</strong>:</p>\
    <ul class='mb-2 list-disc list-inside'>\
      <li>peer-reviewed research</li>\
    </ul>\
    <p>This <strong>excludes</strong>:</p>\
    <ul class='list-disc list-inside'>\
      <li>reviews</li>\
      <li>editorials</li>\
      <li>methods</li>\
      <li>conference proceedings</li>\
    </ul>"
  },
  "ppmi_biospecimen_users_outputs": {
    label: "PPMI Biospecimen Users Outputs",
    info: "Works that include a PPMI biospecimen users grant ID."
  }
};

/**
 * Mapping of explore table headers to human-readable labels and their corresponding tooltips.
 * For terms-based tables
 */
export const EXPLORE_HEADER_TERMS_LABELS = {
  "doc_count": {
    label: "Publications"
  },
  "compliant": {
    label: "Compliant",
    info: "Publications that comply with the requirements of the Open Access policy, even if they are not covered by said policy.",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref and OpenAlex."
  },
  "covered_by_policy": {
    label: "Covered by policy",
    info: "Publications that are covered by the Open Access policy. <span class='org-policy-coverage'></span>",
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
    label: "Mean APC amount",
    info: "Mean (i.e. average) of article-processing charges (APCs) paid by <span class='org-name'></span>."
  },
  "mean_citations": {
    label: "Mean citations",
    info: "The mean (i.e. average) number of citations of these publications.",
    details: "We used data from OpenAlex's <code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>cited_by_count</code>."
  },
  "median_apc_amount": {
    label: "Median APC amount",
    info: "Median of article-processing charges (APCs) paid by <span class='org-name'></span>."
  },
  "open_access": {
    label: "Open Access",
    info: "Publications that are free and CC BY or CC0 (in the public domain) on the publisher’s website, a repository or a preprint server.",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref, OpenAlex, Europe PMC and manual checks (as required). If a work has the required license at any location it is considered Open Access."
  },
  "publications": {
    label: "Publications",
    info: "Scholarly research articles found by the current filter."
  },
  "total_apc_amount": {
    label: "Total APC amount",
    info: "Total article-processing charges (APCs) paid by <span class='org-name'></span>."
  },
  "total_citations": {
    label: "Total citations",
    info: "Number of citations the publications received."
  },
  "unknown_code_status": {
    label: "Unknown code status"
  },
  "unknown_data_availability_statement": {
    label: "Unknown data availability statement",
    info: "Publications where we have not confirmed if they have a data availability statement. Data availability statements (or 'data access statement', 'resource availability statements', 'code availability statements') tell a reader where the research data or code associated with a paper is available, and how they can be accessed.",
    details: "To check if a paper has a data availability statement, we use data from PubMed’s data availability filter and review articles manually. This process can take up to six months in some cases as we wait for external sources before collecting ourselves."
  },
    "unknown_data_status": {
    label: "Unknown data status"
  },
  "unknown_shared_data_status": {
    label: "Unknown shared data status"
  },
  "unknown_shared_code_status": {
    label: "Unknown shared code status"
  },
  "with_apc": {
    label: "With APC<span class='lowercase'>s</span>",
    info: "Scholarly research articles with an article-processing charge (APC) paid by <span class='org-name'></span>."
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
    label: "With FundRef DOI<span style='text-transform: lowercase;'>s</span>",
    info: "Scholarly research articles that have at least one ORCID in their Crossref metadata."
  },
  "with_grant_dois": {
    label: "With grant DOI<span style='text-transform: lowercase;'>s</span>",
    info: "Scholarly research articles that have at least one grant DOI in their Crossref metadata."
  },
  "with_grant_id": {
    label: "With grant ID<span style='text-transform: lowercase;'>s</span>",
    info: "Scholarly research articles with a grant ID from <span class='org-name'></span> found by OA.Works.",
    details: "We found and normalized data from Crossref to find data provided by the publisher. Where this wasn't possible, we manually collected the funding statement. The grant ID was then extracted and normalized using a mix of automated tools and manual review."
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
    label: "With ORC<span style='text-transform: lowercase;'>i</span>D<span style='text-transform: lowercase;'>s</span>",
    info: "Scholarly research articles that have at least one ORCID in their OpenAlex metadata."
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
    label: "With ROR<span style='text-transform: lowercase;'>s</span>",
    info: "Scholarly research articles that have at least one ROR ID in their OpenAlex metadata."
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
    label: "Without data availability statement",
    info: "Publications that do not have a data availability statement. Data availability statements (or 'data access statement', 'resource availability statements', 'code availability statements') tell a reader where the research data or code associated with a paper is available, and how they can be accessed. This figure doesn’t tell you what type of data availability statement is provided (e.g whether there is Open Data or no data at all).",
    details: "To check if a paper has a data availability statement, we use data from PubMed’s data availability filter and review articles manually."
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
  "apc_cost": {
    label: "APC<span class='lowercase'>s</span>",
    info: "<p class='mb-2'>Data type: <strong>Number</strong> <br>The article processing charge (APC), also known as publication fee, in USD.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "author_email_name": {
    label: "Author email name",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>The corresponding author's name for use in emails.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
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
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the work can be self-archived in a repository.</p><p>Source: <a href='https://shareyourpaper.org/permissions' target='_blank' class='underline underline-offset-1 md:underline-offset-4 decoration-1'>ShareYourPaper Permissions</a> <br>Updated: daily (premium), occasionally (free)</p>"
  },
  "cited_by_count": {
    label: "Cited by",
    info: ""
  },
  "concepts.display_name": {
    label: "Concepts",
    info: ""
  },
  "crossref_is_oa": {
    label: "Crossref Open Access?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if Crossref data suggests the article is free to read.</p><p>Source: <a href='https://shareyourpaper.org/permissions' target='_blank' class='underline underline-offset-1 md:underline-offset-4 decoration-1'>ShareYourPaper Permissions</a> <br>Updated: daily (premium), occasionally (free)</p>"
  },
  "DOI": {
    label: "DOI",
    info: ""
  },
  "email": {
    label: "Email",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>The corresponding author’s email address. Most emails are encrypted if you’re not logged in and viewing emails associated with your organization.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "funder.name": {
    label: "Funder(s)",
    info: ""
  },
  "has_repository_copy": {
    label: "In repository?",
    info: ""
  },
  "openalx.open_access.oa_status": {
    label: "Open Access status",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <p class='mb-2'>Uses <a href='https://help.openalex.org/hc/en-us/articles/24347035046295-Open-Access-OA' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1'>OpenAlex’s definition of Open Access</a>. Values include:</p>\
      <ul class='mb-2'>\
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>diamond</code>: Published in a fully OA journal—one that is indexed by the DOAJ or that we have determined to be OA—with no article processing charges (i.e., free for both readers and authors).</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>gold</code>: Published in a fully OA journal.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>green</code>: Toll-access on the publisher landing page, but there is a free copy in an OA repository.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>hybrid</code>: Free under an open license in a toll-access journal.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>bronze</code>: Free to read on the publisher landing page, but without any identifiable license.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>closed</code>: All other articles.</li> \
      </ul>\
      <p>Source: OpenAlex</p>"
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
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>Values include:</p>\
      <ul class='mb-2'>\
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>gold</code>: The journal’s entire output is published in Open Access.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>hybrid</code>: The journal allows some articles to be published in Open Access.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>transformative</code>: The journal allows some articles to be published in Open Access and is listed by Coalition S as a transformative journal.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>diamond</code>: The journal’s entire output is published in Open Access without APCs.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>closed</code>: The journal’s output is entirely behind a paywall, or bronze.</li> \
        <li><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>not applicable</code>: The work is not in a journal (typically, a pre-print).</li> \
      </ul>\
    <p class='mb-2'>This is akin to <code class='p-1 rounded-md bg-neutral-500 text-white text-xs hover:bg-neutral-700'><a href='https://unpaywall.org/data-format#:~:text=oa_status' target='_blank'>oa_status</a></code> for a journal.</p>\
    <p>Source: OA.Works <br>Updated: daily (premium), occasionally (free)</p>"
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
  "relation.has-preprint.id": {
    label: "Preprint DOI(s)",
    info: ""
  },
  "relation.has-version.id": {
    label: "Subsequent version(s)",
    info: ""
  },
  "relation.is-same-as.id": {
    label: "Is the same version as",
    info: ""
  },
  "relation.is-version-of.id": {
    label: "Earlier version(s)",
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
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article uses code the authors generated in the process of research.</p><p>Source: Dataseer <br>Updated: as requested (premium)</p>"
  },
  "dev.code.has_open_code": {
    label: "Open code?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the authors shared their code and licensed it under a permissive open source licence (e.g MIT).</p><p>Source: OA.Works <br>Updated: as requested (premium)</p>"
  },
  "dev.code.has_shared_code": {
    label: "Shared code?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article shared the code in any location (e.g. in the supplements, the article itself, a code repository, their website).</p><p>Source: Dataseer <br>Updated: as requested (premium)</p>"
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
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the authors shared their data and licensed it CC-BY or CC-O.</p><p>Source: OA.Works <br>Updated: as requested (premium)</p>"
  },
  "dev.data.has_shared_data": {
    label: "Shared data?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article shared the data in any location (e.g. in the supplements, the article itself, a data repository, their website).</p><p>Source: Dataseer <br>Updated: as requested (premium)</p>"
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
  "financial_disclosures": {
    label: "Financial disclosures",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if this work’s funding statement is a financial disclosure.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "fundingstatement": {
    label: "Funding statement",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>The funding statement’s full text.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "grantid": {
    label: "Grant ID",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>The identifier(s) for the grant(s) associated with the work.</p><p>Source: OA.Works, Crossref <br>Updated: weekly (premium)</p>"
  },
  "has_data_availability_statement": {
    label: "Data availability statement?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article has a data availability (or resource availability) statement.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "has_made_code": {
    label: "Generated code?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article uses code the authors generated in the process of research.</p><p>Source: Dataseer <br>Updated: as requested (premium)</p>"
  },
  "has_made_data": {
    label: "Generated data?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article uses data the authors generated in the process of research.</p><p>Source: Dataseer <br>Updated: as requested (premium)</p>"
  },
  "has_open_code": {
    label: "Open code?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the authors shared their code and licensed it under a permissive open source licence (e.g MIT).</p><p>Source: OA.Works <br>Updated: as requested (premium)</p>"
  },
  "has_open_data": {
    label: "Open data?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the authors shared their data and licensed it CC-BY or CC-O.</p><p>Source: OA.Works <br>Updated: as requested (premium)</p>"
  },
  "has_preprint_copy": {
    label: "Preprint copy?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article has a version on a preprint server.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "has_shared_code": {
    label: "Shared code?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article shared the code in any location (e.g. in the supplements, the article itself, a code repository, their website).</p><p>Source: Dataseer <br>Updated: as requested (premium)</p>"
  },
  "has_shared_data": {
    label: "Shared data?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article shared the data in any location (e.g. in the supplements, the article itself, a data repository, their website).</p><p>Source: Dataseer <br>Updated: as requested (premium)</p>"
  },
  "has_reused_data": {
    label: "Reused data?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article uses data not created by the authors or provided by another source.</p><p>Source: Dataseer <br>Updated: as requested (premium)</p>"
  },
  "invoice_date": {
    label: "Invoice date",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>Date an invoice for an article processing charge (APC), also known as publication fee, was issued.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "invoice_number": {
    label: "Invoice number",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>Number of an invoice for an article processing charge (APC), also known as publication fee.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "invoice_year": {
    label: "Invoice year",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>Year an invoice for an article processing charge (APC), also known as publication fee, was issued.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "is_approved_repository": {
    label: "Approved repository?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if this work is deposited in an approved repository under the Open Access policy.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "is_compliant": {
    label: "Compliant?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the work is compliant with the organization’s Open Access policy.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "is_compliant_all_works": {
    label: "Compliant?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the work is compliant with the organization’s Open Access policy.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "is_compliant_with_current_policy": {
    label: "Compliant with current <span class='uppercase'>OA</span> policy",
    info: "<p>Scholarly research articles compliant with <span class='org-name'></span>’s most recent <a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>Open Access policy</a>.</p>"
  },
  "is_compliant_with_old_policy": {
    label: "Compliant with old <span class='uppercase'>OA</span> policy",
    info: "<p>Scholarly research articles compliant with an older <span class='org-name'></span> Open Access policy.</p>"
  },
  "is_covered_by_current_policy": {
    label: "Covered by current <span class='uppercase'>OA</span> policy",
    info: "<p>Scholarly research articles covered by <span class='org-name'></span>’s most recent <a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>Open Access policy</a>.</p>"
  },
  "is_covered_by_old_policy": {
    label: "Covered by old <span class='uppercase'>OA</span> policy",
    info: "<p>Scholarly research articles covered by an older <span class='org-name'></span> Open Access policy.</p>"
  },
  "is_covered_by_policy": {
    label: "Covered by <span class='uppercase'>OA</span> policy",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the work is covered under the organization’s Open Access policy.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "is_new": {
    label: "New?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the work has been added since the last time we sent the user a report.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
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
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the article is found on a preprint server.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "oasupport.status": {
    label: "OA.Support status",
    info: ""
  },
  "pmc_has_data_availability_statement": {
    label: "PMC data availability statement?",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if PMC reports the article as having a data availability statement.</p><p>Source: PubMed Central (PMC) <br>Updated: weekly (premium), occasionally (free)</p>"
  },
  "preprint_doi": {
    label: "Preprint DOI",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>The DOI for the article’s preprint, distinct from the article’s DOI.</p><p>Source: OA.Works. <br>Updated: weekly (premium)</p>"
  },
  "program": {
    label: "Program",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>The grant program the work was supported by.</p><p>Source: OA.Works. <br>Updated: weekly (premium)</p>"
  },
  "publisher_license_best": {
    label: "Publisher license (best)",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>The license applied to the published work. The published version might have a different license than the repository copy’s license (as seen in <em>Repository License (Best)</em>). </p><p>Source: Data from OpenAlex, Crossref, and OA.Works <br>Updated: weekly (premium), occasionally (free)</p>"
  },
  "publisher_simple": {
    label: "Publisher (simple)",
    info: ""
  },
  "remove": {
    label: "Remove",
    info: "<p class='mb-2'>Data type: <strong>Boolean</strong> <br><code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>True</code> if the work should be removed from an organization’s results for any reason.</p><p>Source: OA.Works <br>Updated: weekly (premium)</p>"
  },
  "repository_license_best": {
    label: "Repository license (best)",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>The license applied to the work in a repository. The repository copy might be a different version of the work (e.g. an Author Accepted Manuscript) than the published version. It therefore may differ from the publisher license (as seen in <em>Publisher License (Best)</em>).</p><p>Source: Data from OpenAlex and Europe PMC. <br>Updated: weekly (premium), occasionally (free)</p>"
  },
  "resource_doi": {
    label: "Resource DOI",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>DOI(s) found associated with the work. This could be for a dataset, codebase, or any other supplementary material.</p><p>Source: OA.Works. <br>Updated: as requested (premium)</p>"
  },
  "resource_licence": {
    label: "Resource license",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>Licence found associated to supporting resources. This could be for a dataset, codebase, or any other supplementary material.</p><p>Source: OA.Works. <br>Updated: as requested (premium)</p>"
  },
  "resource_location_name": {
    label: "Resource location name",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>Location(s) of the supporting resource(s). This could be for a dataset, codebase, or any other supplementary material.</p><p>Source: OA.Works. <br>Updated: as requested (premium)</p>"
  },
  "resource_location_url": {
    label: "Resource location URL",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>URL(s) of the supporting resource(s). This could be for a dataset, codebase, or any other supplementary material.</p><p>Source: OA.Works. <br>Updated: as requested (premium)</p>"
  },
  "sheets": {
    label: "Sheets",
    info: ""
  },
  "title": {
    label: "Title",
    info: ""
  },
  "is_financial_disclosure": {
    label: "Financial disclosure",
    info: "True if this work's funding statement is actually a financial disclosure"
  },
  "removed_from_report": {
    label: "Removed from OA.Report",
    info: "Lists an organizations URL slug if this work should be removed from OA.Report for any reason"
  },
  "updated": {
    label: "Updated",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>Timestamp showing when the record was last updated.</p><p>Source: OA.Works <br>Updated: weekly (premium), occasionally (free)</p>"
  },
  "version": {
    label: "Version",
    info: "<p class='mb-2'>Data type: <strong>String</strong> <br>Version of the article that can be self-archived in a repository. Values are based on the <a href='https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings' target='_blank' class='underline underline-offset-1 md:underline-offset-4 decoration-1'>DRIVER Guidelines versioning scheme</a>.</p><p>Source: <a href='https://shareyourpaper.org/permissions' target='_blank' class='underline underline-offset-1 md:underline-offset-4 decoration-1'>ShareYourPaper Permissions</a> <br>Updated: daily (premium), occasionally (free)</p>"
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
 * Class names for table footer (<tfoot>) columns in the data explore section.
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
 */
export const DATA_TABLE_FOOT_CLASSES = {
  terms: {
    firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-600 p-2 text-left",
    secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-500 p-2 whitespace-nowrap truncate",
    otherCols: "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-500"
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
