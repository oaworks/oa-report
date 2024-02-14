// ========================
// Constants/configurations
// ========================

/**
 * Base URL for the API endpoint.
 * This serves as the foundational URL upon which all other endpoints are built.
 * @type {string}
 */
export const API_BASE_URL = `https://${apiEndpoint}.oa.works/report/`;

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
export const ARTICLE_EMAIL_BASE = `${API_BASE_URL}email/`;

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
  }
};

/**
 * Mapping of explore filter IDs to human-readable labels.
 * @type {Object.<string, string>}
 */
export const EXPLORE_FILTERS_LABELS = {
  "is_paper": "All articles",
  "is_preprint": "Preprints",
  "is_covered_by_policy": "Covered by <span class='uppercase'>OA</span> policy",
  "is_compliant": "Covered by & compliant with <span class='uppercase'>OA</span> policy",
  "is_compliant_all_works": "Compliant with <span class='uppercase'>OA</span> policy",
  "is_original_research": "Original research",
  "with_grant_id": "With grant <span class='uppercase'>ID</span>",
  "is_found_by_external_sources": "Found by external sources",
  "is_found_only_by_external_sources": "Found only by external sources",
  "is_found_only_by_oareport": "Found only by <span class='uppercase'>OA</span>.<span class='uppercase'>R</span>eport",
  "is_found_by_all_sources": "Found by all sources",
  "is_funded": "Funded"
};

/**
 * Mapping of explore table headers to human-readable labels and their corresponding tooltips.
 */
export const EXPLORE_HEADER_LABELS = {
  "open access": "Open Access",
  "oa": "Open Access",
  "open data": "Open Data",
  "apc": "APC<span style='text-transform: lowercase;'>s</span>",
  "free to read": "Free-to-Read",
  "doi": "DOI",
  "dois": "DOI<span style='text-transform: lowercase;'>s</span>",
  "id": "ID",
  "rors": "ROR<span style='text-transform: lowercase;'>s</span>",
  "orcIDs": "ORC<span style='text-transform: lowercase;'>i</span>D<span style='text-transform: lowercase;'>s</span>",
  "fundref": "FundRef",
  "supplements.dev.": "",
  "supplements.": "",
  "authorships.author.display name": "Authors",
  "authorships.author.orcid": "ORCiDs",
  "authorships.institutions.display name": "Institutions",
  "authorships.institutions.ror": "RORs",
  "concepts.display name": "Concepts",
  "funder.name": "Funder",
  "publisher license best": "Publisher license",
  "repository license best": "Repository license",
};

/**
 * Mapping of explore table headers to human-readable labels and their corresponding tooltips.
 * For terms-based tables
 */
