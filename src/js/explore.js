// =================================================
// explore.js
// State & DOM manipulation specific to Data Explore
// =================================================

// =================================================
// Imports
// =================================================

import { displayNone, makeDateReadable, fetchGetData, fetchPostData, debounce, reorderTermRecords, reorderArticleRecords, prettifyRecords, formatObjectValuesAsList, pluraliseNoun, startYear, endYear, dateRange, replaceText, decodeAndReplaceUrlEncodedChars, getORCiDFullName, makeNumberReadable, convertTextToLinks, removeDisplayStyle, showNoResultsRow, parseCommaSeparatedQueries, copyToClipboard, getAllURLParams, updateURLParams, removeArrayDuplicates, updateExploreFilterHeader,getDecodedUrlQuery, andQueryStrings, buildEncodedQueryWithUrlFilter } from "./utils.js";
import { ELEVENTY_API_ENDPOINT, CSV_EXPORT_BASE, EXPLORE_ITEMS_LABELS, EXPLORE_FILTERS_LABELS, EXPLORE_HEADER_TERMS_LABELS, EXPLORE_HEADER_ARTICLES_LABELS, DATA_TABLE_HEADER_CLASSES, DATA_TABLE_BODY_CLASSES, DATA_TABLE_FOOT_CLASSES, COUNTRY_CODES, LANGUAGE_CODES, LICENSE_CODES } from "./constants.js";
import { toggleLoadingIndicator } from "./components.js";
import { awaitDateRange } from './report-date-manager.js';
import { orgDataPromise } from './insights-and-strategies.js';
import { getAggregatedDataQuery } from './aggregated-data-query.js';

// =================================================
// Global variables
// =================================================

const exportSort = "&sort=published_date:desc";

let orgKey = "",
    loggedIn = false,
    hasOrgKey = Object.keys(OAKEYS).length !== 0;
if (hasOrgKey) {
  // logged in
  orgKey = `&orgkey=${Object.values(OAKEYS)}`;
  loggedIn = true;
} else {
  // logged out
  loggedIn = false;
  //displayNone("explore");
}

/**
 * Allows the EXPLORE_HEADER_TERMS_LABELS constant to be accessible via a browser.
 * @global
 * @type {Object}
 */
window.EXPLORE_HEADER_TERMS_LABELS = EXPLORE_HEADER_TERMS_LABELS;

/**
 * Data object representing metadata on an organization.
 * @global
 * @type {Object}
 */
let orgData;

/**
 * Flag indicating whether the data explore section has been initialised.
 * @global
 * @type {boolean}
 */
let isDataExploreInit = false;

/**
 * Tracks the currently active explore item BUTTON for use in processExploreDataTable().
 * @global
 * @type {HTMLElement|null}
 */
export let currentActiveExploreItemButton = null;

/** 
 * Tracks currently active explore item DATA for use in processExploreDataTable.
 * @global 
 * @type {Object|null}
 */
export let currentActiveExploreItemData = null;

/** 
 * Tracks currently active explore item QUERY for use in createExploreFilterRadioButton.
 * @global 
 * @type {string|null}
 */
export let currentActiveExploreItemQuery = null;

/** 
 * Tracks currently active explore item SIZE for use in handleRecordsShownChange.
 * @global 
 * @type {number}
 */
export let currentActiveExploreItemSize = 10;

/** 
 * Tracks currently active explore item DATA DISPLAY STYLE for use in handleDataDisplayToggle.
 * @global 
 * @type {boolean}
 */
export let currentActiveDataDisplayToggle = true;

/**
 * Tracks currently selected row keys for use in enableExploreRowHighlighting.
 * @global
 * @type {Array<string>}
 */
let selectedRowKeys = [];


// =================================================
// DOM Manipulation functions
// =================================================

/**
 * Initializes the data explore section by fetching data from the org index 
 * and adding buttons, filters, and functionalities.
 * 
 * @async
 * @param {string} org - The organization identifier for the API query.
 */
export async function initDataExplore(org) {
  if (isDataExploreInit) {
    return; // Prevent re-initialisation
  }

  try {
    const response = await orgDataPromise; // Await the promise to resolve
    orgData = response.data;

    // Check if explore data exists and is not empty
    if (orgData.hits.hits.length > 0 && orgData.hits.hits[0]._source.explore && orgData.hits.hits[0]._source.explore.length > 0) {
      addExploreButtonsToDOM(orgData.hits.hits[0]._source.explore);
      addRecordsShownSelectToDOM();
      handleDataDisplayToggle();
      enableExploreRowHighlighting();
      copyToClipboard('explore_copy_clipboard', 'explore_table');
    } else {
      displayNone("explore"); // Hide the explore section if no data is available
    }
    isDataExploreInit = true; // Set the flag after successful initialisation

  } catch (error) {
    console.error('Error initialising data explore: ', error);
  }
}

/**
 * Adds buttons to the DOM for each item in the explore data. Controls the display 
 * of 'see more' and 'see fewer' buttons based on the number of items.
 * 
 * @async
 * @param {Array<Object>} exploreData - Array of explore data objects from the API response.
 */
