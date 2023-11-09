const readableDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
};

// Fetch UI elements for date range
const endDateContents = document.getElementById("end_date"),
      startDateContents = document.getElementById("start_date");

// Detect the user's locale
const userLocale = navigator.languages && navigator.languages.length 
                   ? navigator.languages[0] 
                   : navigator.language;

// ==============================
// Utility functions
// ==============================

/**
 * Replace all instances of a text
 * 
 * @param {string} className - The class name indicating a string where we will be replacing all instances
 *  @param {string} parameter - The content we are replacing instances found with 
 */

function replaceText(className, parameter) {
  document.querySelectorAll(className).forEach(element => element.textContent = parameter);
}

// Helper to format a date into human readable form
function makeDateReadable(date) {
  return date.toLocaleDateString(userLocale, readableDateOptions);
}

// Helper to adjust the date by a given number of days
function changeDays(days, date) {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + days);
  return adjustedDate;
}

// Helper to format a number into human readable form or currency format
function makeNumberReadable(number, isCurrency = false) {
  if (isCurrency) {
    return new Intl.NumberFormat(userLocale, { style: 'currency', currency: 'USD' }).format(number);
  }
  return number.toLocaleString(userLocale);
}

// Helper to format date into ISO format (for ElasticSearch queries)
function formatDateToISO(date) {
  return date.toISOString().split('T')[0];
}

// Define external variables
let dateRange, startYear, endYear;

// Helper to adjust start and end dates (used for yearly navigation)
function replaceDateRange(newStart, newEnd) {
  startYear = newStart.getFullYear();
  endYear = newEnd.getFullYear();
  const startDateISO = formatDateToISO(changeDays(-1, newStart));
  const endDateISO = formatDateToISO(changeDays(1, newEnd));
  dateRange = `(published_date:>${startDateISO}%20AND%20published_date:<${endDateISO})%20AND%20`;
  
  return dateRange;
}

// Create a date utility
function createDate(year, month, day) {
  return new Date(year, month, day);
}

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

// Preset "quick date filter" buttons
const startYearBtn = document.getElementById("start-year");
const lastYearBtn = document.getElementById("last-year");
const twoYearsBtn = document.getElementById("two-years-ago");
const allTimeBtn = document.getElementById("all-time");
const reportDateRange = document.getElementById("report-range");
const reportYear = document.getElementById("report-year");

startYearBtn.textContent = startYearDate.getFullYear();

// Display default date range since start of the current year
function getDateRangeForUserType() {
  const endDate = paid ? currentDate : fixedDate;
  replaceDateRange(startYearDate, endDate);
}

getDateRangeForUserType();

/* Year selection */
const yearButtons = document.querySelectorAll(".js_year_select");

// Sticky year header — add padding when the year is at the top
document.addEventListener("scroll", function() {
  const nav = document.querySelector("#top_nav");
  const rect = nav.getBoundingClientRect();

  // Add 'transition-pb-6' class when the nav is at the top of the viewport
  if (rect.top <= 0) {
    nav.classList.add("shadow-lg");
    nav.classList.add("transition-pb-3");
    nav.classList.add("md:transition-pb-6");
    nav.classList.remove("transition-pb-0");
  } else {
    nav.classList.remove("shadow-lg");
    nav.classList.remove("transition-pb-3");
    nav.classList.remove("md:transition-pb-6");
    nav.classList.add("transition-pb-0");
  }
});

// Bind report’s year select to generate report for that time range
function bindYearButton(button, startDate, endDate, reportText) {
  if (!button) return;

  button.textContent = reportText || startDate.getFullYear();
  button.addEventListener("click", function() {
    replaceDateRange(startDate, endDate);
    reportDateRange.textContent = reportText || `In ${startDate.getFullYear()}`;
    reportYear.textContent = reportText || startDate.getFullYear();
    oareport(org);
  });
}

// Update year buttons when clicked or active/selected
function updateButtonStyling(event) {
  event.preventDefault();

  // TODO: Make the data explorer work with the date range
  // TEMP clear table
  document.getElementById("export_table").classList.add("hidden");

  // When unselected
  yearButtons.forEach((button) => {
    button.classList.remove("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
    button.classList.add("bg-white", "text-neutral-900");
    button.setAttribute("aria-pressed", false);
  });

  // When selected
  event.target.classList.add("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
  event.target.classList.remove("bg-white", "text-neutral-900");
  event.target.setAttribute("aria-pressed", true);
}

yearButtons.forEach((button) => {
  button.addEventListener("click", updateButtonStyling);
});

bindYearButton(startYearBtn, startYearDate, paid ? currentDate : fixedDate);
bindYearButton(lastYearBtn, lastYearStartDate, lastYearEndDate);
bindYearButton(twoYearsBtn, new Date(currentDate.getFullYear() - 2, 0, 1), new Date(currentDate.getFullYear() - 2, 11, 31));
bindYearButton(allTimeBtn, new Date(1980, 0, 1), currentDate, "All time");

/* Display strategy contents strategy button selection (MD + larger viewports) */
const strategyTabBtns = document.querySelectorAll(".js_strategy_btn");

function handleTabBtnClick(event) {
  // If the click event's target is the span inside of <li>, stop the event propagation
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
  tabBtn.addEventListener("click", handleTabBtnClick);
});

/* Modal windows */
class Modal {
  constructor(titleSelector, contentSelector) {
    this.modal = document.querySelector('#dynamic-modal');
    this.closeModalBtn = this.modal.querySelector('.close-modal-btn');
    this.modalTitle = this.modal.querySelector('.modal-title');
    this.modalContent = this.modal.querySelector('.modal-content');

    this.titleSelector = titleSelector;
    this.contentSelector = contentSelector;

    this.closeModalBtn.addEventListener('click', () => this.close());
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });

    // Adding event listener to close the modal on outside click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }

  open() {
    const titleElement = document.querySelector(this.titleSelector);
    const contentElement = document.querySelector(this.contentSelector);
  
    if (titleElement && contentElement) {
      this.modalTitle.textContent = titleElement.textContent;
  
      // Clear the current modal content
      this.modalContent.innerHTML = '';
  
      // Clone the content element and append it to the modal content
      const clonedContent = contentElement.cloneNode(true);
      clonedContent.classList.remove('hidden');
      
      // Update the `for` attribute of labels and `id` of inputs to maintain association
      // This is necessary to ensure that form inputs are still focussed visually 
      // when selecting their corresponding labels (for a11y)
      const labels = clonedContent.querySelectorAll('label');
      labels.forEach((label) => {
        const htmlFor = label.getAttribute('for');
        if (htmlFor) {
          const input = clonedContent.querySelector(`#${htmlFor}`);
          if (input) {
            const newID = `cloned-${htmlFor}`;
            label.setAttribute('for', newID);
            input.id = newID;
          }
        }
      });
  
      this.modalContent.append(clonedContent);
  
      this.modal.classList.remove('hidden');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('overflow-hidden');
      this.closeModalBtn.focus();
    } else {
      console.error('Title or content element not found.');
    }
  }  

  close() {
    this.modal.classList.add('hidden');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  }
}

let currentModal = null;