// ========================
// utils.js
// Utility/helper functions
// ========================

import { readableDateOptions, userLocale } from './constants.js';

/**
 * Checks if the cached data has expired.
 * 
 * @param {number} timestamp - The timestamp when the data was cached.
 * @param {number} [expiryDuration=86400000] - Expiration duration in milliseconds (default 24 hours).
 * @returns {boolean} True if the cache has expired, false otherwise.
 */
export function isCacheExpired(timestamp, expiryDuration = 86400000) { // 24 hours
  const now = new Date().getTime();
  return now - timestamp > expiryDuration;
}

/**
 * Fetches data from the OA Works API using Axios with a POST request.
 * 
 * @param {Object} postData - The data to be sent in the POST request.
 * @returns {Object|null} The response data from the API, or null if an error occurs.
 */
export async function fetchPostData(postData) {
  try {
    const response = await axios.post(`https://bg.${apiEndpoint}.oa.works/report/works`, postData);
    return response.data; 
  } catch (error) {
    console.error("There was a problem with the POST request: ", error.message);
    return null; 
  }
}

/**
 * Fetches JSON data from the given URL using Axios with a GET request.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} A promise that resolves to the JSON data.
 */
export async function fetchGetData(url) {
  return axios.get(url).then(response => response.data);
}

// Define external variables used for managing the date range and yearly navigation
export let dateRange, startDate, endDate, startYear, endYear;

/**
 * Replace all instances of a text found in elements with a given class name.
 * 
 * @param {string} className - The class name indicating the elements whose text will be replaced.
 * @param {string} parameter - The content we are replacing instances found with.
 */

export function replaceText(className, parameter) {
  document.querySelectorAll(`.${className}`).forEach(element => element.textContent = parameter);
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

/**
 * Delays invoking a function until after wait milliseconds have elapsed 
 * since the last time the debounced function was invoked.
 *
 * @param {function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {function} The debounced function.
 */
export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Formats the values of an object as list items.
 * If a value is an array, each element is formatted as a list item.
 * If a value is a string or number, it is formatted as a single list item.
 *
 * @param {Object} object - The object whose values will be formatted.
 * @returns {string} A string containing HTML list items.
 */
export function formatObjectValuesAsList(object) {
  let listItems = [];
  for (const key in object) {
    if (Array.isArray(object[key])) {
      object[key].forEach(item => listItems.push(`<li>${item}</li>`));
    } else {
      listItems.push(`<li>${object[key]}</li>`);
    }
  }
  return listItems.join('');
}

/**
 * Reorders the keys of each record in an array based on a specified order.
 * 
 * @param {Array<Object>} records - The array of records to reorder.
 * @param {string} includes - Comma-separated string of keys in the desired order.
 * @returns {Array<Object>} The reordered array of records.
 */
export function reorderRecords(records, includes) {
  const keysOrder = includes.split(',');

  return records.map(record => {
    const reorderedRecord = {};

    keysOrder.forEach(key => {
      let value = getNestedPropertyValue(record, key);

      // Handle arrays and nested properties
      if (Array.isArray(value)) {
        value = value.filter(item => item !== null); // Remove null items
        if (value.length === 0) {
          value = null; // Set to null if array is empty
        }
      }

      reorderedRecord[key] = value;
    });

    return reorderedRecord;
  });
}

/**
 * Safely retrieves a nested property value from an object.
 * 
 * @param {Object} obj - The object to retrieve the property from.
 * @param {string} path - Path to the property in dot notation.
 * @returns {*} The value of the property, or null if not found.
 */
function getNestedPropertyValue(obj, path) {
  return path.split('.').reduce((currentObj, key) => {
    if (currentObj === null) {
      return null;
    }

    if (typeof currentObj === 'object' && key in currentObj) {
      return currentObj[key];
    } else if (Array.isArray(currentObj)) {
      // Process each element in the array
      return currentObj.map(item => item && key in item ? item[key] : null);
    }

    return null;
  }, obj);
}

/**
 * Converts a singular noun to its plural form.
 * Capitalises the first letter; replaces 'y' with 'ies', or appends 's'.
 *
 * @param {string} noun - The singular noun to pluralise.
 * @return {string} Pluralised form of the noun.
 */
export function pluraliseNoun(noun) {
  if (typeof noun !== "string") {
      throw new Error("Input must be a string");
  }

  let firstLetter = noun.charAt(0).toUpperCase();
  let restOfTheWord = noun.slice(1);

  if (noun.endsWith("y")) {
      return firstLetter + restOfTheWord.slice(0, -1) + "ies";
  } else {
      return firstLetter + restOfTheWord + "s";
  }
}

/**
 * Retrieves the full name of a researcher from ORCiD using their ORCiD URL or ID.
 * 
 * @param {string} orcidInput - The ORCiD URL or ID of the researcher.
 * @returns {Promise<string>} A promise that resolves to the full name of the researcher.
 * @throws {Error} Throws an error if the request fails or if the data is not available.
 */
export function getORCiDFullName(orcidInput) {
  return new Promise((resolve, reject) => {
    // Extract the ORCiD ID from the input URL or use the ID directly
    const orcidId = orcidInput.split('/').pop();
    const url = `https://pub.orcid.org/v3.0/${orcidId}/person`;

    axios.get(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        try {
            const givenName = response.data.name['given-names'].value;
            const familyName = response.data.name['family-name'].value;
            const fullName = `${givenName} ${familyName}`;
            resolve(fullName);
        } catch (error) {
            reject(new Error('Failed to extract the full name from the response.'));
        }
    })
    .catch(error => {
        reject(new Error('Failed to retrieve data from ORCiD.'));
    });
  }); 
}

/**
 * Decodes a URL-encoded string and replaces specific URL-encoded characters with their actual representations.
 * It also handles multiple layers of URL encoding.
 *
 * @param {string} encodedString - The URL-encoded string to be processed.
 * @returns {string} The string with URL-encoded characters replaced.
 */
export function decodeAndReplaceUrlEncodedChars(encodedString) {
  let decodedString = decodeURIComponent(encodedString);

  // Handling multiple layers of URL encoding
  while (decodedString.includes('%')) {
      decodedString = decodeURIComponent(decodedString);
  }

  return decodedString;
}

/**
 * Creates a deep copy of a given object or array. This is useful for cloning complex
 * data structures like arrays of objects, where a shallow copy would still reference
 * the same nested objects.
 * 
 * @param {Object|Array} obj - The object or array to be deep copied.
 * @returns {Object|Array} A deep copy of the provided object or array.
 */
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}