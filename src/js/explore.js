// =================================================
// explore.js
// State & DOM manipulation specific to Data Explore
// =================================================

import { isCacheExpired, fetchGetData, fetchPostData, debounce, getNestedProperty } from "./utils.js";
import { exploreItem, dataTableBodyClasses, dataTableHeaderClasses } from "./constants.js";
import { toggleLoadingIndicator } from "./components.js";

// Cache for storing fetched data to reduce API calls
const dataCache = {};

/**
 * Initializes the data explore section by fetching and adding buttons.
 * @param {string} org - The organization identifier for the API query.
 */
export async function initDataExplore(org) {
  try {
    // Check if the data is in cache and hasn't expired
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
  for (const item of exploreData) {
    let button;
    if ('term' in item) {
      button = createExploreButton(item.id, item.query, item.term); // For term-based objects like 'grant', 'publisher', 'author', etc.
    } else if ('includes' in item) {
      button = createExploreButton(item.id, item.query, null, item.includes); // For article-based objects, pass includes as a parameter
    } else {
      button = createExploreButton(item.id); // If neither 'term' nor 'includes' is present
    }
    exploreButtons.appendChild(button);
  }
}

/**
 * Creates a button element for an explore item.
 * This function dynamically creates a button and assigns appropriate event listeners
 * based on the type of explore item. It handles both term-based items (e.g., 'grant', 'publisher')
 * and article-based items which are identified by the 'includes' key.
 * 
 * @param {string} id - The ID of the explore item. Used for button ID and to fetch specific data.
 * @param {string|null} query - The 'query' key associated with the explore item, if applicable. This is used for both term- and article-based items.
 * @param {string|null} term - The 'term' ket associated with the explore item, if applicable. This is used for term-based items.
 * @param {string|null} [includes=null] - The 'includes' key associated with the explore item, if applicable. This is used for article-based items.
 * @returns {HTMLButtonElement} The created button element with event listeners attached.
 */
export function createExploreButton(id, query = null, term = null, includes = null) {
  const buttonId = `explore_${id}_button`;
  const button = document.createElement("button");
  button.id = buttonId;
  button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";
  button.innerHTML = `<span>${exploreItem[id]?.plural || id}</span>`;
  button.setAttribute("aria-label", exploreItem[id]?.tooltip || "No tooltip available");

  button.addEventListener("click", debounce(async function() {
    toggleLoadingIndicator(true); // Show loading indicator
    updateButtonStylesAndTable(buttonId);

    let isArticleBased;
    
    if (term) {
      await handleTermBasedButtonClick(id, term, isArticleBased = false);
    } else if (includes) {
      await handleArticleBasedButtonClick(id, includes, isArticleBased = true);
    }

    toggleLoadingIndicator(false); // Hide loading indicator after data is loaded
  }, 500));

  return button;
}

/**
 * Handles the click event for buttons associated with term-based explore items.
 * It fetches data using a POST request and updates the table with the results.
 * 
 * @param {string} id - The ID of the explore item.
 * @param {string} term - The term associated with the explore item, used in the data fetch.
 */
async function handleTermBasedButtonClick(id, term) {
  const postData = createPostData(orgName, term, "2023", "2023");
  const responseData = await fetchPostData(postData);
  const records = responseData.aggregations.key.buckets;
  updateTableContainer(id, records);
  console.log("Term-based table.");
  console.log(records);
}


/**
 * Handles the click event for buttons associated with article-based explore items.
 * It constructs a query URL using provided parameters, fetches data using a GET request,
 * and updates the table with the results.
 * 
 * @param {string} id - The ID of the explore item.
 * @param {string} includes - The 'includes' key associated with the explore item, used in data fetch.
 */
async function handleArticleBasedButtonClick(id, includes, isArticleBased = true) {
  const analysisResponse = await fetchGetData(`https://${apiEndpoint}.oa.works/report/orgs?q=${org}&include=analysis`);
  const analysisData = analysisResponse.hits.hits[0]._source;

  const exploreData = dataCache[org].data;
  const articlesObject = exploreData.find(item => item.id === id);
  
  if (articlesObject && analysisData) {
    // TODO: work out how to include both is_paper and is_preprint. Using either OR or AND yields zero results. 
    // const queryArray = articlesObject.query.split(',');
    // const queryParts = queryArray.map(part => encodeURIComponent(getNestedProperty(analysisData, part))).join("%20OR%20"); 
    const query = analysisData.analysis.is_paper.query;
    const size = 20;
    const fullQueryUrl = `https://${apiEndpoint}.oa.works/report/works/?q=(published_date:%3E2022-12-31%20AND%20published_date:%3C2023-11-23)%20AND%20(${query})&size=${size}&include=${includes}`;
    const data = await fetchGetData(fullQueryUrl);

    if (data && data.hits && data.hits.hits) {
      const records = data.hits.hits.map(hit => hit._source);
      updateTableContainer(id, records, isArticleBased = true);
      console.log("Article-based table.");
      console.log(records);
    }
  }
}

/**
 * Updates the button styles and table content based on the selected button ID.
 *
 * @param {string} buttonId - The ID of the selected button.
 */
export function updateButtonStylesAndTable(buttonId) {
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

/**
 * Updates the table header and fetches data to populate the table.
 *
 * @param {string} selectedId - The ID of the selected explore item.
 * @param {Array<Object>} data - The data array to populate the table, with each object representing a row.
 */
function updateTableContainer(selectedId, data, isArticleBased = false) {
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
  populateTableHeader(headers, 'export_table_head', isArticleBased);
  populateTableBody(data, 'export_table_body', isArticleBased);
}

/**
 * Creates a table cell element with the given content and CSS class.
 * 
 * @param {string} content - The content to be placed inside the cell.
 * @param {string} cssClass - The CSS class to apply to the cell.
 * @param {boolean} isHeader - Indicates if the cell is a header cell (th) or a regular cell (td).
 * @returns {HTMLElement} The created table cell element.
 */
function createTableCell(content, cssClass, isHeader = false) {
  const cell = document.createElement(isHeader ? 'th' : 'td');
  cell.className = cssClass;
  cell.textContent = content;
  return cell;
}

/**
 * Generates a table header row from the keys of a data object.
 * 
 * @param {Object} headers - A sample data object to extract keys for header columns.
 * @returns {HTMLTableRowElement} The created header row element.
 */
function createTableHeader(headers, isArticleBased = false) {
  const headerRow = document.createElement('tr');

  if (isArticleBased) {
    // Reorder headers for article-based data: 'title', 'DOI', then others
    const titleIndex = headers.indexOf("title");
    const doiIndex = headers.indexOf("DOI");
    
    if (titleIndex > -1) {
      headers.splice(titleIndex, 1); // Remove 'title'
      headers.unshift("title"); // Add 'title' at the beginning
    }

    if (doiIndex > -1) {
      headers.splice(doiIndex, 1); // Remove 'DOI'
      headers.splice(1, 0, "DOI"); // Add 'DOI' as the second element
    }
  }

  headers.forEach(key => {
    let cssClass;
    if (isArticleBased) {
      if (key === "title") {
        cssClass = dataTableHeaderClasses.firstHeaderCol;
      } else if (key === "DOI") {
        cssClass = dataTableHeaderClasses.secondHeaderCol;
      } else {
        cssClass = dataTableHeaderClasses.otherHeaderCols;
      }
    } else {
      if (key === "key") {
        cssClass = dataTableHeaderClasses.firstHeaderCol;
      } else if (key === "doc_count") {
        cssClass = dataTableHeaderClasses.secondHeaderCol;
      } else {
        cssClass = dataTableHeaderClasses.otherHeaderCols;
      }
    }
    const headerCell = createTableCell(key, cssClass, true);
    headerRow.appendChild(headerCell);
  });

  return headerRow;
}

/**
 * Generates a table row from a data object.
 * This function handles both term-based and article-based data objects.
 * 
 * @param {Object} data - The data object to create the table row for.
 * @param {boolean} isArticleBased - Indicates if the data object is article-based.
 * @returns {HTMLTableRowElement} The created table row element.
 */
function createTableBodyRow(data, isArticleBased = false) {
  const row = document.createElement('tr');

  if (isArticleBased) {
    // Handle article-based data (first column: title, second column: DOI)
    row.appendChild(createTableCell(data.title, dataTableBodyClasses.firstCol, true));
    row.appendChild(createTableCell(data.DOI, dataTableBodyClasses.secondCol, true));
    for (const key in data) {
      if (key !== 'title' && key !== 'DOI') {
        const value = data[key];
        let content = Array.isArray(value) || typeof value === 'object' ? JSON.stringify(value) : value;
        row.appendChild(createTableCell(content, dataTableBodyClasses.otherCols));
      }
    }
  } else {
    // Handle term-based data (first column: key, second column: doc_count)
    row.appendChild(createTableCell(data.key, dataTableBodyClasses.firstCol, true));
    row.appendChild(createTableCell(data.doc_count, dataTableBodyClasses.secondCol, true));
    Object.keys(data).forEach(key => {
      if (key !== 'key' && key !== 'doc_count') {
        let content = '';
        if (typeof data[key] === 'object' && data[key].value !== undefined) {
          content = data[key].value;
        } else if (typeof data[key] === 'object') {
          content = data[key].doc_count;
        }
        row.appendChild(createTableCell(content, dataTableBodyClasses.otherCols));
      }
    });
  }
  
  return row;
}

/**
 * Populates the header of a table with column headers derived from the keys of a data object.
 * The function clears any existing headers before appending the new ones. It assumes that the 
 * first object in the data array is representative of the structure for all objects in the array.
 * 
 * @param {Object[]} headers - An array of data objects used to derive the header columns. Assumes all objects have the same structure.
 * @param {string} tableHeaderId - The ID of the table header element where the headers should be appended.
 */
function populateTableHeader(headers, tableHeaderId, isArticleBased = false) {
  const tableHeader = document.getElementById(tableHeaderId);
  if (!tableHeader) return;

  // Clear existing header cells
  while (tableHeader.firstChild) {
    tableHeader.removeChild(tableHeader.firstChild);
  }

  // Add new header row using the provided headers array
  const headerRow = createTableHeader(headers, isArticleBased);
  tableHeader.appendChild(headerRow);
}

/**
 * Populates a table with data from either term-based or article-based explore items.
 * 
 * @param {Array<Object>} data - Array of data objects to populate the table with.
 * @param {string} tableBodyId - The ID of the table to populate.
 * @param {boolean} isArticleBased - Indicates if the data array is article-based.
 */
function populateTableBody(data, tableBodyId, isArticleBased = false) {
  const tableBody = document.getElementById(tableBodyId);
  if (!tableBody) return;

  // Clear existing table rows
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Add new rows from data
  data.forEach(dataObject => {
    const row = createTableBodyRow(dataObject, isArticleBased);
    tableBody.appendChild(row);
  });
}

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
