// ========================
// utils.js
// Utility/helper functions
// ========================

import { ELEVENTY_API_ENDPOINT, READABLE_DATE_OPTIONS, USER_LOCALE, EXPLORE_FILTERS_LABELS } from './constants.js';

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
    const response = await axios.post(`https://bg.${ELEVENTY_API_ENDPOINT}.oa.works/report/works`, postData);
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
  document.querySelectorAll(`.${className}`).forEach(element => element.innerHTML = parameter);
}

/**
 * Normalises ES field IDs to the human-friendly keys used for labels.
 * - strips "supplements." prefix
 * - removes any org suffix after "__"
 * - removes trailing "_pct"
 * @param {string} id
 * @returns {string}
 */
export function normaliseFieldId(id) {
  if (!id) return '';
  return String(id)
    .replace(/^supplements\./, '')
    .replace(/__.*/, '')
    .replace(/_pct$/, '');
}


/**
 * Format a date object into a human-readable string using the user’s locale,
 * explicitly formatted as UTC to ensure consistency across different time zones.
 * By formatting dates like this, we avoid pitfalls of local timezone adjustments,
 * ensuring that the date displayed is the same date as intended,
 * regardless of the user’s local time zone settings.
 *
 * @param {Date} date - The date object to format.
 * @returns {string} The localised and UTC-formatted date string.
 */
export function makeDateReadable(date) {
  const optionsWithUTC = { ...READABLE_DATE_OPTIONS, timeZone: 'UTC' };
  return date.toLocaleDateString(USER_LOCALE, optionsWithUTC);
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
    return new Intl.NumberFormat(USER_LOCALE, { style: 'currency', currency: 'USD' }).format(number);
  }
  return number.toLocaleString(USER_LOCALE);
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
 * Updates the global date range used in queries, refreshes readable dates in the UI,
 * and emits an event signalling the range is ready.
 *
 * Event: `oar:dateRangeReady` with `detail.dateRange` carrying the final fragment,
 * e.g. `(published_date:>YYYY-MM-DD AND published_date:<YYYY-MM-DD) AND `.
 *
 * @param {Date} newStart - The start of the range.
 * @param {Date} newEnd   - The end of the range.
 * @returns {string} The ElasticSearch date-range fragment.
 */
export function replaceDateRange(newStart, newEnd) {
  // Update the year range in a readable format
  replaceText("report_readable_start_date", makeDateReadable(newStart));
  replaceText("report_readable_end_date",   makeDateReadable(newEnd));

  // Adjust the date range in ISO format for the API call (-1 day for start date, +1 day for end date)
  const startDateISO = formatDateToISO(changeDays(-1, newStart));
  const endDateISO   = formatDateToISO(changeDays(+1, newEnd));

  // Persist globals
  dateRange = `(published_date:>${startDateISO}%20AND%20published_date:<${endDateISO})%20AND%20`;
  startYear = formatDateToISO(newStart);
  endYear   = formatDateToISO(newEnd);

  // Tell listeners the range is ready
  const evt = new CustomEvent('oar:dateRangeReady', { detail: { dateRange } });
  window.dispatchEvent(evt);

  return dateRange;
}

/**
 * Creates a UTC Date object representing a specific date.
 * This ensures consistency across different time zones, interpreting the date as the same calendar day worldwide.
 * See oaworks/discussion#2744
 *
 * @param {number} year - The full year of the date.
 * @param {number} month - The month of the date (0-11, where 0 corresponds to January).
 * @param {number} day - The day of the month.
 * @returns {Date} The new Date object representing the specific date in UTC.
 */
