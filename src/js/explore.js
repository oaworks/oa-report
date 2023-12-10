// =================================================
// explore.js
// State & DOM manipulation specific to Data Explore
// =================================================

// =================================================
// Imports
// =================================================

import { displayNone, isCacheExpired, fetchGetData, fetchPostData, debounce, reorderRecords, formatObjectValuesAsList, pluraliseNoun, startYear, endYear, dateRange, replaceText, decodeAndReplaceUrlEncodedChars, getORCiDFullName, deepCopy, makeNumberReadable } from "./utils.js";
import { EXPLORE_TYPES, EXPLORE_FILTERS, DATA_TABLE_BODY_CLASSES, DATA_TABLE_HEADER_CLASSES, COUNTRY_CODES } from "./constants.js";
import { toggleLoadingIndicator } from "./components.js";
import { orgDataPromise } from './insights-and-strategies.js';
import { createPostData } from './api-requests.js';

// =================================================
// Global variables
// =================================================

/** Cache for storing fetched data to reduce API calls
 * 
 * @global 
*/
const dataCache = {}; 

/** Data object representing metadata on an organisation
 * 
 * @global 
*/
let orgData;

/** Tracks currently active explore item BUTTON for use in processExploreDataTable()
 * 
 * @global 
*/
export let currentActiveExploreItemButton = null;

/** Tracks currently active explore item DATA for use in processExploreDataTable()
 * 
 * @global 
*/
export let currentActiveExploreItemData = null;

/** Tracks currently active explore item QUERY for use in createExploreFilterRadioButton()
 * 
 * @global 
*/
export let currentActiveExploreItemQuery = 'is_paper';

/** Tracks currently active explore item SIZE for use in handleRecordsShownChange()
 * 
 * @global 
*/
export let currentActiveExploreItemSize = 10;

/** Tracks currently active explore item DATA DISPLAY STYLE for use in handleDataDisplayToggle()
 * 
 * @global 
*/
export let currentActiveDataDisplayToggle = true;

// =================================================
// DOM Manipulation functions
// =================================================

/**
 * Initializes the data explore section by fetching data from the org index 
 * and adding buttons.
 * 
 * @param {string} org - The organization identifier for the API query.
 */
export async function initDataExplore(org) {  
  try {
    if (dataCache[org] && !isCacheExpired(dataCache[org].timestamp)) {
      addExploreButtonsToDOM(dataCache[org].data);
      addRecordsShownSelectToDOM();
      handleDataDisplayToggle();
    } else {
      const response = await orgDataPromise; // Await the promise to resolve
      orgData = response.data;

      // Check if explore data exists and is not empty
      if (orgData.hits.hits.length > 0 && orgData.hits.hits[0]._source.explore && orgData.hits.hits[0]._source.explore.length > 0) {
        dataCache[org] = {
          data: orgData.hits.hits[0]._source.explore,
          timestamp: new Date().getTime() // Current timestamp in milliseconds
        };
        addExploreButtonsToDOM(dataCache[org].data);
        addRecordsShownSelectToDOM();
        handleDataDisplayToggle();
      } else {
        displayNone("explore"); // Hide the explore section if no data is available
      }
    }
  } catch (error) {
    console.error('Error initialising data explore: ', error);
  }
}

/**
 * Adds buttons to the DOM, one per item found in the org index explore data.
 *
 * @param {Array<Object>} exploreData - Array of explore data objects from the API response.
 */
async function addExploreButtonsToDOM(exploreData) {
  const exploreButtonsContainer = document.getElementById('explore_buttons');
  const moreButtons = []; // Array to store buttons with featured === false
  let moreButtonsVisible = false; // State to track visibility of more buttons

  for (const exploreDataItem of exploreData) {
    let button = createExploreButton(exploreDataItem);
    if (exploreDataItem.featured) {
      exploreButtonsContainer.appendChild(button);
    } else {
      button.classList.add('hidden'); // Initially hide the button
      moreButtons.push(button);
      exploreButtonsContainer.appendChild(button); // Add the button to the container, but keep it hidden
    }
  }

  // "See more/See fewer" button logic for non-featured buttons
  const seeMoreButton = document.getElementById('explore_see_more_button');
  seeMoreButton.addEventListener('click', function() {
    moreButtonsVisible = !moreButtonsVisible; // Toggle visibility state
    moreButtons.forEach(button => button.classList.toggle('hidden')); // Toggle visibility of buttons

    // Update the text of the button based on the state
    seeMoreButton.querySelector('span').textContent = moreButtonsVisible ? 'See fewer' : 'See more';
  });
}


