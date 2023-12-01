// =================================================
// explore.js
// State & DOM manipulation specific to Data Explore
// =================================================

// =================================================
// Imports
// =================================================

import { displayNone, isCacheExpired, fetchGetData, fetchPostData, debounce, reorderRecords, formatObjectValuesAsList, pluraliseNoun, startYear, endYear, dateRange, replaceText, decodeAndReplaceUrlEncodedChars, getORCiDFullName } from "./utils.js";
import { exploreItem, exploreFilters, dataTableBodyClasses, dataTableHeaderClasses } from "./constants.js";
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

/** Tracks currently active explore item button for use in processExploreDataTable()
 * 
 * @global 
*/
export let currentActiveExploreItemButton = null;

/** Tracks currently active explore item data for use in processExploreDataTable()
 * 
 * @global 
*/
export let currentActiveExploreItemData = null;

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
    // Check if the data is in cache and hasn't expired (set at 24 hours)
    if (dataCache[org] && !isCacheExpired(dataCache[org].timestamp)) {
      addExploreButtonsToDOM(dataCache[org].data);
    } else {
      // Fetch new data and update cache
      orgDataPromise.then(function (response) {
        orgData = response.data;

        if (orgData.hits.hits[0]._source.explore) {
          dataCache[org] = {
            data: orgData.hits.hits[0]._source.explore,
            timestamp: new Date().getTime() // Current timestamp in milliseconds
          };
          addExploreButtonsToDOM(dataCache[org].data);
        } else {
          handleNoExploreData(); // Handle the case where there is no explore object
        }
      });
      
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
export async function addExploreButtonsToDOM(exploreData) {
  const exploreButtons = document.getElementById('explore_buttons');
  
  for (const exploreDataItem of exploreData) {
    let button = createExploreButton(exploreDataItem);
    exploreButtons.appendChild(button);
  }
}

/**
 * Creates and configures a button element for an explore item with a specified
 * ID, the group of data to be shown (label), and Tailwind CSS classes.
 * Then attaches event listener to the button.
 * 
 * @param {Object} exploreDataType - The explore data object to create a button for.
 * @returns {HTMLButtonElement} The created and configured button element.
 */
export function createExploreButton(exploreDataItem) {
  const button = document.createElement("button");
  const id = exploreDataItem.id; 
  button.id = `explore_${id}_button`; 
  button.innerHTML = `<span>${exploreItem[id]?.plural || pluraliseNoun(id)}</span>`; // Set button text to plural form of label
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
  currentActiveExploreItemButton = button; // Set the currently active explore item btn
  currentActiveExploreItemData = itemData; // Set the currently active explore item data
  toggleLoadingIndicator(true); // Display loading indicator on button click
  updateButtonActiveStyles(button.id);
  addExploreFiltersToDOM(itemData.query);
  await fetchAndDisplayExploreData(itemData);
  toggleLoadingIndicator(false); // Once data is loaded, hide loading indicator
}

/**
 * Adds radio buttons for explore data filters to the DOM. The filters are derived from 
 * a comma-separated 'query' string from the org index.  Hides the '#explore_form' if 
 * the only filter is 'is_paper'.
 *
 * @param {string} query - A comma-separated string of filters from the API response.
 */
export async function addExploreFiltersToDOM(query) {
  const exploreFiltersElement = document.getElementById("explore_filters");
  const exploreFormElement = document.getElementById("explore_form");
  exploreFiltersElement.innerHTML = ""; // Clear existing radio buttons
  const filters = query.split(","); // Split the query into individual filters

  filters.forEach(filter => {
    const id = filter.replace("analysis.", "").replace(".query", ""); // Format filter ID
    const radioButton = createExploreFilterRadioButton(id);
    exploreFiltersElement.appendChild(radioButton);
  });

  // Hide the explore form if only 'is_paper' filter is present
  if (filters.length === 1 && filters[0].includes("is_paper")) {
    if (exploreFormElement) {
      exploreFormElement.style.display = "none"; // Hide the explore form
    }
  } else if (exploreFormElement) {
    exploreFormElement.style.display = ""; // Ensure the form is visible otherwise
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
export function createExploreFilterRadioButton(id) {
  const label = exploreFilters[id] || id; // Use label from filters or default to ID
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
  }, 500));

  return filterRadioButton;
}

