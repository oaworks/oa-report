// ================================================
// insights-and-strategies.js
// State & DOM manipulation specific to Insights
// and Actions sections
// Needs to be completely refactored
// ================================================

import { dateRange, displayNone, changeOpacity, makeNumberReadable, makeDateReadable, displayErrorHeader, showUnavailableCard, resetBarChart, setBarChart, buildEncodedQueryWithUrlFilter } from './utils.js';
import { API_BASE_URL, QUERY_BASE, COUNT_QUERY_BASE, CSV_EXPORT_BASE, ARTICLE_EMAIL_BASE, INSIGHTS_CARDS } from './constants.js';

// Set report org index URL’s base path
export const orgApiUrl = `${API_BASE_URL}orgs?q=objectID:%22${org}%22`;

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
    // Loop through each Insight card from constants.js and call getInsight
    INSIGHTS_CARDS.forEach((cardConfig) => {
      if (cardConfig.info.includes("{policyUrl}")) {
        const policyUrl = orgData.hits.hits[0]._source.policy.url;
        cardConfig.info = cardConfig.info.replace("{policyUrl}", policyUrl);
      }

      getInsight(
        cardConfig.numerator,
        cardConfig.denominator,
        cardConfig.denominatorText,
        cardConfig.info
      );
    });

    function getInsight(numerator, denominator, denominatorText, info) {
      // Check if the data for this "numerator" (i.e. Insights data card) exists in orgData
      const analysisEntry = orgData.hits.hits[0]._source.analysis[numerator];

      // If there is no analysis for this ID (placeholder card), show "Data unavailable" and stop
      if (!analysisEntry) {
        const placeholderCard = document.getElementById(numerator);
        if (placeholderCard) {
          showUnavailableCard(placeholderCard);
        }
        return;
      }

      // If the analysis entry does exist, proceed as usual
      const shown     = analysisEntry.show_on_web,
            contentID = numerator,
            cardContents = document.getElementById(contentID);

      if (shown === true) {
        // Locate placeholders
        const percentageContents = document.getElementById(`percent_${numerator}`);
        const articlesContents   = document.getElementById(`articles_${numerator}`);

        // Create tippy tooltip
        const instance = tippy(cardContents, {
          allowHTML: true,
          interactive: true,
          placement: 'right',
          appendTo: document.body,
          theme: 'tooltip-white'
        });
        instance.setContent(info);

        // Accessibility / tooltip IDs
        const tooltipID = instance.popper.id;
        cardContents.setAttribute('aria-controls', tooltipID);
        cardContents.setAttribute('aria-labelledby', numerator);
        cardContents.setAttribute('title', 'More information on this metric');

        // Get numerator’s count query
        let numPromise = axios.get(countQueryPrefix + buildEncodedQueryWithUrlFilter(analysisEntry.query));

        // If we have a denominator param
        if (numerator && denominator) {
          // Get denominator’s count query
          let denomPromise = axios.get(countQueryPrefix + buildEncodedQueryWithUrlFilter(orgData.hits.hits[0]._source.analysis[denominator].query));

          // Get total articles count for the bar chart
          let totalArticlesPromise = axios.get(countQueryPrefix + buildEncodedQueryWithUrlFilter(orgData.hits.hits[0]._source.analysis.is_paper.query));

          Promise.all([numPromise, denomPromise, totalArticlesPromise])
            .then(function ([numResult, denomResult, totalArticlesResult]) {
              const numeratorCount     = numResult.data,
                    denominatorCount   = denomResult.data,
                    totalArticlesCount = totalArticlesResult.data;

              if (denominatorCount) {
                // Show "X of Y" in #articles_... with some styling
                articlesContents.innerHTML = `
                  <span class="font-semibold text-carnation-600">${makeNumberReadable(numeratorCount)}</span>
                  <span class="text-neutral-700">
                    of ${makeNumberReadable(denominatorCount)} ${denominatorText}
                  </span>
                `;

                // Show percentage in #percent_...
                const pct = Math.round((numeratorCount / denominatorCount) * 100);
                percentageContents.innerHTML = `
                  <span class="font-extrabold">${pct}%</span>
                `;

                // Clear any existing bar chart and set up new bar chart visualisation
                resetBarChart(cardContents);
                setBarChart(
                  cardContents,
                  numeratorCount,
                  denominatorCount,
                  denominator,
                  totalArticlesCount
                );
              } else {
                showUnavailableCard(cardContents);
              }
            })
            .catch(function (error) {
              console.log(`error: ${error}`);
              showUnavailableCard(cardContents);
            });

        } else {
          // NO DENOMINATOR => single total value
          numPromise
            .then(function (result) {
              // Insert value in #percent_{numerator}
              percentageContents.textContent = makeNumberReadable(result.data);

              // Put smaller label "articles" (or denominatorText) in #articles_{numerator}
              articlesContents.textContent = denominatorText;
            })
            .catch(function (error) {
              console.log(`${numerator} error: ${error}`);
              showUnavailableCard(cardContents);
            });
        }

        // Once data has loaded, display the card
        changeOpacity(contentID);

      } else {
        displayNone(contentID);
      }
    };

    /* Get Strategy data and display it */
    function displayStrategy(strategy, keys, tableRow) {
      var shown  = orgData.hits.hits[0]._source.strategy[strategy].show_on_web,
          sort   = `&sort=${orgData.hits.hits[0]._source.strategy[strategy].sort}`,
          tabID  = `strategy_${strategy}`;

      if (shown === true) {
        // Get tab elements
        var tabCountContents   = document.getElementById(`count_${strategy}`),
            tableCountContents = document.getElementById(`total_${strategy}`),
            tableBody          = document.getElementById(`table_${strategy}`).getElementsByTagName('tbody')[0];
        
        // Store original query + build encoded query with URL filters, if any
        const strategyQuery = orgData.hits.hits[0]._source.strategy[strategy].query,
              encodedQuery = buildEncodedQueryWithUrlFilter(strategyQuery);
        
        // Build full count + works queries
        var countQuery = countQueryPrefix + encodedQuery,
            listQuery  = queryPrefix + encodedQuery + sort + orgKey;
        
        // Get total action (article) count for this strategy
        axios.get(countQuery)
          .then(function (countResponse) {
            var count = parseFloat(countResponse.data);
            
            // Show total number of actions in tab & above table
            tabCountContents.textContent = makeNumberReadable(count);
            if (count > 100) {
              count = 100; // limit to 100
            }
            tableCountContents.textContent = makeNumberReadable(count);

            // If user is logged in, show full list of strategies
            if (loggedIn) {
              // If no actions are available, show message
              if (count === 0) {
                tableCountContents.textContent = "No ";
                tableBody.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find any articles! <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
              }

              // Otherwise, generate list of actions
              else if (count > 0 || count !== null) {

                // Get full list of actions for this strategy 
                axios.get(listQuery)
                  .then(function (listResponse) {
                    var list = listResponse.data.hits.hits,
                        tableRows = ""; // Contents of the list to be displayed in the UI as a table
                
                    // For each individual action, create a row
                    for (let i = 0; i < count; i++) {
                      var action = {}; // Create object to store key-value pairs for each action
                      tableRows += "<tr>";

                      // Populate action array with values for each key
                      for (var key of keys) {
                        // If it’s from the supplements array, loop over supplements to access data without index number
                        if (key.startsWith('supplements.')) {
                          key = key.replace('supplements.', ''); // Remove prefix 
                          var suppKey = list[i]._source.supplements.find(
                            function(i) {
                              return (i[key]);
                            }
                          );

                          if (suppKey == undefined || suppKey == null) {
                            action[key] = "N/A";
                          } else {
                            var value = suppKey[key];
                            action[key] = value;
                          }
                          
                          if (key.includes('invoice_date')) action[key] = makeDateReadable(new Date(action[key]));
                          if (key.includes('apc_cost')) action[key] = makeNumberReadable(action[key]);
                        } else { 
                          var value = list[i]._source[key];
                          action[key] = value;

                          if (key === 'published_date') action[key] = makeDateReadable(new Date(action[key]));
                        }

                        if (value == undefined || value == null) {
                          action[key] = "N/A";
                        }
                      };
                      
                      // If mailto is included, replace its body’s content with the action’s values
                      if ("mailto" in action) {
                        var mailto = orgData.hits.hits[0]._source.strategy[strategy].mailto;

                        var newMailto = mailto.replaceAll("\'", "’");
                        newMailto = newMailto.replaceAll("{doi}", (action.DOI ? action.DOI : "[No DOI found]"));
                        newMailto = newMailto.replaceAll("{author_email_name}", (action.author_email_name ? action.author_email_name.replaceAll("\'", "’") : "[No author’s name found]"));
                        newMailto = newMailto.replaceAll("{title}", (action.title ? action.title.replaceAll("\'", "’") : "[No title found]"));

                        // And add it to the action array
                        action["mailto"] = encodeURI(newMailto);
                      };

                      var tableRowLiteral = eval('`'+ tableRow +'`'); // Convert given tableRow to template literal
                      tableRows += tableRowLiteral; // Populate the table with a row w/ replaced placeholders for each action 
                      tableRows += "</tr>";
                    }

                    tableBody.innerHTML = tableRows; // Fill table with all actions
                  }
                )
              }
            }

            // Otherwise, display a message prompting user to log or contact us to access strategies
            else {
              tableBody.innerHTML = `<tr><td class='py-4 pl-4 pr-3 text-base text-center align-top break-words' colspan='3'><p class='font-bold'>Strategies help you take action to make your institution’s research more open.</p> <p>Find out more about them by <a href='mailto:hello@oa.works?subject=OA.Report%20&mdash;%20${decodeURIComponent(org)}' class='underline underline-offset-2 decoration-1'>contacting us</a> or <a href='https://about.oa.report/docs/user-accounts' class='underline underline-offset-2 decoration-1' title='Information on user accounts'>logging in to your account</a> to access them.</p></td></tr>`;
              displayNone(`form_${strategy}`);
            }
          })
          .catch(function (error) { console.log(`${strategy} error: ${error}`); })

        // Once data has loaded, display the card
        changeOpacity(tabID);

      } else {
        var tabItem = document.getElementById(tabID),
            tabContent = document.getElementById(strategy);

        if (tabItem || tabContent) {
          tabItem.remove();
          tabContent.remove();
        }
      };
    };

    displayStrategy(
      "email_author_vor",
      ['published_date', 'title', 'journal', 'author_email_name', 'email', 'DOI', 'mailto'],
      "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-600'>${action.journal}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='${action.email}'\
          data-doi='${action.DOI}'\
          data-mailto='${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-mail inline-block h-4 duration-500'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>\
        </button>\
      </td>"
    );

    displayStrategy(
      "email_author_aam",
      ['published_date', 'title', 'journal', 'author_email_name', 'email', 'DOI', 'mailto'],
      "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-600'>${action.journal}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='${action.email}'\
          data-doi='${action.DOI}'\
          data-mailto='${action.mailto}'\
          onclick='handleDecryptEmailClick(this)'>\
          <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-mail inline-block h-4 duration-500'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>\
        </button>\
      </td>"
    );
    
    displayStrategy(
      "apc_followup",
      ['published_date', 'title', 'journal', 'DOI', 'publisher', 'publisher_license', 'journal_oa_type', 'oa_status', 'supplements.apc_cost', 'supplements.invoice_number', 'supplements.invoice_date'],
      "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.publisher}</div>\
        <div class='mb-3 text-neutral-900'>${action.journal}</div>\
        <div class='text-neutral-600'>OA type: <span class='font-medium'>${action.journal_oa_type}</span></div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
        <div class='mb-1 text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='mb-3 text-neutral-600'>${action.DOI}</div>\
        <div class='text-neutral-600'>OA status: <span class='font-medium'>${action.oa_status}<span></div>\
        <div class='text-neutral-600'>License: <span class='font-medium uppercase'>${action.publisher_license}</span></div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-3 text-neutral-600'>${action.invoice_date}</div>\
        <div class='mb-3 text-neutral-900'>${action.invoice_number}</div>\
        <div class='text-neutral-600 uppercase'>US$${action.apc_cost}</div>\
      </td>"
    );

    displayStrategy(
      "unanswered_requests",
      ['title', 'journal', 'author_email_name', 'email', 'DOI', 'supplements.program__bmgf', 'supplements.grantid__bmgf', 'mailto'],
      "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.program__bmgf}</div>\
        <div class='text-neutral-900'>${action.grantid__bmgf}</div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.author_email_name}</div>\
        <div class='mb-1 text-neutral-900'>\
          <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-600'>${action.journal}</div>\
      </td>\
      <td class='whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium'>\
        <button \
          class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
          data-email='${action.email}'\
          data-doi='${action.DOI}'\
          data-mailto='${action.mailto}'\
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
 * fetching the organization data before executing getStrategyExportLink.
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
  let hasCustomExportIncludes = orgData.hits.hits[0]._source.strategy[id].export_includes,
      strategyQuery           = orgData.hits.hits[0]._source.strategy[id].query,
      strategySort            = orgData.hits.hits[0]._source.strategy[id].sort;

  Promise.all([hasCustomExportIncludes])
    .then(function (results) {
      hasCustomExportIncludes = results[0].data;
    })
    .catch(function (error) {
      console.log(`Export error: ${error}`);
    });

  // Build the export query
  const isPaperURL = dateRange + strategyQuery;
  const query = `q=${isPaperURL.replaceAll(" ", "%20")}`;

  // Get form content — email address input
  const form = new FormData(document.getElementById(`form_${id}`));
  const email = `&${new URLSearchParams(form).toString()}`;

  // Include custom export fields if any
  const include =
    hasCustomExportIncludes !== undefined
      ? `&include=${hasCustomExportIncludes}`
      : "";

  // Build final URL
  const exportUrl = `${CSV_EXPORT_BASE}${query}${include}&sort=${strategySort}${email}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", exportUrl);
  xhr.onload = function () {
    document.getElementById(`msg-${id}`).innerHTML = `OA.Report has started building your CSV export at <a href='${this.response}' target='_blank' class='underline underline-offset-2 decoration-1'>this URL</a>. Please check your email to get the full data once it’s ready.`;
  };
  xhr.send();
}
