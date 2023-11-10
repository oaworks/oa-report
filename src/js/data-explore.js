// =================================================
// State & DOM manipulation specific to Data Explore
// =================================================

import { startYear, endYear, makeNumberReadable, fetchData } from './utils.js';
import { createGroupByBtn } from './components.js';
import { groupByKeyNames, groupByHeaderNames, dataTableClasses } from './constants.js';

/**
 * Appends "group by" buttons specific to the data exploration section to a specified container. 
 * Each button is created based on the keys in the provided groupByKeyNames object.
 * 
 * @param {HTMLElement} container - The container element in the data exploration section to which the buttons will be appended.
 * @param {Object} groupByKeyNames - The mapping object containing key names and display names for group by types in the data exploration section.
 */
export function appendDataExploreButtonsToContainer(container, groupByKeyNames) {
  for (const key in groupByKeyNames) {
    const button = createGroupByBtn(key, groupByKeyNames); // Ensure createDataExploreGroupByBtn is either imported or defined in the same file
    container.appendChild(button);
  }
}

/**
 * Sets a specified button as active while deactivating other buttons within the data explore section.
 * This function updates styling to show which one is currently active.
 * 
 * @param {HTMLButtonElement} activeButton - The button to be set as active in the data explore section.
 * @param {HTMLElement} container - The container element in the data explore section that holds the buttons.
 */
export function toggleDataExploreActiveButton(activeButton, container) {
  // Loop through all buttons in the container and remove the active class
  container.querySelectorAll("button").forEach(button => {
    button.classList.remove("bg-carnation-500");
  });

  // Set the clicked button as active
  activeButton.classList.add("bg-carnation-500");
}

/**
 * Displays headers in a table's <thead> element, specifically for the data exploration section.
 * 
 * @param {string} groupByKeyName - The key name used to group data, which determines the first column header.
 * @param {string} [displayMode="pretty"] - Determines the display mode for headers ("pretty" for human-readable format, "raw" for raw key names).
 */
export function updateDataExploreTableHeaders(groupByKeyName, displayMode = "pretty") {
  const exportTableHead = document.getElementById("export_table_head");
  let tableHeadersHTML = "";
  
  // Extract the first column based on the provided groupByKeyName and style the first sticky header
  if (groupByKeyNames[groupByKeyName]) {
    tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">${groupByKeyNames[groupByKeyName].plural}</th>`;
  }
  
  const headersArray = Object.keys(groupByHeaderNames);

  for (let i = 0; i < headersArray.length; i++) {
    const headerValue = headersArray[i];
    const displayHeader = displayMode === "raw" ? headerValue : (groupByHeaderNames[headerValue] && groupByHeaderNames[headerValue].pretty);

    if (i === 0) { // Style the second sticky header
      tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom break-words">${displayHeader}</th>`;
    } else {
      tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">${displayHeader}</th>`;
    }
  }

  exportTableHead.innerHTML = tableHeadersHTML;
}

/**
 * Displays the body of the data table for a given group-by category.
 * 
 * @param {string} groupByKeyName - The key name used for grouping data.
 * @param {string} [displayMode="pretty"] - The mode for displaying data.
 */
export async function updateDataExploreTableBody(groupByKeyName, displayMode = "pretty") {
  const exportTableBody = document.getElementById("export_table_body");
  clearDataExploreTableData();

  const postData = createPostData(orgName, groupByKeyName, startYear, endYear);
  const responseData = await fetchData(postData);
  
  if (responseData) {
    const fragment = document.createDocumentFragment();
    appendDataExploreRowToFragment(responseData, fragment, groupByKeyName, displayMode, groupByHeaderNames);
    exportTableBody.appendChild(fragment);
  }
}

/**
 * Clears the table body content in the data exploration section.
 * This function is used to remove all rows from the table, allowing new data to populate the table afresh.
 */
export function clearDataExploreTableData() {
  const exportTableBody = document.getElementById("export_table_body");
  while (exportTableBody.firstChild) {
    exportTableBody.removeChild(exportTableBody.firstChild);
  }
}

/**
 * Appends rows to a document fragment based on the provided data.
 * 
 * @param {Object} data - The data used to create table rows.
 * @param {DocumentFragment} fragment - The document fragment to append rows to.
 * @param {string} groupByKeyName - The key name used for grouping data.
 * @param {string} displayMode - The mode for displaying data ("pretty" or "raw").
 * @param {Object} groupByHeaderNames - The header names for the table.
 */
export function appendDataExploreRowToFragment(data, fragment, groupByKeyName, displayMode, groupByHeaderNames) {
  if (data.aggregations && data.aggregations.key && data.aggregations.key.buckets) {
    data.aggregations.key.buckets.forEach(bucket => {
      let row = document.createElement("tr");

      if (groupByKeyNames[groupByKeyName]) {
        const cell = createDataExploreCell("th", dataTableClasses.firstCol, bucket.key || "");
        row.appendChild(cell);
      }

      let columnCounter = 1;
      Object.keys(groupByHeaderNames).forEach(headerKey => {
        const valueKey = groupByHeaderNames[headerKey].key;
        const bucketValue = getDataExploreBucketValue(bucket, headerKey, valueKey);
        const className = columnCounter === 1 ? dataTableClasses.secondCol : dataTableClasses.otherCols;
        const cellType = columnCounter === 1 ? "th" : "td";
        const articlesPublishedValue = Number(bucket["articles_published"].doc_count);
        const cellContent = displayMode === "raw" 
                            ? bucketValue 
                            : formatDataExploreValueBasedOnKey(headerKey, bucketValue, articlesPublishedValue) || "0";

        const cell = createDataExploreCell(cellType, className, cellContent);
        row.appendChild(cell);
        columnCounter++;
      });

      fragment.appendChild(row);
    });
  }
}

