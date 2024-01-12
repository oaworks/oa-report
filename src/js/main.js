// =================================================
// main.js
// Main event listeners and functions
// =================================================

import { createDate, bindSmoothScrollLinks } from './utils.js';
import { DEFAULT_YEAR, currentDate, bindDynamicYearButtons, setDefaultYear } from './report-date-manager.js';
import { initInsightsAndStrategies } from './insights-and-strategies.js';
import { initDataExplore } from './explore.js';
import { initStrategyTabs } from './strategies.js';

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
  
  // Set the default year
  setDefaultYear(DEFAULT_YEAR);
  bindDynamicYearButtons(2019, currentDate.getFullYear()); 

  initInsightsAndStrategies(org);

  // Check if the element with id="explore" exists to trigger data explore initialisation
  var exploreElement = document.getElementById("explore");
  if (exploreElement && !isDataExploreInitialised) {
    initDataExplore(org);
    isDataExploreInitialised = true;
  }

  // Add general page interactivity 
  initStrategyTabs();
  adjustNavOnScroll();
  bindSmoothScrollLinks(); 
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
      yearButtons.forEach((button) => { button.classList.add("md:border-b") });
      nav.classList.add("shadow-lg", "transition-pb-3", "md:transition-pb-6");
      nav.classList.remove("transition-pb-0");
    } else {
      yearButtons.forEach((button) => { button.classList.remove("md:border-b") });
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