// Set readable date options
const readableDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
}

// Find date range elements where data will be inserted
var endDateContents                = document.getElementById("end_date"),
    startDateContents              = document.getElementById("start_date");

// Detect browser’s locale to display human-readable numbers
getUsersLocale = function() {
  return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
}

// Make dates readable for display in the UI
makeDateReadable = function(date) {
  date = date.toLocaleString(getUsersLocale(), readableDateOptions);
  return date;
}

// Do math with days on a date
changeDays = function(numOfDays, date) {
  const dateCopy = new Date(date.getTime());
  dateCopy.setDate(dateCopy.getDate() + numOfDays);
  return dateCopy;
}

// Make numbers readable
makeNumberReadable = function(number) {
  number = number.toLocaleString(getUsersLocale());
  return number;
}

// Format dates into ISO format — used in ElasticSearch query
formatDateToISO = function(date) {
  date = date.toISOString().substring(0, 10);
  return date;
}

// Change start and end dates — used when switching years using pill nav
replaceDateRange = function(newStart, newEnd) {
  startDateContents.textContent = makeDateReadable(newStart);
  endDateContents.textContent = makeDateReadable(newEnd);
  startDate     = changeDays(-1, newStart);
  startDate     = formatDateToISO(startDate);
  endDate       = changeDays(+1, newEnd);
  endDate       = formatDateToISO(endDate);
  dateRange     = `(published_date:>${startDate}%20AND%20published_date:<${endDate})%20AND%20`;
  return dateRange;
}

/* Date display and filtering */
// Utility function to simplify date creation
function createDate(year, month, day) {
  return new Date(year, month, day);
}

// Utility function to format date to ISO string
function formatDateToISO(date) {
  return date.toISOString().split('T')[0];
}

// Utility function to change days in a date
function changeDays(days, date) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Utility function to make date readable
function makeDateReadable(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Set today’s date and 12 months ago date to display most recent Insights data as default
const currentDate = new Date();
const currentDateReadable = makeDateReadable(currentDate);
const currentDateQuery = changeDays(1, currentDate); // add 1 day for ElasticSearch (greater than but not equal)
const currentDateISO = formatDateToISO(currentDateQuery);

const startYearDate = createDate(currentDate.getFullYear(), 0, 1);
const startYearDateReadable = makeDateReadable(startYearDate);
const startYearDateQuery = changeDays(-1, startYearDate);
const startYearDateISO = formatDateToISO(startYearDateQuery);

// Get last year’s start and end date as temporary default
const lastYearStartDate = createDate(currentDate.getFullYear() - 1, 0, 1);
const lastYearStartDateReadable = makeDateReadable(lastYearStartDate);
const lastYearStartDateQuery = changeDays(-1, lastYearStartDate);
const lastYearStartDateISO = formatDateToISO(lastYearStartDate);

const lastYearEndDate = createDate(currentDate.getFullYear() - 1, 11, 31);
const lastYearEndDateReadable = makeDateReadable(lastYearEndDate);
const lastYearEndDateQuery = changeDays(1, lastYearEndDate);
const lastYearEndDateISO = formatDateToISO(lastYearEndDate);

// Fixed end date set for free/non-paying users
const fixedDate = createDate(2023, 2, 31);

// Preset "quick date filter" buttons
const startYearBtn = document.getElementById("start-year");
const lastYearBtn = document.getElementById("last-year");
const twoYearsBtn = document.getElementById("two-years-ago");
const allTimeBtn = document.getElementById("all-time");
const reportDateRange = document.getElementById("report-range");
const reportYear = document.getElementById("report-year");

startYearBtn.textContent = startYearDate.getFullYear();
lastYearBtn.textContent = lastYearStartDate.getFullYear();

// Display default date range since start of the current year
function getDateRangeForUserType() {
  const endDate = paid ? currentDate : fixedDate;
  replaceDateRange(startYearDate, endDate);
}

getDateRangeForUserType();

startYearBtn.addEventListener("click", function() {
  getDateRangeForUserType();
  reportDateRange.textContent = `Since the start of ${startYearDate.getFullYear()}`;
  reportYear.textContent = startYearDate.getFullYear();
  oareport(org);
});

lastYearBtn.addEventListener("click", function() {
  replaceDateRange(lastYearStartDate, lastYearEndDate);
  reportDateRange.textContent = `In ${lastYearStartDate.getFullYear()}`;
  reportYear.textContent = lastYearStartDate.getFullYear();
  oareport(org);
});

// Only paid users can see data from two years ago and all time
// These buttons won’t be displayed for free users
if (twoYearsBtn) {
  const twoYearsStartDate = createDate(currentDate.getFullYear() - 2, 0, 1);
  const twoYearsEndDate = createDate(currentDate.getFullYear() - 2, 11, 31);

  twoYearsBtn.textContent = twoYearsStartDate.getFullYear();
  twoYearsBtn.addEventListener("click", function() {
    replaceDateRange(twoYearsStartDate, twoYearsEndDate);
    reportDateRange.textContent = `In ${twoYearsStartDate.getFullYear()}`;
    reportYear.textContent = twoYearsStartDate.getFullYear();
    oareport(org);
  });
}

if (allTimeBtn) {
  allTimeBtn.addEventListener("click", function() {
    replaceDateRange(createDate(1980, 0, 1), currentDate);
    reportDateRange.textContent = "All time";
    reportYear.textContent = "All time";
    oareport(org);
  });
}

/* Display tab contents on UI tab selection (MD + larger viewports) */
const strategyTabBtns = document.querySelectorAll(".js-tab-btn");

function handleTabBtnClick(event) {
  // If the click event's target is the span inside of <li>, stop the event propagation
  if (event.target.tagName.toLowerCase() === 'span') {
    event.stopPropagation();
    return;
  }

  const tabBtn = event.currentTarget;
  const selectedStrategy = tabBtn.getAttribute("aria-controls");
  const selectedTabContents = document.querySelector(`.js-tab-content-all #${selectedStrategy}`);
  const otherTabContents = document.querySelectorAll(`.js-tab-content:not(#${selectedStrategy})`);
  const otherTabBtns = document.querySelectorAll(`.js-tab-btn:not(#tab_${selectedStrategy})`);


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

/* Year selects */
const quickDateItems = document.querySelectorAll(".js-pill");

function handleQuickDateItemClick(event) {
  event.preventDefault();

  // When unselected
  quickDateItems.forEach((item) => {
    item.classList.remove("bg-neutral-900", "text-white", "font-semibold", "border-carnation-500");
    item.classList.add("bg-white", "text-neutral-900");
  });

  // When selected
  event.target.classList.add("bg-neutral-900", "text-white", "font-semibold", "border-carnation-500");
  event.target.classList.remove("bg-white", "text-neutral-900");
}

quickDateItems.forEach((item) => {
  item.addEventListener("click", handleQuickDateItemClick);
});