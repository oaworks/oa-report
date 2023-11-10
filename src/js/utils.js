// ========================
// Utility/helper functions
// ========================

import { readableDateOptions, userLocale } from './constants.js';

/**
 * Fetches data from the OA Works API using a POST request.
 * 
 * @param {Object} postData - The data to be sent in the POST request.
 * @returns {Object|null} The response data from the API, or null if an error occurs.
 */
export async function fetchData(postData) {
  try {
    const response = await axios.post("https://bg.api.oa.works/report/works", postData);
    return response.data; 
  } catch (error) {
    console.error("There was a problem with the request: ", error.message);
    return null; 
  }
}

// Define external variables used for managing the date range and yearly navigation
export let dateRange, startYear, endYear;

/**
 * Replace all instances of a text found in elements with a given class name.
 * 
 * @param {string} className - The class name indicating the elements whose text will be replaced.
 * @param {string} parameter - The content we are replacing instances found with.
 */

export function replaceText(className, parameter) {
  document.querySelectorAll(className).forEach(element => element.textContent = parameter);
}

/**
 * Format a date object into a human-readable string using the user’s locale.
 * 
 * @param {Date} date - The date object to format.
 * @returns {string} The localised date string.
 */
export function makeDateReadable(date) {
  return date.toLocaleDateString(userLocale, readableDateOptions);
}

/**
 * Adjusts the provided date by a specified number of days.
 * It can handle both positive and negative values for the `days` parameter.
 * 
 * @param {number} days - The number of days to add to the date (negative values will subtract days).
 * @param {Date} date - The initial date to be adjusted.
 * @returns {Date} The new Date object adjusted by the specified number of days.
 */
export function changeDays(days, date) {
  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() + days);
  return adjustedDate;
}

/**
 * Formats a number into a human-readable string or a currency format using the user’s locale.
 * If `isCurrency` is true, the number is formatted in the currency style using US dollars. 
 *
 * @param {number} number - The number to be formatted.
 * @param {boolean} [isCurrency=false] - Flag indicating whether to format the number as currency.
 * @returns {string} The formatted number as a string.
 */
export function makeNumberReadable(number, isCurrency = false) {
  if (isCurrency) {
    return new Intl.NumberFormat(userLocale, { style: 'currency', currency: 'USD' }).format(number);
  }
  return number.toLocaleString(userLocale);
}

/**
 * Formats a Date object into an ISO 8601-formatted string representing the date portion only
 * The time portion is removed by splitting the ISO string at 'T' and taking the first part, 
 * which corresponds to the date. This format is often used in querying ElasticSearch.
 *
 * @param {Date} date - The date to format into an ISO 8601 date string.
 * @returns {string} The ISO 8601 formatted date string.
 */
export function formatDateToISO(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Adjusts global `startYear` and `endYear` to the years of the new start and end dates and constructs
 * a date range string formatted for ElasticSearch queries. 
 * The start date is decremented by one day and the end date is incremented by one day, 
 * ensuring that the range includes all times within the start and end dates.
 *
 * @param {Date} newStart - The date representing the start of the range.
 * @param {Date} newEnd - The date representing the end of the range.
 * @returns {string} The date range string formatted for ElasticSearch query syntax.
 */
export function replaceDateRange(newStart, newEnd) {
  startYear = newStart.getFullYear();
  endYear = newEnd.getFullYear();
  const startDateISO = formatDateToISO(changeDays(-1, newStart));
  const endDateISO = formatDateToISO(changeDays(1, newEnd));
  dateRange = `(published_date:>${startDateISO}%20AND%20published_date:<${endDateISO})%20AND%20`;
  
  return dateRange;
}

/**
 * Creates a Date object representing a specific date
 *
 * @param {number} year - The full year of the date.
 * @param {number} month - The month of the date (0-11, where 0 corresponds to January).
 * @param {number} day - The day of the month.
 * @returns {Date} The new Date object representing the specific date.
 */
export function createDate(year, month, day) {
  return new Date(year, month, day);
}

/**
 * Hides an HTML element by setting its display style to 'none'.
 *
 * @param {string} id - The ID of the HTML element to be hidden.
 */
export function displayNone(id) {
  var elem = document.getElementById(id);
  if (elem) elem.style.display = 'none';
}

/**
 * Changes the opacity of an HTML element by adding a specific class.
 * Removes the 'opacity-0' class and adds an 'opacity-x' class, where x is the provided opacity value.
 * It assumes that relevant CSS classes like 'opacity-100' etc., exist.
 *
 * @param {string} id - The ID of the HTML element to change opacity.
 * @param {number} [opacity=100] - Flag for opacity value to set (from 0 to 100). Defaults to 100 if not provided.
 */
export function changeOpacity(id, opacity = 100) {
  var elem = document.getElementById(id);
  if (elem) {
    elem.classList.remove("opacity-0");
    elem.classList.add(`opacity-${opacity}`);
  }
}

/**
 * Retrieves the corresponding key for a given button ID in data explore section from the provided mapping object.
 * 
 * @param {string} buttonId - The ID of the button in the data explore section.
 * @param {Object} groupByKeyNames - The mapping object containing key names for the data explore section.
 * @returns {string|null} The corresponding key if found, otherwise null.
 */
export function getDataExploreKeyFromButtonId(buttonId, groupByKeyNames) {
  const buttonIdPrefix = buttonId.replace("_button", "");
  for (const key in groupByKeyNames) {
    if (groupByKeyNames[key].id === buttonIdPrefix) {
      return key;
    }
  }
  return null;
}
