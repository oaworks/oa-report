const base           = "https://beta.oa.works/report/",
      queryBase      = base + "works?size=100&",
      countQueryBase = base + "works/count?",
      csvExportBase  = "https://bg.beta.oa.works/report/works.csv?";
let isPaperCount, isEligibleCount, isOA, canArchiveAAM, canArchiveAAMMailto, canArchiveAAMList, downloadAllArticles, hasPolicy, policyURL, dateRangeButton, csvEmailButton, totalArticles, hasDataStatementCount, hasCheckedDataStatementCount, hasOpenDataCount, hasCheckedDataCount;
let isCompliant = false;

// Detect browser’s locale to display human-readable numbers
getUsersLocale = function() {
  return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
};

// Do math with days on a date
changeDays = function(numOfDays, date) {
  const dateCopy = new Date(date.getTime());
  dateCopy.setDate(dateCopy.getDate() + numOfDays);
  return dateCopy;
};

// Set readable date options
var readableDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
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

// Individual insights (metrics)
var articlesContents               = document.querySelector("#articles"),
    oaArticlesContents             = document.querySelector("#articles_oa"),
    oaPercentageContents           = document.querySelector("#percent_oa"),
    freeArticlesContents           = document.querySelector("#articles_free"),
    freePercentageContents         = document.querySelector("#percent_free"),
    compliantArticlesContents      = document.querySelector("#articles_compliant"),
    compliantPercentageContents    = document.querySelector("#percent_compliant"),
    complianceContents             = document.querySelector("#compliance"),
    dataStatementPercentageContents= document.querySelector("#percent_data_statement"),
    dataStatementContents          = document.querySelector("#articles_data_statement"),
    openDataPercentageContents     = document.querySelector("#percent_open_data"),
    openDataContents               = document.querySelector("#articles_open_data");

// Deposit VOR strategy
var totalVORActionsContents        = document.querySelector("#total_vor_actions"),
    canArchiveVORTable             = document.querySelector("#can_archive_vor_list"),
    countVORActionsContents        = document.querySelector("#count_vor");

// Deposit AAM strategy
var totalAAMActionsContents        = document.querySelector("#total_aam_actions"),
    canArchiveAAMTable             = document.querySelector("#can_archive_aam_list"),
    countAAMActionsContents        = document.querySelector("#count_aam");

// Follow up paid APCs strategy
var totalAPCActionsContents        = document.querySelector("#total_apc_actions"),
    hasAPCFollowupTable            = document.querySelector("#has_apc_followup_list"),
    countAPCActionsContents        = document.querySelector("#count_apc");

/* Date display and filtering */
// Set today’s date and 12 months ago date to display most recent Insights data as default
const currentDate                  = new Date(),
      currentDateReadable          = makeDateReadable(currentDate),
      currentDateQuery             = changeDays(+1, currentDate), // add 1 day for ElasticSearch (greater than but not equal)
      currentDateISO               = formatDateToISO(currentDateQuery),

      startYearDate                = new Date(new Date().getFullYear(), 0, 1),
      startYearDateReadable        = makeDateReadable(startYearDate),
      startYearDateQuery           = changeDays(-1, startYearDate),
      startYearDateISO             = formatDateToISO(startYearDateQuery);

// Get all dates for filtering data by dates
let startDate                      = "",
    endDate                        = "";

// Display default date range: since start of the current year
endDateContents.textContent        = currentDateReadable;
startDateContents.textContent      = startYearDateReadable;
startDate                          = startYearDateISO;
endDate                            = currentDateISO;

var dateRange                      = "(published_date:>" + startDate + "%20AND%20published_date:<" + endDate + ")%20AND%20",
    recordSize                     = "&size=100"; // Set record size for number of actions shown in Strategies