/**
 * Creates and configures a button element for an explore item with a specified
 * ID, the group of data to be shown (label), and Tailwind CSS classes.
 * Then attaches event listener to the button.
 * 
 * @param {Object} exploreDataType - The explore data object to create a button for.
 * @returns {HTMLButtonElement} The created and configured button element.
 */
function createExploreButton(exploreDataItem) {
  const button = document.createElement("button");
  const id = exploreDataItem.id; 
  button.id = `explore_${id}_button`; 
  button.innerHTML = `<span>${EXPLORE_TYPES[id]?.plural || pluraliseNoun(id)}</span>`; // Set button text to plural form of label
  button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";

  button.addEventListener("click", debounce(async function() {
    processExploreDataTable(button, exploreDataItem);
  }, 500));

  return button;
}

/**
 * Sets up the click event listener for an explore button, including showing a loading
 * indicator, updating the button styles, and calling the appropriate handler function
 * to display the data in a table.
 * 
 * @param {HTMLButtonElement} button - The button element to attach the event listener to.
 * @param {Object} itemData - The data object associated with the explore item.
 */
export async function processExploreDataTable(button, itemData) {
  currentActiveExploreItemButton = button; // Set the currently active explore item button
  currentActiveExploreItemData = itemData; // Set the currently active explore item data

  toggleLoadingIndicator(true); // Display loading indicator on button click
  updateButtonActiveStyles(button.id);
  addExploreFiltersToDOM(itemData.query);

  // Fetch and display data based on the current state of the data display style toggle
  await fetchAndDisplayExploreData(itemData, currentActiveExploreItemQuery, currentActiveExploreItemSize, currentActiveDataDisplayToggle);

  toggleLoadingIndicator(false); // Once data is loaded, hide loading indicator
}

/**
 * Adds radio buttons for explore data filters to the DOM. The filters are derived from 
 * a comma-separated 'query' string from the org index.  Hides '#explore_filter_field' if 
 * the only filter is 'is_paper'.
 *
 * @param {string} query - A comma-separated string of filters from the API response.
 */
async function addExploreFiltersToDOM(query) {
  const exploreFiltersElement = document.getElementById("explore_filters");
  const exploreFilterField = document.getElementById("explore_filter_field");
  exploreFiltersElement.innerHTML = ""; // Clear existing radio buttons
  const filters = query.split(","); // Split the query into individual filters

  filters.forEach(filter => {
    const id = filter.replace("analysis.", "").replace(".query", ""); // Format filter ID
    const radioButton = createExploreFilterRadioButton(id);
    exploreFiltersElement.appendChild(radioButton);
  });

  // Hide the explore form if only 'is_paper' filter is present
  if (filters.length === 1 && filters[0].includes("is_paper")) {
    if (exploreFilterField) {
      exploreFilterField.style.display = "none"; // Hide the explore form
    }
  } else if (exploreFilterField) {
    exploreFilterField.style.display = ""; // Ensure the form is visible otherwise
  }
}

/**
 * Creates and configures a radio button element for an explore item’s filters with a specified
 * ID, its human-readable label, and Tailwind CSS classes.
 * Then attaches event listener to the radio button.
 * 
 * @param {string} id - The ID of the filter.
 * @returns {HTMLDivElement} The div element containing the configured radio button and label.
 */
function createExploreFilterRadioButton(id) {
  const label = EXPLORE_FILTERS[id] || id; // Use label from filters or default to ID
  const filterRadioButton = document.createElement('div');
  filterRadioButton.className = 'flex items-center mr-4 mb-3';

  // Creating and appending radio input
  const radioInput = document.createElement('input');
  Object.assign(radioInput, {
    type: 'radio',
    id: `filter_${id}`,
    className: 'mr-1',
    name: 'filter_by',
    value: id,
    checked: id === 'is_paper', // Set 'is_paper' (all articles) as default selected filter
    'aria-hidden': 'true'
  });
  filterRadioButton.appendChild(radioInput);

  // Creating and appending label
  const labelElement = document.createElement('label');
  Object.assign(labelElement, {
    htmlFor: `filter_${id}`,
    className: 'text-xs cursor-pointer flex items-center whitespace-nowrap',
    textContent: label
  });
  filterRadioButton.appendChild(labelElement);

  // Event listener for filter change
  filterRadioButton.addEventListener('click', debounce(async function() {
    fetchAndDisplayExploreData(currentActiveExploreItemData, id);
    currentActiveExploreItemQuery = id;
  }, 500));

  return filterRadioButton;
}

/**
 * Adds a <select> menu for changing the number of records shown in the active table.
 * Inserts the menu into a div with the id "explore_records_shown".
 */