async function addExploreButtonsToDOM(exploreData) {
  const exploreButtonsContainer = document.getElementById('explore_buttons');
  const moreButtons = []; // Array to store buttons with featured === false
  let moreButtonsVisible = false; // State to track visibility of more buttons
  let featuredButtonsCount = 6; // Count of featured buttons
  const seeMoreButton = document.getElementById('explore_see_more_button');

  // Only show 'articles' Explore list when logged out
  if (!loggedIn) {
    exploreData = exploreData.filter(item => item.id === 'articles');
  }

  for (const exploreDataItem of exploreData) {
    let button = createExploreButton(exploreDataItem);
    exploreButtonsContainer.insertBefore(button, seeMoreButton);

    if (!exploreDataItem.featured) {
      moreButtons.push(button);
    }
  }

  // Hide 'See More/Fewer' button if only the 'articles' button is present
  if (exploreData.length <= 1) {
    seeMoreButton.style.display = 'none';
  } else {
    // Determine initial visibility based on the total number of buttons
    const totalButtons = exploreData.length;
    moreButtonsVisible = totalButtons <= featuredButtonsCount;
    if (!moreButtonsVisible) {
      moreButtons.forEach(button => button.classList.add('hidden', 'opacity-0', 'transform', 'translate-y-1', 'transition', 'duration-300', 'ease-in-out'));
    }

    // "See more/See fewer" button logic
    seeMoreButton.querySelector('span').textContent = moreButtonsVisible ? 'See fewer' : 'See more';

    seeMoreButton.addEventListener('click', function() {
      moreButtonsVisible = !moreButtonsVisible; // Toggle visibility state

      moreButtons.forEach((button, index) => {
        // Use a timeout to stagger the animation of each button
        setTimeout(() => {
          button.classList.toggle('hidden', !moreButtonsVisible);
          if (moreButtonsVisible) {
            button.classList.remove('opacity-0', 'translate-y-1'); // Make visible and slide down
          }
        }, index * 70); // Adjust the time for each button
      });

      // Update the text of the button
      seeMoreButton.querySelector('span').textContent = moreButtonsVisible ? 'See fewer' : 'See more';
    });
  }

  // Ensure one Explore item is activated (URL breakdown if present, else fallback)
  await applyURLSelectionsOrDefault();
}

/**
 * Applies URL-driven breakdown or falls back to the first Explore button
 * so that at least one render always happens.
 * @returns {Promise<void>}
 */
async function applyURLSelectionsOrDefault() {
  try {
    await awaitDateRange(3000);
  } catch (_) {
    // Continue; we’ll still try to render something
  }
  const params = getAllURLParams();
  const breakdown = params.breakdown;
  const preferred = breakdown && document.getElementById(`explore_${breakdown}_button`);
  const fallback = document.querySelector('[id^="explore_"][id$="_button"]');
  (preferred || fallback)?.click();
}

/**
 * Creates and configures a button element for an explore item with a specified
 * ID, the group of data to be shown, and Tailwind CSS classes. Attaches an event listener.
 * 
 * @param {Object} exploreDataItem - The explore data object to create a button for.
 * @returns {HTMLButtonElement} - The created and configured button element.
 */
function createExploreButton(exploreDataItem) {
  const button = document.createElement("button");
  const id = exploreDataItem.id; 
  button.id = `explore_${id}_button`; 
  button.innerHTML = `<span>${EXPLORE_ITEMS_LABELS[id]?.plural || pluraliseNoun(id)}</span>`;
  button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";

  button.addEventListener("click", debounce(async function() {
    updateURLParams({ 'breakdown': exploreDataItem.id });
    processExploreDataTable(button, exploreDataItem);
  }, 500));

  return button;
}

/**
 * Sets up the click event listener for an explore button, displaying a loading
 * indicator, updating the button styles, and displaying data in a table.
 * 
 * @async
 * @param {HTMLButtonElement} button - The button element to attach the event listener to.
 * @param {Object} itemData - The data object associated with the explore item.
 */
export async function processExploreDataTable(button, itemData) {
  currentActiveExploreItemButton = button; // Set the currently active explore item button
  currentActiveExploreItemData = itemData; // Set the currently active explore item data

  toggleLoadingIndicator(true, 'explore_loading'); // Display loading indicator on button click
  updateButtonActiveStyles(button.id);
  addExploreFiltersToDOM(itemData.query);
  updateExploreFilterHeader(currentActiveExploreItemQuery);

  // Fetch and display data based on the current state of the data display style toggle
  await fetchAndDisplayExploreData(itemData, currentActiveExploreItemQuery, currentActiveExploreItemSize, currentActiveDataDisplayToggle);

  toggleLoadingIndicator(false, 'explore_loading'); // Once data is loaded, hide loading indicator
}

/**
 * Adds radio buttons for explore data filters to the DOM based on a given query string.
 * Adjusts visibility based on the number of filters available.
 *
 * @param {string} query - A comma-separated string of filters from the API response.
 */
async function addExploreFiltersToDOM(query) {
  const exploreFiltersElement = document.getElementById("explore_filters");
  exploreFiltersElement.innerHTML = ""; // Clear existing radio buttons
  const filters = parseCommaSeparatedQueries(query); // Parse the query string into an array of filters

  // Check if the currentActiveExploreItemQuery is in the new set of filters
  let currentFilterExists = filters.some(filter => filter.id === currentActiveExploreItemQuery);

  // If currentActiveExploreItemQuery does not exist in the new set, reset it to the first filter
  if (!currentFilterExists && filters.length > 0) {
    let id = filters[0].id;
    currentActiveExploreItemQuery = id;
  }
  
  // Create radio buttons for each filter and append them to the DOM
  filters.forEach((filter, index) => {
    const radioButton = createExploreFilterRadioButton(filter.id, filter.id === currentActiveExploreItemQuery);
    exploreFiltersElement.appendChild(radioButton);
  });
}

/**
 * Creates a radio button for an explore item's filter. Configures it with a specified
 * ID, label, and CSS classes. Attaches an event listener to the radio button that
 * calls handleFilterChange when a user interacts with the filter.
 * 
 * @param {string} id - The ID of the filter.
 * @param {boolean} isChecked - True if the filter should be checked by default.
 * @returns {HTMLDivElement} The div element containing the configured radio button and label.
 */
