// =================================================
// explore.js
// State & DOM manipulation specific to Data Explore
// =================================================

// =================================================
// Imports
// =================================================

import { displayNone, isCacheExpired, fetchGetData, fetchPostData, debounce, reorderRecords, formatObjectValuesAsList, pluraliseNoun, startYear, endYear, dateRange } from "./utils.js";
import { exploreItem, dataTableBodyClasses, dataTableHeaderClasses } from "./constants.js";
import { toggleLoadingIndicator } from "./components.js";
import { orgDataPromise } from './oareport.js';

// =================================================
// Global variables
// =================================================

/** Cache for storing fetched data to reduce API calls
 * 
 * @global 
*/
const dataCache = {}; 
let orgData;

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
      addButtonsToDOM(dataCache[org].data);
    } else {
      // Fetch new data and update cache
      orgDataPromise.then(function (response) {
        orgData = response.data;

        if (orgData.hits.hits[0]._source.explore) {
          dataCache[org] = {
            data: orgData.hits.hits[0]._source.explore,
            timestamp: new Date().getTime() // Current timestamp in milliseconds
          };
          addButtonsToDOM(dataCache[org].data);
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
export async function addButtonsToDOM(exploreData) {
  const exploreButtons = document.getElementById('explore_buttons');
  
  for (const exploreDataItem of exploreData) {
    let button = createExploreButton(exploreDataItem);
    exploreButtons.appendChild(button);
  }
}

/**
 * Creates and configures a button element for an explore item with a specified
 * ID, the group of data to be shown (label), and Tailwind CSS classes.
 * Then attach event listener to the button.
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
    processExploreButtonClick(button, exploreDataItem);
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
async function processExploreButtonClick(button, itemData) {
  toggleLoadingIndicator(true); // Display loading indicator on button click
  updateButtonActiveStyles(button.id);
  await fetchAndDisplayExploreData(itemData);
  toggleLoadingIndicator(false); // Once data is loaded, hide loading indicator
}

/**
 * Handles the click event for both term-based and article-based explore items.
 * Fetches data and updates the table with the results.
 * 
 * @param {Object} itemData - The data object of the explore item.
 */
async function fetchAndDisplayExploreData(itemData) {
  const { type, id, term, sort, includes } = itemData; // Extract explore item's properties
  const size = 20; // Set the number of records to fetch

  let records = [];

  if (type === "terms") {
    records = await fetchTermBasedData(term, sort, size);
  } else if (type === "articles") {
    const query = orgData.hits.hits[0]._source.analysis.is_paper.query;
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
async function fetchTermBasedData(term, sort, size) {
  const postData = createPostData(orgName, term, startYear, endYear, size, sort); // Generate POST request
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
  // Update the header with .plural version of the ID
  const header = document.querySelector(".agg-type");
  header.textContent = exploreItem[selectedId]?.plural || selectedId;

  // Remove 'hidden' class to show the table
  const exportTable = document.getElementById('export_table');
  exportTable.classList.remove('hidden');
  
  // Add functionalities to the table
  enableExploreRowHighlighting();
  enableExploreTableScroll();

  // Populate table with data
  populateTableHeader('export_table_head', includes);
  populateTableBody(data, 'export_table_body', includes);
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
 * If the content is an object, its values are formatted as an unordered list.
 * 
 * @param {string|Object} content - The content to be placed inside the cell. If an object, its values are formatted as an unordered list.
 * @param {string} cssClass - The CSS class to apply to the cell.
 * @param {boolean} [isHeader=false] - Indicates if the cell is a header cell (th) or a regular cell (td).
 * @returns {HTMLElement} The created table cell element.
 */
function createTableCell(content, cssClass, isHeader = false) {
  const cell = document.createElement(isHeader ? 'th' : 'td');
  cell.className = cssClass;

  // Check if the content is an object and format its values as a list
  if (typeof content === 'object' && content !== null) {
    const listContent = `<ul>${formatObjectValuesAsList(content)}</ul>`;
    cell.innerHTML = listContent;
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