function addRecordsShownSelectToDOM() {
  const exploreRecordsShownElement = document.getElementById("explore_records_shown");
  exploreRecordsShownElement.innerHTML = ""; // Clear existing menu if any

  // Create the select element
  const selectMenu = document.createElement("select");
  selectMenu.id = "records_shown_select";
  selectMenu.className = "p-1 border border-neutral-500 bg-transparent text-xs";
  selectMenu.addEventListener("change", handleRecordsShownChange);

  // Define options for the select menu
  const options = [5, 10, 20, 50];
  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = `${optionValue}`;
    if (optionValue === 10) { // Set default value
      option.selected = true;
    }
    selectMenu.appendChild(option);
  });

  exploreRecordsShownElement.appendChild(selectMenu);
}

/**
 * Handles the click event for both term-based and article-based explore items.
 * Fetches data and updates the table with the results.
 * 
 * @param {Object} itemData - The data object of the explore item.
 * @param {string} filter - The filter to use for fetching data.
 * @param {number} size - The number of records to fetch.
 */
async function fetchAndDisplayExploreData(itemData, filter = "is_paper", size = 10, pretty = true) {
  const { type, id, term, sort, includes } = itemData; // Extract explore item's properties
  let query = orgData.hits.hits[0]._source.analysis[filter].query; // Get the query string for the selected filter
  let suffix = orgData.hits.hits[0]._source.key_suffix; // Get the suffix for the org
  let records = [];
  pretty = currentActiveDataDisplayToggle;
  size = currentActiveExploreItemSize; 

  if (type === "terms") {
    query = decodeAndReplaceUrlEncodedChars(query); // Decode and replace any URL-encoded characters for JSON
    records = await fetchTermBasedData(suffix, query, term, sort, size);
    records = reorderRecords(records, includes);
    replaceText("explore_sort", "publication count"); // Update the sort text in header
    if (pretty === true) {
      records = formatRecords(records); 
      records = prettifyRecords(records);
    } else {
      records = prettifyRecords(records, false);
    }
  } else if (type === "articles") {
    records = await fetchArticleBasedData(query, includes, sort, size);
    replaceText("explore_sort", "publication date"); // Update the sort text in header
  }

  if (records.length > 0) {
    updateTableContainer(id, records);
  }
}

/**
 * Fetches term-based data.
 * 
 * @param {string} term - The term associated with the explore item.
 * @param {string} sort - The sorting order.
 * @param {number} size - The number of records to fetch.
 * @returns {Promise<Array>} A promise that resolves to an array of term-based records.
 */
async function fetchTermBasedData(suffix, query, term, sort, size) {
  const postData = createPostData(suffix, query, term, startYear, endYear, size, sort); // Generate POST request
  const response = await fetchPostData(postData);

  if (response && response.aggregations && response.aggregations.key && response.aggregations.key.buckets) {
    return response.aggregations.key.buckets.map(bucket => {
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
    });
  }
  return [];
}

/**
 * Fetches article-based data.
 * 
 * @param {string} query - The query string for fetching articles.
 * @param {string} includes - The 'includes' key associated with the explore item.
 * @param {string} sort - The sorting order.
 * @param {number} size - The number of records to fetch.
 * @returns {Promise<Array>} A promise that resolves to an array of article-based records.
 */
