// =================================================
// report-date-manager.js
// 
// =================================================

import { createDate, replaceDateRange, replaceText, initDropdown } from './utils.js';
import { initInsightsAndStrategies } from './insights-and-strategies.js';
import { currentActiveExploreItemButton, currentActiveExploreItemData, processExploreDataTable } from './explore.js';

// Capture DOM elements
const reportDateRange = document.getElementById("report-range");
const reportYear = document.getElementById("report-year");

export const currentDate = new Date();
export const DEFAULT_YEAR = 2023;

// Constants for date calculations
const startYearDate = createDate(currentDate.getFullYear(), 0, 1);
const lastYearStartDate = createDate(currentDate.getFullYear() - 1, 0, 1);
const lastYearEndDate = createDate(currentDate.getFullYear() - 1, 11, 31);
const fixedDate = createDate(2023, 5, 30); // Fixed end date for free/non-paying users

/**
 * Sets up the default year for the application.
 * 
 * @param {number} defaultYear - The default year to be selected.
 */
export function setDefaultYear(defaultYear) {
  const defaultStartDate = createDate(defaultYear, 0, 1);
  const defaultEndDate = createDate(defaultYear, 11, 31);

  replaceDateRange(defaultStartDate, defaultEndDate);
  reportDateRange.textContent = `In ${defaultYear}`;
  reportYear.textContent = defaultYear;

  // Wait for the DOM to update with year buttons
  setTimeout(() => {
    // Select the default year button and style it as selected
    const defaultButton = document.getElementById(`year-${defaultYear}`);
    if (defaultButton) {
      handleYearButtonLogic(defaultButton, defaultStartDate, defaultEndDate, `${defaultYear}`);
      updateYearButtonStyling(defaultButton);
    }
  }, 0);
}

/**
 * Binds dynamic year buttons to a container and initializes a dropdown for additional years.
 * This function dynamically creates buttons for each year in a given range and appends them
 * to the specified container. Years outside of the visible range are added to a dropdown menu.
 *
 * @param {number} startYear - The starting year for the range of years.
 * @param {number} endYear - The ending year for the range of years.
 * @param {number} [visibleYears=4] - The number of years to be visible outside the dropdown.
 */
export function bindDynamicYearButtons(startYear, endYear, visibleYears = 4) {
  const yearsContainer = document.getElementById("year-buttons-container");
  const { dropdown, dropdownContent, dropdownButton } = createDropdownContainer();
  const currentYear = new Date().getFullYear(); // Get current year
  const currentDate = new Date(); // Get current date

  for (let year = endYear; year >= startYear; year--) {
    const startDate = createDate(year, 0, 1); // Create a date for January 1st of the year
    let endDate;

    // Check if the current year is being processed
    if (year === currentYear) {
      endDate = currentDate; // Set endDate to today's date for the current year
    } else {
      endDate = createDate(year, 11, 31); // Use December 31st for other years
    }

    const buttonId = `year-${year}`;
    const buttonText = `${year}`;

    if (endYear - year < visibleYears) {
      // Display as a button if the year is within the visible range
      const button = createYearButton(buttonId, buttonText, startDate, endDate);
      yearsContainer.appendChild(button);
    } else {
      // Otherwise, display in a dropdown menu
      const dropdownItem = createDropdownItem(buttonId, buttonText, startDate, endDate, dropdownButton);
      dropdownContent.appendChild(dropdownItem); // Append items to dropdownContent instead of dropdownContainer
    }
  }

  // Append the dropdown container only if it has items
  if (dropdownContent.hasChildNodes()) {
    yearsContainer.appendChild(dropdown); // Append the entire dropdown structure
  }

  // Create an 'All time' button with a fixed start date and the current date as the end date
  const allTimeButton = createYearButton("all-time", "All time", createDate(1980, 0, 1), currentDate);
  yearsContainer.appendChild(allTimeButton);

  initDropdown(".js_dropdown");
}

/**
 * Creates a dropdown container element.
 * 
 * @returns {HTMLElement} The created dropdown container element.
 */
function createDropdownContainer() {
  const dropdown = document.createElement("div");
  dropdown.classList.add("relative", "inline-block", "js_dropdown");

  const dropdownButton = document.createElement("button");
  dropdownButton.classList.add("px-4", "py-2", "border", "border-neutral-900", "bg-white", "text-neutral-900", "hover:bg-neutral-800", "hover:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-neutral-900", "js_year_select");
  dropdownButton.setAttribute("aria-haspopup", "true");
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdownButton.innerHTML = "More years <span class='ml-1 text-xs'>&#9660;</span>";

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("absolute", "left-0", "mt-1", "w-full", "shadow-lg", "bg-white", "ring-1", "ring-black", "ring-opacity-5", "divide-y", "divide-neutral-200", "hidden", "js_dropdown_content");
  dropdownContent.setAttribute("hidden", true);

  dropdownButton.addEventListener("click", () => {
    const isHidden = dropdownContent.hasAttribute('hidden');
    if (isHidden) {
      dropdownContent.removeAttribute('hidden');
      dropdownContent.classList.remove('hidden');
    } else {
      dropdownContent.setAttribute('hidden', 'true');
      dropdownContent.classList.add('hidden');
    }
  });

  dropdown.appendChild(dropdownButton);
  dropdown.appendChild(dropdownContent);

  return { dropdown, dropdownContent, dropdownButton };
}

