// =================================================
// report-date-manager.js
// 
// =================================================

import { DATE_SELECTION_BUTTON_CLASSES } from './constants.js';
import { makeDateReadable, createDate, replaceDateRange, initDropdown, getAllURLParams, getURLParam, updateURLParams, removeURLParams, dateRange } from './utils.js';
import { initInsightsAndStrategies } from './insights-and-strategies.js';
import { currentActiveExploreItemButton, currentActiveExploreItemData, processExploreDataTable } from './explore.js';


/** 
 * The current date, used across the application to determine the current context or as a default value.
 * @constant {Date}
 */
export const currentDate = new Date();

/** 
 * The default year for paid users, used as the starting point for reports.
 * @constant {number}
 */
export const DEFAULT_YEAR = 2025;

/** 
 * The default year for free users, usually set to one year behind the paid users' default.
 * It indicates the latest year for which free users can access reports.
 * @constant {number}
 */
export const DEFAULT_YEAR_FREE = 2023;

/** 
 * The first year for which data is available in the application, used to populate year selection options and to limit date range selections.
 * @constant {number}
 */
export const FIRST_YEAR = 2015;

/**
 * Determines if the current date is in Q2 or later of the current year.
 * @returns {boolean} True if the current date is on or after April 1 of the current year, false otherwise.
 */
function isQuarterTwoOrLater() {
  const currentMonth = currentDate.getMonth();
  return currentMonth >= 3; // Q2 starts in April (Month 3)
}

/**
 * Sets up the default year for the application, depending on whether the user is a paid user or not.
 */
export function setDefaultYear() {
  const startParam = getURLParam('start');
  const endParam = getURLParam('end');

  // Check if there’s a start and end date in the URL
  // TODO: handle start and end date parameters in a separate function and similar to how
  // the breakdown parameter is handled
  if (startParam && endParam) {
    // Attempt to load date range from URL parameters
    // Interpret both dates as UTC noon to avoid timezone issues, see oaworks/discussion#2744
    const startDate = new Date(`${startParam}T12:00:00Z`);
    const endDate = new Date(`${endParam}T12:00:00Z`);

    // Replace the date range, if present, with the one from the URL
    const dateRangeForm = document.getElementById("date_range_form");
    if (dateRangeForm) {
      document.getElementById('start-date').value = startDate.toISOString().split('T')[0];
      document.getElementById('end-date').value = endDate.toISOString().split('T')[0];
    }

    let elementToUpdate;
    let buttonText;

    const isWholeYear =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === 0 &&
      startDate.getDate() === 1 &&
      endDate.getMonth() === 11 &&
      endDate.getDate() === 31;

    if (isWholeYear) {
      elementToUpdate = document.getElementById(`year-${startDate.getFullYear()}`);
      buttonText = `${startDate.getFullYear()}`;
    } else {
      elementToUpdate = document.getElementById("date_range_form");
      buttonText = `${makeDateReadable(startDate)} &ndash; ${makeDateReadable(endDate)}`;
    }

    // Trigger any additional logic needed to refresh the report and style the control
    handleYearButtonLogic(elementToUpdate, startDate, endDate, buttonText);

    // If this is a year that lives in the More dropdown, update the visible label
    if (elementToUpdate && elementToUpdate.classList.contains("js_dropdown_item")) {
      const dropdownButton = document.querySelector(".js_dropdown_button");
      if (dropdownButton) {
        dropdownButton.innerHTML = `${startDate.getFullYear()} <span class='ml-1 text-xs'>&#9660;</span>`;
      }
    }
  } else {
    // Otherwise, set default dates or years based on user type
    let defaultStartDate, defaultEndDate;

    if (paid) {
      // For paid users, use the full year unless it's Q2 or later
      if (isQuarterTwoOrLater()) {
        // Switch to the current year for Q2 and beyond
        defaultStartDate = createDate(currentDate.getFullYear(), 0, 1); // Jan 1 of the current year
        defaultEndDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())); // Today’s date
      } else {
        // Default to the previous year
        defaultStartDate = createDate(DEFAULT_YEAR, 0, 1); // January 1st
        defaultEndDate = createDate(DEFAULT_YEAR, 11, 31); // December 31st
      }
    } else {
      // For non-paid users, restrict the date range from Jan 1 to Jun 30 of DEFAULT_YEAR_FREE
      defaultStartDate = createDate(DEFAULT_YEAR_FREE, 0, 1); // January 1st
      defaultEndDate = createDate(DEFAULT_YEAR_FREE, 5, 30); // June 30th
    }

    replaceDateRange(defaultStartDate, defaultEndDate);

    // Select the default year button and style it as selected
    const defaultButton = document.getElementById(`year-${DEFAULT_YEAR}`);
    if (defaultButton) {
      handleYearButtonLogic(defaultButton, defaultStartDate, defaultEndDate, `${DEFAULT_YEAR}`);
      updateYearButtonStyling(defaultButton);
    } else {
      // TO FIX: free reports don’t have a defaultButton
      handleYearButtonLogic(null, defaultStartDate, defaultEndDate, `${makeDateReadable(defaultStartDate)} &ndash; ${makeDateReadable(defaultEndDate)}`);
    }
  }
}