export function createDate(year, month, day) {
  return new Date(Date.UTC(year, month, day));  
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
 * Removes the display style attribute from an HTML element, allowing it to revert to its default display style.
 *
 * @param {string} id - The ID of the HTML element from which to remove the display style.
 */
export function removeDisplayStyle(id) {
  var elem = document.getElementById(id);
  if (elem) {
    elem.style.removeProperty('display');
  }
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
 * Formats the values of an object as inline list items.
 * If a value is an array, each element is formatted as an inline list item.
 * If a value is a single string or number, it is also formatted as an inline list item.
 * Adds a comma and space to every list item except the last one if 'inline' is true.
 *
 * @param {Object} object - The object whose values will be formatted.
 * @param {boolean} [inline=false] - Whether to format the list inline with commas.
 * @returns {string} A string containing HTML list items.
 */
export function formatObjectValuesAsList(object, inline = false) {
  let listItems = [];
  let itemCount = 0;

  for (const key in object) {
    if (Array.isArray(object[key])) {
      itemCount += object[key].length;
    } else {
      itemCount++;
    }
  }

  let currentIndex = 0;
  for (const key in object) {
    if (Array.isArray(object[key])) {
      object[key].forEach(item => {
        currentIndex++;
        const itemWithComma = inline && currentIndex < itemCount ? `${item}, ` : item;
        listItems.push(`<li class="inline">${itemWithComma}</li>`);
      });
    } else {
      currentIndex++;
      const itemWithComma = inline && currentIndex < itemCount ? `${object[key]}, ` : object[key];
      listItems.push(`<li class="inline">${itemWithComma}</li>`);
    }
  }

  return listItems.join('');
}

/**
 * Reorders the keys of each record based on a specified order, prioritising 'key' and 'doc_count' 
 * if they exist, and calculates percentage values for applicable numeric fields (excluding 'doc_count').
 * 
 * @param {Array<Object>} records - The array of records to reorder. Each record is an object with various keys.
 * @param {string} includes - Comma-separated string of keys in the desired order. The 'doc_count' key is excluded from this string.
 * @returns {Array<Object>} The reordered and enriched array of records, where each record includes the original values and calculated percentage values for applicable fields.
 */
export function reorderTermRecords(records, includes) {
  // Add 'key' and 'doc_count' to the front if they exist in the records
  const firstKeys = [];
  if (records.some(record => record.hasOwnProperty('key'))) firstKeys.push('key');
  if (records.some(record => record.hasOwnProperty('doc_count'))) firstKeys.push('doc_count');

  const keysOrder = firstKeys.concat(includes.split(',').filter(key => !firstKeys.includes(key) && key !== 'doc_count'));

  return records.map(record => {
    const reorderedRecord = {};
    keysOrder.forEach(key => {
      let value = record[key]; // No aliasing for 'doc_count'
      if (value !== undefined) {
        if (typeof value === 'number' && !key.startsWith('mean_') && !key.startsWith('median_') && !key.startsWith('total_') && key !== 'doc_count' && key !== 'key') {
          // Calculate and store percentage values for applicable numeric fields using doc_count
          const pctValue = ((value / record['doc_count']) * 100).toFixed(2);
          reorderedRecord[key + '_pct'] = pctValue + '%';
        }
        // Keep raw value for all fields
        reorderedRecord[key] = value;
      }
    });
    return reorderedRecord;
  });
}

/**
 * Reorders the keys of each record in an array based on a specified order.
 * 
 * @param {Array<Object>} records - The array of records to reorder.
 * @param {string} includes - Comma-separated string of keys in the desired order.
 * @returns {Array<Object>} The reordered array of records.
 */
export function reorderArticleRecords(records, includes) {
  const keysOrder = includes.split(',');

  return records.map(record => {
    const reorderedRecord = {};

    keysOrder.forEach(key => {
      let value = getNestedPropertyValue(record, key);

      // Handle arrays and nested properties
      if (Array.isArray(value)) {
        value = value.filter(item => item !== null); // Remove null items
        if (value.length === 0) {
          value = 'null'; // Set to null if array is empty
        }
      }
      reorderedRecord[key] = value;
    });

    return reorderedRecord;
  });
}

/**
 * Formats records for display, either as raw data or prettified with only percentages for pretty mode.
 * Ensures 'key' and 'doc_count' are properly labeled and included.
 * Applies numeric formatting for fields starting with 'total_', 'median_', or 'mean_' and
 * currency formatting for fields ending with '_amount' using a helper function.
 * 
 * @param {Object[]} records - The array of records to be formatted.
 * @param {boolean} [pretty=true] - Flag to determine if data should be displayed in a pretty format.
 * @returns {Object[]} - The formatted records.
 */
export function prettifyRecords(records, pretty = true) {
  return records.map(record => {
    const formattedRecord = {};

    // Always include 'key' without modification
    if (record.hasOwnProperty('key')) {
      formattedRecord['key'] = record['key'];
    }

    // Always process 'doc_count' to make readable
    if (record.hasOwnProperty('doc_count')) {
      formattedRecord['doc_count'] = makeNumberReadable(record['doc_count']);
    }

    Object.keys(record).forEach(key => {
      if (key !== 'key' && key !== 'doc_count') { // Avoid reprocessing 'key' and 'doc_count'
        if (pretty) {
          // Format percentages
          if (key.endsWith('_pct')) {
            formattedRecord[key] = Math.round(parseFloat(record[key])).toString() + '%';
          }
          // Format numbers starting with 'total_', 'median_', or 'mean_' or ending with '_amount'
          if (key.startsWith('total_') || key.startsWith('median_') || key.startsWith('mean_') || key.endsWith('_amount')) {
            const isCurrency = key.endsWith('_amount');
            formattedRecord[key] = makeNumberReadable(parseFloat(record[key]), isCurrency);
          }
        } else {
          // Include all fields except percentages in raw mode
          if (!key.endsWith('_pct')) {
            formattedRecord[key] = record[key];
          }
        }
      }
    });

    return formattedRecord;
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

    // Check if the current object is an array and the key is numeric (array index)
    if (Array.isArray(currentObj)) {
      // Map over the array and return the value of the nested property for each item
      return currentObj.map(item => {
        if (typeof item === 'object' && item !== null && key in item) {
          return item[key];
        } else {
          // If the item is an array or doesn't have the key, try to go deeper recursively
          // or return null if not possible
          return typeof item === 'object' ? getNestedPropertyValue(item, key) : null;
        }
      });
    } else if (typeof currentObj === 'object' && key in currentObj) {
      return currentObj[key];
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

/**
 * Converts URLs in a text string to clickable anchor tags.
 * Optionally force-converts a text to a link using a provided URL prefix.
 * Handles strings containing either single or multiple URLs.
 * 
 * @param {string} text - The text string to process.
 * @param {boolean} [forceLink=false] - Whether to force convert the text into a link.
 * @param {string} [urlPrefix=''] - The URL prefix to use when force converting.
 * @return {string} The processed string with URLs converted to clickable links.
 */
export function convertTextToLinks(text, forceLink = false, urlPrefix = '') {
  // Validate input is a non-null string
  if (typeof text !== 'string' || text === null) {
    return 'N/A';
  }

  // Function to create an anchor tag
  const createAnchor = (url, displayText) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 decoration-1">${displayText}</a>`;
  };

  // Regex to match URLs
  const urlRegex = /https?:\/\/[^ ,]+/g;

  // If forcing link without URL detection or no URL present, return single link
  if (forceLink && !text.match(urlRegex)) {
    return createAnchor(`${urlPrefix}${text}`, text);
  }

  // Replace all URLs in text with anchor tags
  return text.replace(urlRegex, match => createAnchor(match, match));
}

/**
 * Binds click events to all anchor links for smooth scrolling. 
 * Considers the dynamic height of a the #top_nav sticky header.
 * Adds additional spacing for a comfortable view.
 */
export function bindSmoothScrollLinks() {
  const additionalSpacing = 20; // Extra spacing in pixels

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1); // Remove the '#' from the href attribute
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const header = document.getElementById('top_nav');
        const headerHeight = header ? header.offsetHeight : 0; // Dynamically get the header height
        const targetPosition = targetElement.getBoundingClientRect().top; // Position of the target element
        const offsetPosition = targetPosition + window.pageYOffset - headerHeight - additionalSpacing; // Calculate position with offset and extra spacing

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.error('Target element not found:', targetId);
      }
    });
  });
}

