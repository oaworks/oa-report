// =================================================
// main.js
// Main event listeners and functions
// =================================================

// =================================================
// Imports
// =================================================

import { bindSmoothScrollLinks, adjustNavOnScroll } from './utils.js';
import { FIRST_YEAR, currentDate, bindDynamicYearButtons, setDefaultYear, initDateManager } from './report-date-manager.js';
import { initDataExplore } from './explore.js';
import { initStrategyTabs } from './strategies.js';

// Flag to check if initDataExplore has already been initialised
let isDataExploreInitialised = false;

// =================================================
// Init
// =================================================

/**
 * Initialises the application by setting up default dates, binding year select buttons, and setting up event listeners.
 */
function initialise() {
  if (isDataExploreInitialised) {
    return;
  }

  // 1) Process URL params and orgkey first
  initDateManager();

  // 2) Initialise Explore; it will wait for dateRange readiness when needed
  const exploreElement = document.getElementById("explore");
  // Check if id="explore" exists to trigger data explore initialisation
  if (exploreElement && !isDataExploreInitialised) {
    initDataExplore(org);
    isDataExploreInitialised = true;
  }

  if (paid) {
    // Only paid reports display a date navigation
    bindDynamicYearButtons(FIRST_YEAR, currentDate.getFullYear()); 
    adjustNavOnScroll();
    bindSmoothScrollLinks(); 
  }

  initStrategyTabs();
}

// Initialise the report when the DOM is ready
document.addEventListener('DOMContentLoaded', initialise);
