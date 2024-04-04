// =================================================
// main.js
// Main event listeners and functions
// =================================================

import { bindSmoothScrollLinks, adjustNavOnScroll } from './utils.js';
import { DEFAULT_YEAR, FIRST_YEAR, currentDate, bindDynamicYearButtons, setDefaultYear } from './report-date-manager.js';
import { initDataExplore } from './explore.js';
import { initStrategyTabs } from './strategies.js';


// Flag to check if initDataExplore has already been initialised
let isDataExploreInitialised = false;

/**
 * Initialises the application by setting up default dates, binding year select buttons, and setting up event listeners.
 */
function initialise() {
  if (isDataExploreInitialised) {
    return;
  }
  
  // Check if the element with id="explore" exists to trigger data explore initialisation
  var exploreElement = document.getElementById("explore");
  if (exploreElement && !isDataExploreInitialised) {
    initDataExplore(org);
    isDataExploreInitialised = true;
  }

  setDefaultYear(DEFAULT_YEAR);

  if (paid) {
    // Only paid reports display a date navigation
    bindDynamicYearButtons(FIRST_YEAR, currentDate.getFullYear()); 
    adjustNavOnScroll();
    bindSmoothScrollLinks(); 
  }

  initStrategyTabs();
}

// Initialise the report when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  /**
   * Initialises the application after orgkey processing.
   * This function acts as a callback for the custom 'orgkeyProcessed' event. It ensures that the application
   * initialisation proceeds only after any necessary orgkey processing has been completed.
   * The event listener for 'orgkeyProcessed' is removed to prevent duplicate initialisations.
   */
  function initAfterOrgKeyProcessed() {
    // Remove the event listener to avoid the possibility of the 
    // initialisation function being called more than once.
    window.removeEventListener('orgkeyProcessed', initAfterOrgKeyProcessed);
    initialise();
  }

  // Attempt to initialise immediately if the 'orgkey' URL parameter is not present.
  if (!window.location.search.includes('orgkey=')) {
    initialise();
  } else {
    // If 'orgkey' is present, wait for the custom event indicating that 'orgkey' processing is complete.
    window.addEventListener('orgkeyProcessed', initAfterOrgKeyProcessed);
  }
});
