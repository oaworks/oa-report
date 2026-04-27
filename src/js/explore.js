// =================================================
// explore.js
// State & DOM manipulation specific to Data Explore
// =================================================

// =================================================
// Imports
// =================================================

import { displayNone, makeDateReadable, fetchGetData, fetchPostData, debounce, reorderTermRecords, reorderArticleRecords, prettifyRecords, formatObjectValuesAsList, pluraliseNoun, startYear, endYear, dateRange, replaceText, decodeAndReplaceUrlEncodedChars, getORCiDFullName, convertTextToLinks, removeDisplayStyle, showNoResultsRow, parseCommaSeparatedQueries, copyToClipboard, getAllURLParams, updateURLParams, removeURLParams, removeArrayDuplicates, updateExploreFilterHeader,getDecodedUrlQuery, andQueryStrings, buildEncodedQueryWithUrlFilter, normaliseFieldId, makeNumberReadable, announce } from "./utils.js";
import { ELEVENTY_API_ENDPOINT, CSV_EXPORT_BASE, EXPLORE_ITEMS_LABELS, EXPLORE_FILTERS_LABELS, EXPLORE_HEADER_TERMS_LABELS, EXPLORE_HEADER_ARTICLES_LABELS, DATA_TABLE_HEADER_CLASSES, DATA_TABLE_BODY_CLASSES, DATA_TABLE_FOOT_CLASSES, COUNTRY_CODES, LANGUAGE_CODES, LICENSE_CODES, DATE_SELECTION_BUTTON_CLASSES, FILTER_PILL_CLASSES, SEGMENTED_PILL_CLASSES } from "./constants.js";
import { iconForFilterId } from "./constants/filter-fields.js";
import { toggleLoadingIndicator } from "./components.js";
import { awaitDateRange } from './report-date-manager.js';
import { renderActiveFiltersBanner } from './report-filter-manager.js';
import { orgDataPromise, initInsightsAndActions } from './insights-and-actions.js';
import { AUTHOR_BREAKDOWN_TERM, getAggregatedDataQuery, getAuthorBreakdownKey } from './aggregated-data-query.js';
import { initAuth, onAuthChange, applyAuthVisibility } from './auth.js';
import { createTooltip } from './tooltip-manager.js';

// =================================================
// Global variables
// =================================================

const exportSort = "&sort=published_date:desc";

let orgKey = "";
let loggedIn = false;

// Holds organisation data; declared early so auth listeners can check it safely
let orgData;

const authState = initAuth(typeof org !== "undefined" ? org : undefined);
loggedIn = authState.loggedIn;
orgKey = authState.orgKey ? `&orgkey=${authState.orgKey}` : "";
applyAuthVisibility({ hideWhenLoggedOut: ["report-filters"] });

onAuthChange(({ loggedIn: isLoggedIn, orgKey: key }) => {
  loggedIn = isLoggedIn;
  orgKey = key ? `&orgkey=${key}` : "";
  applyAuthVisibility({ hideWhenLoggedOut: ["report-filters"] });
  refreshFiltersBanner();
});

/**
 * Allows the EXPLORE_HEADER_TERMS_LABELS constant to be accessible via a browser.
 * @global
 * @type {Object}
 */
window.EXPLORE_HEADER_TERMS_LABELS = EXPLORE_HEADER_TERMS_LABELS;

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
 * Map of explore button id -> its data object, used to render without synthesising a click.
 * @type {Map<string, Object>}
 */
let exploreItemDataById = new Map();

const FILTER_TARGET_BUTTON_CLASS = 'js-filter-target cursor-pointer hover:underline text-left focus:outline-none focus-visible:underline focus-visible:ring-2 focus-visible:ring-carnation-400 rounded-sm';
const EXTERNAL_LINK_PILL_CLASS = 'ml-2 bg-neutral-200 text-neutral-900 text-xs px-2 py-0.5 rounded-full whitespace-nowrap hover:bg-carnation-200 js-external-pill';

/**
 * Tracks currently selected row keys for use in enableExploreRowHighlighting.
 * @global
 * @type {Array<string>}
 */
let selectedRowKeys = [];

/**
 * Re-runs Insights / Actions and the current Explore table
 * after the top-level filters (?q=) change, then re-renders
 * the Filters banner.
 */
let _handleFiltersChangedTimer = null;
export async function handleFiltersChanged() {
  if (_handleFiltersChangedTimer) {
    clearTimeout(_handleFiltersChangedTimer);
  }
  _handleFiltersChangedTimer = setTimeout(_runHandleFiltersChanged, 150);
}

async function _runHandleFiltersChanged() {
  _handleFiltersChangedTimer = null;
  // 1. Refresh Insights & Actions
  const slug = orgData?.hits?.hits?.[0]?._source?.objectID;
  if (slug) {
    initInsightsAndActions(slug);
  }

  // 2. Refresh Explore table (current item if set, otherwise default)
  if (currentActiveExploreItemButton && currentActiveExploreItemData) {
    await processExploreDataTable(
      currentActiveExploreItemButton,
      currentActiveExploreItemData
    );
  } else {
    await displayDefaultArticlesData();
  }

  // 3. Re-render the Filters chip / popover
  refreshFiltersBanner();
}

/**
 * Helper to render the active filters banner via the shared
 * filter manager module.
 */
