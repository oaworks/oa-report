// =================================================
// explore.js
// State & DOM manipulation specific to Data Explore
// =================================================

// =================================================
// Imports
// =================================================

import { isCacheExpired, fetchGetData, fetchPostData, debounce, reorderRecords, formatObjectValuesAsList, pluraliseNoun } from "./utils.js";
import { exploreItem, dataTableBodyClasses, dataTableHeaderClasses } from "./constants.js";
import { toggleLoadingIndicator } from "./components.js";

// =================================================
// Global variables
// =================================================

/** Cache for storing fetched data to reduce API calls
 * 
 * @global 
*/
const dataCache = {}; 

// =================================================
// DOM Manipulation functions
// =================================================

/**
 * Initializes the data explore section by fetching and adding buttons.
 * @param {string} org - The organization identifier for the API query.
 */
export async function initDataExplore(org) {
  try {
    // Check if the data is in cache and hasn't expired (set at 24 hours)
    if (dataCache[org] && !isCacheExpired(dataCache[org].timestamp)) {
      addButtonsToDOM(dataCache[org].data);
    } else {
      // Fetch new data and update cache
      const exploreData = await fetchGetData(`https://${apiEndpoint}.oa.works/report/orgs?q=${org}&include=explore`);
      dataCache[org] = {
        data: exploreData.hits.hits[0]._source.explore,
        timestamp: new Date().getTime() // Current timestamp in milliseconds
      };
      addButtonsToDOM(dataCache[org].data);
    }
  } catch (error) {
    console.error('Error initializing data explore:', error);
  }
}

/**
 * Adds generated buttons to the DOM based on the explore data.
 *
 * @param {Array<Object>} exploreData - Array of explore data objects from the API response.
 */
export async function addButtonsToDOM(exploreData) {
  const exploreButtons = document.getElementById('explore_buttons');
  for (const exploreDataType of exploreData) {
    let button = createExploreButton(exploreDataType);
    exploreButtons.appendChild(button);
  }
}

/**
 * Creates a button element for an explore item.
 * This function dynamically creates a button and assigns appropriate event listeners
 * based on the type of explore item. It handles both term-based items (e.g., 'grant', 'publisher')
 * and article-based items which are identified by the 'includes' key.
 * 
 * @param {string} exploreDataType - The explore data object to create a button for. 
 * @returns {HTMLButtonElement} The created button element with event listeners attached.
 */
// export function createExploreButton(exploreDataType) {
//   const id = exploreDataType.id;
//   const type = exploreDataType.type;
//   const sort = exploreDataType.sort;
//   const includes = exploreDataType.includes;
//   const buttonId = `explore_${id}_button`;
//   const button = document.createElement("button");
//   button.id = buttonId;
//   button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";
//   button.innerHTML = `<span>${exploreItem[id]?.plural || id}</span>`;
//   button.setAttribute("aria-label", exploreItem[id]?.tooltip || "No tooltip available");

//   button.addEventListener("click", debounce(async function() {
//     toggleLoadingIndicator(true); // Show loading indicator
//     updateButtonActiveStyles(buttonId); // Highlight selected button
    
//     if (type === "terms") {
//       const term = exploreDataType.term;
//       await handleTermBasedButtonClick(id, term, sort, includes);
//     } else if (type === "articles") {
//       await handleArticleBasedButtonClick(id, includes);
//     }

//     toggleLoadingIndicator(false); // Hide loading indicator after data is loaded
//   }, 500));

//   return button;
// }

/**
 * Creates and configures a button element for an explore item.
 * 
 * @param {Object} exploreDataType - The explore data object to create a button for.
 * @returns {HTMLButtonElement} The created and configured button element.
 */
export function createExploreButton(exploreDataType) {
  const button = document.createElement("button");
  const id = exploreDataType.id;
  button.id = `explore_${id}_button`;
  button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";
  button.innerHTML = `<span>${exploreItem[id]?.plural || pluraliseNoun(id)}</span>`; // Set button text to plural form of label
  setupButtonEventListener(button, exploreDataType);
  return button;
}

/**
 * Creates a button element with a specified id.
 * 
 * @param {string} id - The ID for the button element.
 * @returns {HTMLButtonElement} The created button element.
 */
// function createButton(id) {
//   const button = document.createElement("button");
//   button.id = `explore_${id}_button`;
//   button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";
//   button.innerHTML = `<span>${exploreItem[id]?.plural || id}</span>`;
//   return button;
// }

/**
 * Sets up the event listener for a button element.
 * 
 * @param {HTMLButtonElement} button - The button element to attach the event listener to.
 * @param {Object} itemData - The data object associated with the explore item.
 */
function setupButtonEventListener(button, itemData) {
  button.addEventListener("click", debounce(async function() {
    toggleLoadingIndicator(true);
    updateButtonActiveStyles(button.id);
    await handleButtonClick(itemData.type, itemData.id, itemData.term, itemData.sort, itemData.includes);
    toggleLoadingIndicator(false);
  }, 500));
}

/**
 * Handles the click event for both term-based and article-based explore items.
 * Fetches data and updates the table with the results.
 * 
 * @param {string} itemType - The type of the item ('terms' or 'articles').
 * @param {string} id - The ID of the explore item.
 * @param {string} [term] - The term associated with the explore item, used in the data fetch for term-based items.
 * @param {string} [sort] - The sorting order.
 * @param {string} [includes] - The 'includes' key associated with the explore item, used in data fetch for article-based items.
 */
async function handleButtonClick(itemType, id, term, sort, includes) {
  let responseData;
  if (itemType === "terms") {
    const postData = createPostData(orgName, term, "2023", "2023", 20, sort);
    responseData = await fetchPostData(postData);
  } else if (itemType === "articles") {
    // similar logic for article-based items
  }

  // Common logic for both term and article based types
  if (responseData) {
    const records = responseData.aggregations.key.buckets;
    updateTableContainer(id, records, includes);
    console.log(`${itemType}-based table.`);
    console.log(records);
  }
}

// =================================================
// Table updating and styling functions
// =================================================

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

  // Assuming the first object's keys represent the headers
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

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