// =================================================
// main.js
// Main event listeners and functions
// =================================================

import { bindSmoothScrollLinks, adjustNavOnScroll, displayNone } from './utils.js';
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

  oaKeys();
  updateLoginState(org);
  handleURLParameters();
  
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
document.addEventListener('DOMContentLoaded', initialise);

/**
 * Manages OAKeys cookies and updates the global OAKEYS based on URL parameters.
 * This function extracts the 'orgkey' from the URL to manage login sessions
 * and removes it from the URL for security reasons, preserving other URL parameters.
 */
function oaKeys() {
  var _OAcookie, ck, o;

  _OAcookie = function(obj) {
    var c, d, domain, expires, i, len, ref, t;
    if (obj != null) {
      domain = '.' + window.location.host;
      if (domain.startsWith('.bg.')) {
        domain = domain.replace('.bg.', '.');
      }
      t = 'OAKeys=';
      if (obj) {
        t += encodeURIComponent(JSON.stringify(obj)); // so if values is false or '' this will effectively remove the cookie
        expires = 365;
      } else {
        expires = -1;
      }
      d = new Date();
      d.setDate(d.getDate() + expires);
      t += '; expires=' + new Date(d).toUTCString();
      t += '; domain=' + domain + '; secure';
      document.cookie = t;
      return t;
    } else {
      ref = document.cookie.split(';');
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf('OAKeys=') !== -1) {
          return JSON.parse(decodeURIComponent(c.substring(7, c.length)));
        }
      }
      return false;
    }
  };

  ck = _OAcookie();

  window.OAKEYS = typeof ck === 'object' ? ck : {};

  const url = new URL(window.location);
  const params = url.searchParams;
  const orgKeyValue = params.get('orgkey');

  // Add orgkey value to window.OAKEYS using the global 'org' variable and update cookie
  if (orgKeyValue && typeof org !== 'undefined') {
      window.OAKEYS[org] = orgKeyValue;
      _OAcookie(window.OAKEYS);

      // Remove only the orgkey parameter from the URL
      params.delete('orgkey');

      // Update the URL without reloading the page, preserving other parameters
      window.history.pushState(null, '', url);
  }
 
  if (params.get('logout')) {
    window.OAKEYS = {};
    _OAcookie(false);
    params.delete('logout');
    window.history.pushState(null, '', url);
  }
}

/**
 * Updates the global login state based on available OAKEYS and manages the visibility of UI elements accordingly.
 * @param {string} org - The organizatigon key to check for within OAKEYS.
 */
function updateLoginState(org) {
  // Init global state variables directly on the window object
  window.loggedIn = false;
  window.orgKey = "";

  // Assume OAKEYS is always an object (even an empty one), ensure it exists before running this code
  window.hasOrgKey = Object.keys(window.OAKEYS).length !== 0;

  if (window.hasOrgKey && window.OAKEYS[org]) {
    window.orgKey = `&orgkey=${window.OAKEYS[org]}`;
    window.loggedIn = true;
    displayNone("login");
    displayNone("about-free-logged-out");
  } else {
    window.loggedIn = false;
    displayNone("logout");
  }
}

function handleURLParameters() {
  const breakdownParam = getURLParam('breakdown');
  const actionParam = getURLParam('action');

  if (breakdownParam) {
    const exploreButton = document.getElementById(`explore_${breakdownParam}_button`);
    if (exploreButton) {
      exploreButton.click();
    }
  }

  if (actionParam) {
    const strategyButton = document.getElementById(`strategy_${actionParam}`);
    if (strategyButton) {
      strategyButton.click();
    }
  }
}