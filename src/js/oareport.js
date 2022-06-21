const base           = "https://beta.oa.works/report/",
      queryBase      = base + "works?",
      countQueryBase = base + "works/count?",
      csvExportBase  = base + "works.csv?size=all&";
let isPaper, isOA, canArchiveAAM, canArchiveAAMMailto, canArchiveAAMList, downloadAllArticles, hasPolicy, policyURL, dateRangeButton, csvEmailButton;
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

      lastYearDate          = changeMonths(-12, currentDate),
      lastYearDateReadable  = lastYearDate.toLocaleString(getUsersLocale(), readableDateOptions); // for display in UI
      lastYearDateQuery     = changeDays(-1, lastYearDate),  // subtract 1 day for ElasticSearch (less than but not equal)
      lastYearDateISO       = lastYearDateQuery.toISOString().substring(0, 10), // used in ES query

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

    var dateRange      = "%20AND%20(published_date:>" + startDate + "%20AND%20published_date:<" + endDate + ")",
        recordSize     = "&size=100"; // Set record size for number of actions shown in Strategies

    // Change start date for quick/preset 3/6/12 months filters
    replaceStartDate = function(date) {
      startDateContents.textContent = date.toLocaleString(getUsersLocale(), readableDateOptions);
      var startDate = changeDays(-1, date);
      startDate     = startDate.toISOString().substring(0, 10);
      dateRange     = "%20AND%20(published_date:>" + startDate + "%20AND%20published_date:<" + endDate + ")";
      // threeMonthsBtn.classList.remove('bg-neutral-700');
      // threeMonthsBtn.classList.add('bg-carnation-500');
      console.log("new dateRange: " + startDate + " to " + endDate);
      return startDate;
    };

    /** Get queries for article counts and strategy action list **/
    getCountQueries = function() {
      console.log("default dateRange: " + startDate + " to " + endDate);

      isPaperURL    = response.data.hits.hits[0]._source.analysis.is_paper + dateRange;
      isPaperQuery   = (countQueryBase + response.data.hits.hits[0]._source.analysis.is_paper + dateRange);
      isOAQuery      = (countQueryBase + response.data.hits.hits[0]._source.analysis.is_oa + dateRange);
      canArchiveAAMQuery  = (countQueryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query + dateRange);
      canArchiveAAMListQuery = (queryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query + dateRange);

      isPaper        = axios.get(isPaperQuery);
      isOA           = axios.get(isOAQuery);
      canArchiveAAM  = axios.get(canArchiveAAMQuery);
      canArchiveAAMList = axios.get(canArchiveAAMListQuery);

      console.log("report: " + base + "orgs?q=name:%22" + org + "%22");
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
        policyURL = encodeURI(policyURL);
        isCompliant = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.compliance + dateRange);
        /*jshint multistr: true */
        var policyURLContent = "The percentage of articles that are compliant with <a href='" + policyURL + "' target='_blank' rel='noopener' class='underline'>your organization’s Open Access policy</a>. This number is specific to your policy and your requirements.";
      } else {
        var policyURLContent = "We couldn’t track a policy for your organization.";
      }
      instance.setContent(policyURLContent);
    };

    /**  Display Insights and Strategy data **/
    // TODO: break this up into two functions
    displayData = function() {
      Promise.all([isPaper, isOA, canArchiveAAM, canArchiveAAMList, isCompliant])
        .then(function (results) {
          let isPaper = results[0].data,
              isOA    = results[1].data,
              canArchiveAAM = results[2].data,
              canArchiveAAMList = results[3].data.hits.hits,
              isCompliant = results[4].data;

          let articlesContents = document.querySelector("#articles"),
              oaArticlesContents = document.querySelector("#articles_oa"),
              oaPercentageContents = document.querySelector("#percent_oa"),
              compliantArticlesContents = document.querySelector("#articles_compliant"),
              compliantPercentageContents = document.querySelector("#percent_compliant");

          // "Insights" section: display totals and % of articles, OA articles, and compliant articles if any
          articlesContents.textContent = isPaper.toLocaleString(getUsersLocale());

          if (isOA) {
            oaArticlesContents.textContent = isOA.toLocaleString(getUsersLocale()) + " in total";
            oaPercentageContents.textContent = Math.round(((isOA/isPaper)*100)) + "%";
          } else {
            oaArticlesContents.outerHTML = "";
            oaPercentageContents.textContent = "N/A";
          }

          if (isCompliant) {
            compliantArticlesContents.textContent = isCompliant.toLocaleString(getUsersLocale()) + " in total";
            compliantPercentageContents.textContent = Math.round(((isCompliant/isPaper)*100)) + "%";
          } else {
            compliantArticlesContents.outerHTML = "";
            compliantPercentageContents.textContent = "N/A";
          }

          // "Strategies" section: display totals and lists of archivable AAMs if there are any
          if (canArchiveAAMList.length > 0) {
            var totalActionsContents = document.querySelector("#total_actions"),
                latestActionsContents = document.querySelector("#latest_actions"),
                canArchiveList = document.querySelector("#can_archive_list"),
                canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa");

            totalActionsContents.textContent = canArchiveAAM.toLocaleString(getUsersLocale());
            // If there are fewer than 100 actions, simply do not display any number of latest articles
            if (canArchiveAAM < 100) {
              latestActionsContents.textContent = "";
            }
            canArchiveOaPercentageContents.textContent = Math.round(((((isOA+canArchiveAAM))/isPaper)*100));

            // Set up and get list of emails for archivable AAMs
            var canArchiveListItems = "";
            canArchiveLength = canArchiveAAMList.length;

            for (i = 0; i <= (canArchiveLength-1); i++) {
              var title = canArchiveAAMList[i]._source.title,
                  author = canArchiveAAMList[i]._source.author_email_name,
                  doi   = canArchiveAAMList[i]._source.DOI,
                  pubDate = canArchiveAAMList[i]._source.published,
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
              canArchiveListItems += '<tr>\
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
            canArchiveList.innerHTML = canArchiveListItems;
          } else {
            document.querySelector("#strategies").outerHTML = "";
          }
        }
      ).catch(function (error) { console.log("ERROR: " + error); })
    };

    getCountQueries();
    getPolicy();
    displayData();
  })
  .catch(function (error) { console.log("ERROR: " + error); })
};