// Get organisational data to produce reports
oareport = function(org) {
  let report                       = base + "orgs?q=name:%22" + org + "%22",
      queryPrefix                  = queryBase + "q=" + dateRange,
      countQueryPrefix             = countQueryBase + "q=" + dateRange;

  axios.get(report).then(function (response) {

    /** Get queries for default article counts and strategy action list **/
    getCountQueries = function() {
      isPaperQuery                 = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.is_paper);
      //isOAQuery                  = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.is_oa);
      isFreeQuery                  = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.is_free_to_read);
      canArchiveAAMQuery           = (countQueryPrefix + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
      canArchiveAAMListQuery       = (queryPrefix + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
      canArchiveVORQuery           = (countQueryPrefix + response.data.hits.hits[0]._source.strategy.email_author_vor.query);
      canArchiveVORListQuery       = (queryPrefix + response.data.hits.hits[0]._source.strategy.email_author_vor.query);
      hasCustomExportIncludes      = (response.data.hits.hits[0]._source.export_includes);

      isPaperCount                 = axios.get(isPaperQuery);
      //isOA                       = axios.get(isOAQuery);
      isFreeCount                  = axios.get(isFreeQuery);
      canArchiveAAM                = axios.get(canArchiveAAMQuery);
      canArchiveAAMList            = axios.get(canArchiveAAMListQuery);
      canArchiveVOR                = axios.get(canArchiveVORQuery);
      canArchiveVORList            = axios.get(canArchiveVORListQuery);

      console.log("org index: " + base + "orgs?q=name:%22" + org + "%22");
      console.log("canArchiveAAMListQuery: "+ canArchiveAAMListQuery);

    };

    /** Check for an OA policy and display a link to the policy page in a tooltip **/
    getPolicy = function() {
      const instance = tippy(document.querySelector('#compliant_info'), {
        allowHTML: true,
        interactive: true,
        placement: 'top',
        appendTo: document.body,
      });

      var policyInfo = "";

      // ...get its URL
      hasPolicy = response.data.hits.hits[0]._source.policy.supported_policy;

      console.log("hasPolicy: " + hasPolicy)

      // ...then get the number of compliant articles and display a tooltip
      if (hasPolicy) {
        policyURL = response.data.hits.hits[0]._source.policy.url;

        isCompliantQuery = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.is_compliant);
        isEligibleQuery  = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.is_covered_by_policy);
        isCompliantCount = axios.get(isCompliantQuery);
        isEligibleCount  = axios.get(isEligibleQuery);

        /*jshint multistr: true */
        policyInfo = "The percentage of articles that are compliant with <a href='" + policyURL + "' target='_blank' rel='noopener' class='underline'>your organization’s Open Access policy</a>. This number is specific to your policy and your requirements.";
      } else {
        policyInfo = "We couldn’t track a policy for your organization.";
        compliantArticlesContents.textContent = "";
        compliantPercentageContents.textContent = "N/A";
        isCompliantCount = "";
        isEligibleCount = "";
      }
      instance.setContent(policyInfo);

      Promise.all([isCompliantCount, isEligibleCount])
        .then(function (results) {

          // Set total of articles depending on whether or not articles need to be covered by policy
          if (isEligibleCount) {
            let isEligibleCount = results[1].data;
            totalArticles = isEligibleCount;
            totalArticlesString = " eligible";
          } else {
            totalArticles = isPaperCount;
            totalArticlesString =  " articles";
          }

          // Display totals and % of policy-compliant articles
          if (isCompliantCount) {
            let isCompliantCount = results[0].data;
            compliantArticlesContents.textContent = makeNumberReadable(isCompliantCount) + " of " + makeNumberReadable(totalArticles) + totalArticlesString;
            compliantPercentageContents.textContent = Math.round(((isCompliantCount/totalArticles)*100)) + "%";
          }
        }
      ).catch(function (error) { console.log("getPolicy error: " + error); });
    };

    /** Check for data availability statements **/
    getDataStatements = function() {
      var dataStatementInfo = "";

      // ...check if there are any at all
      hasDataStatement = response.data.hits.hits[0]._source.analysis.has_data_availability_statement;

      // Display whether or not articles have a data availability statement after being checked
      if (hasDataStatement) {
        // Get their count
        hasDataStatementQuery        = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.has_data_availability_statement);
        hasCheckedDataStatementQuery = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.has_checked_data_availability_statement);
        hasDataStatementCount        = axios.get(hasDataStatementQuery);
        hasCheckedDataStatementCount = axios.get(hasCheckedDataStatementQuery);
        /*jshint multistr: true */
        dataStatementInfo = "This number tells you how many papers that we’ve analyzed have a data availability statement. To check if a paper has a data availability statement, we use data from PubMed and review papers manually. This figure doesn’t tell you what type of data availability statement is provided (e.g there is Open Data vs there is no data)";

        // Display help text popover
        const instance = tippy(document.querySelector('#data_statement_info'), {
          allowHTML: true,
          interactive: true,
          placement: 'top',
          appendTo: document.body,
        });

        instance.setContent(dataStatementInfo);

        Promise.all([hasDataStatementCount, hasCheckedDataStatementCount])
          .then(function (results) {

            // Display totals and % of articles for which we’ve verified data availability statements
            if (hasDataStatementCount) {
              let hasDataStatementCount        = results[0].data,
                  hasCheckedDataStatementCount = results[1].data;
              dataStatementContents.textContent = makeNumberReadable(hasDataStatementCount) + " of " + makeNumberReadable(hasCheckedDataStatementCount) + " checked";
              dataStatementPercentageContents.textContent = Math.round(((hasDataStatementCount/hasCheckedDataStatementCount)*100)) + "%";
            }

          }
        ).catch(function (error) { console.log("getDataStatements error: " + error); });
      } else {
        // Do not display card at all
        document.querySelector('#data_statement').remove();
        hasDataStatementCount = "";
        hasCheckedDataStatementCount = "";
      }
    };

    /** Check for open data **/
    getOpenData = function() {

      var openDataInfo = "";

      // ...check if there are any at all
      hasOpenData = response.data.hits.hits[0]._source.analysis.has_open_data;

      // Display whether or not articles have open data after being checked
      if (hasOpenData) {
        // Get their count
        hasOpenDataQuery             = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.has_open_data);
        hasCheckedDataQuery          = (countQueryPrefix + response.data.hits.hits[0]._source.analysis.has_data);
        hasOpenDataCount             = axios.get(hasOpenDataQuery);
        hasCheckedDataCount          = axios.get(hasCheckedDataQuery);
        /*jshint multistr: true */
        openDataInfo = "The percentage of articles that shared any data under a <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank' rel='noopener'>CC0</a> or <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noopener'>CC-BY</a> license. This figure only measures how many articles shared Open Data if they generated data in the first place. It also only measures if any of the datasets generated were open, not if all of them were open. To analyze this we work with Dataseer, who uses a combination of machine learning and human review to review the text of the papers.";

        // Display help text popover
        const instance = tippy(document.querySelector('#open_data_info'), {
          allowHTML: true,
          interactive: true,
          placement: 'top',
          appendTo: document.body,
        });

        instance.setContent(openDataInfo);

        Promise.all([hasOpenDataCount, hasCheckedDataCount])
          .then(function (results) {

            // Display totals and % of articles sharing data openly
            if (hasOpenDataCount) {
              let hasOpenDataCount = results[0].data,
                  hasCheckedDataCount = results[1].data;
              openDataContents.textContent = makeNumberReadable(hasOpenDataCount) + " of " + makeNumberReadable(hasCheckedDataCount) + " articles that generate data";
              openDataPercentageContents.textContent = Math.round(((hasOpenDataCount/hasCheckedDataCount)*100)) + "%";
            }
          }
        ).catch(function (error) { console.log("getOpenData error: " + error); });
      } else {
        // Do not display card at all
        document.querySelector('#open_data').remove();
        hasOpenDataCount = "";
        hasCheckedDataCount = "";
      }

    };

    /**  Display basic Insights (total article & free article counts) **/
    // TODO: break these down into one function per metric
    displayInsights = function() {
      Promise.all([isPaperCount, isFreeCount])
        .then(function (results) {
          let isPaperCount   = results[0].data,
              isFreeCount    = results[1].data;

          // Display totals and % of articles
          articlesContents.textContent = makeNumberReadable(isPaperCount);
          console.log("isPaperCount: " + isPaperCount);

          // Display totals and % of OA articles
          // TODO: only display OA rates for orgs w/out policies
          // if (isOA) {
          //   oaArticlesContents.textContent = makeNumberReadable(isOA) + " in total";
          //   oaPercentageContents.textContent = Math.round(((isOA/isPaperCount)*100)) + "%";
          // } else {
          //   oaArticlesContents.textContent = "";
          //   oaPercentageContents.textContent = "N/A";
          // }

          if (isFreeCount) {
            freeArticlesContents.textContent = makeNumberReadable(isFreeCount) + " in total";
            freePercentageContents.textContent = Math.round(((isFreeCount/isPaperCount)*100)) + "%";
          } else {
            freeArticlesContents.textContent = "";
            freePercentageContents.textContent = "N/A";
          }
        }
      ).catch(function (error) { console.log("displayInsights error: " + error); })
    };

    /** Display Strategies: deposit VOR (publisher PDF) **/
    displayStrategyVOR = function() {
      Promise.all([canArchiveVOR, canArchiveVORList])
        .then(function (results) {
          let canArchiveVOR = results[0].data,
              canArchiveVORList = results[1].data.hits.hits,
              canArchiveVORLength = parseFloat(canArchiveVOR);

          // Show total number of actions in tab & above table
          countVORActionsContents.textContent = makeNumberReadable(canArchiveVORLength);

          if (canArchiveVORLength > 100) {
            canArchiveVORLength = 100;
          }

          totalVORActionsContents.textContent = makeNumberReadable(canArchiveVORLength);

          // Generate list of archivable VORs if there are any
          if (canArchiveVOR === 0) {
            totalVORActionsContents.textContent = "No ";
            canArchiveVORTable.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find publisher PDFs that could be deposited. <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
          }
          else if (canArchiveVOR > 0 || canArchiveVOR !== null) {
            // Set up and get list of emails
            var canArchiveVORTableRows = "";

            for (var i = 0; i < canArchiveVORLength; i++) {
              var title = canArchiveVORList[i]._source.title,
                  author = canArchiveVORList[i]._source.author_email_name,
                  doi   = canArchiveVORList[i]._source.DOI,
                  pubDate = canArchiveVORList[i]._source.published_date,
                  journal = canArchiveVORList[i]._source.journal,
                  authorEmail = canArchiveVORList[i]._source.email;

              var canArchiveVORMailto = response.data.hits.hits[0]._source.strategy.email_author_aam.mailto;
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("\'", "’");
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("{title}", (title ? title : "[No title found]"));
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("{doi}", (doi ? doi : "[No DOI found]"));
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("{author_name}", (author ? author : "researcher"));
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("{author_email}", (authorEmail ? authorEmail : ""));

              /*jshint multistr: true */
              canArchiveVORTableRows += '<tr>\
                <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                  <div class="mb-1 text-neutral-500">' + (pubDate ? makeDateReadable(new Date(pubDate)) : "[No date found]") + '</div>\
                  <div class="mb-1 font-medium text-neutral-900 hover:text-carnation-500">\
                    <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + (title ? title : "[No article title found]") + '</a>\
                  </div>\
                  <div class="text-neutral-500">' + (journal ? journal : "[No journal name found]") + '</div>\
                </td>\
                <td class="hidden px-3 py-4 text-sm text-neutral-500 align-top break-words sm:table-cell">\
                  <div class="mb-1 text-neutral-900">' + (author ? author : "[No author’s name found]") + '</div>\
                  <div class="text-neutral-500">' + (authorEmail ? authorEmail : "[No email found]") + '</div>\
                </td>\
                <td class="whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium">\
                  <a href="mailto:' + canArchiveVORMailto + '" target="_blank" rel="noopener" class="inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200">\
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail inline-block h-4 duration-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\
                  </a>\
                </td>\
              </tr>';
            }
            canArchiveVORTable.innerHTML = canArchiveVORTableRows;
          }
        }
      ).catch(function (error) { console.log("displayStrategyVOR error: " + error); });
    };

    /** Display Strategies: deposit AAM (accepted manuscripts)  **/
    displayStrategyAAM = function() {
      Promise.all([canArchiveAAM, canArchiveAAMList])
        .then(function (results) {
          let canArchiveAAM = results[0].data,
              canArchiveAAMList = results[1].data.hits.hits,
              canArchiveAAMLength = parseFloat(canArchiveAAM);

          // Show total number of actions in tab & above table
          countAAMActionsContents.textContent = makeNumberReadable(canArchiveAAMLength);

          if (canArchiveAAMLength > 100) {
            canArchiveAAMLength = 100;
          }

          totalAAMActionsContents.textContent = makeNumberReadable(canArchiveAAMLength);

          // Generate list of archivable AAMs if there are any
          if (canArchiveAAM === 0) {
            totalAAMActionsContents.textContent = "No ";
            canArchiveAAMTable.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find accepted manuscripts that could be deposited. <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
          }
          else if (canArchiveAAM > 0 || canArchiveAAM !== null) {
            // Set up and get list of emails for archivable AAMs
            var canArchiveAAMTableRows = "";

            for (var i = 0; i < canArchiveAAMLength; i++) {
              var title = canArchiveAAMList[i]._source.title,
                  author = canArchiveAAMList[i]._source.author_email_name,
                  doi   = canArchiveAAMList[i]._source.DOI,
                  pubDate = canArchiveAAMList[i]._source.published_date,
                  journal = canArchiveAAMList[i]._source.journal,
                  authorEmail = canArchiveAAMList[i]._source.email;

              // Get email draft/body for this article and replace with its metadata
              var canArchiveAAMMailto = response.data.hits.hits[0]._source.strategy.email_author_aam.mailto;
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("\'", "’");
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{title}", (title ? title : "[No article title found]"));
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{doi}", (doi ? doi : "[No DOI found]"));
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{author_name}", (author ? author : "researcher"));
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{author_email}", (authorEmail ? authorEmail : ""));

              /*jshint multistr: true */
              canArchiveAAMTableRows += '<tr>\
                <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                  <div class="mb-1 text-neutral-500">' + (pubDate ? makeDateReadable(new Date(pubDate)) : "[No date found]") + '</div>\
                  <div class="mb-1 font-medium text-neutral-900 hover:text-carnation-500">\
                    <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + (title ? title : "[No article title found]") + '</a>\
                  </div>\
                  <div class="text-neutral-500">' + (journal ? journal : "[No journal name found]") + '</div>\
                </td>\
                <td class="hidden px-3 py-4 text-sm text-neutral-500 align-top break-words sm:table-cell">\
                  <div class="mb-1 text-neutral-900">' + (author ? author : "[No author’s name found]") + '</div>\
                  <div class="text-neutral-500">' + (authorEmail ? authorEmail : "[No email found]") + '</div>\
                </td>\
                <td class="whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium">\
                  <a href="mailto:' + canArchiveAAMMailto + '" target="_blank" rel="noopener" class="inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200">\
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail inline-block h-4 duration-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\
                  </a>\
                </td>\
              </tr>';
            }
            canArchiveAAMTable.innerHTML = canArchiveAAMTableRows;
          }
        }
      ).catch(function (error) { console.log("displayStrategyAAM error: " + error); })
    };

    /** Display Strategies: follow up with uncompliant articles with paid APCs **/
    displayStrategyAPCFollowup = function() {

      hasAPCFollowupSort = "&sort=publisher.keyword:asc,journal.keyword:asc,supplements.invoice_date:desc";
      hasAPCFollowupQuery  = (countQueryPrefix + response.data.hits.hits[0]._source.strategy.apc_followup.query);
      hasAPCFollowupListQuery = (queryPrefix + response.data.hits.hits[0]._source.strategy.apc_followup.query) + hasAPCFollowupSort;
      hasAPCFollowup  = axios.get(hasAPCFollowupQuery);
      hasAPCFollowupList = axios.get(hasAPCFollowupListQuery);
      console.log("hasAPCFollowupListQuery: "+ hasAPCFollowupListQuery);

      if (response.data.hits.hits[0]._source.strategy.apc_followup.query) {
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
              hasAPCFollowupTable.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find articles to follow up on. <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
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
                    <div class="mb-3 text-neutral-900 hover:text-carnation-500">\
                      <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + (title ? title : "[No article title found]") + '</a>\
                    </div>\
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
        // remove tab if this strategy doesn’t exist for this org
        document.querySelector("#has-apc-followup-item").outerHTML = "";
        document.querySelector("#has-apc-followup").outerHTML = "";
      }
    };

    /* "Download CSV" form: set query and date range in hidden input */
    getExportLink = function() {
      Promise.all([hasCustomExportIncludes])
        .then(function (results) {
          let hasCustomExportIncludes = results[0].data;
          }
        ).catch(function (error) { console.log("Export error: " + error); });


      isPaperURL = (dateRange + response.data.hits.hits[0]._source.analysis.is_paper); // used for full-email download in getExportLink()
      let query = isPaperURL.replaceAll(" ", "%20"),
          form = document.querySelector("#download_csv");

      // Check for custom include parameters
      var include;

      if (hasCustomExportIncludes !== undefined) {
        include = hasCustomExportIncludes;
      } else {
        include =  "DOI,title,subtitle,publisher,journal,issn,published,published_year,PMCID,volume,issue,authorships.author.display_name,authorships.author.orcid,authorships.institutions.display_name,authorships.institutions.ror,funder.name,funder.award,is_oa,oa_status,journal_oa_type,publisher_license,has_repository_copy,repository_license,repository_version,repository_url,has_oa_locations_embargoed,can_archive,version,concepts.display_name,concepts.level,concepts.score,subject,pmc_has_data_availability_statement,cited_by_count";
      }

      // Set form attributes
      form.setAttribute("action", csvExportBase);
      queryHiddenInput.setAttribute("value", query);
      includeHiddenInput.setAttribute("value", include);

      form.onsubmit = function(event) {
        fetch(form.action, {
          method: form.method,
          body: new FormData(form),
        });
        // Display message
        document.querySelector("#csv_email_msg").textContent = "OAreport has started building your CSV export. Please check your email to get the full data once it’s ready.";

        // Do not navigate away from the page on submit
        return false;
      };
    };

    getCountQueries();
    getPolicy();
    displayInsights();
    displayStrategyVOR();
    displayStrategyAAM();
    displayStrategyAPCFollowup();
    getDataStatements();
    getOpenData();
    // TODO: uncomment once oaworks/internal-planning#316 is done
    // getExportLink();
    console.log("isPaperQuery: "+ isPaperQuery);
  })
  .catch(function (error) { console.log("ERROR: " + error); });
};