function createExploreFilterRadioButton(id, isChecked) {
  const labelData = EXPLORE_FILTERS_LABELS[id];
  const label = labelData ? labelData.label || id : id; // Use label from filters or default to ID

  // Create div to contain radio input and label
  const filterRadioButton = document.createElement('div');
  filterRadioButton.className = 'flex items-center mr-3 md:mr-6 mb-3';

  // Generate and set tooltip if info is present and non-empty
  if (labelData && labelData.info && labelData.info.trim()) {
    const tooltipContent = generateTooltipContent(labelData);

    // Initialise Tippy tooltip if there is tooltip content
    tippy(filterRadioButton, {
      content: tooltipContent,
      allowHTML: true,
      interactive: true,
      placement: 'bottom',
      appendTo: document.body,
      theme: 'tooltip-white',
      onShow(instance) {
        // Use setTimeout to ensure DOM is ready for updates
        setTimeout(() => {
          // Safely update text and href using optional chaining and nullish coalescing
          replaceText('org-name', orgName ?? '');
          replaceText('org-policy-coverage', orgPolicyCoverage ?? '');
          replaceText('org-policy-compliance', orgPolicyCompliance ?? '');

          // Safely set the href attribute
          const policyUrlElement = document.querySelector('.org-policy-url');
          if (policyUrlElement) {
              policyUrlElement.href = orgPolicyUrl ?? '#';  // Fallback to '#' if orgPolicyUrl is undefined
          }

          // Update the tooltip content if labelData exists
          instance.setContent(generateTooltipContent(labelData));
        }, 0);
      }
    });

    const tooltipID = `${id}_info`;
  }

  // Create and append radio input
  const radioInput = document.createElement('input');
  Object.assign(radioInput, {
    type: 'radio',
    id: `filter_${id}`,
    className: 'mr-1',
    name: 'filter_by',
    value: id,
    checked: isChecked,
    'aria-hidden': 'true'
  });
  filterRadioButton.appendChild(radioInput);

  // Create and append label
  const labelElement = document.createElement('label');
  Object.assign(labelElement, {
    htmlFor: `filter_${id}`,
    className: 'text-xs md:text-base cursor-pointer flex items-center whitespace-nowrap',
    innerHTML: '<span>' + label + '</span>'
  });
  filterRadioButton.appendChild(labelElement);

  // Event listener for filter change
  filterRadioButton.addEventListener('click', debounce(async function() {
    await handleFilterChange(id);
  }, 500));

  return filterRadioButton;
}

/**
 * Adds a select menu for changing the number of records shown in the active table.
 * Inserts the menu into a div with the id "explore_records_shown".
 */
function addRecordsShownSelectToDOM() {
  const exploreRecordsShownElement = document.getElementById("explore_records_shown");
  exploreRecordsShownElement.innerHTML = ""; // Clear existing menu if any

  // Create the label element
  const label = document.createElement("label");
  label.setAttribute("for", "records_shown_select");
  label.className = "sr-only"; // Hide the label visually
  label.textContent = "Records shown:"; 

  // Create the select element
  const selectMenu = document.createElement("select");
  selectMenu.id = "records_shown_select";
  selectMenu.className = "appearance-none py-1 px-2 border border-neutral-500 bg-neutral-800 text-white text-xs md:text-base";
  selectMenu.setAttribute("aria-labelledby", "records_shown_select_label");
  selectMenu.addEventListener("change", handleRecordsShownChange);

  // Define options for the select menu
  const options = [5, 10, 20, 50, 100, 500, 1000];
  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = `${optionValue}`;
    if (optionValue === 10) { // Set default value
      option.selected = true;
    }
    selectMenu.appendChild(option);
  });

  // Append the label and select menu to the exploreRecordsShownElement
  exploreRecordsShownElement.appendChild(label);
  exploreRecordsShownElement.appendChild(selectMenu);

  // Handle records shown parameter
  const params = getAllURLParams();
  const records = params.records;

  if (records) {
    const selectElement = document.getElementById("records_shown_select");
    const recordsShownOption = selectElement.querySelector(`option[value="${records}"]`);
    if (recordsShownOption) {
      selectElement.value = records;
      const event = new Event('change', { bubbles: true });
      selectElement.dispatchEvent(event);
    }
  }
}

/**
 * Fetches and displays Explore data for the selected item.
 * Handles login state (e.g. hides CSV export for logged-out users).
 *
 * @async
 * @param {Object} itemData - The Explore item’s configuration.
 * @param {string} [filter="is_paper"] - Active filter to apply.
 * @param {number} [size=10] - Number of records to display.
 * @param {boolean} [pretty=true] - Whether to prettify the table output.
 */