/**
 * Adjusts the navigation bar's style based on the scroll position.
 * Adds or removes classes to the navigation bar when it reaches the top of the viewport.
 * Adds a shadow to the nav bar, a border to the bottom of the items, and a transition effect.
 */
export function adjustNavOnScroll() {
  const nav = document.querySelector("#top_nav");
  const yearButtons = document.querySelectorAll(".js_year_select");

  function adjustNavStyle() {
    const rect = nav.getBoundingClientRect();
    
    if (rect.top <= 0) {
      yearButtons.forEach((button) => { 
        button.classList.add("md:border-b");
        button.classList.remove("md:border-b-0");
      });
      nav.classList.add("shadow-lg", "transition-pb-3", "md:transition-pb-6");
      nav.classList.remove("transition-pb-0");
    } else {
      yearButtons.forEach((button) => { 
        button.classList.remove("md:border-b");
        button.classList.add("md:border-b-0");
      });
      nav.classList.remove("shadow-lg", "transition-pb-3", "md:transition-pb-6");
      nav.classList.add("transition-pb-0");
    }
  }

  // Attach the function to the scroll event
  document.addEventListener("scroll", adjustNavStyle);

  // Call the function immediately to check the initial scroll position
  adjustNavStyle();
}

/**
 * Inserts a 'No results found' message row into a table body.
 * This function clears any existing content in the table body and then
 * adds a single row with one cell that spans all columns.
 * 
 * @param {number} columnCount - The number of columns in the table, to set the colspan attribute.
 * @param {string} tableBodyId - The ID of the table body element where the message should be inserted.
 * @param {string} tableId - The ID of the table, used for the aria-labelledby attribute.
 */