oareport(org);

/** Get email to send and download CSV data **/
downloadCSV = function() {
  let form = document.querySelector("#download_csv");

  // Get field data from the form
  let data = new FormData(form);
  let userEmail = data.get("email");

  // Change form action to CSV download URL with user-input email
  downloadCSV = csvExportBase + "email=" + userEmail + "&" + isPaperURL;
  form.action = downloadCSV;

  // Display message
  document.querySelector("#csv_email_msg").textContent = "Your CSV export has started. Please check your email to get the full data once it’s ready.";

  return downloadCSV;
};

/** Change displayed Insights data based on user input **/
// TODO: change Strategy data based on this input as well
// Preset "quick date filter" buttons
const threeMonthsAgo    = changeMonths(-3, currentDate),
      sixMonthsAgo      = changeMonths(-6, currentDate),
      fiveYearsAgo      = changeMonths(-60, currentDate);

var threeMonthsBtn      = document.querySelector("#three-months"),
    sixMonthsBtn        = document.querySelector("#six-months"),
    twelveMonthsBtn     = document.querySelector("#twelve-months"),
    startYearBtn        = document.querySelector("#start-year"),
    insightsDateRange   = document.querySelector("#insights_range");

threeMonthsBtn.addEventListener("click", function() {
  replaceStartDate(threeMonthsAgo);
  insightsDateRange.textContent = "from the last 3 months";
  getCountQueries();
  getPolicy();
  displayData();
});

sixMonthsBtn.addEventListener("click", function() {
  replaceStartDate(sixMonthsAgo);
  insightsDateRange.textContent = "from the last 6 months";
  getCountQueries();
  getPolicy();
  displayData();
});

twelveMonthsBtn.addEventListener("click", function() {
  replaceStartDate(lastYearDate);
  insightsDateRange.textContent = "from the last 12 months";
  getCountQueries();
  getPolicy();
  displayData();
});

startYearBtn.addEventListener("click", function() {
  replaceStartDate(startYearDate);
  insightsDateRange.textContent = "since the start of 2022";
  getCountQueries();
  getPolicy();
  displayData();
});

// changeDateRange = function() {
//   let form = document.querySelector("#change_date_range");
//
//   let data = new FormData(form);
//   let newStartDate = data.get("#report_start_date"),
//       newEndDate = data.get("report_end_date");
// };