async function fetchAndDisplayExploreData(itemData, filter = "is_paper", size = 10, pretty = true) {
  try {
    if (!itemData) {
      showNoResultsRow(10, "export_table_body", "js_export_table");
      toggleLoadingIndicator(false, 'explore_loading');
      return;
    }

    const { type, id, term, sort, includes } = itemData;
    document.getElementById("csv_email_msg").innerHTML = ""; // Clear any existing message in CSV download form
    const exportTable = document.getElementById('export_table');
    exportTable.classList.remove('hidden');

    let query = orgData.hits.hits[0]._source.analysis[filter]?.query; // Get the query string for the selected filter
    let suffix = orgData.hits.hits[0]._source.key_suffix; // Get the suffix for the org
    let records = [];

    pretty = currentActiveDataDisplayToggle;
    size = currentActiveExploreItemSize;

    // Check if query is blank or undefined and abort if so
    if (!query || query.trim() === '') {
      showNoResultsRow(10, "export_table_body", "js_export_table");
      toggleLoadingIndicator(false, 'explore_loading');
      return;
    }

    // Terms-based data
    if (type === "terms") {
      query = decodeAndReplaceUrlEncodedChars(query);
      query = andQueryStrings(query, getDecodedUrlQuery()); // Combine with additional query strings from URL params
      records = await fetchTermBasedData(suffix, query, term, sort, size);
      records = reorderTermRecords(records, includes);
      records = prettifyRecords(records, pretty);

      replaceText("explore_sort", "publication count");
      replaceText("report_sort_adjective", "Top");
      removeCSVExportLink(); // no CSV export for term-based tables
    }

    // Article-based data
    else if (type === "articles") {
      query = decodeAndReplaceUrlEncodedChars(query); // Decode and replace URL-encoded characters for JSON parsing
      query = andQueryStrings(query, getDecodedUrlQuery()); // Combine with additional query strings from URL params
      records = await fetchArticleBasedData(query, includes, sort, size);
      records = reorderArticleRecords(records, includes);

      replaceText("explore_sort", "published date");
      replaceText("report_sort_adjective", "Latest");

      addCSVExportLink();
    }

    if (records.length > 0) {
      // Populate table with data
      populateTableHeader(records[0], 'export_table_head', type);
      populateTableBody(records, 'export_table_body', id, type);
      
      // Update any mentions of the explore data type with plural version of the ID
      replaceText("explore_type", EXPLORE_ITEMS_LABELS[id]?.plural || pluraliseNoun(id));
    
      // Add functionalities to the table
      enableExploreTableScroll();
      enableTooltipsForTruncatedCells();

      const downloadCSVForm = document.getElementById('download_csv_form');
      const exploreArticlesTableHelp = document.getElementById('explore_articles_records_shown_help');
      const exploreTermsTableHelp = document.getElementById('explore_terms_records_shown_help');

      if (type === "articles") {
        // Only show CSV form and help if logged in
        downloadCSVForm.style.display = loggedIn ? "block" : "none";
        exploreArticlesTableHelp.style.display = loggedIn ? "block" : "none";
        exploreTermsTableHelp.style.display = "none";
        displayNone("explore_display_style_field");
      } else {
        // Show display-style toggle and terms tooltip
        downloadCSVForm.style.display = "none";
        exploreTermsTableHelp.style.display = "block";
        exploreArticlesTableHelp.style.display = "none";
        removeDisplayStyle("explore_display_style_field");
      }
    } else {
      showNoResultsRow(10, "export_table_body", "js_export_table");
    }

  } catch (error) {
    console.error('Error fetching and displaying explore data:', error);
    showNoResultsRow(10, "export_table_body", "js_export_table");
  } finally {
    // Always hide loader once finished
    toggleLoadingIndicator(false, 'explore_loading');
  }
}

/**
 * Fetches term-based data using provided parameters.
 * 
 * @param {string} suffix - The suffix for the org, used in the POST request.
 * @param {string} query - The query string for fetching data. 
 * @param {string} term - The term (i.e. type of data breakdown) associated with the explore item.
 * @param {string} sort - The sorting order.
 * @param {number} size - The number of records to fetch.
 * @returns {Promise<Array>} A promise that resolves to an array of term-based records.
 */
async function fetchTermBasedData(suffix, query, term, sort, size) {
  const postData = getAggregatedDataQuery(suffix, query, term, startYear, endYear, size, sort);
  const response = await fetchPostData(postData);

  let buckets = [];

  if (response && response.aggregations && response.aggregations.values && response.aggregations.values.buckets) {
    buckets = response.aggregations.values.buckets.map(bucket => formatBucket(bucket));
  }

  // Process 'all_values' and 'no_values' similarly using the helper function
  ['all_values', 'no_values'].forEach(aggregationKey => {
    if (response && response.aggregations && response.aggregations[aggregationKey]) {
      const additionalBucket = {'key': aggregationKey, ...formatBucket(response.aggregations[aggregationKey])};
      buckets.push(additionalBucket);
    }
  });

  // Filter out buckets with doc_count of 0
  buckets = buckets.filter(bucket => bucket.doc_count > 0);

  // TODO: implement sorting in https://github.com/oaworks/discussion/issues/1917
  // Sort all buckets based on 'doc_count'
  if (sort.includes('_count')) {
    buckets.sort((a, b) => b.doc_count - a.doc_count); // Sort in descending order as default for now
  }

  return buckets;
}


/**
 * Formats a single bucket or aggregation result for a term-based table.
 * 
 * @param {Object} bucket - The raw bucket data from the API response.
 * @returns {Object} The formatted bucket data.
 */
function formatBucket(bucket) {
  const formattedBucket = {};
  Object.keys(bucket).forEach(key => {
      if (key.startsWith("median_")) {
          formattedBucket[key] = bucket[key].values["50.0"];
      } else if (bucket[key].doc_count !== undefined) {
          formattedBucket[key] = bucket[key].doc_count;
      } else if (bucket[key].value !== undefined) {
          formattedBucket[key] = bucket[key].value;
      } else {
          formattedBucket[key] = bucket[key];
      }
  });
  return formattedBucket;
}

/**
 * Fetches article-based data using provided parameters.
 * 
 * @param {string} query - The query string for fetching data.
 * @param {string} includes - The 'includes' key associated with the explore item.
 * @param {string} sort - The sorting order.
 * @param {number} size - The number of records to fetch.
 * @returns {Promise<Array>} A promise that resolves to an array of article-based records.
 */
async function fetchArticleBasedData(query, includes, sort, size) {
  const qParam = encodeURIComponent(`${dateRange}(${query})`); // Encode the query with date range
  const getDataUrl = `https://${ELEVENTY_API_ENDPOINT}.oa.works/report/works/?q=${qParam}&size=${size}&include=${includes}&sort=${sort}`;

  const response = await fetchGetData(getDataUrl); // No need to generate POST request
  // Check nested properties before assigning records
  if (response && response.hits && response.hits.hits) {
    return response.hits.hits.map(hit => hit._source);
  }
  return [];
}

// =================================================
// Table updating and styling functions
// =================================================

/**
 * Populates the header of a table with column headers derived from the keys of a data object.
 * The function clears any existing headers before appending the new ones. It assumes that the 
 * first object in the data array is representative of the structure for all objects in the array.
 * 
 * @param {Object[]} records - An array of data objects used to derive the header columns. Assumes all objects have the same structure.
 * @param {string} tableHeaderId - The ID of the table header element where the headers should be appended.
 */
