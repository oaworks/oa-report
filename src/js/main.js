// =================================================
// main.js
// Main event listeners and functions
// =================================================

import { createDate, replaceDateRange, replaceText } from './utils.js';
import { initInsightsAndStrategies, orgApiUrl } from './insights-and-strategies.js';
import { currentActiveExploreItemButton, currentActiveExploreItemData, initDataExplore, processExploreDataTable } from './explore.js';
import { initStrategyTabs } from './strategies.js';

// Constants for date calculations
const currentDate = new Date();
const startYearDate = createDate(currentDate.getFullYear(), 0, 1);
const lastYearStartDate = createDate(currentDate.getFullYear() - 1, 0, 1);
const lastYearEndDate = createDate(currentDate.getFullYear() - 1, 11, 31);
const fixedDate = createDate(2023, 5, 30); // Fixed end date for free/non-paying users

// DOM elements
const startYearBtn = document.getElementById("start-year");
const lastYearBtn = document.getElementById("last-year");
const twoYearsBtn = document.getElementById("two-years-ago");
const allTimeBtn = document.getElementById("all-time");
const reportDateRange = document.getElementById("report-range");
const reportYear = document.getElementById("report-year");

const strategyTabBtns = document.querySelectorAll(".js_strategy_btn");

// Initialisation
document.addEventListener("DOMContentLoaded", initialise);

// Flag to check if initDataExplore has already been initialised
let isDataExploreInitialised = false;

/**
 * Initialises the application by setting up default dates, binding year select buttons, and setting up event listeners.
 */
function initialise() {
  if (isDataExploreInitialised) {
    return;
  }

  setupDateDefaults();
  bindYearSelectionButtons();
  initInsightsAndStrategies(org);

  // Check if the element with id="explore" exists to trigger data explore initialisation
  var exploreElement = document.getElementById("explore");
  if (exploreElement && !isDataExploreInitialised) {
    initDataExplore(org);
    isDataExploreInitialised = true;
  }

  initStrategyTabs();
  adjustNavOnScroll();
}

/**
 * Sets up default dates for the application.
 */
function setupDateDefaults() {
  // Original default for ongoing year
  // getDateRangeForUserType();

  // Temporary change to set the default to last year (2023)
  // Change startYearDate and endDate to last year's start and end dates
  const lastYearStartDate = createDate(2023, 0, 1); // Start of 2023
  const lastYearEndDate = paid ? createDate(2023, 11, 31) : fixedDate; // End of 2023 for paying users, fixed date for non-paying

  replaceDateRange(lastYearStartDate, lastYearEndDate);
  reportDateRange.textContent = `In ${lastYearStartDate.getFullYear()}`;
  reportYear.textContent = lastYearStartDate.getFullYear();

  // To revert back to the original settings, uncomment the first two lines.
}

/**
 * Determines and displays the default date range based on the user's type (paid or free).
 */
export function getDateRangeForUserType() {
  const endDate = paid ? currentDate : fixedDate;  // Assuming 'paid' is a global variable or state
  replaceDateRange(startYearDate, endDate);
}

/**
 * Binds click event listeners to year selection buttons.
 */
function bindYearSelectionButtons() {
  const yearButtons = document.querySelectorAll(".js_year_select");
  yearButtons.forEach(button => {
    button.addEventListener("click", updateYearButtonStyling);
  });

  // Bind specific year buttons
  bindYearButton(startYearBtn, startYearDate, paid ? currentDate : fixedDate);
  bindYearButton(lastYearBtn, lastYearStartDate, lastYearEndDate);
  bindYearButton(twoYearsBtn, createDate(currentDate.getFullYear() - 2, 0, 1), createDate(currentDate.getFullYear() - 2, 11, 31));
  bindYearButton(allTimeBtn, createDate(1980, 0, 1), currentDate, "All time");
}

/**
 * Binds a year selection button to update the report's date range.
 * @param {HTMLElement} button - The button element to bind the click event.
 * @param {Date} startDate - The start date for the report.
 * @param {Date} endDate - The end date for the report.
 * @param {string} [reportText] - The text to display for the report year.
 */
function bindYearButton(button, startDate, endDate, reportText) {
  if (!button) return;

  button.textContent = reportText || startDate.getFullYear();
  button.addEventListener("click", function() {
    replaceDateRange(startDate, endDate);
    reportDateRange.textContent = reportText || `In ${startDate.getFullYear()}`;
    reportYear.textContent = reportText || startDate.getFullYear();
    if (reportYear) replaceText("report_year", reportText || startDate.getFullYear());
    initInsightsAndStrategies(org);
    if (currentActiveExploreItemButton) {
      processExploreDataTable(currentActiveExploreItemButton, currentActiveExploreItemData);
    }
  });
}

/**
 * Updates the styling of year selection buttons upon user interaction (selected or not).
 * @param {Event} event - The event object associated with the click or selection.
 */
function updateYearButtonStyling(event) {
  event.preventDefault();

  const yearButtons = document.querySelectorAll(".js_year_select");
  yearButtons.forEach((button) => {
    button.classList.remove("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
    button.classList.add("bg-white", "text-neutral-900");
    button.setAttribute("aria-pressed", false);
  });

  event.target.classList.add("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
  event.target.classList.remove("bg-white", "text-neutral-900");
  event.target.setAttribute("aria-pressed", true);
}


/**
 * Adjusts the navigation bar's style based on the scroll position.
 * Adds or removes classes to the navigation bar when it reaches the top of the viewport.
 * Adds a shadow to the nav bar, a border to the bottom of the items, and a transition effect.
 */
function adjustNavOnScroll() {
  const nav = document.querySelector("#top_nav");
  const yearButtons = document.querySelectorAll(".js_year_select");

  function adjustNavStyle() {
    const rect = nav.getBoundingClientRect();
    
    if (rect.top <= 0) {
      yearButtons.forEach((button) => { button.classList.add("border-b") });
      nav.classList.add("shadow-lg", "transition-pb-3", "md:transition-pb-6");
      nav.classList.remove("transition-pb-0");
    } else {
      yearButtons.forEach((button) => { button.classList.remove("border-b") });
      nav.classList.remove("shadow-lg", "transition-pb-3", "md:transition-pb-6");
      nav.classList.add("transition-pb-0");
    }
  }

  // Attach the function to the scroll event
  document.addEventListener("scroll", adjustNavStyle);

  // Call the function immediately to check the initial scroll position
  adjustNavStyle();
}

// Start the initialisation process
initialise();