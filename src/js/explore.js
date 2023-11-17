// =================================================
// explore.js
// State & DOM manipulation specific to Data Explore
// =================================================

import { fetchGetData, fetchPostData } from "./utils.js";
import { exploreItem } from "./constants.js";

/**
 * Adds generated buttons to the DOM based on the explore data.
 *
 * @param {Array<Object>} exploreData - Array of explore data objects from the API response.
 */
export function addButtonsToDOM(exploreData) {
  const exploreButtons = document.getElementById('explore_buttons');
  exploreData.forEach(item => {
    const button = createExploreButton(item.id, item.term); // Pass term to button
    exploreButtons.appendChild(button);
  });
}

/**
 * Fetches and processes the explore data from the API for a given organization using Axios.
 *
 * @param {string} org - The organization identifier for the API query.
 * @param {Function} callback - The callback function to process the data.
 */
export function fetchAndProcessExploreData(org, callback) {
  fetchGetData(`https://bg.beta.oa.works/report/orgs?q=${org}&include=explore`)
    .then(data => {
      const exploreData = data.hits.hits[0]._source.explore;
      callback(exploreData);
    })
    .catch(error => console.error('Error fetching explore data:', error));
}

/**
 * Creates a button element for an explore item.
 * 
 * @param {string} id - The ID of the explore item.
 * @param {string} term - The term associated with the explore item.
 * @returns {HTMLButtonElement} The created button element.
 */
export function createExploreButton(id, term) {
  const buttonId = `explore_${id}_button`;
  const button = document.createElement("button");
  button.id = buttonId;
  button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";
  button.innerHTML = `<span>${exploreItem[id]?.plural || id}</span>`;
  button.setAttribute("aria-label", exploreItem[id]?.tooltip || "No tooltip available");

  // Add event listener to fetch data and update table on click
  button.addEventListener("click", async function() {
    updateButtonStylesAndTable(buttonId);
    updateTableContainer(id);

    // Fetch data and log it
    const postData = createPostData(orgName, term, "2023", "2023"); // Static years for now
    console.log(`orgName: ${orgName}, term: ${term}, startYear: 2023, endYear: 2023`)
    const responseData = await fetchPostData(postData);
    console.log(responseData.aggregations.key.buckets); // Log the data
  });

  return button;
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
 */
function updateTableContainer(selectedId) {
  // Update the header with .plural version of the ID
  const header = document.querySelector(".agg-type");
  header.textContent = exploreItem[selectedId]?.plural || selectedId;

  // Remove 'hidden' class to show the table
  const exportTable = document.getElementById('export_table');
  exportTable.classList.remove('hidden');
  
  // Add functionalities to the table
  enableExploreRowHighlighting();
  enableExploreTableScroll();

  // Fetch and update table content
  // updateTableContent(selectedId);
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