export function showNoResultsRow(columnCount, tableBodyId, tableId) {
  const tableBody = document.getElementById(tableBodyId);
  const noResultsRow = document.createElement('tr');
  const noResultsCell = document.createElement('td');

  // Clear previous content in the table body
  tableBody.innerHTML = '';

  // Set the colspan attribute to span all columns, TailwindCSS classes, and aria-labelledby for accessibility
  noResultsCell.colSpan = columnCount;
  noResultsCell.setAttribute('aria-labelledby', tableId);
  noResultsCell.classList.add('border-b', 'border-neutral-500', 'p-4');
  noResultsCell.textContent = 'No results found.';

  // Append the cell to the row, and the row to the table body
  noResultsRow.appendChild(noResultsCell);
  tableBody.appendChild(noResultsRow);
}

/**
 * Initialises a dropdown menu. Requires the dropdown container to have button elements as the options.
 * 
 * @param {string} dropdownSelector - The CSS selector for the dropdown container.
 */
export function initDropdown(dropdownSelector) {
  const dropdownContainer = document.querySelector(dropdownSelector);
  if (!dropdownContainer) {
    console.error('Dropdown container not found:', dropdownSelector);
    return;
  }

  const dropdownButton = dropdownContainer.querySelector('button[aria-haspopup="true"]');
  const dropdownContent = dropdownContainer.querySelector('.js_dropdown_content');

  dropdownButton.addEventListener('click', function(event) {
    event.stopPropagation();
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);

    if (isExpanded) {
      dropdownContent.classList.add('hidden');
      dropdownContent.setAttribute('hidden', 'true');
    } else {
      dropdownContent.classList.remove('hidden');
      dropdownContent.removeAttribute('hidden');
    }
  });

  document.addEventListener('click', function() {
    if (!dropdownContent.classList.contains('hidden')) {
      dropdownContent.classList.add('hidden');
      dropdownContent.setAttribute('hidden', 'true');
      dropdownButton.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Parses a comma-separated string of filters and processes each element to create an array of objects.
 * Each object represents one element from the input string, processed to remove certain prefixes or suffixes.
 * 
 * @param {string} csvString - The comma-separated string.
 * @returns {Object[]} An array of objects with a processed 'id' property for each element.
 */
export function parseCommaSeparatedQueries(csvString) {
  const elements = csvString.split(",");
  return elements.map(element => {
    const id = element.replace("analysis.", "").replace(".query", "");
    return { id };
  });
}

/**
 * Initialises the copy to clipboard functionality for any given button and element to copy from.
 * @param {string} buttonId - The ID of the button to attach the event to.
 * @param {string} elementId - The ID of the element to copy from.
 */
export function copyToClipboard(buttonId, elementId) {
  const button = document.getElementById(buttonId);
  if (button) {
    const textSpan = button.querySelector('span'); // Select text content inside <span> in the button
    button.addEventListener('click', () => {
      const element = document.getElementById(elementId);
      if (element) {
        const rows = Array.from(element.rows);
        const tableText = rows.map(row => {
          const cells = Array.from(row.cells);
          // Encapsulate each cell's content in quotes and join with tabs to ensure content remains intact
          const cellTexts = cells.map(cell => `"${cell.innerText.trim()}"`).join('\t');
          return cellTexts;
        }).join('\n');
        
        navigator.clipboard.writeText(tableText).then(() => {
          const originalText = textSpan.innerText;
          textSpan.innerText = 'Table copied!';
          setTimeout(() => {
            textSpan.innerText = originalText; // Revert to original text after 2 seconds
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      } else {
        console.error('Element to copy from was not found:', elementId);
      }
    });
  } else {
    console.error('Button not found:', buttonId);
  }
}

/**
 * Parses all URL parameters into an object.
 * @returns {Object} URL parameters as key-value pairs.
 */
export function getAllURLParams() {
  const params = new URLSearchParams(window.location.search);
  let paramObject = {};
  for (let [key, value] of params.entries()) {
    paramObject[key] = value;
  }
  return paramObject;
}

/**
 * Gets the value of a specific URL query parameter.
 * @param {string} param - The name of the parameter.
 * @returns {string|null} - The value of the parameter or null if not found.
 */
export function getURLParam(param) {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(param);
}

/**
 * Updates the URL with the provided query parameters without reloading the page.
 * @param {Object} params - An object where the key is the parameter name and the value is the parameter value.
 */
export function updateURLParams(params) {
  const queryParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => queryParams.set(key, value));
  history.pushState(null, '', '?' + queryParams.toString());
}

/**
 * Removes one or more query parameters from the current URL without reloading the page.
 * Uses history.replaceState so it doesn’t add a new history entry.
 *
 * @param {string|string[]} keys - One key or an array of keys to remove.
 * @returns {void}
 */
export function removeURLParams(keys) {
  const params = new URLSearchParams(window.location.search);
  (Array.isArray(keys) ? keys : [keys]).forEach(k => params.delete(k));
  const newQuery = params.toString();
  const newUrl = newQuery ? `?${newQuery}` : window.location.pathname;
  history.replaceState(null, '', newUrl);
}

/**
 * Displays an error message in the header of the page.
 * @param {string} message - The error message to display.
 */
export function displayErrorHeader(message) {
  const alertMsg = document.getElementById("js-alert");
  alertMsg.textContent = message ? message : "An error occurred.";
  alertMsg.style.display = "block";
}

/**
 * Removes duplicates from an array or nested arrays.
 *
 * @param {Array} array - The array or nested array from which to remove duplicates.
 * @returns {Array} - A new array with duplicates removed.
 */
export function removeArrayDuplicates(array) {
  if (!Array.isArray(array)) {
    return array;
  }

  // Remove duplicates from the main array
  const uniqueArray = Array.from(new Set(array.map(item => 
    Array.isArray(item) ? JSON.stringify(removeArrayDuplicates(item)) : JSON.stringify(item)
  ))).map(item => JSON.parse(item));

  // Recursively remove duplicates from nested arrays
  return uniqueArray.map(item => 
    Array.isArray(item) ? removeArrayDuplicates(item) : item
  );
}

/**
 * Updates the header text for the explore filter based on the current active filter query.
 * If the filter is 'is_paper', it uses the corresponding label from EXPLORE_FILTERS_LABELS.
 * Otherwise, it prefixes the label with 'articles that are ' with its label from EXPLORE_FILTERS_LABELS.
 *
 * @function updateExploreFilterHeader
 * @returns {void}
 */
export function updateExploreFilterHeader(filterId) {
  const text =
    filterId === 'is_paper'
      ? EXPLORE_FILTERS_LABELS[filterId].label
      : (EXPLORE_FILTERS_LABELS[filterId]?.label || filterId);
  replaceText("explore_filter", text);
}

/**
 * Resets the <footer> js_bar_chart area of an Insights card back to its default state.
 * Undoes any "Data unavailable" content and styling applied by showUnavailableCard().
 *
 * @param {HTMLElement} cardContents - The <article> element representing the insight card.
 */
export function resetBarChart(cardContents) {
  if (!cardContents) return;

  // Restore the default white card styling
  cardContents.classList.add(
    'bg-white',
    'hover:shadow-md',
    'transition-shadow',
    'duration-200',
    'proportional-card'
  );

  // Remove the "unavailable" card styling
  cardContents.classList.remove(
    'bg-carnation-100',
    'flex',
    'flex-col',
    'justify-center'
  );
  
  // Ensure one <footer.js_bar_chart> exists
  let footerEl = cardContents.querySelector('footer.js_bar_chart');
  if (!footerEl) {
    footerEl = document.createElement('footer');
    footerEl.className = 'js_bar_chart w-full mt-4';
    cardContents.appendChild(footerEl);
  }
  // If it was in "unavailable" mode, restore for drawing bars
  footerEl.removeAttribute('data-unavailable');
  footerEl.innerHTML = '';
  footerEl.classList.add('w-full', 'h-3', 'bg-carnation-800', 'rounded-full', 'mt-4');
}


/**
 * Switches the default Insights card into greyed-out "Data unavailable" style.
 */
export function showUnavailableCard(cardContents) {
  // Locate the "articles" and "percent" elements
  const articlesEl = cardContents.querySelector('[id^="articles_"]');
  const percentEl  = cardContents.querySelector('[id^="percent_"]');

  // Clear the text for #articles_...
  if (articlesEl) {
    articlesEl.textContent = '';
  }

  // Replace the text in #percent_... with the slash icon
  if (percentEl) {
    percentEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24" height="24" fill="none"
           stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round"
           class="feather feather-slash inline-block">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
      </svg>
    `;
  }

  // Remove the default white card styling
  cardContents.classList.remove(
    'bg-white',
    'hover:shadow-md',
    'transition-shadow',
    'duration-200',
    'proportional-card'
  );

  // Add grey background & center layout
  cardContents.classList.add(
    'bg-carnation-100',
    'flex',
    'flex-col',
    'justify-center'
  );

  // Clear or replace the bar chart area with "Data unavailable"
  const footerEl = cardContents.querySelector('footer.js_bar_chart');
  if (footerEl) {
    footerEl.classList.remove('h-3', 'bg-carnation-800', 'rounded-full');
    footerEl.setAttribute('data-unavailable', 'true');
    footerEl.innerHTML = `
      <p class="mt-4 text-xs text-left text-neutral-700">
        Data unavailable
      </p>
    `;
  }
}

/**
 * Render a bar (or two stacked bars) in the .js_bar_chart footer,
 * depending on whether the denominator is the full set of publications
 * or just a subset.
 *
 * @param {HTMLElement} cardEl         The <article> element for this insight
 * @param {number} numeratorCount      e.g. 2652
 * @param {number} denominatorCount    e.g. 3431
 * @param {string} denominatorID       e.g. "is_paper" or something else
 * @param {number} totalArticlesCount  e.g. 3821 (the full set of articles)
 */
export function setBarChart(
  cardEl,
  numeratorCount,
  denominatorCount,
  denominatorID,
  totalArticlesCount
) {
  if (!cardEl) return;
  const barContainer = cardEl.querySelector('.js_bar_chart');
  if (!barContainer) return;

  // Clear any existing bar(s)
  barContainer.innerHTML = '';

  // If the denominator is missing or zero, skip
  if (!denominatorCount) return;

  // ----- CASE 1: Denominator is the full set => Single bar -----
  // The <footer> has 'bg-carnation-800' to represent the full set
  // We overlay one bar for the numerator portion in carnation-300
  if  (
    denominatorID === 'is_paper' ||
    denominatorID === 'is_preprint' ||
    (denominatorCount && totalArticlesCount && denominatorCount === totalArticlesCount) // if the total amount is the same as the denominator
  ) {
    const fraction = Math.round((numeratorCount / denominatorCount) * 100);
    barContainer.innerHTML = `
      <div
        class="h-3 bg-carnation-300 rounded-full"
        style="width: ${fraction}%"
      ></div>
    `;
  } 

  // ----- CASE 2: Denominator is a subset => Two stacked bars -----
  // The footer is still 'bg-carnation-800' overall, but we
  // insert an outer bar in carnation-500 for "subset vs. total"
  // and an inner bar in carnation-300 for "numerator vs. that subset".
  else {
    let fractionOuter = 0;
    if (totalArticlesCount) {
      fractionOuter = Math.round((denominatorCount / totalArticlesCount) * 100);
    }
    const fractionInner = Math.round((numeratorCount / denominatorCount) * 100);

    barContainer.innerHTML = `
      <div 
        class="h-3 bg-carnation-500 rounded-full" 
        style="width: ${fractionOuter}%"
      >
        <div 
          class="h-3 bg-carnation-300 rounded-full" 
          style="width: ${fractionInner}%"
        ></div>
      </div>
    `;
  }
};

/**
 * Get the admin-provided `?q=` from the page URL and normalise it
 * to a plain Elasticsearch query string.
 *
 * - Returns '' when absent.
 * - Converts '+' to spaces (URL forms may use '+').
 * - Decodes percent-encoded characters (e.g., %22 → ").
 * 
 * @returns {string} Normalised query string from the URL.
 */
export function getDecodedUrlQuery() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('q');
  if (!raw || !raw.trim()) return '';
  // Normalise '+' (often used for spaces), then decode %xx sequences.
  const plusAsSpace = raw.replace(/\+/g, ' ');
  return decodeAndReplaceUrlEncodedChars(plusAsSpace);
}

/**
 * Combine two Elasticsearch query strings with an AND.
 *
 * @param {string} base
 * @param {string} extra
 * @returns {string}
 */
export function andQueryStrings(base, extra) {
  const a = base && base.trim() ? `(${base.trim()})` : '';
  const b = extra && extra.trim() ? `(${extra.trim()})` : '';
  if (a && b) return `${a} AND ${b}`;
  return a || b || '';
}

/**
 * Build an encoded `?q=` value by combining the existing query string
 * with the URL `?q=` filter.
 *
 * @param {string} baseQuery
 * @returns {string}
 */
export function buildEncodedQueryWithUrlFilter(baseQuery) {
  const base = decodeAndReplaceUrlEncodedChars(baseQuery);
  const combined = andQueryStrings(base, getDecodedUrlQuery());
  return encodeURIComponent(combined);
}