/**
 * Initialises date-related parameters and UI elements.
 */
export function initDateManager() {
  const params = getAllURLParams();

  // Early logout guard (in case scripts load in a different order)
  if (getURLParam('logout')) {
    try { sessionStorage.removeItem('orgkey'); } catch (_) {}
  }

  // Process orgkey first
  const orgkey = getURLParam('orgkey');
  if (orgkey) {
    sessionStorage.setItem('orgkey', orgkey);
    delete params.orgkey; // remove orgkey from params to avoid duplication
  }

  // Process other parameters
  const start = params.start;
  const end = params.end;
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Update the UI with these dates if the elements exist
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    if (startDateInput && endDateInput) {
      startDateInput.value = startDate.toISOString().split('T')[0];
      endDateInput.value = endDate.toISOString().split('T')[0];
    }
  }

  // Update the URL without losing parameters
  updateURLParams(params);

  // Remove orgkey from URL after processing
  if (orgkey) removeURLParams('orgkey');
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
export function bindDynamicYearButtons(startYear, endYear, visibleYears = 3) {
  const yearsContainer = document.getElementById("js-year-buttons");
  const currentYear = new Date().getFullYear(); // Get current year
  const currentDate = new Date(); // Get current date
  const { dropdown, dropdownContent, dropdownButton } = createDropdownContainer("date_range_more_dropdown");

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
      // Determine if the year button should be active or disabled based on free or paid reports
      let element = createYearButton(buttonId, buttonText, startDate, endDate);
      yearsContainer.appendChild(element);
    } else {
      // For dropdown items (i.e. years outside the visible range)
      const dropdownItem = createDropdownItem(buttonId, buttonText, startDate, endDate, dropdownButton);
      dropdownContent.appendChild(dropdownItem);
    }
  }

  // Append the dropdown container only if it has items
  if (dropdownContent.hasChildNodes()) {
    yearsContainer.appendChild(dropdown); // Append the entire dropdown structure
  }

  // Create an 'All time' button with a fixed start date and the current date as the end date
  let allTimeButton = createYearButton("all-time", "All time", createDate(1980, 0, 1), currentDate);
  yearsContainer.appendChild(allTimeButton);

  // Create and append the date range form for paid users, initialise the dropdown menu
  if (paid) {
    const dateRangeForm = createDateRangeForm();
    yearsContainer.appendChild(dateRangeForm); // Append the form to the container
    initDropdown(".js_dropdown");
  }

  setDefaultYear();
}

/**
 * Creates a dropdown container element.
 * 
 * @returns {HTMLElement} The created dropdown container element.
 */