function populateTableHeader(records, tableHeaderId, dataType = 'terms') {
  const tableHeader = document.getElementById(tableHeaderId);
  if (!tableHeader) return;

  // Clear existing header cells
  while (tableHeader.firstChild) {
    tableHeader.removeChild(tableHeader.firstChild);
  }

  records = Object.keys(records); // Only extract the keys from the records

  const headerRow = document.createElement('tr');
  records.forEach((key, index) => {
    key = key.replace(/_pct$/, ""); // Remove '_pct' suffix
    key = key.replace(/__.*/, ""); // Remove any suffixes after '__', e.g. org short name
    key = key.replace(/supplements./g, ""); // Remove 'supplements.' prefix
    // key = key.replace(/_/g, " "); // Replace underscores with spaces

    const cssClass = index === 0
      ? DATA_TABLE_HEADER_CLASSES[dataType].firstHeaderCol
      : index === 1
        ? DATA_TABLE_HEADER_CLASSES[dataType].secondHeaderCol
        : DATA_TABLE_HEADER_CLASSES[dataType].otherHeaderCols;

    const label = dataType === 'terms'
      ? EXPLORE_HEADER_TERMS_LABELS[key]?.label || key
      : EXPLORE_HEADER_ARTICLES_LABELS[key]?.label || key;

    const headerCell = createTableCell('', cssClass, null, null, true); 
    setupHeaderTooltip(headerCell, key, dataType);

    headerRow.appendChild(headerCell);
  });
  tableHeader.appendChild(headerRow);
}

/**
 * Generates the HTML content for a tooltip, including information and optional methodology details.
 *
 * @param {Object} labelData - The object containing the label, info, and optionally details for the tooltip.
 * @returns {string} The generated HTML content for the tooltip.
 */
function generateTooltipContent(labelData, additionalHelpText = null) {
  const hasDetails = !!labelData.details;
  let tooltipHTML = `
    <p class='${hasDetails ? "mb-2" : ""}'>${labelData.info}</p>
    ${additionalHelpText ? `<p class='mb-2'>${additionalHelpText}</p>` : ""}
    ${hasDetails ? `<details><summary class='hover:cursor-pointer'>Methodology</summary><p class='mt-2'>${labelData.details}</p></details>` : ""}
  `;
  return tooltipHTML;
}

/**
 * Attaches a tooltip to an HTML element if tooltip content is provided.
 * Uses the Tippy.js library for tooltip functionality, applying a11y attributes.
 * Ensures a label is always displayed, falling back to the key itself if no label is defined.
 *
 * @param {HTMLElement} element - The element to attach the tooltip to.
 * @param {string} key - The key associated with the tooltip, used for fallback labeling and to generate IDs for accessibility.
 * @param {string} dataType - Indicates the type of data ('terms' or 'articles'), which determines the labels configuration to use.
 */
function setupHeaderTooltip(element, key, dataType) {
  const labelsConfig = dataType === 'terms' ? EXPLORE_HEADER_TERMS_LABELS : EXPLORE_HEADER_ARTICLES_LABELS;
  const labelData = labelsConfig[key];
  const label = labelData && labelData.label ? labelData.label : key;
  element.innerHTML = `<span>${label}</span>`;

  // Generate and set tooltip if info is present and non-empty
  if (labelData && labelData.info && labelData.info.trim()) {
    // Get additional help text from orgData if available
    let additionalHelpText = orgData.hits.hits[0]?._source.policy?.help_text?.[key] ?? null;

    const tooltipContent = generateTooltipContent(labelData, additionalHelpText);
    const tooltipID = `${key}_info`;

    tippy(element, {
      content: tooltipContent,
      allowHTML: true,
      interactive: true,
      placement: 'bottom',
      appendTo: document.body,
      theme: 'tooltip-white',
      onShow(instance) {
        // Use setTimeout to ensure DOM is ready for updates
        setTimeout(() => {
          // Safely update text and href using optional chaining and nullish coalescing
          replaceText('org-name', orgName ?? '');
          replaceText('org-policy-coverage', orgPolicyCoverage ?? '');

          // Update the tooltip content if labelData exists
          instance.setContent(generateTooltipContent(labelData));
        }, 0);
      }
    });

    element.setAttribute('aria-controls', tooltipID);
    element.setAttribute('aria-labelledby', tooltipID);
  }
}

/**
 * Populates a table body with data from explore items.
 * 
 * @param {Array<Object>} data - Array of data objects to populate the table with.
 * @param {string} tableBodyId - The ID of the table body to populate.
 * @param {string} exploreItemId - The ID of the selected explore item.
 * @param {string} [dataType='terms'] - The type of data being populated (e.g., 'terms', 'articles').
 */