/**
 * Creates a table cell (td or th) for the data exploration section with the specified content and class.
 * This function is part of managing the DOM in response to changes in the application's data state.
 * 
 * @param {string} type - The type of cell to create ('td' for table data cell or 'th' for table header cell).
 * @param {string} className - The class name to apply to the cell.
 * @param {string} content - The text content to be included in the cell.
 * @returns {HTMLElement} The created table cell element.
 */
export function createDataExploreCell(type, className, content) {
  const cell = document.createElement(type);
  cell.className = className;
  cell.textContent = content;
  return cell;
}

/**
 * Retrieves the value from a data bucket specific to the data exploration section, 
 * based on the specified header key and value key.
 * 
 * @param {Object} bucket - The data bucket to extract the value from.
 * @param {string} headerKey - The key identifying the header in the bucket.
 * @param {string} valueKey - The key used to extract the value from the bucket.
 * @returns {*} The extracted value from the bucket.
 */
export function getDataExploreBucketValue(bucket, headerKey, valueKey) {
  let bucketValue;

  if (headerKey === "median_apcs_paid_raw") {
    bucketValue = bucket[headerKey].values["50.0"];
  } else if (valueKey.includes(".")) {
    let keys = valueKey.split(".");
    bucketValue = bucket[headerKey];
    for (let key of keys) {
      if (bucketValue) {
        bucketValue = bucketValue[key];
      } else {
        break;
      }
    }
  } else {
    bucketValue = bucket[headerKey] ? bucket[headerKey][valueKey] : "0";
  }

  return bucketValue;
}

/**
 * Formats values for display in the data exploration tables based on key types set in groupByHeaderNames.
 * 
 * @param {string} key - The key associated with the value, used to determine the formatting rule.
 * @param {*} value - The value to be formatted.
 * @param {number} articlesPublished - The total number of articles published, used for percentage calculations.
 * @returns {*} The formatted value.
 */
export function formatDataExploreValueBasedOnKey(key, value, articlesPublished) {
  const header = groupByHeaderNames[key];
  if (!header) return value; // Return original value if the key doesn't exist

  if (key === "articles_published") {
    return makeNumberReadable(value); // Only total number of articles shows the full number at all times
  }

  if (header.key === "doc_count") {
    return ((value / articlesPublished) * 100).toFixed(0) + "%"; // Convert to fraction of total articles published, then to percentage
  }

  if (["value", "values['50.0']"].includes(header.key)) {
    return makeNumberReadable(value, true); // Format as currency
  }

  return value; // Return original value if no conditions match
}

/**
 * Resets the toggle button to its default state for the data exploration section.
 * This involves setting the button's appearance and aria-checked attribute to reflect the "pretty" data display mode.
 */
export function resetDataExploreToggle() {
  const toggleButton = document.getElementById("toggle-data-view");
  toggleButton.setAttribute("aria-checked", "true");
  toggleButton.querySelector("span.bg-carnation-500, span.bg-neutral-200").classList.replace("bg-neutral-200", "bg-carnation-500");
  toggleButton.querySelector("span.translate-x-100, span.translate-x-5").classList.replace("translate-x-5", "translate-x-100");
}

/**
 * Toggles the data display style between "raw" and "pretty" for the data exploration section.
 * Attaches an event listener to the toggle button to switch between display modes.
 * 
 * @param {string} groupByKeyName - The key name used for grouping data in the table.
 */
export function toggleDataExploreDisplay(groupByKeyName) {
  resetDataExploreToggle();
  const toggleButton = document.getElementById("toggle-data-view");

  if (toggleButton) { 
    // Remove any previous event listeners attached to the btn to avoid unexpected behaviour
    if (currentToggleHandler) {
      toggleButton.removeEventListener("click", currentToggleHandler);
    }
  
    // Ensure the initial state is set correctly
    if (toggleButton.getAttribute("aria-checked") === null) {
      toggleButton.setAttribute("aria-checked", "true"); // By default, you want "true" for "pretty"
    }

    currentToggleHandler = function(event) {
      event.stopPropagation();

      // 1. Check the current state
      const ariaChecked = toggleButton.getAttribute("aria-checked") === "true";

      // 2. Switch the button state
      toggleButton.setAttribute("aria-checked", !ariaChecked ? "true" : "false");

      // 3. Determine the display mode based on the NEW state
      const displayMode = !ariaChecked ? "pretty" : "raw"; 

      // 4. Display the data based on the new display mode
      updateDataExploreTableHeaders(groupByKeyName, displayMode);
      updateDataExploreTableBody(groupByKeyName, displayMode);
      
      // 5. Update visual appearance of the button
      toggleButton.querySelector("span.bg-carnation-500, span.bg-neutral-200").classList.toggle("bg-neutral-200");
      toggleButton.querySelector("span.translate-x-100, span.translate-x-5").classList.toggle("translate-x-5");
    };
  }
  toggleButton.addEventListener("click", currentToggleHandler);
}

// Variable to keep track of the current event handler for the toggle button.
let currentToggleHandler = null;

/**
 * Enables row highlighting functionality for a table in the data exploration section.
 * Clicking on a row will highlight it.
 */
export function enableDataExploreRowHighlighting() {
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
export function enableDataExploreTableScroll() {
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