export const EXPLORE_HEADER_TERMS_LABELS = {
  "compliant": {
    label: "Compliant",
    info: "Publications that comply with the requirements of the Open Access policy, even if they are not covered by said policy. To be compliant, the publication must have the final version or the author accepted manuscript available for free and under a CC BY or CC0 licence on a publisher or repository website."
  },
  "free_to_read": {
    label: "Free-to-read",
    info: "Publications that are free to read on the publisher’s website or any online repository, including temporarily accessible articles (“bronze Open Access”)."
  },
  "in_repository": {
    label: "In repository",
    info: "Publications that have a copy of the work freely available and discoverable in any repository."
  },
  "mean_citations": {
    label: "Mean citations",
    info: "The mean (i.e. average) number of citations of these publications"
  },
  "open_access": {
    label: "Open Access",
    info: "Publications that are free and CC BY or CC0 (in the public domain) on the publisher’s website, a repository or a preprint server."
  },
  "publications": {
    label: "Publications",
    info: "Academic research articles found (including peer-reviewed research, reviews, editorials, etc.)"
  },
  "total_citations": {
    label: "Total citations",
    info: "Number of citations the publications received."
  },
  "unknown_data_status": {
    label: "Unknown data status",
    info: ""
  },
  "unknown_shared_data_status": {
    label: "Unknown shared data status",
    info: ""
  },
  "with_data": {
    label: "With data",
    info: ""
  },
  "with_data_accession_number": {
    label: "With data accession number",
    info: ""
  },
  "with_data_availability_statement": {
    label: "With data availability statement",
    info: "Publications that have a data availability statement. Data availability statements (or 'data access statement', 'resource availability statements', 'code availability statements') tell a reader where the research data or code associated with a paper is available, and how they can be accessed. This figure doesn’t tell you what type of data availability statement is provided (e.g whether there is Open Data or no data at all)."
  },
  "with_data_dois": {
    label: "With data DOI<span style='text-transform: lowercase;'>s</span>",
    info: ""
  },
  "with_dois": {
    label: "With DOI<span style='text-transform: lowercase;'>s</span>",
    info: ""
  },
  "with_fundref_dois": {
    label: "With FundRef DOI<span style='text-transform: lowercase;'>s</span>",
    info: ""
  },
  "with_grant_dois": {
    label: "With grant DOI<span style='text-transform: lowercase;'>s</span>",
    info: ""
  },
  "with_grant_id": {
    label: "With grant ID<span style='text-transform: lowercase;'>s</span>",
    info: "Publications that provided the grant ID for the grant you provide them."
  },
  "with_open_data": {
    label: "With Open Data",
    info: ""
  },
  "with_open_data_in_repository": {
    label: "With Open Data in repository",
    info: ""
  },
  "with_orcids": {
    label: "With ORC<span style='text-transform: lowercase;'>i</span>D<span style='text-transform: lowercase;'>s</span>",
    info: ""
  },
  "with_preprint": {
    label: "With preprint",
    info: "Publications that have a preprint associated with them."
  },
  "with_rors": {
    label: "With ROR<span style='text-transform: lowercase;'>s</span>",
    info: ""
  },
  "with_shared_data": {
    label: "With shared data",
    info: ""
  },
  "with_shared_data_in_repository": {
    label: "With shared data in repository",
    info: ""
  },
  "without_data": {
    label: "Without data",
    info: ""
  },
  "without_data_availability_statement": {
    label: "Without data availability statement",
    info: ""
  },
  "without_shared_data": {
    label: "Without shared data",
    info: ""
  }
}

/**
 * Mapping of explore table headers to human-readable labels and their corresponding tooltips.
 * For articles-based tables
 */
export const EXPLORE_HEADER_ARTICLES_LABELS = {
  "DOI": {
    label: "DOI",
    info: ""
  },
  "PMCID": {
    label: "PMCID",
    info: ""
  },
  "authorships.author.display_name": {
    label: "Author(s)",
    info: ""
  },
  "authorships.institutions.display_name": {
    label: "Institution(s)",
    info: ""
  },
  "can_archive": {
    label: "Archivable?",
    info: ""
  },
  "cited_by_count": {
    label: "“Cited by” count",
    info: ""
  },
  "concepts.display_name": {
    label: "Concepts",
    info: ""
  },
  "funder.name": {
    label: "Funder(s)",
    info: ""
  },
  "has_oa_locations_embargoed": {
    label: "",
    info: ""
  },
  "has_repository_copy": {
    label: "",
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
  "issue": {
    label: "Issue",
    info: ""
  },
  "journal": {
    label: "Journal",
    info: ""
  },
  "journal_oa_type": {
    label: "Journal OA type",
    info: ""
  },
  "oa_status": {
    label: "OA status",
    info: ""
  },
  "openalex": {
    label: "OpenAlex",
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
  "subtitle": {
    label: "Subtitle",
    info: ""
  },
  "supplements.grantid__idrc": {
    label: "Grant ID",
    info: ""
  },
  "supplements.has_data_availability_statement": {
    label: "Data availability statement?",
    info: ""
  },
  "supplements.is_compliant__idrc": {
    label: "Compliant?",
    info: ""
  },
  "supplements.is_covered_by_policy__idrc": {
    label: "Covered by policy?",
    info: "Publications that are covered by the Open Access Policy. To be covered, the publication must have been funded by a grant proposal that was received after the policy took effect on July 2015."
  },
  "supplements.is_new__idrc": {
    label: "New?",
    info: ""
  },
  "supplements.preprint_doi": {
    label: "Preprint DOI",
    info: ""
  },
  "supplements.publisher_license_best": {
    label: "Publisher license",
    info: ""
  },
  "supplements.repository_license_best": {
    label: "Repository license",
    info: ""
  },
  "supplements.sheets": {
    label: "Sheets",
    info: ""
  },
  "supplements_has_preprint_copy": {
    label: "Preprint copy?",
    info: ""
  },
  "title": {
    label: "Title",
    info: ""
  },
  "version": {
    label: "Version",
    info: ""
  },
  "volume": {
    label: "Volume",
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