function refreshFiltersBanner() {
  if (!orgData) return;

  // When logged out, hide the filters UI entirely
  if (!loggedIn) {
    displayNone("report-filters");
    const mount = document.getElementById("js-active-filters");
    if (mount) mount.innerHTML = "";
    return;
  }

  removeDisplayStyle("report-filters");

  renderActiveFiltersBanner({
    orgData,
    onFiltersApplied: handleFiltersChanged,
    onFiltersCleared: handleFiltersChanged
  });
}

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
      refreshFiltersBanner(); // respects logged-in state
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
  const seeMoreListItem = document.getElementById('explore_see_more_item');
  const seeMoreButton = seeMoreListItem?.querySelector('button');

  // Logged-out users only see the public article AND preprint breakdowns.
  if (!loggedIn) {
    exploreData = exploreData.filter(item => item.id === 'articles' || item.id === 'preprint');
  }

  for (const exploreDataItem of exploreData) {
    const listItem = document.createElement("li");
    listItem.className = "list-none";
    const button = createExploreButton(exploreDataItem);
    listItem.appendChild(button);
    if (seeMoreListItem) {
      exploreButtonsContainer.insertBefore(listItem, seeMoreListItem);
    } else {
      exploreButtonsContainer.appendChild(listItem);
    }

    if (!exploreDataItem.featured) {
      moreButtons.push(listItem);
    }
  }

  // Hide 'See More/Fewer' when there is nothing extra to reveal.
  if (!loggedIn || exploreData.length <= 1) {
    if (seeMoreListItem) {
      seeMoreListItem.style.display = 'none';
    } else {
      seeMoreButton.style.display = 'none';
    }
  } else {
    if (seeMoreListItem) {
      seeMoreListItem.style.display = '';
    }
    // Determine initial visibility based on the total number of buttons
    const totalButtons = exploreData.length;
    moreButtonsVisible = totalButtons <= featuredButtonsCount;
    if (!moreButtonsVisible) {
      moreButtons.forEach(item => item.classList.add('hidden', 'opacity-0', 'transform', 'translate-y-1', 'transition', 'duration-300', 'ease-in-out'));
    }

    // "See more/See fewer" button logic
    seeMoreButton.querySelector('span').textContent = moreButtonsVisible ? 'See fewer' : 'See more';
    seeMoreButton.setAttribute('aria-expanded', moreButtonsVisible ? 'true' : 'false');

    seeMoreButton.addEventListener('click', function(event) {
      const focusTarget = (!moreButtonsVisible && event.detail === 0)
        ? moreButtons.find((item) => item.classList.contains('hidden'))?.querySelector('button')
        : null;
      moreButtonsVisible = !moreButtonsVisible; // Toggle visibility state

      moreButtons.forEach((item, index) => {
        // Use a timeout to stagger the animation of each button
        setTimeout(() => {
          item.classList.toggle('hidden', !moreButtonsVisible);
          if (moreButtonsVisible) item.classList.remove('opacity-0', 'translate-y-1');
        }, index * 70); // Adjust the time for each button
      });

      // Update the text of the button
      seeMoreButton.querySelector('span').textContent = moreButtonsVisible ? 'See fewer' : 'See more';
      seeMoreButton.setAttribute('aria-expanded', moreButtonsVisible ? 'true' : 'false');
      if (focusTarget) setTimeout(() => focusTarget.focus(), 80);
    });
  }


  // Ensure one Explore item is activated (URL breakdown if present, else fallback)
  await applyURLSelectionsOrDefault();
}

/**
 * Applies URL-driven breakdown or renders the first Explore item without
 * mutating the URL when no breakdown parameter is present.
 * 
 * Render the default in-place without synthesising a button click. 
 * Only explicit user clicks should update the URL.
 */
async function applyURLSelectionsOrDefault() {
  try {
    await awaitDateRange(3000);
  } catch (_) {
    // Continue; still render something
  }

  const params = getAllURLParams();
  const breakdown = params.breakdown;
  const breakdownFilter = params.explore_filter;

  if (breakdownFilter) {
    currentActiveExploreItemQuery = breakdownFilter;
  }

  if (breakdown) {
    // Honour the user/bookmarked URL
    const preferredBtn = document.getElementById(`explore_${breakdown}_button`);
    preferredBtn?.click();
    return;
  }

  // No breakdown in URL: render the first button's dataset WITHOUT changing the URL
  const fallbackBtn = document.querySelector('[id^="explore_"][id$="_button"]');
  if (fallbackBtn) {
    const data = exploreItemDataById.get(fallbackBtn.id);
    if (data) {
      // Do NOT call updateURLParams here; render directly
      await processExploreDataTable(fallbackBtn, data);
    } else {
      // If for any reason the registry isn't populated yet, fall back gracefully
      fallbackBtn.click(); // last-resort behaviour
    }
  }
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
  const label = EXPLORE_ITEMS_LABELS[id]?.plural || pluraliseNoun(id);
  const iconName = iconForFilterId(id);
  const iconMarkup = iconName ? `<i class="ph ph-${iconName} mr-1 text-[14px] leading-none" aria-hidden="true"></i>` : "";
  button.innerHTML = `${iconMarkup}<span>${label}</span>`;
  button.className = `js_explore_btn ${SEGMENTED_PILL_CLASSES.base} ${SEGMENTED_PILL_CLASSES.inactive}`;
  button.setAttribute("aria-pressed", "false");

  button.addEventListener("click", debounce(async function() {
    // Keep an existing filter if the new breakdown supports it; otherwise fall back to that breakdown’s default.
    const availableFilters = parseCommaSeparatedQueries(exploreDataItem.query).map(({ id }) => id);
    const activeFilter = getAllURLParams().explore_filter || currentActiveExploreItemQuery;
    currentActiveExploreItemQuery = availableFilters.includes(activeFilter) ? activeFilter : (availableFilters[0] || null);
    if (activeFilter && activeFilter !== currentActiveExploreItemQuery) removeURLParams('explore_filter');

    updateURLParams({ 'breakdown': exploreDataItem.id });
    processExploreDataTable(button, exploreDataItem);
  }, 500));

  // Register each button’s data when created
  exploreItemDataById.set(button.id, exploreDataItem); 

  return button;
}

