// ========================
// Constants/configurations
// ========================

export const READABLE_DATE_OPTIONS = {
  day: "numeric",
  month: "long",
  year: "numeric"
};

// Detect the user's locale
export const USER_LOCALE = navigator.languages && navigator.languages.length 
                        ? navigator.languages[0] 
                        : navigator.language;

/**
 * Mapping of explore item IDs to their display name and tooltip information.
 * @type {Object.<string, {singular: string, plural: string, tooltip: string}>}
 */
export const EXPLORE_TYPES = {
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
 * Mapping of explore filter IDs to human-readable labels.
 * 
 * @type {Object.<string, string>}
 */
export const EXPLORE_FILTERS = {
  "is_paper": "All articles",
  "is_preprint": "Preprints",
};

/**
 * Maps term-based objects like 'grant', 'publisher', 'author', etc. to human-readable names and corresponding keys.
 * Used for displaying data in a user-friendly format.
 * @type {{[key: string]: { pretty: string, key: string }}}
 */
export const termBasedHeaders = {
  "key": { pretty: "", key: "key" },
  "articles_published": { pretty: "", key: "doc_count" },
  "are_open_access": { pretty: "", key: "doc_count" },
  "are_open_access_percentage": { pretty: "", key: "doc_count" },
  "are_compliant": { pretty: "", key: "doc_count" },
  "are_compliant_percentage": { pretty: "", key: "doc_count" },
  "are_covered_by_policy": { pretty: "", key: "doc_count" },
  "are_covered_by_policy_percentage": { pretty: "", key: "doc_count" },
  "are_free_to_read": { pretty: "", key: "doc_count" },
  "are_free_to_read_percentage": { pretty: "", key: "doc_count" },
  "in_repository": { pretty: "", key: "doc_count" },
  "in_repository_percentage": { pretty: "", key: "doc_count" },
  "in_approved_repository": { pretty: "", key: "doc_count" },
  "in_approved_repository_percentage": { pretty: "", key: "doc_count" },
  "has_preprint": { pretty: "", key: "doc_count" },
  "has_preprint_percentage": { pretty: "", key: "doc_count" },
  "has_grantid": { pretty: "", key: "doc_count" },
  "has_grantid_percentage": { pretty: "", key: "doc_count" },
  "has_data_availability_statement": { pretty: "", key: "doc_count" },
  "has_data_availability_statement_percentage": { pretty: "", key: "doc_count" },
  "no_data_availability_statement": { pretty: "", key: "doc_count" },
  "no_data_availability_statement_percentage": { pretty: "", key: "doc_count" },
  "total_citations": { pretty: "", key: "doc_count" },
  "has_apc": { pretty: "", key: "doc_count" },
  "has_apc_percentage": { pretty: "", key: "doc_count" },
  "total_apcs_paid": { pretty: "", key: "value" },
  "average_apcs_paid_raw": { pretty: "", key: "value" },
  "median_apcs_paid_raw": { pretty: "", key: "values['50.0']" },
  "has_data": { pretty: "", key: "doc_count" },
  "has_data_percentage": { pretty: "", key: "doc_count" },
  "no_data": { pretty: "", key: "doc_count" },
  "no_data_percentage": { pretty: "", key: "doc_count" },
  "ukn__data": { pretty: "", key: "doc_count" },
  "ukn__data_percentage": { pretty: "", key: "doc_count" },
  "has_shared_data": { pretty: "", key: "doc_count" },
  "has_shared_data_percentage": { pretty: "", key: "doc_count" },
  "no_shared_data": { pretty: "", key: "doc_count" },
  "no_shared_data_percentage": { pretty: "", key: "doc_count" },
  "ukn_shared_data": { pretty: "", key: "doc_count" },
  "ukn_shared_data_percentage": { pretty: "", key: "doc_count" },
  "has_shared_data_in_repo": { pretty: "", key: "doc_count" },
  "has_shared_data_in_repo_percentage": { pretty: "", key: "doc_count" },
  "has_open_data": { pretty: "", key: "doc_count" },
  "has_open_data_percentage": { pretty: "", key: "doc_count" },
  "has_open_data_in_repo": { pretty: "", key: "doc_count" },
  "has_open_data_in_repo_percentage": { pretty: "", key: "doc_count" },
  "has_data_doi": { pretty: "", key: "doc_count" },
  "has_data_doi_percentage": { pretty: "", key: "doc_count" },
  "has_data_accession_number": { pretty: "", key: "doc_count" },
  "has_data_accession_number_percentage": { pretty: "", key: "doc_count" }
};


/**
 * Maps article-based objects to human-readable names and corresponding keys.
 * Used for displaying data in a user-friendly format.
 * @type {{[key: string]: { pretty: string, key: string }}}
 */
export const articleBasedDataHeaders = {
  "title": { pretty: "", key: "published_date" },
  "DOI": { pretty: "DOI", key: "published_date" },
  "supplements.is_compliant__bmgf": { pretty: "", key: "published_date" },
  "supplements.grantid__bmgf": { pretty: "", key: "published_date" },
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
export const DATA_TABLE_HEADER_CLASSES = {
  firstHeaderCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom",
  secondHeaderCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom break-words text-right",
  otherHeaderCols: "border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right"
};

/**
 * Class names for table body columns in the data explore section.
 */
export const DATA_TABLE_BODY_CLASSES = {
  firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left",
  secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-right whitespace-nowrap truncate",
  otherCols: "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"
};

/**
 * Maps ISO 3166-1 alpha-2 country codes to country names
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