function populateTableBody(data, tableBodyId, exploreItemId, dataType = 'terms') {
  const tableBody = document.getElementById(tableBodyId);
  const tableFooter = document.getElementById('export_table_foot');
  if (!tableBody || data.length === 0) return;

  // Clear existing table rows
  tableBody.innerHTML = '';
  tableFooter.innerHTML = '';

  // Clear any highlighted rows if user has already interacted with the table
  clearRowHighlights();

  // Separate the 'all_values' record from other records
  const allValuesRecord = data.find(record => record.key === 'all_values');
  const otherRecords = data.filter(record => record.key !== 'all_values');

  // Limit the number of rows to the specified size
  otherRecords.length = Math.min(otherRecords.length, currentActiveExploreItemSize);

  // Add rows from other records to the tbody
  otherRecords.forEach(record => {
    const row = document.createElement('tr');
    let columnIndex = 0; // Keep track of column index for CSS class assignment

    for (const key in record) {
      let content = record[key];

      // Special processing for articles data type
      // DOI key
      if (dataType === 'articles' && key === 'DOI') {
        content = convertTextToLinks(content, true, 'https://doi.org/');
      }

      // Date
      if (dataType === 'articles' && key === 'published_date') {
        content = makeDateReadable(new Date(content));
      }

      // Remove duplicates if content is an array
      if (Array.isArray(content)) {
        content = removeArrayDuplicates(content);
      }

      let cssClass;
      if (columnIndex === 0) cssClass = DATA_TABLE_BODY_CLASSES[dataType].firstCol;
      else if (columnIndex === 1) cssClass = DATA_TABLE_BODY_CLASSES[dataType].secondCol;
      else cssClass = DATA_TABLE_BODY_CLASSES[dataType].otherCols;

      row.appendChild(createTableCell(content, cssClass, exploreItemId, key, false));
      columnIndex++;
    }
    tableBody.appendChild(row);
  });

  // Add the 'all_values' record to the tfoot if it exists
  if (allValuesRecord) {
    const footerRow = document.createElement('tr');
    let columnIndex = 0;

    for (const key in allValuesRecord) {
      let content = allValuesRecord[key];

      let cssClass;
      if (columnIndex === 0) cssClass = DATA_TABLE_FOOT_CLASSES[dataType].firstCol;
      else if (columnIndex === 1) cssClass = DATA_TABLE_FOOT_CLASSES[dataType].secondCol;
      else cssClass = DATA_TABLE_FOOT_CLASSES[dataType].otherCols;

      footerRow.appendChild(createTableCell(content, cssClass, exploreItemId, key, false));
      columnIndex++;
    }
    tableFooter.appendChild(footerRow);
  }

  // Highlight the selected rows if they exist in the new data
  if (selectedRowKeys.length > 0) {
    otherRecords.forEach((record, index) => {
      if (selectedRowKeys.includes(record.key)) {
        const row = tableBody.children[index]; // Get the corresponding row
        const secondCell = row.children[1]; // Get the second cell in the row
        const rowCells = row.querySelectorAll('td');
        rowCells.forEach(cell => cell.classList.add('bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900'));
        secondCell.classList.remove('bg-neutral-600');
      }
    });
  }
}

/**
 * Creates a table cell element (th or td) with specified content and CSS class.
 * 
 * @param {string|Object} content - The content to be placed inside the cell. If an object, its values are formatted as an unordered list.
 * @param {string} cssClass - The CSS class to apply to the cell.
 * @param {string} [exploreItemId=null] - The ID of the selected explore item.
 * @param {string} [key=null] - The key of the selected explore item.
 * @param {boolean} [isHeader=false] - Indicates if the cell is a header cell (th) or a regular cell (td).
 * @returns {HTMLElement} The created table cell element.
 */
function createTableCell(content, cssClass, exploreItemId = null, key = null, isHeader = false) {
  const cell = document.createElement(isHeader ? 'th' : 'td');
  cell.className = cssClass;

  // Early handling for common 'all_values' and 'no_values' cases in terms-based data
  // Display either 'All [explore item]]' or 'No [explore item]'
  if (content === 'all_values' || content === 'no_values') {
    cell.innerHTML = content === 'all_values' ? 'All ' : 'No ';
    cell.innerHTML += (EXPLORE_ITEMS_LABELS[exploreItemId]?.plural || pluraliseNoun(exploreItemId)).toLowerCase();
    return cell;
  }

  // Safely check and process content based on its type and the context
  if (key === 'key' && content) {
    let displayContent = "";
    switch (exploreItemId) {
      case 'country':
        // Fetch and display country name using country code
        displayContent = COUNTRY_CODES[content] || "Unknown country";
        break;
      case 'language':
        // Fetch and display language name using language code
        displayContent = LANGUAGE_CODES[content] || "Unknown language";
        break;
      case 'publisher_license':
      case 'repository_license':
        // Check if LICENSE_CODES entry exists and get name and URL
        const licenseInfo = LICENSE_CODES[content];
        const licenseName = licenseInfo?.name || "Unknown license";
        const licenseUrl = licenseInfo?.url;
        displayContent = `<strong class='uppercase'>${content}</strong><br>` +
          (licenseUrl ? `<a href="${licenseUrl}" class="underline underline-offset-2 decoration-1" rel="noopener noreferrer" target="_blank">${licenseName}</a>` : licenseName);
        break;
      case 'all_lab_head': // TODO: remove these cases once we settle on a naming convention
      case 'janelia_lab_head':
      case 'investigator':
      case 'freeman_hrabowski_scholar':
      case 'author':
        if (typeof content === 'string' && content.includes('orcid.org')) {
          const orcidId = content.split('/').pop();
          cell.innerHTML = `<a href="${content}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-1">Loading ORCiD data...</a>`;
          getORCiDFullName(orcidId)
            .then(fullName => {
              cell.innerHTML = `<a href="${content}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-1">${fullName || 'Name not found'}</a>`;
            })
            .catch(() => {
              cell.innerHTML = `<a href="${content}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-1">${content}</a>`;
            });
          return cell; // Early return to avoid overriding innerHTML after async operation
        }
        displayContent = content;
        break;
      default:
        displayContent = content;
    }
    cell.innerHTML = displayContent;
  } else if (exploreItemId === 'author' && typeof content === 'string' && content.includes('orcid.org')) {
    // Handle ORCiD links by fetching full name
    const orcidId = content.split('/').pop();
    getORCiDFullName(orcidId)
      .then(fullName => {
        cell.innerHTML = `<a href="${content}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-1">${fullName}</a>`;
      })
      .catch(() => {
        cell.innerHTML = `<a href="${content}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-1">${content} (Name not found)</a>`;
      });
  } else if (content == 'US$NaN'){
    cell.innerHTML = "N/A"; // Display NaN as the more user-friendly "N/A"
  } else if (typeof content === 'object' && content !== null) {
    // If content is an object, format its values as a list
    cell.innerHTML = `<ul>${formatObjectValuesAsList(content, true)}</ul>`;
  } else if (content === null || content === 'null') {
    // Replace null, undefined, and similar values with an empty string
    cell.innerHTML = "";
  } else if (typeof content === 'boolean') {
    // Handle boolean values
    cell.innerHTML = content.toString();
  } else {
    // Default case for handling plain content
    cell.innerHTML = content;
  }

  return cell;
}

