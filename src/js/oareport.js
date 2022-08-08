const base           = "https://api.oa.works/report/",
      queryBase      = base + "works?",
      countQueryBase = base + "works/count?",
      csvExportBase  = base + "works.csv?";
let isPaper, isEligible, isOA, canArchiveAAM, canArchiveAAMMailto, canArchiveAAMList, downloadAllArticles, hasPolicy, policyURL, dateRangeButton, csvEmailButton, totalArticles;
let isCompliant = false;

// Detect browser’s locale to display human-readable numbers
getUsersLocale = function() {
  return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
};

//  Do math with months on a date
changeMonths = function(numOfMonths, date) {
  const dateCopy = new Date(date.getTime());
  dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
  return dateCopy;
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

// Set today’s date and 12 months ago date to display most recent Insights data as default
const currentDate           = new Date(),
      currentDateReadable   = currentDate.toLocaleString(getUsersLocale(), readableDateOptions), // for display in UI
      currentDateQuery      = changeDays(+1, currentDate), // add 1 day for ElasticSearch (greater than but not equal)
      currentDateISO        = currentDateQuery.toISOString().substring(0, 10), // used in ES query

      startYearDate         = new Date(new Date().getFullYear(), 0, 1),
      startYearDateReadable = startYearDate.toLocaleString(getUsersLocale(), readableDateOptions),
      startYearDateQuery    = changeDays(-1, startYearDate),
      startYearDateISO      = startYearDateQuery.toISOString().substring(0, 10);

// Get organisational data to produce reports
oareport = function(org) {
  let report = base + "orgs?q=name:%22" + org + "%22";

  // Default date filtering is for the last 12 months
  axios.get(report).then(function (response) {

    /* Get all dates for filtering data by dates */
    let endDateContents      = document.querySelector("#end_date"),
        startDateContents    = document.querySelector("#start_date"),
        startDate            = "",
        endDate              = "";

    // Display default date range: start from 2022
    // TODO: start in the last twelve months once granular date filtering is up
    endDateContents.textContent = currentDateReadable;
    startDateContents.textContent = startYearDateReadable;

    startDate         = startYearDateISO;
    endDate           = currentDateISO;

    var dateRange      = "(published_date:>" + startDate + "%20AND%20published_date:<" + endDate + ")%20AND%20",
        recordSize     = "&size=100"; // Set record size for number of actions shown in Strategies

    // Change start date
    replaceStartDate = function(date) {
      startDateContents.textContent = date.toLocaleString(getUsersLocale(), readableDateOptions);
      var startDate = changeDays(-1, date);
      startDate     = startDate.toISOString().substring(0, 10);
      dateRange     = "(published_date:>" + startDate + "%20AND%20published_date:<" + endDate + ")%20AND%20";
      return startDate;
    };

    /** Get queries for article counts and strategy action list **/
    getCountQueries = function() {

      isPaperURL    = (dateRange + response.data.hits.hits[0]._source.analysis.is_paper); // used for full-email download in downloadCSV()
      isPaperQuery   = (countQueryBase + "q=" + dateRange + response.data.hits.hits[0]._source.analysis.is_paper);
      isEligibleQuery = (countQueryBase + "q=" + dateRange + response.data.hits.hits[0]._source.analysis.is_covered_by_policy);
      isOAQuery      = (countQueryBase + "q=" + dateRange + response.data.hits.hits[0]._source.analysis.is_oa);
      canArchiveAAMQuery  = (countQueryBase + "q=" + dateRange + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
      canArchiveAAMListQuery = (queryBase + "q=" + dateRange + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
      canArchiveVORQuery  = (countQueryBase + "q=" + dateRange + response.data.hits.hits[0]._source.strategy.email_author_vor.query);
      canArchiveVORListQuery = (queryBase + "q=" + dateRange + response.data.hits.hits[0]._source.strategy.email_author_vor.query);
      hasCustomExportIncludes = (response.data.hits.hits[0]._source.export_includes);

      isPaper        = axios.get(isPaperQuery);
      isEligible     = axios.get(isEligibleQuery);
      isOA           = axios.get(isOAQuery);
      canArchiveAAM  = axios.get(canArchiveAAMQuery);
      canArchiveAAMList = axios.get(canArchiveAAMListQuery);
      canArchiveVOR  = axios.get(canArchiveVORQuery);
      canArchiveVORList = axios.get(canArchiveVORListQuery);

      console.log("org index: " + base + "orgs?q=name:%22" + org + "%22");
    };

    /** Check for an OA policy and display a link to the policy page in a tooltip **/
    getPolicy = function() {
      const instance = tippy(document.querySelector('#org_oa_policy'), {
        allowHTML: true,
        interactive: true,
        placement: 'bottom',
        appendTo: document.body,
      });

      let complianceContents = document.querySelector("#compliance");
      // ...get its URL
      hasPolicy = response.data.hits.hits[0]._source.policy.supported_policy;

      // ...then get the number of compliant articles and display a tooltip
      if (hasPolicy) {
        policyURL = response.data.hits.hits[0]._source.policy.url;
        isCompliantQuery = (countQueryBase + "q=" + dateRange + response.data.hits.hits[0]._source.analysis.compliance);
        isCompliant = axios.get(isCompliantQuery);
        /*jshint multistr: true */
        var policyURLContent = "The percentage of articles that are compliant with <a href='" + policyURL + "' target='_blank' rel='noopener' class='underline'>your organization’s Open Access policy</a>. This number is specific to your policy and your requirements.";
      } else {
        var policyURLContent = "We couldn’t track a policy for your organization.";
      }
      instance.setContent(policyURLContent);
    };

    /**  Display Insights **/
    displayInsights = function() {
      Promise.all([isPaper, isOA, isCompliant, isEligible])
        .then(function (results) {
          let isPaper = results[0].data,
              isOA    = results[1].data,
              isCompliant = results[2].data,
              isEligible = results[3].data;

          let articlesContents = document.querySelector("#articles"),
              oaArticlesContents = document.querySelector("#articles_oa"),
              oaPercentageContents = document.querySelector("#percent_oa"),
              compliantArticlesContents = document.querySelector("#articles_compliant"),
              compliantPercentageContents = document.querySelector("#percent_compliant");

          // Display totals and % of articles
          articlesContents.textContent = isPaper.toLocaleString(getUsersLocale());

          // Display totals and % of OA articles
          if (isOA) {
            oaArticlesContents.textContent = isOA.toLocaleString(getUsersLocale()) + " in total";
            oaPercentageContents.textContent = Math.round(((isOA/isPaper)*100)) + "%";
          } else {
            oaArticlesContents.outerHTML = "";
            oaPercentageContents.textContent = "N/A";
          }

          // Set total of articles depending on whether or not articles need to be covered by policy
          if (isEligible) {
            totalArticles = isEligible;
            totalArticlesString = " eligible articles";
          } else {
            totalArticles = isPaper;
            totalArticlesString =  " articles";
          }

          // Display totals and % of policy-compliant articles
          if (isCompliant) {
            compliantArticlesContents.textContent = isCompliant.toLocaleString(getUsersLocale()) + " of " + totalArticles + totalArticlesString;
            compliantPercentageContents.textContent = Math.round(((isCompliant/totalArticles)*100)) + "%";
          } else {
            compliantArticlesContents.outerHTML = "";
            compliantPercentageContents.textContent = "N/A";
          }

        }
      ).catch(function (error) { console.log("Insights error: " + error); })
    };

    /** Display Strategies **/
    // TODO: create one function per strategy
    displayStrategies = function() {
      Promise.all([canArchiveAAM, canArchiveAAMList, canArchiveVOR, canArchiveVORList])
        .then(function (results) {
          let canArchiveAAM = results[0].data,
              canArchiveAAMList = results[1].data.hits.hits,
              canArchiveVOR = results[2].data,
              canArchiveVORList = results[3].data.hits.hits;

          // Generate list of archivable AAMs if there are any
          if (canArchiveAAMList.length > 0) {
            var totalAAMActionsContents = document.querySelector("#total_aam_actions"),
                latestAAMActionsContents = document.querySelector("#latest_aam_actions"),
                canArchiveAAMTable = document.querySelector("#can_archive_aam_list");
                // TODO: think more about the potential percentage
                // canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa");

            totalAAMActionsContents.textContent = canArchiveAAM.toLocaleString(getUsersLocale());
            // If there are fewer than 100 actions, simply do not display any number of latest articles
            if (canArchiveAAM < 100) {
              latestAAMActionsContents.textContent = "";
            }
            // TODO: think more about the potential percentage
            // canArchiveOaPercentageContents.textContent = Math.round(((((isOA+canArchiveAAM))/isPaper)*100));

            // Set up and get list of emails for archivable AAMs
            var canArchiveAAMTableRows = "";
            canArchiveLength = canArchiveAAMList.length;

            for (i = 0; i <= (canArchiveLength-1); i++) {
              var title = canArchiveAAMList[i]._source.title,
                  author = canArchiveAAMList[i]._source.author_email_name,
                  doi   = canArchiveAAMList[i]._source.DOI,
                  pubDate = canArchiveAAMList[i]._source.published_date,
                  journal = canArchiveAAMList[i]._source.journal;
              pubDate = new Date(pubDate).toLocaleString(getUsersLocale(), readableDateOptions);

              // Display email address if found, otherwise display message
              if (canArchiveAAMList[i]._source.email) {
                authorEmail = canArchiveAAMList[i]._source.email;
              } else {
                authorEmail = "No email found.";
              }

              // Get email draft/body for this article and replace with its metadata
              canArchiveAAMMailto = response.data.hits.hits[0]._source.strategy.email_author_aam.mailto;
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("\'", "’");
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{title}", title);
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{doi}", doi);
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{author_name}", author);
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{author_email}", authorEmail);

              /*jshint multistr: true */
              canArchiveAAMTableRows += '<tr>\
                <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                  <div class="mb-1 text-neutral-500">' + pubDate + '</div>\
                  <div class="mb-1 font-medium text-neutral-900 hover:text-carnation-500">\
                    <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + title + '</a>\
                  </div>\
                  <div class="text-neutral-500">' + journal + '</div>\
                </td>\
                <td class="hidden px-3 py-4 text-sm text-neutral-500 align-top break-words sm:table-cell">\
                  <div class="mb-1 text-neutral-900">' + author + '</div>\
                  <div class="text-neutral-500">' + authorEmail + '</div>\
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

          // Generate list of archivable VORs if there are any
          if (canArchiveVORList.length > 0) {
            var totalVORActionsContents = document.querySelector("#total_vor_actions"),
                latestVORActionsContents = document.querySelector("#latest_vor_actions"),
                canArchiveVORTable = document.querySelector("#can_archive_vor_list");
                // TODO: think more about the potential percentage
                // canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa");

            totalVORActionsContents.textContent = canArchiveVOR.toLocaleString(getUsersLocale());
            if (canArchiveVOR < 100) {
              latestVORActionsContents.textContent = "";
            }

            var canArchiveVORTableRows = "";
            canArchiveLength = canArchiveVORList.length;

            for (i = 0; i <= (canArchiveLength-1); i++) {
              var title = canArchiveVORList[i]._source.title,
                  author = canArchiveVORList[i]._source.author_email_name,
                  doi   = canArchiveVORList[i]._source.DOI,
                  pubDate = canArchiveVORList[i]._source.published_date,
                  journal = canArchiveVORList[i]._source.journal;
              pubDate = new Date(pubDate).toLocaleString(getUsersLocale(), readableDateOptions);

              if (canArchiveVORList[i]._source.email) {
                authorEmail = canArchiveVORList[i]._source.email;
              } else {
                authorEmail = "No email found.";
              }

              canArchiveVORMailto = response.data.hits.hits[0]._source.strategy.email_author_aam.mailto;
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("\'", "’");
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("{title}", title);
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("{doi}", doi);
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("{author_name}", author);
              canArchiveVORMailto = canArchiveVORMailto.replaceAll("{author_email}", authorEmail);

              /*jshint multistr: true */
              canArchiveVORTableRows += '<tr>\
                <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
                  <div class="mb-1 text-neutral-500">' + pubDate + '</div>\
                  <div class="mb-1 font-medium text-neutral-900 hover:text-carnation-500">\
                    <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + title + '</a>\
                  </div>\
                  <div class="text-neutral-500">' + journal + '</div>\
                </td>\
                <td class="hidden px-3 py-4 text-sm text-neutral-500 align-top break-words sm:table-cell">\
                  <div class="mb-1 text-neutral-900">' + author + '</div>\
                  <div class="text-neutral-500">' + authorEmail + '</div>\
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
      ).catch(function (error) { console.log("Strategies error: " + error); })
    };

    /* "Download CSV" form: set query and date range in hidden input */
    getExportLink = function() {
      Promise.all([hasCustomExportIncludes])
        .then(function (results) {
          let hasCustomExportIncludes = results[0].data;
          }
        ).catch(function (error) { console.log("Export error: " + error); });

      let queryHiddenInput = document.querySelector("#download-form-q"),
          query = isPaperURL.replaceAll(" ", "%20"),
          includeHiddenInput = document.querySelector("#download-form-include"),
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
      };
    };

    getCountQueries();
    getPolicy();
    displayInsights();
    displayStrategies();
    getExportLink();
  })
  .catch(function (error) { console.log("ERROR: " + error); })
};

oareport(org);

/** Change displayed Insights data based on user input **/
// Preset "quick date filter" buttons
var lastYearBtn         = document.querySelector("#last-year");
    startYearBtn        = document.querySelector("#start-year"),
    insightsDateRange   = document.querySelector("#insights_range");

startYearBtn.addEventListener("click", function() {
  replaceStartDate(startYearDate);
  insightsDateRange.textContent = "since the start of " + startYearDate.getFullYear();
  getCountQueries();
  getPolicy();
  displayInsights();
  displayStrategies();
  getExportLink();
});
