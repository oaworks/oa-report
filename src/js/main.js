// =================================================
// main.js
// Main event listeners and functions
// =================================================,

import { makeDateReadable, changeDays, formatDateToISO, createDate, replaceDateRange, replaceText } from './utils.js';
import { initInsightsAndStrategies, orgApiUrl } from './insights-and-strategies.js';
import { currentActiveExploreItemButton, currentActiveExploreItemData, initDataExplore, processExploreDataTable } from './explore.js';

// Get year button nav elements
const yearButtons = document.querySelectorAll(".js_year_select");

// Get statregy button nav elements
const strategyTabBtns = document.querySelectorAll(".js_strategy_btn");

// Set today's date and a date from 12 months ago for default data display
const currentDate = new Date();
const currentDateReadable = makeDateReadable(currentDate);
const currentDateQuery = changeDays(1, currentDate); 
const currentDateISO = formatDateToISO(currentDateQuery);

const startYearDate = createDate(currentDate.getFullYear(), 0, 1);
const startYearDateReadable = makeDateReadable(startYearDate);
const startYearDateQuery = changeDays(-1, startYearDate);
const startYearDateISO = formatDateToISO(startYearDateQuery);

// Get start and end dates for the last year as defaults
const lastYearStartDate = createDate(currentDate.getFullYear() - 1, 0, 1);
const lastYearStartDateReadable = makeDateReadable(lastYearStartDate);
const lastYearStartDateQuery = changeDays(-1, lastYearStartDate);
const lastYearStartDateISO = formatDateToISO(lastYearStartDateQuery);

const lastYearEndDate = createDate(currentDate.getFullYear() - 1, 11, 31);
const lastYearEndDateReadable = makeDateReadable(lastYearEndDate);
const lastYearEndDateQuery = changeDays(1, lastYearEndDate);
const lastYearEndDateISO = formatDateToISO(lastYearEndDateQuery);

// Fixed end date set for free/non-paying users
const fixedDate = createDate(2023, 5, 30);

// Year selection 
const startYearBtn = document.getElementById("start-year");
const lastYearBtn = document.getElementById("last-year");
const twoYearsBtn = document.getElementById("two-years-ago");
const allTimeBtn = document.getElementById("all-time");
const reportDateRange = document.getElementById("report-range");
const reportYear = document.getElementById("report-year");

startYearBtn.textContent = startYearDate.getFullYear();

// Aggregation selection
const aggType = document.querySelectorAll(".explore_type");;
const aggYear = document.querySelectorAll(".report_year");

/**
 * Displays the default date range from the start of the current year.
 * The end date is determined based on the user's (paid or free) status.
 */
function getDateRangeForUserType() {
  const endDate = paid ? currentDate : fixedDate;
  replaceDateRange(startYearDate, endDate);
}

getDateRangeForUserType();

/**
 * Adjusts the navigation bar's style based on the scroll position.
 * Adds or removes classes to the navigation bar when it reaches the top of the viewport.
 */
function adjustNavOnScroll() {
  const nav = document.querySelector("#top_nav");
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
document.addEventListener("scroll", adjustNavOnScroll);

// Call the function immediately to check the initial scroll position
adjustNavOnScroll();

/**
 * Binds a year selection button to update the report's date range.
 * Updates the displayed date range and report text when the button is clicked.
 *
 * @param {HTMLElement} button - The button element to bind the click event.
 * @param {Date} startDate - The start date for the report.
 * @param {Date} endDate - The end date for the report.
 * @param {string} reportText - The text to display for the report year.
 */
function bindYearButton(button, startDate, endDate, reportText) {
  if (!button) return;

  button.textContent = reportText || startDate.getFullYear();
  button.addEventListener("click", function() {
    replaceDateRange(startDate, endDate);
    reportDateRange.textContent = reportText || `In ${startDate.getFullYear()}`;
    reportYear.textContent = reportText || startDate.getFullYear();
    if (aggYear) replaceText("report_year", reportText || startDate.getFullYear());
    initInsightsAndStrategies(org);
    if (currentActiveExploreItemButton) {
      processExploreDataTable(currentActiveExploreItemButton, currentActiveExploreItemData);
    }
  });
}

bindYearButton(startYearBtn, startYearDate, paid ? currentDate : fixedDate);
bindYearButton(lastYearBtn, lastYearStartDate, lastYearEndDate);
bindYearButton(twoYearsBtn, new Date(currentDate.getFullYear() - 2, 0, 1), new Date(currentDate.getFullYear() - 2, 11, 31));
bindYearButton(allTimeBtn, new Date(1980, 0, 1), currentDate, "All time");

/**
 * Updates the styling of year selection buttons upon user interaction (selected or not).
 *
 * @param {Event} event - The event object associated with the click or selection.
 */
function updateYearButtonStyling(event) {
  event.preventDefault();

  yearButtons.forEach((button) => {
    button.classList.remove("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
    button.classList.add("bg-white", "text-neutral-900");
    button.setAttribute("aria-pressed", false);
  });

  event.target.classList.add("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
  event.target.classList.remove("bg-white", "text-neutral-900");
  event.target.setAttribute("aria-pressed", true);
}

yearButtons.forEach((button) => {
  button.addEventListener("click", updateYearButtonStyling);
});

/**
 * Handles click events on tab buttons to switch between different tabs.
 * This function controls the display of tab content and updates the appearance of tabs based on the selected state.
 *
 * @param {Event} event - The click event object.
 */
function updateStrategyButtonStyling(event) {
  // Check if the target is a span and stop propagation if so
  if (event.target.tagName.toLowerCase() === 'span') {
    event.stopPropagation();
    return;
  }

  const tabBtn = event.currentTarget;
  const selectedStrategy = tabBtn.getAttribute("aria-controls");
  const selectedTabContents = document.querySelector(`.js_strategies #${selectedStrategy}`);
  const otherTabContents = document.querySelectorAll(`.js_strategy:not(#${selectedStrategy})`);
  const otherTabBtns = document.querySelectorAll(`.js_strategy_btn:not(#strategy_${selectedStrategy})`);

  // When unselected
  for (let tabContents of otherTabContents) {
    tabContents.classList.add("hidden");
    tabContents.setAttribute("hidden", true);
  }

  for (let unselectedTabBtn of otherTabBtns) {
    unselectedTabBtn.classList.remove("bg-carnation-300", "font-semibold");
    unselectedTabBtn.classList.add("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
    unselectedTabBtn.setAttribute("aria-selected", "false");
    unselectedTabBtn.setAttribute("tabindex", "-1");
  }

  // When selected
  selectedTabContents.classList.remove("hidden");
  selectedTabContents.removeAttribute("hidden");

  tabBtn.classList.add("bg-carnation-300", "font-semibold");
  tabBtn.classList.remove("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
  tabBtn.setAttribute("aria-selected", "true");
  tabBtn.setAttribute("tabindex", "0");
}

strategyTabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener("click", updateStrategyButtonStyling);
});

// Main event listener
document.addEventListener("DOMContentLoaded", function() {
  initInsightsAndStrategies(org);
  initDataExplore(org);
  console.log(orgApiUrl);
});