/**
 * Handles the click event for both term-based and article-based explore items.
 * Fetches data and updates the table with the results.
 * 
 * @param {Object} itemData - The data object of the explore item.
 */
async function fetchAndDisplayExploreData(itemData, filter = "is_paper") {
  const { type, id, term, sort, includes } = itemData; // Extract explore item's properties
  const size = 20; // Set the number of records to fetch
  let query = orgData.hits.hits[0]._source.analysis[filter].query; // Get the query string for the selected filter
  let records = [];

  if (type === "terms") {
    query = decodeAndReplaceUrlEncodedChars(query); // Decode and replace any URL-encoded characters for JSON
    records = await fetchTermBasedData(query, term, sort, size);
  } else if (type === "articles") {
    records = await fetchArticleBasedData(query, includes, sort, size);
  }

  if (records.length > 0) {
    processAndDisplayRecords(id, records, includes);
    console.log(`${type}-based table (${id}).`);
    console.log(records);
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
async function fetchTermBasedData(query, term, sort, size) {
  const postData = createPostData(query, term, startYear, endYear, size, sort); // Generate POST request
  console.log(postData);
  const response = await fetchPostData(postData);
  // Check nested properties before assigning records
  if (response && response.aggregations && response.aggregations.key && response.aggregations.key.buckets) {
    return response.aggregations.key.buckets; 
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

/**
 * Processes and displays records in the UI.
 * 
 * @param {string} id - The ID of the explore item.
 * @param {Array} records - The records to be processed and displayed.
 * @param {string} includes - The 'includes' key for reordering records.
 */
function processAndDisplayRecords(id, records, includes) {
  records = reorderRecords(records, includes);
  updateTableContainer(id, records, includes);
}

// =================================================
// Table updating and styling functions
// =================================================

/**
 * Handles the scenario when explore data is not available for an org
 * by simply not displaying the Explore section on the report.
 */
function handleNoExploreData() {
  displayNone("explore");
}

/**
 * Updates the table header and fetches data to populate the table.
 *
 * @param {string} selectedId - The ID of the selected explore item.
 * @param {Array<Object>} data - The data array to populate the table, with each object representing a row.
 */
function updateTableContainer(selectedId, data, includes) {
  // Remove 'hidden' class to show the table
  const exportTable = document.getElementById('export_table');
  exportTable.classList.remove('hidden');
  
  // Add functionalities to the table
  // TODO: This only works on the first table that the user clicks on
  enableExploreRowHighlighting();
  enableExploreTableScroll();

  // Populate table with data
  populateTableHeader('export_table_head', includes);
  populateTableBody(data, 'export_table_body', includes);

  // Update any mentions of the explore data type with .plural version of the ID
  replaceText("explore_type", exploreItem[selectedId]?.plural || selectedId);
}

/**
 * Populates the header of a table with column headers derived from the keys of a data object.
 * The function clears any existing headers before appending the new ones. It assumes that the 
 * first object in the data array is representative of the structure for all objects in the array.
 * 
 * @param {Object[]} headers - An array of data objects used to derive the header columns. Assumes all objects have the same structure.
 * @param {string} tableHeaderId - The ID of the table header element where the headers should be appended.
 */
function populateTableHeader(tableHeaderId, includes) {
  const tableHeader = document.getElementById(tableHeaderId);
  if (!tableHeader) return;

  // Clear existing header cells
  while (tableHeader.firstChild) {
    tableHeader.removeChild(tableHeader.firstChild);
  }

  const keysOrder = includes.split(",");

  // Create and add the header row
  const headerRow = document.createElement('tr');
  keysOrder.forEach((key, index) => {
    let cssClass;
    if (index === 0) cssClass = dataTableHeaderClasses.firstHeaderCol;
    else if (index === 1) cssClass = dataTableHeaderClasses.secondHeaderCol;
    else cssClass = dataTableHeaderClasses.otherHeaderCols;

    const headerCell = createTableCell(key, cssClass, true);
    headerRow.appendChild(headerCell);
  });
  tableHeader.appendChild(headerRow);
}

/**
 * Populates a table body with data from explore items.
 * 
 * @param {Array<Object>} data - Array of data objects to populate the table with.
 * @param {string} tableBodyId - The ID of the table body to populate.
 */
function populateTableBody(data, tableBodyId, includes) {
  const tableBody = document.getElementById(tableBodyId);
  if (!tableBody) return;

  // Clear existing table rows
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Define the order of the keys based on the includes array
  const keysOrder = includes.split(",");

  // Add new rows from data
  data.forEach(dataObject => {
    const row = document.createElement('tr');
    keysOrder.forEach((key, index) => {
      let cssClass;
      if (index === 0) cssClass = dataTableBodyClasses.firstCol;
      else if (index === 1) cssClass = dataTableBodyClasses.secondCol;
      else cssClass = dataTableBodyClasses.otherCols;

      const content = dataObject[key] !== undefined ? dataObject[key] : "N/A";
      row.appendChild(createTableCell(content, cssClass));
    });
    tableBody.appendChild(row);
  });
}

/**
 * Creates a table cell element (th or td) with specified content and CSS class.
 * 
 * @param {string|Object} content - The content to be placed inside the cell. If an object, its values are formatted as an unordered list.
 * @param {string} cssClass - The CSS class to apply to the cell.
 * @param {boolean} [isHeader=false] - Indicates if the cell is a header cell (th) or a regular cell (td).
 * @returns {HTMLElement} The created table cell element.
 */
function createTableCell(content, cssClass, isHeader = false) {
  const cell = document.createElement(isHeader ? 'th' : 'td');
  cell.className = cssClass;

  if (content === 'key') {
    // Check if content is 'key' and insert a span with class 'explore_type'
    const spanElement = document.createElement('span');
    spanElement.className = 'explore_type';
    cell.appendChild(spanElement);
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
  } else {
    cell.textContent = content;
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
export function enableExploreRowHighlighting() {
  const tableBody = document.getElementById("export_table_body");
  const tableRows = tableBody.querySelectorAll("tr"); 

  tableBody.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "TD" || target.tagName === "TH") {
      const row = target.parentElement; // Get the parent <tr> element
      const cellsToHighlight = Array.from(row.querySelectorAll("td, th")); 

      // Remove highlighting from all rows
      tableRows.forEach((r) => {
        r.classList.remove("bg-neutral-200", "bg-neutral-300", "hover:bg-neutral-100", "text-neutral-900");
      });

      // Toggle highlighting for the selected <td> and <th> elements
      cellsToHighlight.forEach((cell) => {
        if (cell.tagName === "TD") {
          cell.classList.toggle("bg-neutral-200");
        } else if (cell.tagName === "TH") {
          cell.classList.toggle("bg-neutral-300");
        }
        cell.classList.toggle("hover:bg-neutral-100");
        cell.classList.toggle("text-neutral-900");
      });
    }
  });
}

/**
 * Enables horizontal scrolling functionality for the table in the data exploration section.
 * A button click will scroll the table to the right.
 */
export function enableExploreTableScroll() {
  const tableContainer = document.querySelector(".js_export_table_container");
  const scrollRightBtn = document.getElementById("js_scroll_table_btn");

  scrollRightBtn.addEventListener("click", () => {
    const scrollAmount = 200; 
    const currentScroll = tableContainer.scrollLeft;
    const maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;

    const targetScroll = currentScroll + scrollAmount;

    if (targetScroll >= maxScroll) {
      // If reaching the end, hide the scrollRightBtn
      scrollRightBtn.style.display = "none";
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
      scrollRightBtn.style.display = "none";
    } else {
      scrollRightBtn.style.display = "block";
    }
  });
}

/**
 * Updates the styles of buttons to indicate the active (selected) button.
 *
 * @param {string} buttonId - The ID of the selected button.
 */
export function updateButtonActiveStyles(buttonId) {
  // Reset styles for all buttons
  document.querySelectorAll("#explore_buttons button").forEach(btn => {
    btn.classList.remove("bg-carnation-500");
    btn.classList.add("bg-carnation-100");
  });

  // Apply selected style to the clicked button
  const selectedButton = document.getElementById(buttonId);
  if (selectedButton) {
    selectedButton.classList.remove("bg-carnation-100");
    selectedButton.classList.add("bg-carnation-500");
  }
}