oareport(org);

/** Change displayed Insights data based on user input **/
// Preset "quick date filter" buttons
var startYearBtn              = document.querySelector("#start-year"),
    lastYearBtn               = document.querySelector("#last-year"),
    twoYearsBtn               = document.querySelector("#two-years-ago"),
    allTimeBtn                = document.querySelector("#all-time"),
    insightsDateRange         = document.querySelector("#insights_range"),

    lastYearStartDate         = new Date(new Date().getFullYear()-1, 0, 1),
    lastYearStartDateReadable = makeDateReadable(lastYearStartDate),
    lastYearStartDateQuery    = changeDays(-1, lastYearStartDate),
    lastYearStartDateISO      = formatDateToISO(lastYearStartDate),

    lastYearEndDate           = new Date(new Date().getFullYear()-1, 11, 31),
    lastYearEndDateReadable   = makeDateReadable(lastYearEndDate),
    lastYearEndDateQuery      = changeDays(+1, lastYearEndDate),
    lastYearEndDateISO        = formatDateToISO(lastYearEndDate),

    twoYearsStartDate         = new Date(new Date().getFullYear()-2, 0, 1),
    twoYearsStartDateReadable = makeDateReadable(twoYearsStartDate),
    twoYearsStartDateQuery    = changeDays(-1, twoYearsStartDate),
    twoYearsStartDateISO      = formatDateToISO(twoYearsStartDate),

    twoYearsEndDate           = new Date(new Date().getFullYear()-2, 11, 31),
    twoYearsEndDateReadable   = makeDateReadable(twoYearsEndDate),
    twoYearsEndDateQuery      = changeDays(+1, twoYearsEndDate),
    twoYearsEndDateISO        = formatDateToISO(twoYearsEndDate);

startYearBtn.textContent      = startYearDate.getFullYear();
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
