// =================================================
// State & DOM manipulation specific to Data Explore
// =================================================

import { createButton } from './components.js';
import { fetchGetData } from './utils.js';

/**
 * Adds generated buttons to the DOM based on the explore data.
 *
 * @param {Array<Object>} exploreData - Array of explore data objects from the API response.
 */
export function addButtonsToDOM(exploreData) {
  const groupbyButtons = document.getElementById('explore_buttons');
  exploreData.forEach(item => {
    const button = createButton(item.id);
    groupbyButtons.appendChild(button);
  });
}

/**
 * Fetches and processes the explore data from the API for a given organization using Axios.
 *
 * @param {string} org - The organization identifier for the API query.
 * @param {Function} callback - The callback function to process the data.
 */
export function fetchAndProcessExploreData(org, callback) {
  fetchGetData(`https://bg.beta.oa.works/report/orgs?q=${org}&include=explore`)
    .then(data => {
      const exploreData = data.hits.hits[0]._source.explore;
      callback(exploreData);
    })
    .catch(error => console.error('Error fetching explore data:', error));
}