function createDropdownContainer(id = null) {
  const dropdown = document.createElement("div");
  dropdown.className = DATE_SELECTION_BUTTON_CLASSES.enabled + " relative inline-block px-3 js_dropdown";

  const dropdownButton = document.createElement("button");
  dropdownButton.className = "h-full w-full js_dropdown_button";
  if (id) dropdownButton.id = id;
  dropdownButton.setAttribute("aria-haspopup", "true");
  dropdownButton.setAttribute("aria-expanded", "false");
  dropdownButton.innerHTML = "More <span class='sr-only'>years</span> <span class='ml-1 text-xs'>&#9660;</span>";

  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("absolute", "left-0", "mt-1", "w-full", "shadow-lg", "bg-white", "focus:outline-none",  "focus:ring-2", "focus:ring-offset-2", "focus:ring-neutral-900", "divide-y", "divide-neutral-200", "hidden", "js_dropdown_content");
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
 * @param {HTMLButtonElement} dropdownButton - The visible "More" button whose label/style we update.
 * @returns {HTMLButtonElement} The created dropdown item element.
 */
function createDropdownItem(buttonId, buttonText, startDate, endDate, dropdownButton) {
  const item = document.createElement("button");
  item.id = buttonId;
  item.type = "button";

  item.className =
    "js_dropdown_item block w-full px-4 py-2 text-left text-xs md:text-sm " +
    "bg-white text-neutral-900 hover:bg-carnation-100 focus:outline-none focus:bg-carnation-100";

  item.textContent = buttonText;

  item.addEventListener("click", (event) => {
    event.preventDefault();

    // Update URL with the selected year
    updateURLParams({
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0]
    });

    // Apply the date range + refresh reports and style via the dropdown container
    handleYearButtonLogic(item, startDate, endDate, buttonText);

    // Update visible label on the More chip
    dropdownButton.innerHTML = `${buttonText} <span class='ml-1 text-xs'>&#9660;</span>`;

    // Close the dropdown
    const dropdownContainer = dropdownButton.closest(".js_dropdown");
    const dropdownContent = dropdownContainer?.querySelector(".js_dropdown_content");
    if (dropdownContent) {
      dropdownContent.classList.add("hidden");
      dropdownContent.setAttribute("hidden", "true");
    }
    dropdownButton.setAttribute("aria-expanded", "false");
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
  button.className = DATE_SELECTION_BUTTON_CLASSES.enabled + " px-3";
  button.setAttribute("aria-pressed", buttonText === `${DEFAULT_YEAR}` ? "true" : "false");

  // Add event listener
  button.addEventListener("click", function() {
    // Reset the date range form when a year button is clicked
    document.getElementById('date_range_form').reset();

    // Update URL with the selected year
    updateURLParams({ 
      'start': startDate.toISOString().split('T')[0], 
      'end': endDate.toISOString().split('T')[0] 
    });

    handleYearButtonLogic(button, startDate, endDate, buttonText);
  });

  return button;
}

/**
 * Creates a form with two date input fields for selecting a custom date range,
 * ensuring a11y compliance.
 * 
 * @returns {HTMLElement} The created form element with date inputs and a submit button.
 *
 */
function createDateRangeForm() {
  // Form container
  const form = document.createElement("form");
  form.id = "date_range_form";
  form.className = DATE_SELECTION_BUTTON_CLASSES.enabled + " flex items-center whitespace-nowrap";
  form.setAttribute("aria-labelledby", "js-date-range-form-title");

  // Title for the form (for screen readers)
  const formTitle = document.createElement("h2");
  formTitle.id = "js-date-range-form-title";
  formTitle.textContent = "Select custom date range";
  formTitle.className = "sr-only";
  form.appendChild(formTitle);

  // Hidden inputs kept for compatibility
  const hiddenStart = document.createElement("input");
  hiddenStart.type = "hidden";
  hiddenStart.id = "start-date";
  hiddenStart.name = "start";
  form.appendChild(hiddenStart);

  const hiddenEnd = document.createElement("input");
  hiddenEnd.type = "hidden";
  hiddenEnd.id = "end-date";
  hiddenEnd.name = "end";
  form.appendChild(hiddenEnd);

  // Trigger button to open the popover
  const triggerBtn = document.createElement("button");
  triggerBtn.type = "button";
  triggerBtn.innerHTML = "Custom date range <span class='ml-1 text-xs'>▼</span>";
  triggerBtn.setAttribute("aria-haspopup", "dialog");
  triggerBtn.setAttribute("aria-expanded", "false");
  triggerBtn.style.color = "inherit";
  form.appendChild(triggerBtn);

  // Custom date range popover content
  const pop = document.createElement("div");
  pop.className = "p-2 md:p-3 text-xs md:text-sm";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-labelledby", "js-date-range-form-title");

  // Create labelled inputs, but give them distinct IDs
  const startField = createDateInput("start-date-pop", "From");
  const endField = createDateInput("end-date-pop", "To");
  startField.className = "mb-3 p-2 flex items-center justify-between";
  endField.className = "mb-3 p-2 flex items-center justify-between";
  pop.appendChild(startField);
  pop.appendChild(endField);

  // Apply button inside the popover
  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.className = "block p-2 border rounded-sm mt-1 mr-1 md:mt-0 md:mr-3 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 hover:bg-carnation-100 js-nav-chip";
  applyBtn.textContent = "Apply";
  pop.appendChild(applyBtn);

  // Initialise a dedicated Tippy instance
  const tip = tippy(triggerBtn, {
    content: pop,
    allowHTML: true,
    interactive: true,
    placement: "bottom",
    appendTo: document.body,
    trigger: "click",
    theme: "popover",
    arrow: false,
    onShow() {
      triggerBtn.setAttribute("aria-expanded", "true");
      // Prefill popover inputs from hidden values (if any)
      const s = /** @type {HTMLInputElement|null} */ (document.getElementById("start-date"));
      const e = /** @type {HTMLInputElement|null} */ (document.getElementById("end-date"));
      const sPop = /** @type {HTMLInputElement|null} */ (document.getElementById("start-date-pop"));
      const ePop = /** @type {HTMLInputElement|null} */ (document.getElementById("end-date-pop"));
      if (s && sPop) sPop.value = s.value || "";
      if (e && ePop) ePop.value = e.value || "";
    },
    onHide() { triggerBtn.setAttribute("aria-expanded", "false"); }
  });

  // Handle Apply: validate, update URL, sync hidden inputs, call existing handlers, close
  applyBtn.addEventListener("click", () => {
    const sPop = /** @type {HTMLInputElement|null} */ (document.getElementById("start-date-pop"));
    const ePop = /** @type {HTMLInputElement|null} */ (document.getElementById("end-date-pop"));
    if (!sPop || !ePop) return;

    const startDate = new Date(sPop.value);
    const endDate = new Date(ePop.value);

    // Validate dates
    if (!sPop.value || !ePop.value) {
      console.log("Please select both start and end dates.");
      return;
    }
    if (startDate > endDate) {
      console.log("Start date must be before end date.");
      return;
    }

    // Update URL with query parameters (YYYY-MM-DD via toISOString split as before)
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("start", startDate.toISOString().split("T")[0]);
    queryParams.set("end", endDate.toISOString().split("T")[0]);
    history.pushState(null, "", "?" + queryParams.toString());

    // Sync hidden inputs so existing code sees them
    hiddenStart.value = sPop.value;
    hiddenEnd.value = ePop.value;

    // Build label and invoke existing handlers
    handleYearButtonLogic(
      null,
      startDate,
      endDate,
      `${makeDateReadable(startDate)} &ndash; ${makeDateReadable(endDate)}`
    );
    updateYearButtonStyling(form, true);

    // Close the popover
    if (tip && tip[0]) tip[0].hide();
  });

  return form;
}

/**
 * Creates a date input field with a label, ensuring a11y compliance.
 * 
 * @param {string} id - The ID to be assigned to the input field.
 * @param {string} label - The label text for the input field.
 * @returns {HTMLElement} The created input field with label.
 */
function createDateInput(id, label) {
  const wrapper = document.createElement("div");

  const labelElement = document.createElement("label");
  labelElement.htmlFor = id;
  labelElement.textContent = label;
  labelElement.className = "mr-3 font-semibold uppercase text-xs";
  wrapper.appendChild(labelElement);

  const input = document.createElement("input");
  input.type = "date";
  input.id = id;
  input.className = "mr-4 text-xs md:text-sm md:text-center uppercase bg-transparent"; 
  input.setAttribute('aria-label', label);
  input.setAttribute('required', true);
  wrapper.appendChild(input);

  return wrapper;
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
  // Check if the button is null or not
  const isDropdownItem = button && button.classList.contains('js_dropdown_item');

  // Reset the dropdown if a visible year button is clicked and it's not a dropdown item
  // We only need to do this for paid reports
  // ...free ones don’t have the option to select other dates or years
  if (!isDropdownItem && paid) {
    resetDropdown();
  }

  replaceDateRange(startDate, endDate);
  initInsightsAndStrategies(org);
  if (currentActiveExploreItemButton) {
    processExploreDataTable(currentActiveExploreItemButton, currentActiveExploreItemData);
  }

  // Only update styling if button is not null
  if (button) {
    updateYearButtonStyling(button, isDropdownItem);
  }
}

/**
 * Updates the styling of year selection buttons and resets styles for all other year buttons and dropdown items.
 *
 * @param {HTMLElement} selectedElement - The element (can be a button, div, or form) that was selected.
 * @param {boolean} isDropdownItem - Indicates whether the selected button is a dropdown item.
 */
function updateYearButtonStyling(selectedElement, isDropdownItem = false) {
  // Derive class differences from the constants so we don't manually juggle Tailwind classes
  const enabledClasses = DATE_SELECTION_BUTTON_CLASSES.enabled.split(' ');
  const activeClasses  = DATE_SELECTION_BUTTON_CLASSES.active.split(' ');

  // Classes that only belong to one state or the other
  const activeOnlyClasses  = activeClasses.filter(c => !enabledClasses.includes(c));
  const enabledOnlyClasses = enabledClasses.filter(c => !activeClasses.includes(c));

  // Reset styles for all chips (years, All time, date-range form, Clear filters, etc.)
  const yearButtons = document.querySelectorAll(".js-nav-chip");

  yearButtons.forEach((button) => {
    // Remove active-only styles, restore enabled-only styles
    button.classList.remove(...activeOnlyClasses);
    button.classList.add(...enabledOnlyClasses);

    if (button.tagName.toLowerCase() === "button") {
      button.setAttribute("aria-pressed", "false");
    }

    const parentDropdown = button.closest(".js_dropdown");
    if (parentDropdown) {
      parentDropdown.classList.remove(...activeOnlyClasses);
      parentDropdown.classList.add(...enabledOnlyClasses);
    }
  });

  if (!selectedElement) return;

  // For normal chips (not the inner dropdown toggle button, not dropdown items), apply active styles
  if (!selectedElement.classList.contains("js_dropdown_button") && !isDropdownItem) {
    selectedElement.classList.remove(...enabledOnlyClasses, "opacity-50");
    selectedElement.classList.add(...activeOnlyClasses);

    if (selectedElement.tagName.toLowerCase() === "button") {
      selectedElement.setAttribute("aria-pressed", "true");
    }
  }

  // If the selected "chip" is actually the date range form, style its internals
  if (selectedElement.tagName.toLowerCase() === "form") {
    const labels = selectedElement.querySelectorAll("label");
    labels.forEach((label) => {
      label.classList.add("text-white");
    });

    const inputs = selectedElement.querySelectorAll("input");
    inputs.forEach((input) => {
      input.classList.add("text-white", "bg-neutral-900", "border-neutral-900");
    });
  }

  // If the selected element came from the dropdown list, style the visible dropdown container instead
  if (isDropdownItem) {
    const dropdownContainer = selectedElement.closest(".js_dropdown");
    if (dropdownContainer) {
      dropdownContainer.classList.remove(...enabledOnlyClasses);
      dropdownContainer.classList.add(...activeOnlyClasses);
    }
  }
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
    dropdownButton.innerHTML = `More <span class='sr-only'>years</span> <span class='ml-1 text-xs'>&#9660;</span>`;
  }

  // Reset styling for all dropdown items to their original state
  const dropdownItems = document.querySelectorAll('.js_dropdown_item');
  dropdownItems.forEach((item) => {
    item.classList.remove("bg-neutral-900", "text-white", "font-semibold", "border-neutral-900");
    item.classList.add("bg-white", "text-neutral-900");
  });

  // The date range form may not exist yet depending on init order
  const dateRangeForm = document.getElementById("date_range_form");
  if (!dateRangeForm) return;

  const labels = dateRangeForm.querySelectorAll('label');
  labels.forEach((label) => {
    label.classList.remove("text-white");
  });

  const inputs = dateRangeForm.querySelectorAll('input');
  inputs.forEach((input) => {
    input.classList.remove("text-white", "bg-neutral-900", "border-neutral-900");
  });
}

/**
 * Returns true if `dateRange` is usable in queries.
 * @returns {boolean}
 */
function isDateRangeReady() {
  return typeof dateRange === 'string' && dateRange.includes('published_date');
}

/**
 * Resolves once a usable `dateRange` is available.
 * 
 * Listens for the `oar:dateRangeReady` event, which signals that the
 * range has been set. If the event was already sent before this function
 * started listening, also checks at short intervals to avoid missing it.
 *
 * @param {number} [timeoutMs=1500] - Maximum time to wait before rejecting.
 * @returns {Promise<string>} The final dateRange string.
 */
export function awaitDateRange(timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    if (isDateRangeReady()) return resolve(dateRange);

    let settled = false;
    const onReady = (e) => {
      if (settled) return;
      settled = true;
      window.removeEventListener('oar:dateRangeReady', onReady);
      resolve(e?.detail?.dateRange ?? dateRange);
    };

    window.addEventListener('oar:dateRangeReady', onReady, { once: true });

    // Safety net: light polling in case we missed the event.
    const start = performance.now();
    (function tick() {
      if (settled) return;
      if (isDateRangeReady()) {
        settled = true;
        window.removeEventListener('oar:dateRangeReady', onReady);
        return resolve(dateRange);
      }
      if (performance.now() - start >= timeoutMs) {
        window.removeEventListener('oar:dateRangeReady', onReady);
        return reject(new Error('awaitDateRange: timed out'));
      }
      setTimeout(tick, 50);
    })();
  });
}

