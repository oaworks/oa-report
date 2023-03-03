// Set URLs paths
const base             = "https://beta.oa.works/report/",
      baseBg           = "https://bg.beta.oa.works/report/",
      queryBase        = base + "works?size=100&",
      countQueryBase   = base + "works/count?",
      csvExportBase    = baseBg + "works.csv?size=all&",
      articleEmailBase = baseBg + "email/";

// Set readable date options
const readableDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
};

// Detect browser’s locale to display human-readable numbers
getUsersLocale = function() {
  return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
};

// Visually hide an element
displayNone = function(id) {
  var elem = document.querySelector(id);
      elem.style.display = 'none';
}

// Turn opacity to 100% for an element
changeOpacity = function(id, opacity = 100) {
  var elem = document.querySelector(id);
      elem.classList.remove("opacity-0");
      elem.classList.add("opacity-" + opacity);
}

// Do math with days on a date
changeDays = function(numOfDays, date) {
  const dateCopy = new Date(date.getTime());
  dateCopy.setDate(dateCopy.getDate() + numOfDays);
  return dateCopy;
};

// Make dates readable for display in the UI
makeDateReadable = function(date) {
  date = date.toLocaleString(getUsersLocale(), readableDateOptions);
  return date;
};

// Make numbers readable
makeNumberReadable = function(number) {
  number = number.toLocaleString(getUsersLocale());
  return number;
};

// Format dates into ISO format — used in ElasticSearch query
formatDateToISO = function(date) {
  date = date.toISOString().substring(0, 10);
  return date;
};

// Change start and end dates
replaceDateRange = function(newStart, newEnd) {
  startDateContents.textContent = makeDateReadable(newStart);
  endDateContents.textContent = makeDateReadable(newEnd);
  startDate     = changeDays(-1, newStart);
  startDate     = formatDateToISO(startDate);
  endDate       = changeDays(+1, newEnd);
  endDate       = formatDateToISO(endDate);
  dateRange     = "(published_date:>" + startDate + "%20AND%20published_date:<" + endDate + ")%20AND%20";
  return dateRange;
};

/* Get report page elements where data will be inserted */
// Date range
var endDateContents                = document.querySelector("#end_date"),
    startDateContents              = document.querySelector("#start_date");

// Send CSV data by email form
var queryHiddenInput               = document.querySelector("#download-form-q"),
    includeHiddenInput             = document.querySelector("#download-form-include");

/* Date display and filtering */
// Set today’s date and 12 months ago date to display most recent Insights data as default
const currentDate                  = new Date(),
      currentDateReadable          = makeDateReadable(currentDate),
      currentDateQuery             = changeDays(+1, currentDate), // add 1 day for ElasticSearch (greater than but not equal)
      currentDateISO               = formatDateToISO(currentDateQuery),

      startYearDate                = new Date(new Date().getFullYear(), 0, 1),
      startYearDateReadable        = makeDateReadable(startYearDate),
      startYearDateQuery           = changeDays(-1, startYearDate),
      startYearDateISO             = formatDateToISO(startYearDateQuery),

      // Get last year’s start and end date as temporary default (see oaworks/Gates#420)
      lastYearStartDate         = new Date(new Date().getFullYear()-1, 0, 1),
      lastYearStartDateReadable = makeDateReadable(lastYearStartDate),
      lastYearStartDateQuery    = changeDays(-1, lastYearStartDate),
      lastYearStartDateISO      = formatDateToISO(lastYearStartDate),

      lastYearEndDate           = new Date(new Date().getFullYear()-1, 11, 31),
      lastYearEndDateReadable   = makeDateReadable(lastYearEndDate),
      lastYearEndDateQuery      = changeDays(+1, lastYearEndDate),
      lastYearEndDateISO        = formatDateToISO(lastYearEndDate);

// Display default date range: since start of the current year
replaceDateRange(lastYearStartDate, lastYearEndDate);

// Check if user is authentified
let orgKey = "",
    hasOrgKey = Object.keys(OAKEYS).length !== 0;
if (hasOrgKey) {
  orgKey = "&orgkey=" + Object.values(OAKEYS);
} else {
  displayNone("#logout");
}

// Set report base path
let report = base + "orgs?q=name:%22" + org + "%22";