const updateExploreHeadingIcon = (id) => {
  const icon = document.querySelector(".js-explore-heading-icon");
  if (!icon) return;
  const iconName = iconForFilterId(id);
  icon.className = `ph ph-${iconName || "note"} text-[18px] leading-none js-explore-heading-icon`;
};

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
  updateExploreHeadingIcon(itemData.id);
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
  const exploreFilterField = document.getElementById("explore_filter_field");
  exploreFiltersElement.innerHTML = ""; // Clear existing radio buttons
  const filters = parseCommaSeparatedQueries(query); // Parse the query string into an array of filters
  const visibleFilters = loggedIn ? filters : filters.slice(0, 1); // Logged-out users only see the default filter.

  // Only display list of filters when logged in and there is more than one
  if (exploreFilterField) {
    exploreFilterField.style.display = loggedIn && visibleFilters.length > 0 ? "" : "none";
  }

  // Check if the currentActiveExploreItemQuery is in the new set of filters
  let currentFilterExists = visibleFilters.some(filter => filter.id === currentActiveExploreItemQuery);

  // If currentActiveExploreItemQuery does not exist in the new set, reset it to the first filter
  if (!currentFilterExists && visibleFilters.length > 0) {
    currentActiveExploreItemQuery = visibleFilters[0].id;
  }
  
 // Create radio buttons for each filter and append them to the DOM
  visibleFilters.forEach((filter) => {
    const radioButton = createExploreFilterRadioButton(filter.id, filter.id === currentActiveExploreItemQuery);
    exploreFiltersElement.appendChild(radioButton);
  });

  bindFilterPillClickHandler();
  updateFilterPillStates(currentActiveExploreItemQuery);
}

/**
 * Creates a filter button for an explore item's table switcher. Configures it with a
 * specified ID, label, and CSS classes. Styles it like a pill.
 * 
 * @param {string} id - The ID of the filter.
 * @param {boolean} isChecked - True if the filter should be active by default.
 * @returns {HTMLDivElement} The div element containing the configured filter button.
 */
function createExploreFilterRadioButton(id, isChecked) {
  const labelData = EXPLORE_FILTERS_LABELS[id];
  const label = labelData ? labelData.label || id : id; // Use label from filters or default to ID

  // Create div to contain the filter button
  const filterRadioButton = document.createElement('div');
  filterRadioButton.className = 'mr-2 md:mr-4 mb-2';
  filterRadioButton.setAttribute('data-filter-id', id);

  const buttonElement = document.createElement('button');
  Object.assign(buttonElement, {
    id: `filter_${id}`,
    type: 'button',
    value: id,
    className: FILTER_PILL_CLASSES.base,
    innerHTML: '<span>' + label + '</span>'
  });
  buttonElement.setAttribute('aria-pressed', isChecked ? 'true' : 'false');
  buttonElement.setAttribute('aria-label', label);
  filterRadioButton.appendChild(buttonElement);

  if (labelData && labelData.info && labelData.info.trim()) {
    createTooltip(buttonElement, generateTooltipContent(labelData), {
      aria: {
        content: null,
        expanded: false
      },
      placement: 'bottom',
      theme: 'tooltip-white'
    });
  }

  setFilterPillState(buttonElement, isChecked);

  return filterRadioButton;
}

/**
 * Sets state-driven classes/attributes for a filter pill button.
 * Tailwind classes are applied from a single base string to keep this lean.
 * @param {HTMLButtonElement} buttonElement
 * @param {boolean} isActive
 */
function setFilterPillState(buttonElement, isActive) {
  buttonElement.className = `${FILTER_PILL_CLASSES.base} ${isActive ? FILTER_PILL_CLASSES.active : FILTER_PILL_CLASSES.inactive}`;
  buttonElement.setAttribute('aria-pressed', isActive ? 'true' : 'false');
}

/**
 * Updates pill styles across all filter options.
 * @param {string} activeId
 */
function updateFilterPillStates(activeId) {
  document.querySelectorAll('#explore_filters [data-filter-id]').forEach((wrapper) => {
    const button = wrapper.querySelector('button');
    if (!(button instanceof HTMLButtonElement)) return;
    setFilterPillState(button, wrapper.getAttribute('data-filter-id') === activeId);
  });
}

/**
 * Binds a single delegated click handler for filter pills to avoid per-pill listeners.
 */