/**
 * Creates a dropdown menu item for year selection.
 * 
 * @param {string} buttonId - The ID to be assigned to the dropdown item.
 * @param {string} buttonText - The text to be displayed on the item.
 * @param {Date} startDate - The start date for the report corresponding to the item.
 * @param {Date} endDate - The end date for the report corresponding to the item.
 * @returns {HTMLElement} The created dropdown item element.
 */
function createDropdownItem(buttonId, buttonText, startDate, endDate, dropdownButton) {
  const item = document.createElement("button");
  item.classList.add("block", "px-4", "py-2", "w-full", "hover:bg-neutral-900", "hover:text-white", "js_dropdown_item");
  item.textContent = buttonText;

  item.addEventListener("click", (event) => {
    event.preventDefault();
    // Update dropdown button text and style
    dropdownButton.innerHTML = `${buttonText} <span class='ml-1 text-xs'>&#9660;</span>`;
    handleYearButtonLogic(item, startDate, endDate, buttonText);
    updateYearButtonStyling(dropdownButton, true);
  });

  return item;
}

/**
 * Creates a button element for year selection.
 * 
 * @param {string} buttonId - The ID to be assigned to the button.
 * @param {string} buttonText - The text to be displayed on the button.
 * @param {Date} startDate - The start date for the report.
 * @param {Date} endDate - The end date for the report.
 * @returns {HTMLElement} The created button element.
 */
function createYearButton(buttonId, buttonText, startDate, endDate) {
  const button = document.createElement("button");
  button.id = buttonId;
  button.textContent = buttonText;

  // Add classes for styling
  button.classList.add("px-4", "py-2", "border", "border-b-0", "border-neutral-900", "bg-white", "text-neutral-900", "hover:bg-neutral-800", "hover:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-neutral-900", "js_year_select");
  button.setAttribute("aria-pressed", buttonText === `${DEFAULT_YEAR}` ? "true" : "false");

  // Add event listener
  button.addEventListener("click", function() {
    handleYearButtonLogic(button, startDate, endDate, buttonText);
  });

  return button;
}

/**
 * Handles the logic to be executed when a year button is clicked.
 * This includes setting the date range for the report, updating the display text, 
 * and invoking necessary functions to refresh report data.
 * 
 * @param {HTMLElement} button - The button element that was clicked.
 * @param {Date} startDate - The start date for the report corresponding to the button.
 * @param {Date} endDate - The end date for the report corresponding to the button.
 * @param {string} buttonText - The text displayed on the button, typically the year.
 */
function handleYearButtonLogic(button, startDate, endDate, buttonText) {
  // Reset the dropdown if a visible year button is clicked
  if (!button.classList.contains('js_dropdown_item')) {
    resetDropdown();
  }

  replaceDateRange(startDate, endDate);
  reportDateRange.textContent = `In ${startDate.getFullYear()}`;
  reportYear.textContent = startDate.getFullYear();
  if (reportYear) replaceText("report_year", buttonText);
  initInsightsAndStrategies(org);
  if (currentActiveExploreItemButton) {
    processExploreDataTable(currentActiveExploreItemButton, currentActiveExploreItemData);
  }

  updateYearButtonStyling(button);
}

/**
 * Updates the styling of year selection buttons.
 *
 * @param {HTMLElement} selectedButton - The button element that was selected.
 */
function updateYearButtonStyling(selectedButton) {
  const yearButtons = document.querySelectorAll(".js_year_select");
  yearButtons.forEach((button) => {
    button.classList.remove("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
    button.classList.add("bg-white", "text-neutral-900");
    button.setAttribute("aria-pressed", "false");
  });

  selectedButton.classList.add("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
  selectedButton.classList.remove("bg-white", "text-neutral-900");
  selectedButton.setAttribute("aria-pressed", "true");
}


/**
 * Resets the dropdown to its default state - back to 'More years' and reverting the 
 * styling of any previously selected dropdown items to their original state.
 * It targets elements with specific class names: '.js_dropdown_button' for the dropdown button,
 * and '.js_dropdown_item' for the dropdown items.
 */
function resetDropdown() {
  // Reset the dropdown button text to 'More years'
  const dropdownButton = document.querySelector('.js_dropdown_button');
  if (dropdownButton) {
    dropdownButton.innerHTML = `More years <span class='ml-1 text-xs'>&#9660;</span>`;
  }

  // Reset styling for all dropdown items to their original state
  const dropdownItems = document.querySelectorAll('.js_dropdown_item');
  dropdownItems.forEach(item => {
    // Assuming these are the TailwindCSS classes you initially use for dropdown items
    item.classList.remove("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
    item.classList.add("bg-white", "text-neutral-900");
  });
}