// Generate report’s UI for any given date range
oareport = function(org) {

  // Set paths for orgindex
  let queryPrefix                  = queryBase + "q=" + dateRange,
      countQueryPrefix             = countQueryBase + "q=" + dateRange;

  // Get organisational data to produce reports
  axios.get(report).then(function (response) {
    // Get queries for default article counts and strategy action list
    var hasCustomExportIncludes = (response.data.hits.hits[0]._source.export_includes);

    /** Decrypt emails if user has an orgKey **/
    decryptEmail = function(email, doi, mailto) {
      mailto = decodeURI(mailto);
      // if email is not undefined and there is an orgkey, decrypt the author’s email
      if (email !== 'undefined' && hasOrgKey) {
        axios.get(articleEmailBase + doi  + "?" +  orgKey)
          .then(function (response) {
            let authorEmail = response.data;
            mailto = mailto.replaceAll("{email}", authorEmail);
            window.open('mailto:' + mailto);
          }
        ).catch(function (error) { console.log("decryptEmail error: " + error); })
      } else {
        window.open('mailto:' + mailto);
      }
    };

    /** Get Insights data and display it **/
    getInsight = function(numerator, denominator, denominatorText, info) {

      var shown     = response.data.hits.hits[0]._source.analysis[numerator].show_on_web,
          contentID = "#" + numerator; // the whole insight’s data card

      if (shown === true) {
        // Select elements to show data
        var percentageContents = document.querySelector("#percent_" + numerator), // % value
            articlesContents   = document.querySelector("#articles_" + numerator), // full-text value
            infoContents       = document.querySelector("#info_" + numerator); // help text value

        // Display help text / info popover
        const instance = tippy(infoContents, {
          allowHTML: true,
          interactive: true,
          placement: 'top',
          appendTo: document.body,
        }).setContent(info);

        // Get numerator’s count query
        num = axios.get(countQueryPrefix + response.data.hits.hits[0]._source.analysis[numerator].query);

        // Display data in UI if both a numerator & denominator were defined
        if (numerator && denominator) {
          // Get denominator’s count query
          denom = axios.get(countQueryPrefix + response.data.hits.hits[0]._source.analysis[denominator].query);

          Promise.all([num, denom])
            .then(function (results) {
              var numeratorCount   = results[0].data,
                  denominatorCount = results[1].data;

              if (denominatorCount) {
                articlesContents.textContent = makeNumberReadable(numeratorCount) + " of " + makeNumberReadable(denominatorCount) + " " + denominatorText;
                percentageContents.textContent = Math.round(((numeratorCount/denominatorCount)*100)) + "%";
              } else {
                articlesContents.textContent = "";
                percentageContents.textContent = "N/A";
              };
            }
          ).catch(function (error) { console.log("error: " + error); });

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
      "articles covered",
      "<p class='mb-2'>The percentage of articles that are compliant with <a href='" + response.data.hits.hits[0]._source.policy.url + "' target='_blank' rel='noopener' class='underline'>your organization’s Open Access policy</a>.</p> <p>This number is specific to your policy and your requirements.</p>"
    );

    getInsight(
      "is_oa",
      "is_paper",
      "articles",
      "<p>The number of articles that are free and <a href='https://creativecommons.org/licenses/by/4.0/' class='underline' target='_blank' rel='noopener'>CC BY</a> <strong class='bold'>or</strong> <a href='https://creativecommons.org/publicdomain/zero/1.0/' class='underline' target='_blank' rel='noopener'>CC0</a> (in the public domain) on the publisher’s website, a repository or a preprint server.</p>"
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
      "articles generating data",
      "<p class='mb-2'>The percentage of articles that shared any data under a <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank' rel='noopener' class='underline'>CC0</a> or <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noopener' class='underline'>CC-BY</a> license.</p> <p class='mb-2'>This figure only measures how many articles shared Open Data if they generated data in the first place. It also only measures if any of the datasets generated were open, not if all of them were open.</p> <p>We work with <a href='https://dataseer.ai/' target='_blank' rel='noopener' class='underline'>Dataseer</a>’s data, which uses a combination of machine learning and human review to analyze the articles’ content.</p>"
    );

    getInsight(
      "has_open_code",
      "has_code",
      "articles generating code",
      "<p class='mb-2'>The percentage of articles that shared any code under a permissive open-source licence, such as MIT.</p> <p class='mb-2'>This figure measures how many articles shared Open Code if they generated code in the first place. It also only measures if <strong>any parts</strong> of the code generated are open, not if <strong>all</strong> of it is open.</p> <p> We work with <a href='https://dataseer.ai/' target='_blank' rel='noopener' class='underline'>Dataseer</a>’s data, which uses a combination of machine learning and human review to analyze the articles’ content.</p>"
    );

    displayStrategy = function(strategy, keys, tableRow) {
      var shown  = response.data.hits.hits[0]._source.strategy[strategy].show_on_web,
          tabID  = "#item_" + strategy;

      if (shown === true) {
        // Get tab elements
        var tabCountContents   = document.querySelector(`#count_${strategy}`),
            tableCountContents = document.querySelector(`#total_${strategy}`),
            tableBody          = document.querySelector(`#table_${strategy}`).getElementsByTagName('tbody')[0];
        
        // Get total action (article) count for this strategy & full list of actions
        var count              = axios.get(countQueryPrefix + response.data.hits.hits[0]._source.strategy[strategy].query),
            list               = axios.get(queryPrefix + response.data.hits.hits[0]._source.strategy[strategy].query);
          
        Promise.all([count, list])
          .then(function (results) {
            var count = parseFloat(results[0].data),
                list = results[1].data.hits.hits;

            // Show total number of actions in tab & above table
            tabCountContents.textContent = makeNumberReadable(count);
            if (count > 100) {
              count = 100; // limit to 100
            }
            tableCountContents.textContent = makeNumberReadable(count);

            // If there’s an orgkey, show full list of strategies
            if (hasOrgKey) {
              // If no actions are available, show message
              if (count === 0) {
                tableCountContents.textContent = "No ";
                tableBody.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find any articles! <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
              }

              // Otherwise, generate list of actions
              else if (count > 0 || count !== null) {
                var tableRows = ""; // Contents of the list to be displayed in the UI as a table
                
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
                      var value = suppKey[key];
                      action[key] = value;
                      
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
                    mailto = response.data.hits.hits[0]._source.strategy[strategy].mailto;

                    var newMailto = mailto.replaceAll("\'", "’");
                    newMailto = newMailto.replaceAll("{doi}", (action.doi ? action.doi : "[No DOI found]"));
                    newMailto = newMailto.replaceAll("{author_email_name}", (action.author_email_name ? action.author_email_name : "[No author’s name found]"));
                    newMailto = newMailto.replaceAll("{title}", (action.title ? action.title : "[No title found]"));

                    // And add it to the action array
                    action["mailto"] = encodeURI(newMailto);
                  };

                  var tableRowLiteral = eval('`'+ tableRow +'`'); // Convert given tableRow to template literal
                  tableRows += tableRowLiteral; // Populate the table with a row w/ replaced placeholders for each action 
                  tableRows += "</tr>";
                }

                tableBody.innerHTML = tableRows; // Fill table with all actions
              }
            }

            // Otherwise, display a message prompting user to log or contact us to access strategies
            else {
              tableBody.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-base text-center align-top break-words' colspan='3'><p class='font-bold'>Strategies help you take action to make your institution’s research more open.</p> <p>Find out more about strategies by <a href='mailto:hello@oa.works?subject=OA.Report' class='underline'>contacting us</a> or logging in to your account to access them.</p></td></tr>";
              displayNone(`#form_${strategy}`);
            }            
          }
        ).catch(function (error) { console.log(`${strategy} error: ${error}`); })

        // Once data has loaded, display the card
        changeOpacity(tabID);

      } else {
        displayNone(tabID);
        document.getElementById(strategy).remove();
      };
    };

    displayStrategy(
      "email_author_vor",
      ['published_date', 'title', 'journal', 'author_email_name', 'email', 'doi', 'mailto'],
      "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-500'>${action.published_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.doi}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-500'>${action.journal}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-500 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-500 align-top break-words sm:table-cell'>\
        <button class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200' onclick='decryptEmail(\"${action.email}\", \"${action.doi}\", \"${action.mailto}\")'>\
          <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-mail inline-block h-4 duration-500'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>\
        </button>\
      </td>"
    );

    displayStrategy(
      "email_author_aam",
      ['published_date', 'title', 'journal', 'author_email_name', 'email', 'doi', 'mailto'],
      "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-500'>${action.published_date}</div>\
        <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.doi}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-500'>${action.journal}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-neutral-500 align-top break-words sm:table-cell'>\
        <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
      </td>\
      <td class='hidden px-3 py-4 text-sm text-center text-neutral-500 align-top break-words sm:table-cell'>\
        <button class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200' onclick='decryptEmail(\"${action.email}\", \"${action.doi}\", \"${action.mailto}\")'>\
          <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-mail inline-block h-4 duration-500'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>\
        </button>\
      </td>"
    );
    
    displayStrategy(
      "apc_followup",
      ['published_date', 'title', 'journal', 'doi', 'publisher', 'publisher_license', 'journal_oa_type', 'oa_status', 'supplements.apc_cost', 'supplements.invoice_number', 'supplements.invoice_date'],
      "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.publisher}</div>\
        <div class='mb-3 text-neutral-900'>${action.journal}</div>\
        <div class='text-neutral-500'>OA type: <span class='font-medium'>${action.journal_oa_type}</span></div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 text-neutral-500'>${action.published_date}</div>\
        <div class='mb-1 text-neutral-900 hover:text-carnation-500'>\
          <a href='https://doi.org/${action.doi}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='mb-3 text-neutral-500'>${action.doi}</div>\
        <div class='text-neutral-500'>OA status: <span class='font-medium'>${action.oa_status}<span></div>\
        <div class='text-neutral-500'>License: <span class='font-medium uppercase'>${action.publisher_license}</span></div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-3 text-neutral-500'>${action.invoice_date}</div>\
        <div class='mb-3 text-neutral-900'>${action.invoice_number}</div>\
        <div class='text-neutral-500 uppercase'>US$${action.apc_cost}</div>\
      </td>"
    );

    displayStrategy(
      "unanswered_requests",
      ['title', 'journal', 'author_email_name', 'email', 'doi', 'supplements.program__bmgf', 'supplements.grantid__bmgf', 'mailto'],
      "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.program__bmgf}</div>\
        <div class='text-neutral-900'>${action.grantid__bmgf}</div>\
      </td>\
      <td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
        <div class='mb-1 font-medium text-neutral-900'>${action.author_email_name}</div>\
        <div class='mb-1 text-neutral-900'>\
          <a href='https://doi.org/${action.doi}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
        </div>\
        <div class='text-neutral-500'>${action.journal}</div>\
      </td>\
      <td class='whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium'>\
        <button class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200' onclick='decryptEmail(\"${action.email}\", \"${action.doi}\", \"${action.mailto}\")'>\
          <svg class='h-4 w-4' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-mail inline-block h-4 duration-500'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>\
        </button>\
      </td>"
    );

    /* "Download CSV" form: all articles displayed on page */
    getExportLink = function() {
      Promise.all([hasCustomExportIncludes])
        .then(function (results) {
          let hasCustomExportIncludes = results[0].data;
          }
        ).catch(function (error) { console.log("Export error: " + error); });

      isPaperURL = (dateRange + response.data.hits.hits[0]._source.analysis.is_paper.query);
      let query = "q=" + isPaperURL.replaceAll(" ", "%20"),
          form = new FormData(document.getElementById("download_csv"));

      // Get form content — email address input
      var email = "&" + new URLSearchParams(form).toString();

      var include;
      if (hasCustomExportIncludes !== undefined && hasCustomExportIncludes !== "") {
        include = "&include=" + hasCustomExportIncludes;
      } else {
        include =  "&include=DOI,title,subtitle,publisher,journal,issn,published,published_year,PMCID,volume,issue,authorships.author.display_name,authorships.author.orcid,authorships.institutions.display_name,authorships.institutions.ror,funder.name,funder.award,is_oa,oa_status,journal_oa_type,publisher_license,has_repository_copy,repository_license,repository_version,repository_url,has_oa_locations_embargoed,can_archive,version,concepts.display_name,concepts.level,concepts.score,subject,pmc_has_data_availability_statement,cited_by_count";
      }

      // Build full query
      query = csvExportBase + query + include + email + orgKey;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", query);
      // Display message when server responds
      xhr.onload = function () {
        document.querySelector("#csv_email_msg").innerHTML = "OA.Report has started building your CSV export at <a href='" + this.response + "' target='_blank' class='underline'>this URL</a>. Please check your email to get the full data once it’s ready.";
      };
      xhr.send();

      // Do not navigate away from the page on submit
      return false;
    }

    /* Strategy-level "download CSV" form */
    getStrategyExportLink = function(id) {
      var formID = id;
      /* TODO: temp solution for oaworks/Gates#369 — clean this up */
      // Set export includes and queries for all types of strategies
      if (formID == "can-archive-vor") {
        hasCustomExportIncludes = (response.data.hits.hits[0]._source.strategy.email_author_vor.export_includes);
        strategyQuery           = (response.data.hits.hits[0]._source.strategy.email_author_vor.query);
      } else if (formID == "can-archive-aam") {
        hasCustomExportIncludes = (response.data.hits.hits[0]._source.strategy.email_author_aam.export_includes);
        strategyQuery           = (response.data.hits.hits[0]._source.strategy.email_author_aam.query);
      } else if (formID == "has-apc-followup") {
        hasCustomExportIncludes = (response.data.hits.hits[0]._source.strategy.apc_followup.export_includes);
        strategyQuery           = (response.data.hits.hits[0]._source.strategy.apc_followup.query);
      } else if (formID == "has-unanswered-requests") {
        hasCustomExportIncludes = (response.data.hits.hits[0]._source.strategy.unanswered_requests.export_includes);
        strategyQuery           = (response.data.hits.hits[0]._source.strategy.unanswered_requests.query);
      }

      Promise.all([hasCustomExportIncludes])
        .then(function (results) {
          let hasCustomExportIncludes = results[0].data;
          }
        ).catch(function (error) { console.log("Export error: " + error); });

      // Set up export query
      isPaperURL = (dateRange + strategyQuery);
      let query = "q=" + isPaperURL.replaceAll(" ", "%20"),
          form = new FormData(document.getElementById("form_" + formID));

      // Get form content — email address input
      var email = "&" + new URLSearchParams(form).toString();

      // Display export includes if there are any
      var include;
      if (hasCustomExportIncludes !== undefined) {
        include = "&include=" + hasCustomExportIncludes;
      }

      // Build full query
      query = csvExportBase + query + include + email + orgKey;

      var xhr = new XMLHttpRequest();
      xhr.open("GET", query);
      // Display message when server responds
      xhr.onload = function () {
        document.querySelector("#msg-" + formID).innerHTML = "OA.Report has started building your CSV export at <a href='" + this.response + "' target='_blank' class='underline'>this URL</a>. Please check your email to get the full data once it’s ready.";
      };
      xhr.send();

      // Do not navigate away from the page on submit
      return false;
    }

  }).catch(function (error) { console.log("Report ERROR: " + error); });
};

oareport(org);

/** Change displayed Insights data based on user input **/
// Preset "quick date filter" buttons
var startYearBtn              = document.querySelector("#start-year"),
    lastYearBtn               = document.querySelector("#last-year"),
    twoYearsBtn               = document.querySelector("#two-years-ago"),
    allTimeBtn                = document.querySelector("#all-time"),
    insightsDateRange         = document.querySelector("#insights_range"),

    twoYearsStartDate         = new Date(new Date().getFullYear()-2, 0, 1),
    twoYearsStartDateReadable = makeDateReadable(twoYearsStartDate),
    twoYearsStartDateQuery    = changeDays(-1, twoYearsStartDate),
    twoYearsStartDateISO      = formatDateToISO(twoYearsStartDate),

    twoYearsEndDate           = new Date(new Date().getFullYear()-2, 11, 31),
    twoYearsEndDateReadable   = makeDateReadable(twoYearsEndDate),
    twoYearsEndDateQuery      = changeDays(+1, twoYearsEndDate),
    twoYearsEndDateISO        = formatDateToISO(twoYearsEndDate);

startYearBtn.textContent      = "This year";
lastYearBtn.textContent       = lastYearStartDate.getFullYear();
twoYearsBtn.textContent       = twoYearsStartDate.getFullYear();

startYearBtn.addEventListener("click", function() {
  replaceDateRange(startYearDate, currentDate);
  insightsDateRange.textContent = "Since the start of " + startYearDate.getFullYear();
  oareport(org);
});

lastYearBtn.addEventListener("click", function() {
  replaceDateRange(lastYearStartDate, lastYearEndDate);
  insightsDateRange.textContent = "In " + lastYearStartDate.getFullYear();
  oareport(org);
});

twoYearsBtn.addEventListener("click", function() {
  replaceDateRange(twoYearsStartDate, twoYearsEndDate);
  insightsDateRange.textContent = "In " + twoYearsStartDate.getFullYear();
  oareport(org);
});

allTimeBtn.addEventListener("click", function() {
  replaceDateRange(new Date(1980, 0, 1), currentDate);
  insightsDateRange.textContent = "All-time";
  oareport(org);
});
