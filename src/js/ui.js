// Set readable date options
const readableDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
}

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

/* Date display and filtering */
// Set today’s date and 12 months ago date to display most recent Insights data as default
const currentDate                  = new Date(),
      currentDateReadable          = makeDateReadable(currentDate),
      currentDateQuery             = changeDays(+1, currentDate), // add 1 day for ElasticSearch (greater than but not equal)
      currentDateISO               = formatDateToISO(currentDateQuery),

      startYearDate                = new Date(new Date().getFullYear(), 0, 1),
      startYearDateReadable        = makeDateReadable(startYearDate),
      startYearDateQuery           = changeDays(-1, startYearDate),
      startYearDateISO             = formatDateToISO(startYearDateQuery),

      // Get last year’s start and end date as temporary default (see oaworks/Gates#420)
      lastYearStartDate            = new Date(new Date().getFullYear()-1, 0, 1),
      lastYearStartDateReadable    = makeDateReadable(lastYearStartDate),
      lastYearStartDateQuery       = changeDays(-1, lastYearStartDate),
      lastYearStartDateISO         = formatDateToISO(lastYearStartDate),

      lastYearEndDate              = new Date(new Date().getFullYear()-1, 11, 31),
      lastYearEndDateReadable      = makeDateReadable(lastYearEndDate),
      lastYearEndDateQuery         = changeDays(+1, lastYearEndDate),
      lastYearEndDateISO           = formatDateToISO(lastYearEndDate),

      // Fixed end date set for free / non-paying users 
      fixedDate                    = new Date('2023-03-31');

// Preset "quick date filter" buttons
var startYearBtn              = document.getElementById("start-year"),
    lastYearBtn               = document.getElementById("last-year"),
    twoYearsBtn               = document.getElementById("two-years-ago"),
    allTimeBtn                = document.getElementById("all-time"),
    insightsDateRange         = document.getElementById("insights_range");

startYearBtn.textContent      = startYearDate.getFullYear();
lastYearBtn.textContent       = lastYearStartDate.getFullYear();

startYearBtn.addEventListener("click", function() {
  getDateRangeForUserType();
  insightsDateRange.textContent = `Since the start of ${startYearDate.getFullYear()}`;
  oareport(org);
})

lastYearBtn.addEventListener("click", function() {
  replaceDateRange(lastYearStartDate, lastYearEndDate);
  insightsDateRange.textContent = `In ${lastYearStartDate.getFullYear()}`;
  oareport(org);
})

// Only paid users can see data from two years ago and all time
// These buttons won’t be displayed for free users
if (twoYearsBtn) {
  // Set dates two years prior to current year
  var twoYearsStartDate         = new Date(new Date().getFullYear()-2, 0, 1),
      twoYearsStartDateReadable = makeDateReadable(twoYearsStartDate),
      twoYearsStartDateQuery    = changeDays(-1, twoYearsStartDate),
      twoYearsStartDateISO      = formatDateToISO(twoYearsStartDate),

      twoYearsEndDate           = new Date(new Date().getFullYear()-2, 11, 31),
      twoYearsEndDateReadable   = makeDateReadable(twoYearsEndDate),
      twoYearsEndDateQuery      = changeDays(+1, twoYearsEndDate),
      twoYearsEndDateISO        = formatDateToISO(twoYearsEndDate);

  twoYearsBtn.textContent = twoYearsStartDate.getFullYear();
  twoYearsBtn.addEventListener("click", function() {
    replaceDateRange(twoYearsStartDate, twoYearsEndDate);
    insightsDateRange.textContent = `In ${twoYearsStartDate.getFullYear()}`;
    oareport(org);
  });
}

if (allTimeBtn) {
  allTimeBtn.addEventListener("click", function() {
    replaceDateRange(new Date(1980, 0, 1), currentDate);
    insightsDateRange.textContent = "All time";
    oareport(org);
  });
}

/* Display tab contents on UI tab selection (MD + larger viewports) */
const strategyTabBtns = document.querySelectorAll(".js-tab-btn");

function handleTabBtnClick(event) {
  const tabBtn = event.target;
  const selectedStrategy = tabBtn.getAttribute("aria-controls");
  const selectedTabContents = document.querySelector(`.js-tab-content-all #${selectedStrategy}`);
  const otherTabContents = document.querySelectorAll(`.js-tab-content:not(#${selectedStrategy})`);
  const otherTabBtns = document.querySelectorAll(`.js-tab-btn:not(#tab_${selectedStrategy})`);

  for (let tabContents of otherTabContents) {
    tabContents.classList.add("hidden");
    tabContents.setAttribute("hidden", true);
  }

  for (let unselectedTabBtn of otherTabBtns) {
    unselectedTabBtn.classList.remove("border-t-neutral-900", "text-neutral-900", "font-bold");
    unselectedTabBtn.classList.add("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
    unselectedTabBtn.setAttribute("aria-selected", "false");
    unselectedTabBtn.setAttribute("tabindex", "-1");
  }

  selectedTabContents.classList.remove("hidden");
  selectedTabContents.removeAttribute("hidden");

  tabBtn.classList.add("border-t-neutral-900", "text-neutral-900", "font-bold");
  tabBtn.classList.remove("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
  tabBtn.setAttribute("aria-selected", "true");
  tabBtn.setAttribute("tabindex", "0");
}

strategyTabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener("click", handleTabBtnClick);
});

/* Quick selects pills */
const quickDateItems = document.querySelectorAll(".js-pill");

function handleQuickDateItemClick(event) {
  event.preventDefault();

  quickDateItems.forEach((item) => {
    item.classList.remove("bg-neutral-900", "text-white");
    item.classList.add("bg-neutral-200", "text-neutral-900");
  });

  event.target.classList.add("bg-neutral-900", "text-white");
  event.target.classList.remove("bg-neutral-200", "text-neutral-900");
}

quickDateItems.forEach((item) => {
  item.addEventListener("click", handleQuickDateItemClick);
});