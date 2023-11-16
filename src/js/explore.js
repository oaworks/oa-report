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
    const button = createButton(item.id, item.term); // Pass term to createButton
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
export function createButton(id, term) {
  const buttonId = `explore_${id}_button`;
  const button = document.createElement("button");
  button.id = buttonId;
  button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";
  button.innerHTML = `<span>${exploreItem[id]?.plural || id}</span>`;
  button.setAttribute("aria-label", exploreItem[id]?.tooltip || "No tooltip available");

  button.addEventListener("click", async function() {
    updateButtonStylesAndTable(buttonId);

    // Fetch data and log it
    const postData = createPostData(orgName, term, "2023", "2023"); // Static years for now
    const responseData = await fetchPostData(postData);
    console.log(responseData); // Log the data
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

  // Remove 'hidden' class to show the table
  const exportTable = document.getElementById('export_table');
  exportTable.classList.remove('hidden');

  // Update table header based on the button clicked
  updateTableAndHeader(buttonId.split('_')[1]);
}

/**
 * Updates the table header and fetches data to populate the table.
 *
 * @param {string} selectedId - The ID of the selected explore item.
 */
function updateTableAndHeader(selectedId) {
  // Update the header with .plural version of the ID
  const header = document.querySelector(".agg-type");
  header.textContent = exploreItem[selectedId]?.plural || selectedId;

  // Fetch and update table content
  updateTableContent(selectedId);
}

/**
 * Fetches data and updates the content of the table based on the selected explore item.
 *
 * @param {string} selectedId - The ID of the selected explore item.
 */
function updateTableContent(selectedId) {
  // Implementation depends on how data is fetched and structured
  // fetchDataForSelectedId(selectedId) needs to be defined
  // Populate table rows based on fetched data
}