async function fetchArticleBasedData(query, includes, sort, size) {
  const getDataUrl = `https://${apiEndpoint}.oa.works/report/works/?q=${dateRange}(${query})&size=${size}&include=${includes}&sort=${sort}`;
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
 * Updates the table header and fetches data to populate the table.
 *
 * @param {string} selectedId - The ID of the selected explore item.
 * @param {Array<Object>} records - The data array to populate the table, with each object representing a row.
 */
function updateTableContainer(selectedId, records) {
  const exportTable = document.getElementById('export_table');
  exportTable.classList.remove('hidden'); // Show the table
  
  // Add functionalities to the table
  // TODO: This only works on the first table that the user clicks on
  // enableExploreRowHighlighting();
  enableExploreTableScroll();

  // Populate table with data
  populateTableHeader(records[0], 'export_table_head');
  populateTableBody(records, 'export_table_body', selectedId);

  // Update any mentions of the explore data type with .plural version of the ID
  replaceText("explore_type", EXPLORE_TYPES[selectedId]?.plural || selectedId);
}

/**
 * Populates the header of a table with column headers derived from the keys of a data object.
 * The function clears any existing headers before appending the new ones. It assumes that the 
 * first object in the data array is representative of the structure for all objects in the array.
 * 
 * @param {Object[]} records - An array of data objects used to derive the header columns. Assumes all objects have the same structure.
 * @param {string} tableHeaderId - The ID of the table header element where the headers should be appended.
 */
function populateTableHeader(records, tableHeaderId) {
  const tableHeader = document.getElementById(tableHeaderId);
  if (!tableHeader) return;

  // Clear existing header cells
  while (tableHeader.firstChild) {
    tableHeader.removeChild(tableHeader.firstChild);
  }

  records = Object.keys(records); // Only extract the keys from the records
  let headers = prettifyHeaders(records);

  const headerRow = document.createElement('tr'); // Create and add the header row
  headers.forEach((key, index) => {
    let cssClass;
    if (index === 0) cssClass = DATA_TABLE_HEADER_CLASSES.firstHeaderCol;
    else if (index === 1) cssClass = DATA_TABLE_HEADER_CLASSES.secondHeaderCol;
    else cssClass = DATA_TABLE_HEADER_CLASSES.otherHeaderCols;

    const headerCell = createTableCell(key, cssClass, null, null, true);
    headerRow.appendChild(headerCell);
  });
  tableHeader.appendChild(headerRow);
}

/**
 * Populates a table body with data from explore items.
 * 
 * @param {Array<Object>} data - Array of data objects to populate the table with.
 * @param {string} tableBodyId - The ID of the table body to populate.
 * @param {string} exploreItemId - The ID of the selected explore item.
 */
function populateTableBody(data, tableBodyId, exploreItemId) {
  const tableBody = document.getElementById(tableBodyId);
  if (!tableBody || data.length === 0) return;

  // Clear existing table rows
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Add new rows from data
  data.forEach(record => {
    const row = document.createElement('tr');
    let columnIndex = 0; // Keep track of column index for CSS class assignment

    for (const key in record) {
      let cssClass;
      if (columnIndex === 0) cssClass = DATA_TABLE_BODY_CLASSES.firstCol;
      else if (columnIndex === 1) cssClass = DATA_TABLE_BODY_CLASSES.secondCol;
      else cssClass = DATA_TABLE_BODY_CLASSES.otherCols;

      const content = record[key];
      row.appendChild(createTableCell(content, cssClass, exploreItemId, key, false));

      columnIndex++; // Increment the column index
    }
    tableBody.appendChild(row);
  });
}


/**
 * Formats headers for display. For headers with a corresponding "_pct" counterpart,
 * only the "_pct" version is retained and the "_pct" suffix is removed. Headers are 
 * also made more human-readable, with specific capitalization rules for known phrases and acronyms.
 * 
 * @param {string[]} headers - The array of headers to be prettified.
 * @returns {string[]} - The prettified headers.
 */
function prettifyHeaders(headers) {
  // Define special cases for phrases and acronyms
  const specialCases = {
    "open access": "Open Access",
    "oa": "Open Access",
    "open data": "Open Data",
    "apc": "APC<span style='text-transform: lowercase;'>s</span>",
    "free to read": "Free-to-Read",
    "dois": "DOI<span style='text-transform: lowercase;'>s</span>",
    "id": "ID",
    "rors": "ROR<span style='text-transform: lowercase;'>s</span>",
    "orcIDs": "ORC<span style='text-transform: lowercase;'>i</span>D<span style='text-transform: lowercase;'>s</span>",
    "fundref": "FundRef",
  };

  return headers
    .filter(header => header.endsWith("_pct") || !headers.includes(header + "_pct"))
    .map(header => {
      header = header.replace(/_pct$/, ""); // Remove '_pct' suffix
      header = header.replace(/_/g, " "); // Replace underscores with spaces
      header = header.charAt(0).toUpperCase() + header.slice(1).toLowerCase(); // Capitalize only the first letter of the header

      // Check and replace special cases using regex
      Object.entries(specialCases).forEach(([key, value]) => {
        const regex = new RegExp(key, "i"); // 'i' flag for case-insensitive match
        if (regex.test(header)) {
          header = header.replace(regex, value);
        }
      });
      return header;
    }
  );
}

/**
 * Formats the records for display. This includes converting numerical values
 * to human-readable formats such as percentages and currency.
 * 
 * @param {Object[]} records - The records to format.
 */
function formatRecords(records) {
  records.forEach(record => {
    Object.keys(record).forEach(key => {
      if (typeof record[key] === 'number') {
        let formattedNumber = record[key].toFixed(2);

        if (formattedNumber.endsWith('.00')) {
          formattedNumber = formattedNumber.slice(0, -3);
        }

        if (key.endsWith("_pct")) {
          record[key] = `${(formattedNumber*100).toFixed()}%`;
        } else if (key.endsWith("_amount")) {
          record[key] = `${makeNumberReadable(parseFloat(formattedNumber), true)}`;
        } else {
          record[key] = makeNumberReadable(parseFloat(formattedNumber));
        }
      }
      // Non-numeric values are left unchanged
    });
  });
  return records;
}

/**
 * Formats records or headers for display. Removes non-percentage counterparts 
 * from records and formats headers to be more human-readable.
 * 
 * @param {Object[]} records - The array of records to be prettified.
 * @returns {Object[]|string[]} - The prettified records or headers.
 */
function prettifyRecords(records, pretty = true) {
  records.forEach(record => {
    Object.keys(record).forEach(key => {
      const pctKey = key + "_pct";
      if (pretty === true) {
        if (record.hasOwnProperty(pctKey)) delete record[key]; // Delete non-percentage counterpart
      } else if (pretty === false) {
        if (record.hasOwnProperty(pctKey)) delete record[pctKey]; // Delete percentage counterpart
      }
    });
  });

  return records;
}

/**
 * Creates a table cell element (th or td) with specified content and CSS class.
 * 
 * @param {string|Object} content - The content to be placed inside the cell. If an object, its values are formatted as an unordered list.
 * @param {string} cssClass - The CSS class to apply to the cell.
 * @param {boolean} [isHeader=false] - Indicates if the cell is a header cell (th) or a regular cell (td).
 * @returns {HTMLElement} The created table cell element.
 */
function createTableCell(content, cssClass, exploreItemId = null, key = null, isHeader = false) {
  const cell = document.createElement(isHeader ? 'th' : 'td');
  cell.className = cssClass;

  if (content === 'Key') {
    // Check if content is 'key' and insert a span with class 'explore_type'
    const spanElement = document.createElement('span');
    spanElement.className = 'explore_type';
    cell.appendChild(spanElement);
  } else if (exploreItemId === 'country' && key === 'key') {
    const countryName = COUNTRY_CODES[content]  || "Unknown country";
    cell.textContent = countryName;
  } else if (typeof content === 'string' && content.includes('orcid.org')) {
    // Check if content is an ORCiD URL and fetch the full name
    const orcidId = content.split('/').pop();
    cell.textContent = orcidId;
    getORCiDFullName(orcidId)
      .then(
        // Display full name with link to ORCiD profile
        fullName => cell.innerHTML = 
        `<a href="${content}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="underline underline-offset-2 decoration-1">
          ${fullName}
        </a>`
      )
      .catch(() => cell.innerHTML = 
        `<a href="${content}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="underline underline-offset-2 decoration-1">
          ${content} (Name not found)
        </a>`
      );
  } else if (typeof content === 'object' && content !== null) {
    // Check if the content is an object and format its values as a list
    cell.innerHTML = `<ul>${formatObjectValuesAsList(content)}</ul>`;
  } else if (content === null) {
    cell.innerHTML = "N/A";
  } else {
    cell.innerHTML = content;
  }

  return cell;
}

// =================================================
// Interactive feature functions
// =================================================

/**
 * Enables row highlighting functionality for a table in the data exploration section.
 * Clicking on a row will highlight it.
 */
function enableExploreRowHighlighting() {
  const tableBody = document.getElementById("export_table_body");

  tableBody.addEventListener("click", (event) => {
    const target = event.target;

    // Check if the clicked element is a TD or TH
    if (target.tagName === "TD" || target.tagName === "TH") {
      const row = target.closest("tr"); // Get the closest parent row of the clicked cell

      // Remove highlighting from all rows
      document.querySelectorAll("#export_table_body tr").forEach((r) => {
        r.classList.remove("bg-neutral-200", "bg-neutral-300", "hover:bg-neutral-100", "text-neutral-900");
      });

      // Add highlighting to the clicked row
      row.classList.add("bg-neutral-200", "hover:bg-neutral-100", "text-neutral-900");
      row.querySelectorAll("th, td").forEach(cell => {
        cell.classList.add("bg-neutral-200", "hover:bg-neutral-100", "text-neutral-900");
      });
    }
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
  currentActiveExploreItemSize = newSize; // Update the currently active explore item sizes
  toggleLoadingIndicator(true); // Show loading indicator

  try {
    await fetchAndDisplayExploreData(currentActiveExploreItemData, currentActiveExploreItemQuery, currentActiveExploreItemSize);
  } catch (error) {
    console.error('Error updating records shown: ', error);
  }

  toggleLoadingIndicator(false); // Hide loading indicator
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