function bindFilterPillClickHandler() {
  const container = document.getElementById('explore_filters');
  if (!container || container.dataset.bound === 'true') return;

  // Debounced version of handleFilterChange (500ms)
  const debouncedHandleFilterChange = debounce(async (filterId) => {
    await handleFilterChange(filterId);
  }, 500);

  container.addEventListener('click', (event) => {
    const wrapper = event.target.closest('[data-filter-id]');
    if (!wrapper) return;
    const filterId = wrapper.getAttribute('data-filter-id');
    if (filterId === currentActiveExploreItemQuery) return;
    debouncedHandleFilterChange(filterId);
  });

  container.dataset.bound = 'true';
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
  label.id = "records_shown_select_label";
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
      return;
    }

    const { type, id, term, sort } = itemData;
    document.getElementById("csv_email_msg").innerHTML = ""; // Clear any existing message in CSV download form
    const exportTable = document.getElementById('export_table');
    exportTable.classList.remove('hidden');

    let query = orgData.hits.hits[0]._source.analysis[filter]?.query; // Get the query string for the selected filter

    pretty = currentActiveDataDisplayToggle;
    size = currentActiveExploreItemSize;

    // Check if query is blank or undefined and abort if so
    if (!query || query.trim() === '') {
      showNoResultsRow(10, "export_table_body", "js_export_table");
      return;
    }

    const { records, total: totalRecords } = await loadExploreRecords(itemData, query, size, pretty);

    replaceText("explore_sort", getExploreSortLabel({ type, id, term, sort }), { allowHTML: true });
    replaceText("report_sort_adjective", getExploreSortAdjective({ type, sort }));
    setExploreModeUI(type);

    const shownCount = type === "terms"
      ? records.filter(record => record.key !== "all_values" && record.key !== "no_values").length
      : records.length;
    const totalCount = type === "terms" && (!Number.isFinite(totalRecords) || totalRecords === 0)
      ? shownCount
      : totalRecords;

    updateExploreCountSummary({ type, id, total: totalCount, shown: shownCount });

    if (records.length > 0) {
      // Populate table with data
      populateTableHeader(records[0], 'export_table_head', type);
      populateTableBody(records, 'export_table_body', id, type);
      
      // Update any mentions of the explore data type with plural version of the ID
      replaceText("explore_type", EXPLORE_ITEMS_LABELS[id]?.plural || pluraliseNoun(id), { allowHTML: true });
    
      // Add functionalities to the table
      enableExploreTableScroll();
      enableTooltipsForTruncatedCells();
    } else {
      setExploreModeUI(type);
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

async function loadExploreRecords(itemData, query, size, pretty) {
  const { type, sort, includes } = itemData;
  const term = itemData?.id === "author" ? AUTHOR_BREAKDOWN_TERM : itemData?.term;
  const decodedQuery = andQueryStrings(
    decodeAndReplaceUrlEncodedChars(query),
    getDecodedUrlQuery()
  );

  if (type === "terms") {
    const suffix = orgData.hits.hits[0]._source.key_suffix;
    const { records: termRecords, total } = await fetchTermBasedData(suffix, decodedQuery, term, sort, size);

    return {
      records: prettifyRecords(reorderTermRecords(termRecords, includes), pretty),
      total
    };
  }

  if (type === "articles") {
    const { records: articleRecords, total } = await fetchArticleBasedData(decodedQuery, includes, sort, size);

    return {
      records: reorderArticleRecords(articleRecords, includes),
      total
    };
  }

  return { records: [], total: 0 };
}

/**
 * Fetches term-based data using provided parameters.
 * 
 * @param {string} suffix - The suffix for the org, used in the POST request.
 * @param {string} query - The query string for fetching data. 
 * @param {string} term - The term (i.e. type of data breakdown) associated with the explore item.
 * @param {string} sort - The sorting order.
 * @param {number} size - The number of records to fetch.
 * @returns {Promise<Object>} A promise that resolves to term-based records and total count.
 */
async function fetchTermBasedData(suffix, query, term, sort, size) {
  const postData = getAggregatedDataQuery(suffix, query, term, startYear, endYear, size, sort);
  const response = await fetchPostData(postData);

  let buckets = [];
  const totalUniqueTerms = response?.aggregations?.values_total?.value ?? 0;

  if (response && response.aggregations && response.aggregations.values && response.aggregations.values.buckets) {
    buckets = response.aggregations.values.buckets.map(bucket => formatBucket(bucket, term));
  }

  // Process 'all_values' and 'no_values' similarly using the helper function
  ['all_values', 'no_values'].forEach(aggregationKey => {
    if (response && response.aggregations && response.aggregations[aggregationKey]) {
      const additionalBucket = {'key': aggregationKey, ...formatBucket(response.aggregations[aggregationKey], term)};
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

  return { records: buckets, total: totalUniqueTerms };
}


/**
 * Formats a single bucket or aggregation result for a term-based table.
 * 
 * @param {Object} bucket - The raw bucket data from the API response.
 * @param {string} [term=""] - The field used for the current term breakdown.
 * @returns {Object} The formatted bucket data.
 */
function formatBucket(bucket, term = "") {
  const formattedBucket = {};
  Object.keys(bucket).forEach(key => {
    if (key.startsWith("median_")) {
      formattedBucket[key] = bucket[key].values["50.0"];
    } else if (key === "top_author_record") {
      const hit = bucket[key]?.hits?.hits?.[0]?._source;
      const authorships = Array.isArray(hit?.authorships) ? hit.authorships : [];
      const matchingAuthorship = authorships.find((authorship) => {
        return term === AUTHOR_BREAKDOWN_TERM
          && getAuthorBreakdownKey(authorship?.author) === bucket.key;
      });

      formattedBucket.display_name = matchingAuthorship?.author?.display_name || null;
      formattedBucket.orcid = matchingAuthorship?.author?.orcid || null;
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
  const hits = response?.hits?.hits ?? [];
  const totalRaw = response?.hits?.total;

  return {
    records: hits.map(hit => hit._source),
    total: typeof totalRaw === "number" ? totalRaw : totalRaw?.value ?? 0
  };
}

// =================================================
// Table updating and styling functions
// =================================================

/**
 * Updates the table header summary with how many records are shown vs available.
 * @param {Object} params
 * @param {string} params.type - The explore item type.
 * @param {string} params.id - The explore item id (used for label).
 * @param {number} params.total - Total records returned by the API.
 * @param {number} params.shown - Number of records currently displayed.
 */
function updateExploreCountSummary({ type, id, total, shown }) {
  const summaryEl = document.getElementById("explore_count_summary");
  if (!summaryEl) return;

  const formatCount = (n) => makeNumberReadable(Number.isFinite(n) ? n : 0);
  const label = EXPLORE_ITEMS_LABELS[id]?.plural || pluraliseNoun(id);
  const sortLabel = document.querySelector(".explore_sort")?.textContent?.trim() || "published date";

  summaryEl.innerHTML = `Showing <span class="font-semibold">${formatCount(shown)} of ${formatCount(total)}</span> <span class="lowercase">${label}</span> · Sorted by ${sortLabel}`;
}

/**
 * Determines the label to use for the "Sorted by" UI based on explore metadata.
 *
 * @param {Object} params
 * @param {string} params.type - The explore item type.
 * @param {string} params.id - The explore item id.
 * @param {string} params.term - The term field used for terms-based breakdowns.
 * @param {string} params.sort - The sort key used by the API.
 * @returns {string} Human-friendly sort label.
 */
function getExploreSortLabel({ type, id, term, sort }) {
  const lowerCaseLabels = new Set(["Published date", "Published year", "Year"]);
  if (type === "articles") {
    if (!sort) return "Published date";
    const sortField = sort.split(":")[0];
    const label = EXPLORE_HEADER_ARTICLES_LABELS?.[sortField]?.label || "Published date";
    return lowerCaseLabels.has(label) ? label.toLowerCase() : label;
  }

  if (!sort) return "publication count";

  if (sort.includes("_count")) return "publication count";

  if (sort.includes("_key") || sort === "key") {
    const label = EXPLORE_ITEMS_LABELS[id]?.singular || EXPLORE_ITEMS_LABELS[id]?.plural || "Label";
    return lowerCaseLabels.has(label) ? label.toLowerCase() : label;
  }

  const label = EXPLORE_HEADER_TERMS_LABELS?.[sort]?.label
    || (term ? EXPLORE_HEADER_TERMS_LABELS?.[term]?.label : null)
    || "Publication count";
  if (label === "Publication count") return "publication count";
  return lowerCaseLabels.has(label) ? label.toLowerCase() : label;
}

/**
 * Determines the adjective used in the Explore heading (e.g. "Top", "Latest", "By").
 *
 * @param {Object} params
 * @param {string} params.type - The explore item type.
 * @param {string} params.sort - The sort key used by the API.
 * @returns {string} Heading adjective.
 */
function getExploreSortAdjective({ type, sort }) {
  if (type === "articles") {
    if (!sort) return "Latest";
    const [field, direction] = sort.split(":");
    if (field === "published_date") return direction === "asc" ? "Earliest" : "Latest";
    return "Top";
  }

  if (!sort) return "Top";
  if (sort.includes("_key") || sort === "key") return "By";
  return "Top";
}

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

  const headerRow = document.createElement('tr');
  Object.keys(records)
    // Hide author bucket metadata from the rendered table.
    .filter((rawKey) => !(dataType === 'terms' && currentActiveExploreItemData?.id === 'author' && (rawKey === 'display_name' || rawKey === 'orcid')))
    .forEach((rawKey, index) => {
      const key = normaliseFieldId(rawKey);
      const cssClass = getExploreColumnClass('header', dataType, index);

      const headerCell = createTableCell('', cssClass, null, null, true); 
      if (index > 1) {
        headerCell.classList.add(
          shouldRightAlignExploreColumn(rawKey, records[rawKey]) ? "text-right" : "text-left"
        );
      }
      setupHeaderTooltip(headerCell, key, dataType);

      headerRow.appendChild(headerCell);
    });
  tableHeader.appendChild(headerRow);
}

/**
 * Determines whether an Explore column should be right-aligned.
 *
 * @param {string} key
 * @param {*} sampleValue
 * @returns {boolean}
 */
function shouldRightAlignExploreColumn(key, sampleValue) {
  const normalizedKey = normaliseFieldId(key).toLowerCase();
  const numericFieldPattern = /(^|_)(count|counts|pct|percent|percentage|total|amount|cost|apc|usd|value|avg|mean|median|min|max|sum|price|year)(_|$)/;

  if (numericFieldPattern.test(normalizedKey)) return true;
  return isNumericLikeValue(sampleValue);
}

/**
 * Returns true when a value is likely numeric in table output.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isNumericLikeValue(value) {
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed || /^n\/a$/i.test(trimmed)) return false;
  return /^-?\$?\d[\d,]*(\.\d+)?%?$/.test(trimmed);
}

/**
 * Generates the HTML content for a tooltip, including information and optional methodology details.
 *
 * @param {Object} labelData - The object containing the label, info, and optionally details for the tooltip.
 * @returns {string} The generated HTML content for the tooltip.
 */
function generateTooltipContent(labelData, additionalHelpText = null) {
  // Org-specific fields to inject with text content
  // Only run regex if fields are present in the HTML
  const injectOrgFields = (html = '') => /org-(name|policy-(coverage|compliance|url))/.test(html) ? html
    .replace(/<span class=['"]org-name['"]><\/span>/g, orgName ?? '')
    .replace(/<span class=['"]org-policy-coverage['"]><\/span>/g, orgPolicyCoverage ?? '')
    .replace(/<span class=['"]org-policy-compliance['"]><\/span>/g, orgPolicyCompliance ?? '')
    .replace(/class=['"]org-policy-url['"][^>]*href=['"][^'"]*['"]/g, match => match.replace(/href=['"][^'"]*['"]/, `href='${orgPolicyUrl ?? '#'}'`))
  : html;

  // Reuse a single off-DOM element to avoid repeated creation
  const textBuffer = generateTooltipContent.textBuffer || (generateTooltipContent.textBuffer = document.createElement('div'));

  // Get plain text version of HTML content
  const plainText = (html = '') => {
    textBuffer.innerHTML = html;
    return textBuffer.textContent.replace(/\s+/g, ' ').trim();
  };
  const infoHtml = injectOrgFields(labelData.info);
  const helpHtml = additionalHelpText ? injectOrgFields(additionalHelpText) : '';
  const detailsHtml = injectOrgFields(labelData.details);
  const showHelp = helpHtml && !plainText(infoHtml).includes(plainText(helpHtml));
  const hasDetails = !!labelData.details;
  return `
    <p class='${hasDetails ? "mb-2" : ""}'>${infoHtml}</p>
    ${showHelp ? `<p class='mb-2'>${helpHtml}</p>` : ""}
    ${hasDetails ? `<details><summary class='hover:cursor-pointer'>Methodology</summary><p class='mt-2'>${detailsHtml}</p></details>` : ""}
  `;
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
    const additionalHelpText = orgData.hits.hits[0]?._source.policy?.help_text?.[key] ?? null;

    element.tabIndex = 0;
    createTooltip(element, generateTooltipContent(labelData, additionalHelpText), {
      placement: 'bottom',
      theme: 'tooltip-white'
    });

    element.setAttribute('aria-controls', `${key}_info`);
    element.setAttribute('aria-labelledby', `${key}_info`);
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

  function appendRow(target, record, section) {
    const row = document.createElement('tr');
    const visibleEntries = Object.entries(record)
      .filter(([key]) => !(dataType === 'terms' && exploreItemId === 'author' && (key === 'display_name' || key === 'orcid')));

    visibleEntries.forEach(([key, rawContent], columnIndex) => {
      let content = rawContent;
      const displayName =
        dataType === 'terms' && key === 'key' && exploreItemId === 'author'
          ? record.display_name
          : null;
      const authorOrcid =
        dataType === 'terms' && key === 'key' && exploreItemId === 'author'
          ? record.orcid
          : null;

      if (dataType === 'articles' && key === 'DOI') {
        content = convertTextToLinks(content, true, 'https://doi.org/');
      }

      if (dataType === 'articles' && key === 'published_date') {
        content = makeDateReadable(new Date(content));
      }

      if (Array.isArray(content)) {
        content = removeArrayDuplicates(content);
      }

      const cell = createTableCell(
        content,
        getExploreColumnClass(section, dataType, columnIndex),
        exploreItemId,
        key,
        false,
        displayName,
        authorOrcid
      );

      if (columnIndex > 1) {
        cell.classList.add(shouldRightAlignExploreColumn(key, rawContent) ? "text-right" : "text-left");
      }

      row.appendChild(cell);
    });

    target.appendChild(row);
  }

  // Add rows from other records to the tbody
  otherRecords.forEach(record => {
    appendRow(tableBody, record, 'body');
  });

  // Add the 'all_values' record to the tfoot if it exists
  if (allValuesRecord) {
    appendRow(tableFooter, allValuesRecord, 'foot');
  }

  // Highlight the selected rows if they exist in the new data
  if (selectedRowKeys.length > 0) {
    otherRecords.forEach((record, index) => {
      if (selectedRowKeys.includes(record.key)) {
        const row = tableBody.children[index]; // Get the corresponding row
        const secondCell = row.children[1]; // Get the second cell in the row
        const rowCells = row.querySelectorAll('td');
        rowCells.forEach(cell => cell.classList.add('!bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900'));
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
 * @param {string|null} [displayName=null] - Optional display label for metadata-backed term keys.
 * @param {string|null} [authorOrcid=null] - Optional ORCID URL associated with an author bucket.
 * @returns {HTMLElement} The created table cell element.
 */
function createTableCell(content, cssClass, exploreItemId = null, key = null, isHeader = false, displayName = null, authorOrcid = null) {
  const cell = document.createElement(isHeader ? 'th' : 'td');
  cell.className = cssClass;
  const termBase = currentActiveExploreItemData?.id === "author"
    ? AUTHOR_BREAKDOWN_TERM
    : (currentActiveExploreItemData?.term?.trim() || "");
  const termField = termBase
    ? ((termBase === "published_year" && ELEVENTY_API_ENDPOINT === "api")
      ? termBase.replace(/\.keyword$/i, "")
      : `${termBase.replace(/\.keyword$/i, "")}.keyword`)
    : "";

  /**
   * Helper: attach click-to-filter for term tables, but ignore clicks on external pills.
   * Clicking toggles the term in the active ?q= filters.
   *
   * @param {string|number} rawValue - The raw bucket key value to filter on.
   */
  function attachTermClickFilter(rawValue) {
    if (key !== 'key' || !termField) return;

    cell.onclick = (event) => {
      const target = /** @type {HTMLElement} */ (event.target);
      // Do not trigger filtering when clicking the external profile pill
      if (target && target.closest('.js-external-pill')) return;

      const value = String(rawValue).replace(/"/g, '\\"');
      const clause = `${termField}:"${value}"`;

      const existingQuery = getDecodedUrlQuery() || '';

      // If clause is not present, just add it via the existing helper
      if (!existingQuery || !existingQuery.includes(clause)) {
        updateURLParams({
          q: buildEncodedQueryWithUrlFilter(clause)
        });
      } else {
        // Clause is present: remove ONLY this clause from the decoded ?q=
        const parts = existingQuery
          .split(/\s+AND\s+/)
          .map(part => part.trim())
          .filter(Boolean);

        const remaining = parts.filter(part => !part.includes(clause));

        if (!remaining.length) {
          // No filters left – drop q entirely
          removeURLParams('q');
        } else {
          const newDecodedQuery = remaining.join(' AND ');
          // Write the updated expression back (encoded) so helpers keep working
          updateURLParams({
            q: encodeURIComponent(newDecodedQuery)
          });
        }
      }

      handleFiltersChanged();
    };
  }

  /**
   * Adds a visual selected indicator to a term label when its filter clause
   * already exists in the current `?q=` expression.
   *
   * @param {HTMLElement} wrapper
   * @param {string|number} rawValue
   * @returns {void}
   */
  function addSelectedDotIfNeeded(wrapper, rawValue) {
    if (key !== 'key' || !termField) return;

    const value = String(rawValue).replace(/"/g, '\\"');
    const clause = `${termField}:"${value}"`;
    const q = getDecodedUrlQuery() || '';

    if (!q.includes(clause)) return;

    wrapper.classList.add('inline-flex', 'items-center');

    const dot = document.createElement('span');
    dot.className = 'inline-block w-1.5 h-1.5 mr-1 rounded-full bg-carnation-400';
    dot.setAttribute('aria-hidden', 'true');
    wrapper.insertBefore(dot, wrapper.firstChild);

    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = 'Selected filter';
    wrapper.appendChild(sr);
  }

  /**
   * Creates the standard clickable label used for filterable term values.
   *
   * @param {string} [text='']
   * @returns {HTMLButtonElement}
   */
  function createFilterTargetButton(text = '') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = FILTER_TARGET_BUTTON_CLASS;
    if (text) {
      button.textContent = text;
    }
    return button;
  }

  /**
   * Creates the small outbound-link pill shown beside some special values
   * such as licenses and ORCID identifiers.
   *
   * @param {string} href
   * @param {string} text
   * @returns {HTMLAnchorElement}
   */
  function createExternalPill(href, text) {
    const pill = document.createElement('a');
    pill.href = href;
    pill.target = '_blank';
    pill.rel = 'noopener noreferrer';
    pill.className = EXTERNAL_LINK_PILL_CLASS;
    pill.textContent = text;
    return pill;
  }

  /**
   * Renders an ORCID-backed label with async name resolution and a companion
   * ORCID pill link. Used both for filterable key cells and plain value cells.
   *
   * @param {string} orcidUrl
   * @param {HTMLElement} container
   * @param {boolean} [asFilterTarget=false]
   * @returns {HTMLElement}
   */
  function createAsyncOrcidLabel(orcidUrl, container, asFilterTarget = false) {
    const orcidId = orcidUrl.split('/').pop();
    const nameSpan = document.createElement('span');
    nameSpan.textContent = 'Loading ORCID data...';

    const label = asFilterTarget ? createFilterTargetButton() : document.createElement('span');
    label.appendChild(nameSpan);
    container.appendChild(label);
    container.appendChild(createExternalPill(orcidUrl, 'ORCID ↗'));

    getORCiDFullName(orcidId)
      .then(fullName => {
        nameSpan.textContent = fullName || 'Name not found';
      })
      .catch(() => {
        nameSpan.textContent = orcidUrl;
      });

    return label;
  }

  /**
   * Renders the first-column term label cell for known Explore breakdowns that
   * need special formatting, while preserving click-to-filter behavior.
   *
   * @param {string|number} rawValue
   * @returns {HTMLElement}
   */
  function renderSpecialKeyCell(rawValue, displayValue = rawValue) {
    let labelWrapper = null;

    switch (exploreItemId) {
      case 'country':
        labelWrapper = createFilterTargetButton(COUNTRY_CODES[rawValue] || "Unknown country");
        break;

      case 'language':
        labelWrapper = createFilterTargetButton(LANGUAGE_CODES[rawValue] || "Unknown language");
        break;

      case 'publisher_license':
      case 'repository_license':
      case 'license':
      case 'dataset_license': {
        const licenseInfo = LICENSE_CODES[rawValue];
        const licenseName = licenseInfo?.name || "Unknown license";
        const licenseUrl = licenseInfo?.url || null;

        labelWrapper = createFilterTargetButton();

        const codeEl = document.createElement('strong');
        codeEl.className = 'uppercase';
        codeEl.textContent = rawValue;

        const nameEl = document.createElement('span');
        nameEl.textContent = ` – ${licenseName}`;

        labelWrapper.appendChild(codeEl);
        labelWrapper.appendChild(document.createElement('br'));
        labelWrapper.appendChild(nameEl);
        cell.appendChild(labelWrapper);

        if (licenseUrl) {
          cell.appendChild(createExternalPill(licenseUrl, 'CC License ↗'));
        }
        break;
      }

      case 'all_lab_head':
      case 'janelia_lab_head':
      case 'investigator':
      case 'freeman_hrabowski_scholar':
        if (displayValue && displayValue !== rawValue) {
          labelWrapper = createFilterTargetButton(displayValue);
          cell.appendChild(labelWrapper);
          cell.appendChild(createExternalPill(rawValue, 'ORCID ↗'));
          break;
        }
        if (typeof rawValue === 'string' && rawValue.includes('orcid.org')) {
          labelWrapper = createAsyncOrcidLabel(rawValue, cell, true);
          break;
        }
        labelWrapper = createFilterTargetButton(displayValue);
        break;

      case 'author':
        labelWrapper = createFilterTargetButton(displayValue);
        if (authorOrcid) {
          cell.appendChild(labelWrapper);
          cell.appendChild(createExternalPill(authorOrcid, 'ORCID ↗'));
          break;
        }
        if (typeof rawValue === 'string' && rawValue.includes('orcid.org')) {
          cell.appendChild(labelWrapper);
          cell.appendChild(createExternalPill(rawValue, 'ORCID ↗'));
          break;
        }
        break;

      default:
        labelWrapper = createFilterTargetButton(displayValue);
    }

    if (!cell.contains(labelWrapper)) {
      cell.appendChild(labelWrapper);
    }

    addSelectedDotIfNeeded(labelWrapper, rawValue);
    attachTermClickFilter(rawValue);
    return cell;
  }

  /**
   * Renders non-key cell values using the existing display rules for nulls,
   * booleans, object lists, and special fallback values.
   *
   * @param {*} value
   * @returns {HTMLElement}
   */
  function renderGenericCellValue(value) {
    if (content === 'US$NaN') {
      cell.innerHTML = "N/A";
      return cell;
    }

    if (typeof value === 'object' && value !== null) {
      cell.innerHTML = `<ul>${formatObjectValuesAsList(value, true)}</ul>`;
      return cell;
    }

    if (value === null || value === 'null') {
      cell.innerHTML = "";
      return cell;
    }

    if (typeof value === 'boolean') {
      cell.innerHTML = value.toString();
      return cell;
    }

    cell.innerHTML = value;
    return cell;
  }
  
  // Early handling for common 'all_values' and 'no_values' cases in terms-based data
  // Display either 'All [explore item]]' or 'No [explore item]'
  if (content === 'all_values' || content === 'no_values') {
    cell.innerHTML = content === 'all_values' ? 'All ' : 'No ';
    cell.innerHTML += (EXPLORE_ITEMS_LABELS[exploreItemId]?.plural || pluraliseNoun(exploreItemId)).toLowerCase();
    return cell;
  }

  // Safely check and process content based on its type and the context
  if (key === 'key' && content) {
    return renderSpecialKeyCell(content, displayName || content);
  }

  // Non-`key` cells, or cases outside terms tables

  // Render author metadata directly from the API response when present.
  if (exploreItemId === 'author' && typeof content === 'string' && content.includes('orcid.org')) {
    const label = document.createElement('span');
    label.textContent = displayName || authorOrcid || content;
    cell.appendChild(label);
    cell.appendChild(createExternalPill(content, 'ORCID ↗'));
    return cell;
  }

  return renderGenericCellValue(content);
}

/**
 * Displays the default 'articles' dataset on page load.
 * Waits for the top-level date range (and any `?q=`) before the first request.
 *
 * @async
 * @returns {Promise<void>}
 */
export async function displayDefaultArticlesData() {
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
      const isRowHighlighted = rowCells[0].classList.contains('!bg-neutral-200');

      if (isRowHighlighted) {
        rowCells.forEach(cell => cell.classList.remove('!bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900'));
        secondCell.classList.add('bg-white');
        selectedRowKeys = selectedRowKeys.filter(key => key !== firstCellContent); // Remove key from array for persistent active keys
      } else {
        rowCells.forEach(cell => cell.classList.add('!bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900'));
        secondCell.classList.remove('bg-white');
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
    cell.classList.remove('!bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900');
  });
}

/**
 * Enables horizontal scrolling functionality for the table in the data exploration section.
 * A button click will scroll the table to the right.
 */
function enableExploreTableScroll() {
  const tableContainer = document.querySelector(".js_export_table_container");
  const scrollRightButton = document.getElementById("js_scroll_table_btn");
  if (!tableContainer || !scrollRightButton) return;
  if (scrollRightButton.dataset.bound === "true") {
    syncExploreTableScrollButton(tableContainer, scrollRightButton);
    return;
  }

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
    syncExploreTableScrollButton(tableContainer, scrollRightButton);
  });

  scrollRightButton.dataset.bound = "true";
  syncExploreTableScrollButton(tableContainer, scrollRightButton);
}

/**
 * Returns the configured class string for a table column based on the table
 * section, Explore data type, and column index.
 *
 * @param {'header'|'body'|'foot'} section
 * @param {'terms'|'articles'} dataType
 * @param {number} columnIndex
 * @returns {string}
 */
function getExploreColumnClass(section, dataType, columnIndex) {
  const classMap = section === 'header'
    ? DATA_TABLE_HEADER_CLASSES[dataType]
    : section === 'foot'
      ? DATA_TABLE_FOOT_CLASSES[dataType]
      : DATA_TABLE_BODY_CLASSES[dataType];

  if (section === 'header') {
    if (columnIndex === 0) return classMap.firstHeaderCol;
    if (columnIndex === 1) return classMap.secondHeaderCol;
    return classMap.otherHeaderCols;
  }

  if (columnIndex === 0) return classMap.firstCol;
  if (columnIndex === 1) return classMap.secondCol;
  return classMap.otherCols;
}

/**
 * Applies the article-vs-terms UI state for the Explore panel without
 * changing the underlying rendered table content.
 *
 * @param {string} type
 * @returns {void}
 */
function setExploreModeUI(type) {
  const isArticles = type === "articles";
  const downloadCSVFormContainer = document.getElementById('download_csv_form_container');
  const exploreArticlesTableHelp = document.getElementById('explore_articles_records_shown_help');
  const exploreTermsTableHelp = document.getElementById('explore_terms_records_shown_help');

  if (isArticles) {
    addCSVExportLink();
  } else {
    removeCSVExportLink();
  }

  if (exploreArticlesTableHelp) {
    exploreArticlesTableHelp.style.display = isArticles && loggedIn ? "block" : "none";
  }

  if (exploreTermsTableHelp) {
    exploreTermsTableHelp.style.display = isArticles ? "none" : "block";
  }

  if (downloadCSVFormContainer) {
    downloadCSVFormContainer.classList.toggle("hidden", !isArticles);
    downloadCSVFormContainer.classList.toggle("invisible", !isArticles);
    downloadCSVFormContainer.classList.toggle("opacity-0", !isArticles);
    downloadCSVFormContainer.classList.toggle("pointer-events-none", !isArticles);
    downloadCSVFormContainer.setAttribute("aria-hidden", isArticles ? "false" : "true");
    if ("inert" in downloadCSVFormContainer) downloadCSVFormContainer.inert = !isArticles;
  }

  if (isArticles) {
    displayNone("explore_display_style_field");
  } else {
    removeDisplayStyle("explore_display_style_field");
  }
}

/**
 * Updates the scroll affordance based on the table container's current
 * horizontal scroll position.
 *
 * @param {Element} tableContainer
 * @param {HTMLElement} scrollRightButton
 * @returns {void}
 */
function syncExploreTableScrollButton(tableContainer, scrollRightButton) {
  const currentScroll = tableContainer.scrollLeft;
  const maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;
  scrollRightButton.style.display = currentScroll >= maxScroll ? "none" : "block";
}

/**
 * Initialises tooltips for table cells with truncated content using Tippy.js.
 * Each tooltip will display the full text content of the cell when hovered over.
 * The tooltip is only shown if the cell's content is actually truncated and the user hovers over it with intent.
 */
function enableTooltipsForTruncatedCells() {
  document.querySelectorAll('#export_table .truncate').forEach(cell => {
      createTooltip(cell, cell.textContent, {
          aria: {
            expanded: false
          },
          interactive: false,
          placement: 'bottom',
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
  document.querySelectorAll("#explore_buttons .js_explore_btn").forEach(button => {
    button.className = `js_explore_btn ${SEGMENTED_PILL_CLASSES.base} ${SEGMENTED_PILL_CLASSES.inactive}`;
    if (button.id === buttonId) {
      button.className = `js_explore_btn ${SEGMENTED_PILL_CLASSES.base} ${SEGMENTED_PILL_CLASSES.active}`;
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }
  });
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
    announce(`Rows shown: ${newSize}.`);
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
  updateURLParams({ 'explore_filter': filterId });
  await fetchAndDisplayExploreData(currentActiveExploreItemData, filterId);
  currentActiveExploreItemQuery = filterId;
  updateExploreFilterHeader(filterId);
  updateFilterPillStates(filterId);
  announce(`Explore filter: ${EXPLORE_FILTERS_LABELS[filterId] || filterId}.`);
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
    announce(`Explore view: ${currentActiveDataDisplayToggle ? "Pretty table" : "Raw values"}.`);
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
      const csvEmailHint = document.getElementById("csv-email-hint");
      if (csvEmailHint) {
        csvEmailHint.hidden = true;
      }
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
