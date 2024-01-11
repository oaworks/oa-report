// =================================================
// report-date-manager.js
// 
// =================================================

import { createDate, replaceDateRange, replaceText } from './utils.js';
import { initInsightsAndStrategies } from './insights-and-strategies.js';
import { currentActiveExploreItemButton, currentActiveExploreItemData, processExploreDataTable } from './explore.js';

// Constants for date calculations
const startYearDate = createDate(currentDate.getFullYear(), 0, 1);
const lastYearStartDate = createDate(currentDate.getFullYear() - 1, 0, 1);
const lastYearEndDate = createDate(currentDate.getFullYear() - 1, 11, 31);
const fixedDate = createDate(2023, 5, 30); // Fixed end date for free/non-paying users

// Capture DOM elements
const reportDateRange = document.getElementById("report-range");
const reportYear = document.getElementById("report-year");

export const currentDate = new Date();
export const DEFAULT_YEAR = 2023;

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
 * Binds dynamically created year selection buttons to the DOM.
 * 
 * @param {number} startYear - The starting year of the range.
 * @param {number} endYear - The ending year of the range.
 * @param {number} [visibleYears=5] - The number of years to show as buttons.
 */
export function bindDynamicYearButtons(startYear, endYear, visibleYears = 4) {
  const yearsContainer = document.getElementById("year-buttons-container");
  const dropdownContainer = createDropdownContainer();

  for (let year = endYear; year >= startYear; year--) {
    const startDate = createDate(year, 0, 1);
    const endDate = createDate(year, 11, 31);
    const buttonId = `year-${year}`;
    const buttonText = `${year}`;

    if (endYear - year < visibleYears) {
      const button = createYearButton(buttonId, buttonText, startDate, endDate);
      yearsContainer.appendChild(button);
    } else {
      const dropdownItem = createDropdownItem(buttonId, buttonText, startDate, endDate);
      dropdownContainer.appendChild(dropdownItem);
    }
  }

  yearsContainer.appendChild(dropdownContainer);

  const allTimeButton = createYearButton("all-time", "All Time", createDate(1980, 0, 1), currentDate);
  yearsContainer.appendChild(allTimeButton);
}

/**
 * Creates a dropdown container element.
 * 
 * @returns {HTMLElement} The created dropdown container element.
 */
function createDropdownContainer() {
  const dropdown = document.createElement("div");
  dropdown.classList.add("relative", "inline-block");

  const dropdownButton = document.createElement("button");
  dropdownButton.classList.add("text-xs", "md:text-lg", "px-4", "py-2", "border", "border-neutral-900", "bg-white", "text-neutral-900", "hover:bg-neutral-800", "hover:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-neutral-900");
  dropdownButton.textContent = "More years";
  dropdownButton.addEventListener("click", () => {
    dropdown.classList.toggle("show-dropdown");
  });

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("absolute", "left-0", "mt-1", "w-56", "shadow-lg", "bg-white", "ring-1", "ring-black", "ring-opacity-5", "divide-y", "divide-gray-100", "hidden");
  dropdownContent.setAttribute("hidden", true);

  dropdown.appendChild(dropdownButton);
  dropdown.appendChild(dropdownContent);

  return dropdown;
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
function createDropdownItem(buttonId, buttonText, startDate, endDate) {
  const item = document.createElement("a");
  item.href = "#";
  item.classList.add("block", "px-4", "py-2", "text-sm", "text-gray-700", "hover:bg-gray-100");
  item.textContent = buttonText;
  item.addEventListener("click", (event) => {
    event.preventDefault();
    handleYearButtonLogic(item, startDate, endDate, buttonText);
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
  button.classList.add("text-xs", "md:text-lg", "px-4", "py-2", "mr-3", "border", "border-b-0", "border-neutral-900", "bg-white", "text-neutral-900", "hover:bg-neutral-800", "hover:text-white", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-neutral-900", "js_year_select");
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