/**
 * Displays the default 'articles' dataset on page load.
 * Waits for the top-level date range (and any `?q=`) before the first request.
 *
 * @async
 * @returns {Promise<void>}
 */
async function displayDefaultArticlesData() {
  try {
    await awaitDateRange(); 

    // Continue only if Explore config exists
    if (orgData?.hits?.hits?.length > 0 && orgData.hits.hits[0]?._source?.explore) {
      const exploreData  = orgData.hits.hits[0]._source.explore;
      const articlesData = exploreData[0]; // Default to the first explore item (usually 'articles' type, but not always)
      if (!articlesData) return;

      const button = document.getElementById(`explore_${articlesData.id}_button`);
      await processExploreDataTable(button, articlesData);
    }
  } catch (err) {
    console.warn('displayDefaultArticlesData: skipped initial render:', err?.message || err);
  }
}

// =================================================
// Interactive feature functions
// =================================================

/**
 * Enables row highlighting functionality for a table in the data exploration section.
 * Clicking on a cell in any row will highlight all cells in that row.
 */
function enableExploreRowHighlighting() {
  const tableBody = document.getElementById('export_table_body');

  tableBody.addEventListener('click', function(event) {
    if (event.target.tagName === 'TD') {
      const rowCells = event.target.parentElement.querySelectorAll('td');
      const firstCellContent = rowCells[0].textContent;
      const secondCell = rowCells[1];
      const isRowHighlighted = rowCells[0].classList.contains('bg-neutral-200');

      if (isRowHighlighted) {
        rowCells.forEach(cell => cell.classList.remove('bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900'));
        secondCell.classList.add('bg-neutral-600');
        selectedRowKeys = selectedRowKeys.filter(key => key !== firstCellContent); // Remove key from array for persistent active keys
      } else {
        rowCells.forEach(cell => cell.classList.add('bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900'));
        secondCell.classList.remove('bg-neutral-600');
        selectedRowKeys.push(firstCellContent); // Add key to array for persistent active keys 
      }
    }
  });
}

/**
 * Clears highlighted rows in the table.
 */
function clearRowHighlights() {
  document.querySelectorAll('.js_export_table_container td').forEach(cell => {
    cell.classList.remove('bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900');
  });
}

/**
 * Enables horizontal scrolling functionality for the table in the data exploration section.
 * A button click will scroll the table to the right.
 */
