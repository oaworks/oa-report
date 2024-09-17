// ================================================
// insights-and-strategies.js
// State & DOM manipulation specific to Insights
// and Actions sections
// Needs to be completely refactored
// ================================================

import { dateRange, displayNone, changeOpacity, makeNumberReadable, makeDateReadable, displayErrorHeader } from './utils.js';
import { API_BASE_URL, QUERY_BASE, COUNT_QUERY_BASE, CSV_EXPORT_BASE, ARTICLE_EMAIL_BASE } from './constants.js';

// Set report org index URL’s base path
export const orgApiUrl = `${API_BASE_URL}orgs?q=id:%22${org}%22`;

// Fetch and store organisational data in a constant
export const orgDataPromise = axios.get(orgApiUrl);

let orgKey = "",
loggedIn = false,
hasOrgKey = Object.keys(OAKEYS).length !== 0;
if (hasOrgKey) {
  // logged in
  orgKey = `&orgkey=${OAKEYS[org]}`; // Use org variable to get the correct orgkey value
  loggedIn = true;
  displayNone("login");
  displayNone("about-free-logged-out");
} else {
  // logged out
  loggedIn = false;
  displayNone("logout");
}

// Generate report’s UI for any given date range
export function initInsightsAndStrategies(org) {
  // Set paths for orgindex
  let queryPrefix = `${QUERY_BASE}q=${dateRange}`,
  countQueryPrefix = `${COUNT_QUERY_BASE}q=${dateRange}`;
  
  orgDataPromise.then(function (response) {
    const orgData = response.data; // Storing the fetched data in a constant
    
    /** Decrypt emails if user has an orgKey **/
    window.handleDecryptEmailClick = function(buttonElement) {
      const email = buttonElement.getAttribute('data-email');
      const doi = buttonElement.getAttribute('data-doi');
      const mailto = buttonElement.getAttribute('data-mailto');
      
      decryptEmail(email, doi, mailto);
    }
    
    window.decryptEmail = function(email, doi, mailto) {
      mailto = decodeURI(mailto);
      
      function openEmailClientWithFallback() {
        window.open(`mailto:${mailto}`);
      }
      
      // if email is not undefined and there is an orgkey, try to decrypt the author’s email
      if (email !== 'undefined' && hasOrgKey) {
        axios.get(`${ARTICLE_EMAIL_BASE + doi}?${orgKey}`)
        .then(function (response) {
          let authorEmail = response.data;
          mailto = mailto.replaceAll("{email}", authorEmail);
          window.open(`mailto:${mailto}`);
        })
        .catch(function (error) { 
          // On error, use the fallback
          openEmailClientWithFallback();
          // and also display the error
          displayErrorHeader(`Error decrypting email: ${error}`);
        });
      } else {
        // If email is undefined or there is no orgkey, use the fallback
        openEmailClientWithFallback();
        // and display the error
        displayErrorHeader("We couldn’t find the author’s email address. Please try again later or contact us for help.");
      }
    };
    
    /** Get Insights data and display it **/
    function getInsight(numerator, denominator, denominatorText, info) {
      var shown     = orgData.hits.hits[0]._source.analysis[numerator].show_on_web,
      contentID = `${numerator}`; // the whole insight’s data card
      
      if (shown === true) {
        // Select elements to show data
        var percentageContents = document.getElementById(`percent_${numerator}`), // % value
        articlesContents   = document.getElementById(`articles_${numerator}`), // full-text value
        cardContents       = document.getElementById(contentID); // whole card
        
        // Display help text / info popover
        const instance = tippy(cardContents, {
          allowHTML: true,
          interactive: true,
          placement: 'right',
          appendTo: document.body,
          theme: 'tooltip-pink',
        });
        
        // Set tooltip content
        instance.setContent(info);
        
        // Access tooltip instance and its ID; use it for aria-controls attribute
        const tooltipID = instance.popper.id;
        cardContents.setAttribute('aria-controls', tooltipID);
        cardContents.setAttribute('aria-labelledby', numerator); // Set a11y label to the insight’s ID
        cardContents.setAttribute('title', 'More information on this metric'); // Set title 
        
        // Get numerator’s count query
        let num = axios.get(countQueryPrefix + orgData.hits.hits[0]._source.analysis[numerator].query);
        
        // Display data in UI if both a numerator & denominator were defined
        if (numerator && denominator) {
          // Get denominator’s count query
          let denom = axios.get(countQueryPrefix + orgData.hits.hits[0]._source.analysis[denominator].query);
          
          Promise.all([num, denom])
          .then(function (results) {
            var numeratorCount   = results[0].data,
            denominatorCount = results[1].data;
            
            if (denominatorCount) {
              articlesContents.textContent = `${makeNumberReadable(numeratorCount)} of ${makeNumberReadable(denominatorCount)} ${denominatorText}`;
              percentageContents.textContent = `${Math.round(((numeratorCount / denominatorCount) * 100))}%`;
            } else {
              articlesContents.innerHTML = `<span class="invisible" aria-hidden="true">---</span>`;
              percentageContents.textContent = "N/A";
            };
          }
        ).catch(function (error) { console.log(`error: ${error}`); });
        
        // Display plain number when it’s just a numerator
      } else {
        num.then(function (result) {
          percentageContents.textContent = makeNumberReadable(result.data);
        }).catch(function (error) { console.log(`${numerator} error: ${error}`); });
      };
      
      // Once data has loaded, display the card
      changeOpacity(contentID);
      
    } else {
      displayNone(contentID);
    };
    
  };
  
  getInsight(
    "is_paper",
    null,
    "articles",
    "<p>The total number of articles published by grantees or authors at your organization.</p>"
  );
  
  getInsight(
    "is_free_to_read",
    "is_paper",
    "articles",
    "<p>Articles that are free to read on the publisher website or any online repository, including temporarily accessible articles (“bronze Open Access”).</p>"
  );
  
  getInsight(
    "is_compliant",
    "is_covered_by_policy",
    "articles covered by policy",
    `<p class='mb-2'>The percentage of articles covered by <a href='${orgData.hits.hits[0]._source.policy.url}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a> that are compliant with the policy.</p>`
  );
  
  getInsight(
    "is_oa",
    "is_paper",
    "articles",
    "<p>The number of articles that are free and <a href='https://creativecommons.org/licenses/by/4.0/' class='underline underline-offset-2 decoration-1' target='_blank' rel='noopener'>CC BY</a> <strong class='bold'>or</strong> <a href='https://creativecommons.org/publicdomain/zero/1.0/' class='underline underline-offset-2 decoration-1' target='_blank' rel='noopener'>CC0</a> (in the public domain) on the publisher’s website, a repository or a preprint server.</p>"
  );
  
  getInsight(
    "has_data_availability_statement",
    "has_checked_data_availability_statement",
    "articles checked",
    "<p class='mb-2'>This number tells you how many articles that we’ve analyzed have a data availability statement.</p> <p>To check if a paper has a data availability statement, we use data from PubMed and review articles manually. This figure doesn’t tell you what type of data availability statement is provided (e.g there is Open Data vs there is no data).</p>"
  );
  
  getInsight(
    "has_open_data",
    "has_data",
    "articles with data",
    "<p class='mb-2'>The percentage of articles that shared any data under a <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>CC0</a> or <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>CC-BY</a> license.</p> <p class='mb-2'>This figure only measures how many articles shared Open Data if they generated data in the first place. It also only measures if any of the datasets generated were open, not if all of them were open.</p> <p>We work with <a href='https://dataseer.ai/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>Dataseer</a>’s data, which uses a combination of machine learning and human review to analyze the articles’ content.</p>"
  );
  
  getInsight(
    "has_open_code",
    "has_code",
    "articles with code",
    "<p class='mb-2'>The percentage of articles that shared any code under a permissive open-source licence, such as MIT.</p> <p class='mb-2'>This figure measures how many articles shared Open Code if they generated code in the first place. It also only measures if <strong>any parts</strong> of the code generated are open, not if <strong>all</strong> of it is open.</p> <p> We work with <a href='https://dataseer.ai/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>Dataseer</a>’s data, which uses a combination of machine learning and human review to analyze the articles’ content.</p>"
  );
  
  /**
  * Fetches and displays strategy data in a table format.
  * 
  * @param {string} strategy - The strategy name.
  * @param {Array<string>} keys - The keys to be displayed in the table.
  * @param {string} tableRow - The HTML template for each table row.
  */
  function displayStrategy(strategy, keys, tableRow) {
    const strategyData = orgData.hits.hits[0]._source.strategy[strategy];
    const { show_on_web: shown, sort, query, mailto } = strategyData;
    const tabID = `strategy_${strategy}`;
    
    if (!shown) {
      removeTab(tabID, strategy);
      return;
    }
    
    const tabCountContents = document.getElementById(`count_${strategy}`);
    const tableCountContents = document.getElementById(`total_${strategy}`);
    const tableBody = document.getElementById(`table_${strategy}`).getElementsByTagName('tbody')[0];
    
    const countQuery = countQueryPrefix + query;
    const listQuery = `${queryPrefix + query}&sort=${sort}`;
    
    axios.get(countQuery)
    .then(countResponse => {
      let count = parseFloat(countResponse.data);
      tabCountContents.textContent = makeNumberReadable(count);
      if (count > 100) count = 100;
      tableCountContents.textContent = makeNumberReadable(count);
      
      if (loggedIn) {
        handleLoggedInUser(count, listQuery, keys, tableRow, tableBody, tableCountContents, mailto, strategy);
      } else {
        promptLogin(tableBody, strategy);
      }
      
      changeOpacity(tabID);
    })
    .catch(error => {
      console.error(`${strategy} error: ${error}`);
    });
  }
  
  /**
  * Handles the case when the user is logged in.
  * 
  * @param {number} count - The count of actions.
  * @param {string} listQuery - The query to fetch the list of actions.
  * @param {Array<string>} keys - The keys to be displayed in the table.
  * @param {string} tableRow - The HTML template for each table row.
  * @param {HTMLElement} tableBody - The table body element.
  * @param {HTMLElement} tableCountContents - The element to display the total count.
  * @param {string} mailtoTemplate - The mailto template.
  * @param {string} strategy - The strategy name.
  */
  function handleLoggedInUser(count, listQuery, keys, tableRow, tableBody, tableCountContents, mailtoTemplate, strategy) {
    if (count === 0) {
      tableCountContents.textContent = "No";
      tableBody.innerHTML = `<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>
          We couldn’t find any articles! <br>Try selecting another date range or come back later once new articles are ready.</td></tr>`;
    } else {
      axios.get(listQuery)
      .then(listResponse => {
        const list = listResponse.data.hits.hits;
        console.log('List of actions:', list); // Logging the list of actions
        const tableRows = generateTableRows(list, keys, tableRow, mailtoTemplate);
        tableBody.innerHTML = tableRows;
      });
    }
  }
  
  /**
  * Generates table rows from the list of actions.
  * 
  * @param {Array<Object>} list - The list of actions.
  * @param {Array<string>} keys - The keys to be displayed in the table.
  * @param {string} tableRow - The HTML template for each table row.
  * @param {string} mailtoTemplate - The mailto template.
  * @returns {string} - The generated HTML for the table rows.
  */
  function generateTableRows(list, keys, tableRow, mailtoTemplate) {
    return list.map(item => {
      const action = {};
      
      // Process each key to build the action object
      keys.forEach(key => {
        const keyParts = key.split('.');
        
        let value = item._source;
        for (let part of keyParts) {
          value = value && value[part] !== undefined ? value[part] : "N/A";
        }
        
        // Handle extracting values from the 'supplements' array
        if (key.startsWith('supplements.')) {
          const supplementKey = keyParts.slice(1).join('.');
          
          // Iterate through the supplements array to find the first non-N/A value
          for (let supplement of item._source.supplements) {
            if (supplement[supplementKey] !== undefined) {
              value = supplement[supplementKey];
              break;
            }
          }
        }
        
        // Special handling for some specific keys
        if (key.includes('publication_date') && value !== "N/A") {
          value = makeDateReadable(new Date(value));
        }
        
        if (key.includes('apc_cost') && value !== "N/A") {
          value = makeNumberReadable(value);
        }
        
        if (key.includes('invoice_date') && value !== "N/A") {
          value = makeDateReadable(new Date(value));
        }
        
        action[keyParts[keyParts.length - 1]] = value;
      });
      
      if ("mailto" in action) {
        action["mailto"] = generateMailto(mailtoTemplate, action);
      }
      
      // Substitution for curly quotes and other special characters
      const specialCharsMap = {
        "'": "’",
        "\"": "“", // Replace straight quotes with curly ones
        "--": "—", // Replace double hyphens with em dash
      };
      
      // Substitute placeholders with actual values and handle special characters
      let row = tableRow;
      Object.keys(action).forEach(placeholder => {
        let value = action[placeholder];
        
        // Ensure value is a string before applying replace
        value = (value !== "N/A" && value !== undefined && value !== null) ? String(value) : "N/A";
        
        // Replace special characters
        value = value.replace(/['"]/g, match => specialCharsMap[match] || match);
        value = value.replace(/--/g, specialCharsMap["--"]);
        
        const regex = new RegExp(`{${placeholder}}`, 'g');
        row = row.replace(regex, value);
      });
      
      return `<tr>${row}</tr>`;
    }).join('');
  }
  
  /**
  * Generates the mailto string by replacing placeholders with actual values.
  * 
  * @param {string} template - The mailto template.
  * @param {Object} action - The action object containing values to replace placeholders.
  * @returns {string} - The generated mailto string.
  */
  function generateMailto(template, action) {
    return encodeURI(
      template
      .replaceAll("{outreach.author_display_name}", action.author_display_name ? action.author_display_name.replaceAll("'", "’") : "[No author’s name found]")
      .replaceAll("{doi}", action.DOI || "[No DOI found]")
      .replaceAll("{title}", action.title ? action.title.replaceAll("'", "’") : "[No title found]")
    );
  }
  
  
  /**
  * Prompts the user to log in if they are not already logged in.
  * 
  * @param {HTMLElement} tableBody - The table body element.
  * @param {string} strategy - The strategy name.
  */
  function promptLogin(tableBody, strategy) {
    tableBody.innerHTML = `<tr><td class='py-4 pl-4 pr-3 text-base text-center align-top break-words' colspan='3'>
        <p class='font-bold'>Strategies help you take action to make your institution’s research more open.</p>
        <p>Find out more about them by <a href='mailto:hello@oa.works?subject=OA.Report%20&mdash;%20${decodeURIComponent(org)}' 
        class='underline underline-offset-2 decoration-1'>contacting us</a> or 
        <a href='https://about.oa.report/docs/user-accounts' class='underline underline-offset-2 decoration-1' title='Information on user accounts'>logging in to your account</a> to access them.</p></td></tr>`;
    displayNone(`form_${strategy}`);
  }
  
  /**
  * Removes the tab and its content if the strategy is not to be shown.
  * 
  * @param {string} tabID - The ID of the tab to be removed.
  * @param {string} strategy - The strategy name.
  */
  function removeTab(tabID, strategy) {
    const tabItem = document.getElementById(tabID);
    const tabContent = document.getElementById(`tab_${strategy}`);
    
    if (tabItem) tabItem.remove();
    if (tabContent) tabContent.remove();
  }
  
  /**
  * Changes the opacity of an element to indicate it is active.
  * 
  * @param {string} tabID - The ID of the tab to be changed.
  */
  function changeOpacity(tabID) {
    const element = document.getElementById(tabID);
    if (element) element.classList.remove('opacity-40');
  }
  
  // Initialise and display the strategy data for given strategies
  displayStrategy(
    'email_author_vor', 
    [
      'openalex.publication_date',
      'openalex.title',
      'openalex.primary_location.source.display_name',
      'outreach.author_display_name',
      'outreach.email_address',
      'DOI',
      'mailto'
    ], 
    "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>{publication_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/{DOI}' target='_blank' rel='noopener' title='Open article'>{title}</a>\
        </div>\
        <div class='text-neutral-600'>{display_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>{author_display_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='{email_address}'\
          data-doi='{DOI}'\
          data-mailto='{mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>\
        </button>\
      </td>"
  );
  
  displayStrategy(
    "email_author_aam",
    [
      'openalex.publication_date', 
      'openalex.title', 
      'openalex.primary_location.source.display_name', 
      'outreach.author_display_name', 
      'outreach.email_address', 
      'DOI', 
      'mailto'
    ],
    "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>{publication_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/{DOI}' target='_blank' rel='noopener' title='Open article'>{title}</a>\
        </div>\
        <div class='text-neutral-600'>{display_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>{author_display_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='{email_address}'\
          data-doi='{DOI}'\
          data-mailto='{mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-mail inline-block h-4 duration-500'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>\
      </button>\
      </td>"
  );
  
  displayStrategy(
    "apc_followup",
    [
      'openalex.publication_date', 
      'openalex.title', 
      'openalex.primary_location.source.display_name', 
      'DOI', 
      'openalex.primary_location.source.host_organization_name', 
      'publisher_license', 
      'syp_permissions.journal_oa_type', 
      'openalex.open_access.oa_status', 
      'supplements.apc_cost', 
      'supplements.invoice_number', 
      'supplements.invoice_date'
    ],
    "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>{host_organization_name}</div>\
        <div class='mb-3 text-neutral-900'>{display_name}</div>\
        <div class='text-neutral-600'>OA type: <span class='font-medium'>{journal_oa_type}</span></div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>{publication_date}</div>\
        <div class='mb-1 text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/{DOI}' target='_blank' rel='noopener' title='Open article'>{title}</a>\
        </div>\
        <div class='mb-3 text-neutral-600'>{DOI}</div>\
        <div class='text-neutral-600'>OA status: <span class='font-medium'>{oa_status}</span></div>\
        <div class='text-neutral-600'>License: <span class='font-medium uppercase'>{publisher_license}</span></div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-3 text-neutral-600'>{invoice_date}</div>\
        <div class='mb-3 text-neutral-900'>{invoice_number}</div>\
        <div class='text-neutral-600 uppercase'>US${apc_cost}</div>\
      </td>"
  );
  
  displayStrategy(
    "unanswered_requests",
    [
      'openalex.title', 
      'openalex.primary_location.source.display_name', 
      'outreach.author_display_name', 
      'outreach.email_address', 
      'DOI', 
      'supplements.program__bmgf', 
      'supplements.grantid__bmgf', 
      'mailto'
    ],
    "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>{program__bmgf}</div>\
        <div class='text-neutral-900'>{grantid__bmgf}</div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>{author_display_name}</div>\
        <div class='mb-1 text-neutral-900'>\
          <a href='https://doi.org/{DOI}' target='_blank' rel='noopener' title='Open article'>{title}</a>\
        </div>\
        <div class='text-neutral-600'>{display_name}</div>\
      </td>\
      <td class='whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='{email_address}'\
          data-doi='{DOI}'\
          data-mailto='{mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-mail inline-block h-4 duration-500'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>\
        </button>\
      </td>"
  );
  
}).catch(error => {
  console.log(`Report ERROR: ${error}`);
  displayErrorHeader();
});
};

/**
* Calls the getStrategyExportLink function with the necessary orgData.
* This function is designed to be called from HTML templates and handles
* fetching the organiz1ation data before executing getStrategyExportLink.
*
* @param {string} id - The identifier for the strategy export link.
*/
window.callGetStrategyExportLink = function(id) {
  orgDataPromise.then(function (response) {
    const orgData = response.data;
    getStrategyExportLink(id, orgData);
  }).catch(function (error) {
    console.error(`Error fetching orgData: ${error}`);
  });
  
  // Do not navigate away from the page on submit
  return false;
};

/**
* Handles the creation and sending of a strategy export link request.
* This function is called with organizational data and an identifier to
* construct the appropriate export link.
*
* @param {string} id - The identifier for the strategy export link.
* @param {Object} orgData - The organization data required for the export link.
* @returns {boolean} - Always returns false to prevent default form submission.
*/
export function getStrategyExportLink(id, orgData) {
  let hasCustomExportIncludes = (orgData.hits.hits[0]._source.strategy[id].export_includes),
  strategyQuery           = (orgData.hits.hits[0]._source.strategy[id].query),
  strategySort            = (orgData.hits.hits[0]._source.strategy[id].sort);
  
  Promise.all([hasCustomExportIncludes])
  .then(function (results) {
    hasCustomExportIncludes = results[0].data;
  }).catch(function (error) { console.log(`Export error: ${error}`); });
  
  // Set up export query
  let isPaperURL = (dateRange + strategyQuery);
  let query = `q=${isPaperURL.replaceAll(" ", "%20")}`,
  form = new FormData(document.getElementById(`form_${id}`));
  
  // Get form content — email address input
  var email = `&${new URLSearchParams(form).toString()}`;
  
  // Display export includes if there are any
  var include;
  if (hasCustomExportIncludes !== undefined) {
    include = `&include=${hasCustomExportIncludes}`;
  }
  
  // Build full query
  query = CSV_EXPORT_BASE + query + include + '&sort=' + strategySort + email + orgKey;
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", query);
  // Display message when server responds
  xhr.onload = function () {
    document.getElementById(`msg-${id}`).innerHTML = `OA.Report has started building your CSV export at <a href='${this.response}' target='_blank' class='underline underline-offset-2 decoration-1'>this URL</a>. Please check your email to get the full data once it’s ready.`;
  };
  xhr.send();
};
