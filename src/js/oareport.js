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
let orgKey = "";
if (Object.keys(OAKEYS).length !== 0) {
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
      if (email !== 'undefined' && Object.keys(OAKEYS).length !== 0) {
        axios.get(articleEmailBase + doi  + "?" +  orgKey)
          .then(function (response) {
            let authorEmail = response.data;
            mailto = mailto.replaceAll("{author_email}", authorEmail);
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
            var numCount = result.data;
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
      "The total number of articles published by grantees or authors at your organization."
    );

    getInsight(
      "is_free_to_read",
      "is_paper",
      "articles",
      "Articles that are free to read on the publisher website or any online repository, including temporarily accessible articles (“bronze Open Access”)."
    );

    getInsight(
      "is_compliant",
      "is_covered_by_policy",
      "articles covered",
      "The percentage of articles that are compliant with <a href='" + response.data.hits.hits[0]._source.policy.url + "' target='_blank' rel='noopener' class='underline'>your organization’s Open Access policy</a>. This number is specific to your policy and your requirements."
    );

    getInsight(
      "is_oa",
      "is_paper",
      "articles",
      "The number of articles that are free and <a href='https://creativecommons.org/licenses/by/4.0/' class='underline' target='_blank' rel='noopener'>CC BY</a> <strong class='bold'>or</strong> <a href='https://creativecommons.org/publicdomain/zero/1.0/' class='underline' target='_blank' rel='noopener'>CC0</a> (in the public domain) on the publisher’s website, a repository or a preprint server."
    );

    getInsight(
      "has_data_availability_statement",
      "has_checked_data_availability_statement",
      "articles checked",
      "This number tells you how many papers that we’ve analyzed have a data availability statement. To check if a paper has a data availability statement, we use data from PubMed and review papers manually. This figure doesn’t tell you what type of data availability statement is provided (e.g there is Open Data vs there is no data)"
    );
  
    getInsight(
      "has_open_data",
      "has_data",
      "articles generating data",
      "The percentage of articles that shared any data under a <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank' rel='noopener' class='underline'>CC0</a> or <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noopener' class='underline'>CC-BY</a> license. This figure only measures how many articles shared Open Data if they generated data in the first place. It also only measures if any of the datasets generated were open, not if all of them were open. To analyze this we work with Dataseer, who uses a combination of machine learning and human review to review the text of the papers"
    );

    displayStrategy = function(strategy) {
      var count = axios.get(countQueryPrefix + response.data.hits.hits[0]._source.strategy[strategy].query),
          list  = axios.get(queryPrefix + response.data.hits.hits[0]._source.strategy[strategy].query),
  
          tabCountContents   = document.querySelector("#count_" + strategy),
          tableCountContents = document.querySelector("#total_" + strategy),
          table = document.querySelector("#table_" + strategy);
  
      Promise.all([count, list])
        .then(function (results) {
          let count = parseFloat(results[0].data),
              list = results[1].data.hits.hits;
  
          // Show total number of actions in tab & above table
          tabCountContents.textContent = makeNumberReadable(count);
  
          if (count > 100) {
            count = 100;
          }
  
          tableCountContents.textContent = makeNumberReadable(count);
  
          // Generate list of archivable AAMs if there are any
          if (count === 0) {
            tableCountContents.textContent = "No ";
            table.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find any articles! <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
          }
          else if (count > 0 || count !== null) {
            // Set up and get list of emails for archivable AAMs
            var tableRows = "";
  
            for (var i = 0; i < count; i++) {
              var title = list[i]._source.title,
                  author = list[i]._source.author_email_name,
                  doi   = list[i]._source.DOI,
                  pubDate = list[i]._source.published_date,
                  journal = list[i]._source.journal,
                  authorEmail = list[i]._source.email;
  
              // Get email draft/body for this article and replace with its metadata
              var mailtoContents = response.data.hits.hits[0]._source.strategy[strategy].mailto;
              mailtoContents = mailtoContents.replaceAll("\'", "’");
              mailtoContents = mailtoContents.replaceAll("{title}", (title ? title : "[No article title found]"));
              mailtoContents = mailtoContents.replaceAll("{doi}", (doi ? doi : "[No DOI found]"));
              mailtoContents = mailtoContents.replaceAll("{author_name}", (author ? author : "researcher"));
  
              /*jshint multistr: true */
              tableRows += '<tr>\
                <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                  <div class="mb-1 text-neutral-500">' + (pubDate ? makeDateReadable(new Date(pubDate)) : "[No date found]") + '</div>\
                  <div class="mb-1 font-medium text-neutral-900 hover:text-carnation-500">\
                    <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + (title ? title : "[No article title found]") + '</a>\
                  </div>\
                  <div class="text-neutral-500">' + (journal ? journal : "[No journal name found]") + '</div>\
                </td>\
                <td class="hidden px-3 py-4 text-sm text-neutral-500 align-top break-words sm:table-cell">\
                  <div class="mb-1 text-neutral-900">' + (author ? author : "[No author’s name found]") + '</div>\
                  <div class="text-neutral-500">' + (authorEmail ? "Email available" : "No email") + '</div>\
                </td>\
                <td class="whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium">\
                  <button class="inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200 js-btn-can-archive-aam" onclick="decryptEmail(\'' + authorEmail + '\', \'' + doi +  '\', \'' + encodeURI(mailtoContents) +'\');">\
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail inline-block h-4 duration-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\
                  </button>\
                </td>\
              </tr>';
            }
            table.innerHTML = tableRows;
          }
        }
      ).catch(function (error) { console.log(`${strategy} error: ${error}`); })
    };

    displayStrategy("email_author_vor");

    displayStrategy("email_author_aam");

    /** Display Strategies: follow up with uncompliant articles with paid APCs **/
    displayStrategyAPCFollowup = function() {
      var totalAPCActionsContents        = document.querySelector("#total_has-apc-followup"),
          hasAPCFollowupTable            = document.querySelector("#table_has-apc-followup"),
          countAPCActionsContents        = document.querySelector("#count_has-apc-followup");

      if (response.data.hits.hits[0]._source.strategy.apc_followup.query) {
        hasAPCFollowupSort = "&sort=publisher.keyword:asc,journal.keyword:asc,supplements.invoice_date:desc";
        hasAPCFollowupQuery  = (countQueryPrefix + response.data.hits.hits[0]._source.strategy.apc_followup.query);
        hasAPCFollowupListQuery = (queryPrefix + response.data.hits.hits[0]._source.strategy.apc_followup.query) + hasAPCFollowupSort;
        hasAPCFollowup  = axios.get(hasAPCFollowupQuery);
        hasAPCFollowupList = axios.get(hasAPCFollowupListQuery);

        Promise.all([hasAPCFollowup, hasAPCFollowupList])
          .then(function (results) {
            let hasAPCFollowup = results[0].data,
                hasAPCFollowupList = results[1].data.hits.hits,
                hasAPCFollowupLength = parseFloat(hasAPCFollowup);

            // Show total number of actions in tab & above table
            countAPCActionsContents.textContent = makeNumberReadable(hasAPCFollowupLength);

            if (hasAPCFollowupLength > 100) {
              hasAPCFollowupLength = 100;
            }

            totalAPCActionsContents.textContent = makeNumberReadable(hasAPCFollowupLength);

            // Generate list of APC followups if there are any
            if (hasAPCFollowup === 0) {
              totalAPCActionsContents.textContent = "No ";
              hasAPCFollowupTable.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find any articles! <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
            }
            else if (hasAPCFollowup > 0 || hasAPCFollowup !== null) {
              // Set up and get list of emails for APC followups
              var hasAPCFollowupTableRows = "";

              for (var i = 0; i < hasAPCFollowupLength; i++) {
                var title = hasAPCFollowupList[i]._source.title,
                    publisher = hasAPCFollowupList[i]._source.publisher,
                    journalOATtype = hasAPCFollowupList[i]._source.journal_oa_type,
                    articleOAStatus = hasAPCFollowupList[i]._source.oa_status,
                    license = hasAPCFollowupList[i]._source.publisher_license,
                    doi   = hasAPCFollowupList[i]._source.DOI,
                    pubDate = hasAPCFollowupList[i]._source.published_date,
                    journal = hasAPCFollowupList[i]._source.journal;

                // Loop over supplements array to access APC info without index number
                var dataAPC = hasAPCFollowupList[i]._source.supplements.find(
                  function(i) {
                    return (i.apc_cost);
                  }
                );

                var costAPC = dataAPC.apc_cost,
                    invoiceNb = dataAPC.invoice_number,
                    invoiceDate = dataAPC.invoice_date;

                /*jshint multistr: true */
                hasAPCFollowupTableRows += '<tr>\
                  <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                    <div class="mb-1 font-medium text-neutral-900">\
                      ' + (publisher ? publisher : "[No publisher found]") + '\
                    </div>\
                    <div class="mb-3 text-neutral-900">\
                      ' + (journal ? journal : "[No journal found]") + '\
                    </div>\
                    <div class="text-neutral-500">\
                      ' + (journalOATtype ? ('<span class="capitalize font-bold">' + journalOATtype + '</span> journal') : "[No status found for this journal]") + '\
                    </div>\
                  </td>\
                  <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                    <div class="mb-1 text-neutral-500">' + (pubDate ? ('Published on ' + makeDateReadable(new Date(pubDate))) : "[No date found]") + '</div>\
                    <div class="mb-1 text-neutral-900 hover:text-carnation-500">\
                      <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + (title ? title : "[No article title found]") + '</a>\
                    </div>\
                    <div class="mb-3 text-neutral-500">' + (doi ? doi : "[No DOI found]") + '</div>\
                    <div class="text-neutral-500">\
                      ' + (articleOAStatus ? ('<span class="capitalize font-bold">' + articleOAStatus + '</span> article') : "[No status found for this article]") + '\
                       — ' + (license ? ('<span class="uppercase font-bold">' + license + '</span>') : "[No license found]") + '\
                    </div>\
                  </td>\
                  <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                    <div class="mb-3 text-neutral-500">\
                      ' + (invoiceDate ? ('Issued on ' + makeDateReadable(new Date(invoiceDate))) : "[No invoice date found]") + '\
                    </div>\
                    <div class="mb-3 text-neutral-900">\
                      ' + (invoiceNb ? invoiceNb : "[No invoice number found]") + '\
                    </div>\
                    <div class="text-neutral-500 uppercase">\
                      ' + (costAPC ? ('US$' + costAPC) : "[No APC cost found]") + '\
                    </div>\
                  </td>\
                </tr>';
              }
              hasAPCFollowupTable.innerHTML = hasAPCFollowupTableRows;
            }
          }
        ).catch(function (error) { console.log("displayStrategyAPCFollowup error: " + error); })
      } else {
        // hide tab and its content if this strategy doesn’t exist for this org
        document.querySelectorAll('#item-has-apc-followup, #has-apc-followup').forEach(function(elems) {
          elems.style.display = 'none';
        });
      }
    };

    /** Display Strategies: escalate unanswered requests **/
    displayStrategyUnansweredRequests = function() {
      var totalUnansweredActionsContents = document.querySelector("#total_has-unanswered-requests"),
          hasUnansweredRequestsTable     = document.querySelector("#table_has-unanswered-requests"),
          countUnansweredActionsContents = document.querySelector("#count_has-unanswered-requests");

      if (response.data.hits.hits[0]._source.strategy.unanswered_requests.query) {
        hasUnansweredRequestsQuery  = (countQueryPrefix + response.data.hits.hits[0]._source.strategy.unanswered_requests.query);
        hasUnansweredRequestsListQuery = (queryPrefix + response.data.hits.hits[0]._source.strategy.unanswered_requests.query);
        hasUnansweredRequests  = axios.get(hasUnansweredRequestsQuery);
        hasUnansweredRequestsList = axios.get(hasUnansweredRequestsListQuery);

        Promise.all([hasUnansweredRequests, hasUnansweredRequestsList])
          .then(function (results) {
            let hasUnansweredRequests = results[0].data,
                hasUnansweredRequestsList = results[1].data.hits.hits,
                hasUnansweredRequestsLength = parseFloat(hasUnansweredRequests);

            // Show total number of actions in tab & above table
            countUnansweredActionsContents.textContent = makeNumberReadable(hasUnansweredRequestsLength);

            if (hasUnansweredRequestsLength > 100) {
              hasUnansweredRequestsLength = 100;
            }

            totalUnansweredActionsContents.textContent = makeNumberReadable(hasUnansweredRequestsLength);

            // Generate list of APC followups if there are any
            if (hasUnansweredRequests === 0) {
              totalUnansweredActionsContents.textContent = "No ";
              hasUnansweredRequestsTable.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find any articles! <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
            }
            else if (hasUnansweredRequests > 0 || hasUnansweredRequests !== null) {
              // Set up and get list of emails for APC followups
              var hasUnansweredRequestsTableRows = "";

              for (var i = 0; i < hasUnansweredRequestsLength; i++) {
                var title = hasUnansweredRequestsList[i]._source.title,
                    doi = hasUnansweredRequestsList[i]._source.doi,
                    journal = hasUnansweredRequestsList[i]._source.journal,
                    authorEmail = hasUnansweredRequestsList[i]._source.email,
                    author = hasUnansweredRequestsList[i]._source.author_email_name;

                // Loop over supplements array to access grant ID without index number
                  // TODO: this is for BMGF only — format will always be grantid__{org}
                  // Get acronym from the org index instead of hardcoding it here
                var dataGrant = hasUnansweredRequestsList[i]._source.supplements.find(
                  function(i) {
                    return (i.grantid__bmgf);
                  }
                );

                var grantID = dataGrant.grantid__bmgf,
                    program = dataGrant.program__bmgf;

                // Get email draft/body for this article and replace with its metadata
                var hasUnansweredRequestsMailto = response.data.hits.hits[0]._source.strategy.unanswered_requests.mailto;
                hasUnansweredRequestsMailto = hasUnansweredRequestsMailto.replaceAll("\'", "’");
                hasUnansweredRequestsMailto = hasUnansweredRequestsMailto.replaceAll("{doi}", (doi ? doi : "[No DOI found]"));
                hasUnansweredRequestsMailto = hasUnansweredRequestsMailto.replaceAll("{author_name}", (author ? author : "researcher"));

                /*jshint multistr: true */
                hasUnansweredRequestsTableRows += '<tr>\
                  <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                    <div class="mb-1 font-medium text-neutral-900">\
                      ' + (program ? program : "[No program found]") + '\
                    </div>\
                    <div class="text-neutral-900">\
                      ' + (grantID ? grantID : "[No grant ID found]") + '\
                    </div>\
                  </td>\
                  <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                    <div class="mb-1 font-medium text-neutral-900">' + (author ? author : "[No author’s name found]") + '</div>\
                    <div class="mb-1 text-neutral-900">\
                      <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + (title ? title : "[No article title found]") + '</a>\
                    </div>\
                    <div class="text-neutral-500">' + (journal ? journal : "[No journal name found]") + '</div>\
                  </td>\
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium">\
                    <button class="inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200 js-btn-can-archive-aam" onclick="decryptEmail(\'' + authorEmail + '\', \'' + doi +  '\', \'' + encodeURI(hasUnansweredRequestsMailto) +'\');">\
                      <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail inline-block h-4 duration-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\
                    </button>\
                  </td>\
                </tr>';
              }
              hasUnansweredRequestsTable.innerHTML = hasUnansweredRequestsTableRows;
            }
          }
        ).catch(function (error) { console.log("displayStrategyUnansweredRequests error: " + error); })
      } else {
        // hide tab and its content if this strategy doesn’t exist for this org
        document.querySelectorAll('#item-has-unanswered-requests, #has-unanswered-requests').forEach(function(elems) {
          elems.style.display = 'none';
        });
      }
    };

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
          form = new FormData(document.getElementById("form-" + formID));

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

    displayStrategyAPCFollowup();
    displayStrategyUnansweredRequests();

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
