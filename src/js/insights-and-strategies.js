import { dateRange, displayNone, changeOpacity, makeNumberReadable, makeDateReadable } from './utils.js';

const base             = `https://${apiEndpoint}.oa.works/report/`,
      baseBg           = `https://bg.${apiEndpoint}.oa.works/report/`,
      queryBase        = `${base}works?size=100&`,
      countQueryBase   = `${base}works/count?`,
      csvExportBase    = `${baseBg}works.csv?size=all&`,
      articleEmailBase = `${baseBg}email/`;

// Set report org index URL’s base path
export const orgApiUrl = `${base}orgs?q=objectID:%22${org}%22`;

// Fetch and store organisational data in a constant
export const orgDataPromise = axios.get(orgApiUrl);

/* Get report page elements where data will be inserted */
// Send CSV data by email form
var queryHiddenInput               = document.getElementById("download-form-q"),
    includeHiddenInput             = document.getElementById("download-form-include");

// Check if user is logged in
let orgKey = "",
    hasOrgKey = Object.keys(OAKEYS).length !== 0;
if (hasOrgKey) {
  // logged in
  orgKey = `&orgkey=${Object.values(OAKEYS)}`;
  displayNone("about-paid-logged-out");
  displayNone("about-free-logged-out");
} else {
  // logged out
  displayNone("logout");
  //displayNone("explore");
}

// Set default sorting order for CSV downloads
let exportSort = "&sort=published_date:desc"

// Generate report’s UI for any given date range
export function initInsightsAndStrategies(org) {
  // Set paths for orgindex
  let queryPrefix = `${queryBase}q=${dateRange}`,
      countQueryPrefix = `${countQueryBase}q=${dateRange}`;

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
          axios.get(`${articleEmailBase + doi}?${orgKey}`)
              .then(function (response) {
                  let authorEmail = response.data;
                  mailto = mailto.replaceAll("{email}", authorEmail);
                  window.open(`mailto:${mailto}`);
              })
              .catch(function (error) { 
                  // On error, use the fallback
                  openEmailClientWithFallback();
              });
      } else {
          openEmailClientWithFallback();
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
            infoContents       = document.getElementById(`info_${numerator}`); // help text value

        // Display help text / info popover
        const instance = tippy(infoContents, {
          allowHTML: true,
          interactive: true,
          placement: 'top',
          appendTo: document.body,
        });

        // Set tooltip content
        instance.setContent(info);

        // Access tooltip instance and its ID; use it for aria-controls attribute
        const tooltipID = instance.popper.id;
        infoContents.setAttribute('aria-controls', tooltipID);

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
      `<p class='mb-2'>The percentage of articles that are compliant with <a href='${orgData.hits.hits[0]._source.policy.url}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a>.</p> <p>This number is specific to your policy and your requirements.</p>`
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
    
    /* Get Strategy data and display it  */
    function displayStrategy(strategy, keys, tableRow) {
      var shown  = orgData.hits.hits[0]._source.strategy[strategy].show_on_web,
          sort   = `&sort=${orgData.hits.hits[0]._source.strategy[strategy].sort}`,
          tabID  = `strategy_${strategy}`;

      if (shown === true) {
        // Get tab elements
        var tabCountContents   = document.getElementById(`count_${strategy}`),
            tableCountContents = document.getElementById(`total_${strategy}`),
            tableBody          = document.getElementById(`table_${strategy}`).getElementsByTagName('tbody')[0];
        
        var countQuery              = countQueryPrefix + orgData.hits.hits[0]._source.strategy[strategy].query,
            listQuery               = queryPrefix + orgData.hits.hits[0]._source.strategy[strategy].query + sort;
        
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

            // If there’s an orgkey, show full list of strategies
            if (hasOrgKey && OAKEYS[orgSlug]) {
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
                        newMailto = newMailto.replaceAll("{author_email_name}", (action.author_email_name ? action.author_email_name : "[No author’s name found]"));
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
  let hasCustomExportIncludes = (orgData.hits.hits[0]._source.export_includes),
      strategyQuery           = (orgData.hits.hits[0]._source.strategy[id].query);
  
  Promise.all([hasCustomExportIncludes])
    .then(function (results) {
      hasCustomExportIncludes = results[0].data;
      }
    ).catch(function (error) { console.log(`Export error: ${error}`); });

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
  query = csvExportBase + query + include + exportSort + email + orgKey;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", query);
  // Display message when server responds
  xhr.onload = function () {
    document.getElementById(`msg-${id}`).innerHTML = `OA.Report has started building your CSV export at <a href='${this.response}' target='_blank' class='underline underline-offset-2 decoration-1'>this URL</a>. Please check your email to get the full data once it’s ready.`;
  };
  xhr.send();
};