function enableExploreTableScroll() {
  const tableContainer = document.querySelector(".js_export_table_container");
  const scrollRightButton = document.getElementById("js_scroll_table_btn");

  scrollRightButton.addEventListener("click", () => {
    const scrollAmount = 200; 
    const currentScroll = tableContainer.scrollLeft;
    const maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;

    const targetScroll = currentScroll + scrollAmount;

    if (targetScroll >= maxScroll) {
      // If reaching the end, hide the scrollRightButton
      scrollRightButton.style.display = "none";
    } else {
      // Otherwise, scroll smoothly to the right
      tableContainer.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  });

  tableContainer.addEventListener("scroll", () => {
    const currentScroll = tableContainer.scrollLeft;
    const maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;

    if (currentScroll >= maxScroll) {
      scrollRightButton.style.display = "none";
    } else {
      scrollRightButton.style.display = "block";
    }
  });
}

/**
 * Initialises tooltips for table cells with truncated content using Tippy.js.
 * Each tooltip will display the full text content of the cell when hovered over.
 * The tooltip is only shown if the cell's content is actually truncated and the user hovers over it with intent.
 */
function enableTooltipsForTruncatedCells() {
  document.querySelectorAll('.truncate').forEach(cell => {
      tippy(cell, {
          content: cell.textContent,
          allowHTML: true,
          interactive: true,
          placement: 'bottom',
          appendTo: document.body,
          delay: [500, 0], // 500 ms delay before showing, 0 ms delay before hiding
          trigger: 'mouseenter focus', // Trigger on mouse enter and focus
          hideOnClick: false,
          theme: 'tooltip-white', // Custom theme defined in 'src/styles/input.css'
          onShow(instance) {
              let cellText = cell.textContent;
              // Check if the cell's content is truncated
              if (cell.offsetWidth < cell.scrollWidth) {
                  cellText = convertTextToLinks(cellText);
                  instance.setContent(cellText); // Set the formatted content
                  return true; // Show the tooltip
              }
              return false; // Prevent the tooltip from showing
          }
      });
  });
}

/**
 * Updates the styles of buttons to indicate the active (selected) button.
 *
 * @param {string} buttonId - The ID of the selected button.
 */
function updateButtonActiveStyles(buttonId) {
  // Reset styles for all buttons
  document.querySelectorAll("#explore_buttons button").forEach(button => {
    button.classList.remove("bg-carnation-500");
    button.classList.add("bg-carnation-100");
  });

  // Apply selected style to the clicked button
  const selectedButton = document.getElementById(buttonId);
  if (selectedButton) {
    selectedButton.classList.remove("bg-carnation-100");
    selectedButton.classList.add("bg-carnation-500");
  }
}

/**
 * Handles the event when the number of records to show is changed.
 * Fetches and updates the table data based on the new selection.
 *
 * @param {Event} event - The event object from the select menu change.
 */
async function handleRecordsShownChange(event) {
  const newSize = event.target.value;
  currentActiveExploreItemSize = newSize;

  // No active Explore item yet? Defer gracefully.
  if (!currentActiveExploreItemData) {
    return;
  }

  toggleLoadingIndicator(true, 'explore_loading');
  try {
    await fetchAndDisplayExploreData(
      currentActiveExploreItemData,
      currentActiveExploreItemQuery,
      currentActiveExploreItemSize
    );
    updateURLParams({ records: newSize });
  } catch (error) {
    console.error('Error updating records shown: ', error);
  }
  toggleLoadingIndicator(false, 'explore_loading');
}

/**
 * Handles the change in filters when a user clicks on a filter radio button. It displays a loading
 * indicator, fetches, and displays the explore data based on the selected filter.
 * Also updates the header text via the updateExploreFilterHeader helper.
 * 
 * @async
 * @param {string} filterId - The ID of the selected filter.
 */
async function handleFilterChange(filterId) {
  toggleLoadingIndicator(true, 'explore_loading'); // Display loading indicator on filter change
  await fetchAndDisplayExploreData(currentActiveExploreItemData, filterId);
  currentActiveExploreItemQuery = filterId;
  updateExploreFilterHeader(filterId);
  toggleLoadingIndicator(false, 'explore_loading'); // Hide loading indicator once data is loaded
}

/**
 * Handle the toggling of the data display style in the table.
 * 
 * This function sets up an event listener on the toggle button. When the button is clicked,
 * it switches between two states - 'Pretty' and 'Raw'.
 */
function handleDataDisplayToggle() {
  const toggleButton = document.getElementById('toggle-data-view');
  toggleButton.addEventListener('click', function() {
    const toggleBg = this.querySelector('span.pointer-events-none');
    const toggleDot = this.querySelector('span.translate-x-100, span.translate-x-5');

    // Check if the toggle is in the 'Pretty' (active) state
    if (this.getAttribute('aria-checked') === 'true') {
        // Switch to 'Raw' (inactive) state
        this.setAttribute('aria-checked', 'false');
        toggleBg.classList.replace('bg-carnation-500', 'bg-neutral-200');
        toggleDot.classList.replace('translate-x-100', 'translate-x-5');
        currentActiveDataDisplayToggle = false; // Update the global toggle state
    } else {
        // Switch back to 'Pretty' (active) state
        this.setAttribute('aria-checked', 'true');
        toggleBg.classList.replace('bg-neutral-200', 'bg-carnation-500');
        toggleDot.classList.replace('translate-x-5', 'translate-x-100');
        currentActiveDataDisplayToggle = true; // Update the global toggle state
    }
    // Fetch and display data with the updated pretty/raw format
    fetchAndDisplayExploreData(currentActiveExploreItemData, currentActiveExploreItemQuery, currentActiveExploreItemSize);
  });
}

/**
 * Adds a CSV export link styled as a button to the data table's container.
 */
async function addCSVExportLink() { // Declare the function as async
  const exportContainer = document.getElementById('explore_export_container');
  if (!exportContainer) return;

  // Create the CSV export link
  const csvExportLink = document.createElement('a');
  csvExportLink.id = 'explore_export_link';
  
  // Generate the href attribute value based on current data
  try {
    const csvLinkHref = await generateCSVLinkHref();
    csvExportLink.href = csvLinkHref;
  } catch (error) {
    console.error('Error generating CSV link: ', error);
  }

  csvExportLink.setAttribute('role', 'button');
  csvExportLink.setAttribute('aria-label', 'Download full data as CSV');
  csvExportLink.setAttribute('download', ''); // Optionally set a default filename
  csvExportLink.innerHTML = 'Download all article data (CSV)';

  // Append the link to the container
  exportContainer.appendChild(csvExportLink);
}

/**
 * Generates the href attribute value for the CSV export link.
 *
 * @returns {Promise<string>} A promise that resolves to the URL for downloading the CSV.
 */
async function generateCSVLinkHref() {
  const hasCustomExportIncludes = orgData.hits.hits[0]._source.explore.includes;
  const isPaperURL = dateRange + orgData.hits.hits[0]._source.analysis.is_paper.query;

  removeCSVExportLink(); // Remove CSV export link when this function is called

  let query = `q=${buildEncodedQueryWithUrlFilter(isPaperURL)}`

  let include;
  if (hasCustomExportIncludes) {
    include = `&include=${hasCustomExportIncludes}`;
  }

  const csvLink = CSV_EXPORT_BASE + query + include + exportSort + orgKey;

  try {
    const response = await axios.get(csvLink);
    return response.data; // The CSV download link
  } catch (error) {
    console.error('Error fetching CSV export link: ', error);
    return ''; // Return an empty string in case of an error
  }
}


/**
 * Removes the CSV export link from the DOM.
 */
function removeCSVExportLink() {
  const exportLinkContainer = document.getElementById('explore_export_container');
  const csvExportLink = document.getElementById('explore_export_link');
  if (csvExportLink) {
    exportLinkContainer.removeChild(csvExportLink);
  }
}

/**
 * Handles the creation and sending of an export link request.
 * This function fetches organizational data and constructs the appropriate export link.
 *
 * @returns {boolean} - Always returns false to prevent default form submission.
 */
window.getExportLink = function() {
  orgDataPromise.then(function (response) {
    const orgData = response.data;
    const currentId = currentActiveExploreItemData.id;

    // Get the custom includes for the specific item based on the current active explore item ID
    let activeItem = orgData.hits.hits[0]._source.explore.find(item => item.id === currentId);
    let hasCustomExportIncludes = activeItem ? activeItem.includes : "";

    let queryURL = dateRange + orgData.hits.hits[0]._source.analysis[currentActiveExploreItemQuery].query;
    let query = `q=${buildEncodedQueryWithUrlFilter(queryURL)}`;
    let form = new FormData(document.getElementById("download_csv_form"));

    var email = `&${new URLSearchParams(form).toString()}`;

    var include;
    if (hasCustomExportIncludes !== undefined && hasCustomExportIncludes !== "") {
      include = `&include=${hasCustomExportIncludes}`;
    }
    query = CSV_EXPORT_BASE + query + include + exportSort + email + orgKey;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", query);
    xhr.onload = function () {
      document.getElementById("csv_email_msg").innerHTML = `OA.Report has started building your CSV export at <a href='${this.response}' target='_blank' class='underline underline-offset-2 decoration-1'>this URL</a>. Please check your email to get the full data once it’s ready.`;

      // Reset the form after the request is sent
      document.getElementById("download_csv_form").reset();
    };
    xhr.send();

  }).catch(function (error) {
    console.error(`Error fetching orgData: ${error}`);
  });

  return false; // Prevent default form submission
}
