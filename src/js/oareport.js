const base           = 'https://beta.oa.works/report/',
      queryBase      = base + "works?",
      countQueryBase = base + "works/count?",
      csvExportBase  = base + "works.csv?size=all&";
let isPaper, isOA, canArchiveAAM, canArchiveAAMMailto, canArchiveAAMList, downloadAllArticles, hasPolicy, policyURL, dateRangeButton, csvEmailButton;
let isCompliant = false;

// Detect browser’s locale to display human-readable numbers
getUsersLocale = function() {
  return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
};

// Subtract any number of months from a date
subtractMonths = function(numOfMonths, date) {
  const dateCopy = new Date(date.getTime());
  dateCopy.setMonth(dateCopy.getMonth() - numOfMonths);
  return dateCopy;
};

// Set readable date options
var readableDateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
};

// Set today’s date and 12 months ago date to display most recent Insights data as default
const currentDate          = new Date(),
      currentDateISO       = currentDate.toISOString().substring(0, 10),
      currentDateReadable  = currentDate.toLocaleString(getUsersLocale(), readableDateOptions),
      lastYearDate         = subtractMonths(12, currentDate),
      lastYearDateISO      = lastYearDate.toISOString().substring(0, 10),
      lastYearDateReadable = lastYearDate.toLocaleString(getUsersLocale(), readableDateOptions);

// Get organisational data to produce reports
oareport = function(org) {
  let report = base + "orgs?q=name:%22" + org + "%22";

  console.log("org: " + org);
  console.log("report: " + base + "orgs?q=name:%22" + org + "%22");

  axios.get(report).then(response => {
    let endDateContents      = document.querySelector("#end-date"),
        startDateContents    = document.querySelector("#start-date"),
        startDate            = "",
        endDate              = "";

    // Set last 12 months as default displayed Insights
    endDateContents.textContent = currentDateReadable;
    startDateContents.textContent = lastYearDateReadable;

    // Get all queries for a set date range and size
    startDate         = lastYearDateISO;
    endDate           = currentDateISO;

    var dateRange      = "%20AND%20published:>" + startDate + "%20AND%20published:<" + endDate,
        recordSize     = "&size=100";

    replaceStartDate = function(date) {
      startDateContents.textContent = date.toLocaleString(getUsersLocale(), readableDateOptions);
      var startDate = date.toISOString().substring(0, 10);
      dateRange = "%20AND%20published:>" + startDate + "%20AND%20published:<" + endDate;
      // threeMonthsBtn.classList.remove('bg-neutral-700');
      // threeMonthsBtn.classList.add('bg-carnation-500');
      console.log(dateRange);
      return startDate;
    };

    // ...for article counts
    isPaper        = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.is_paper + dateRange);
    isOA           = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.is_oa + dateRange);
    canArchiveAAM  = axios.get(countQueryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query + dateRange);

    // ...for records
    canArchiveAAMList = axios.get(queryBase + encodeURI(response.data.hits.hits[0]._source.strategy.email_author_aam.query) + recordSize + dateRange);

    console.log("query for isPaper: " + countQueryBase + encodeURI(response.data.hits.hits[0]._source.analysis.is_paper) + dateRange);

    console.log("query for canArchiveAAM: " + countQueryBase + encodeURI(response.data.hits.hits[0]._source.strategy.email_author_aam.query) + dateRange)

    console.log("query for canArchiveAAMList: " + queryBase + encodeURI(response.data.hits.hits[0]._source.strategy.email_author_aam.query) + recordSize + dateRange);

    // Get email for CSV downloads
    var csvEmailButton = document.querySelector(".js-csv_email_button");

    var getEmailInput = function (event) {
      var inputEmailField = document.querySelector(".js-csv_email_input"),
          validEmailInput = inputEmailField.checkValidity();

      // If email input is valid, get value to build download URL
      if (validEmailInput) {
        var inputEmailValue = inputEmailField.value;
        downloadAllArticles = csvExportBase + "email=" + inputEmailValue + "&" + response.data.hits.hits[0]._source.analysis.is_paper + dateRange;
        csvEmailButton.setAttribute('download', true);
        csvEmailButton.setAttribute('target', '_blank');
        csvEmailButton.setAttribute('href', downloadAllArticles);
        document.querySelector("#csv_email_msg").textContent = "Your CSV export has started. Please check your email to get an update once it’s ready."
      }
    };
    csvEmailButton.addEventListener('click', getEmailInput, false);

    // If the org has a formal OA policy, get the policy’s URL & compliance number
    // Then display a tooltip
    let complianceContents = document.querySelector("#compliance");

    hasPolicy = response.data.hits.hits[0]._source.policy.supported_policy;

    if (hasPolicy === true) {
      policyURL = response.data.hits.hits[0]._source.policy.url;
      policyURL = encodeURI(policyURL);
      isCompliant = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.compliance + dateRange);
      /*jshint multistr: true */
      document.querySelector("#org-oa-policy").innerHTML = '<sup data-tippy-content="The percentage of articles that are compliant with \
        <a href=\'' + policyURL + '\' target=\'_blank\' rel=\'noopener\' class=\'underline\'>your organization’s Open Access policy</a>. \
      This number is specific to your policy and your requirements.\
      <br><br>This figure can differ from your total OA%, depending on exactly how your organization defines Open Access. ">\
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle inline-block h-4 duration-500"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>\
      </sup>';
    } else {
      // Indicate that there are are no policies and hide compliance number
      document.querySelector("#org-oa-policy").innerHTML = '<sup data-tippy-content="We couldn’t track a policy for your organization.">\
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle inline-block h-4 duration-500"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>\
      </sup>';
    }

    // Display Insights and Strategy data
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

          // "Insights" section: display totals and % of articles, OA articles, and compliant articles
          articlesContents.textContent = isPaper.toLocaleString(getUsersLocale());

          // Only replace content if there are data for articles
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
            console.log(canArchiveAAMList);
            var totalActionsContents = document.querySelector("#total_actions"),
                latestActionsContents = document.querySelector("#latest_actions"),
                canArchiveList = document.querySelector("#can_archive_list"),
                canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa");
            console.log(canArchiveAAMList);
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
                  // TODO: get author’s / recipient’s name
                  // author = canArchiveAAMList[i]._source.author_names[0],
                  doi   = canArchiveAAMList[i]._source.DOI,
                  pubDate = canArchiveAAMList[i]._source.published,
                  journal = canArchiveAAMList[i]._source.journal;
              pubDate = new Date(pubDate).toLocaleString(getUsersLocale(), readableDateOptions);

              // Display email address if found, otherwise display message
              if (canArchiveAAMList[i]._source.supplements) {
                authorEmail = canArchiveAAMList[i]._source.supplements[0].email;
              } else {
                authorEmail = "No email found.";
              }

              // Get email draft/body for this article and replace with its metadata
              canArchiveAAMMailto = response.data.hits.hits[0]._source.strategy.email_author_aam.mailto;
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll('\'', '’');
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{title}", title);
              canArchiveAAMMailto = canArchiveAAMMailto.replaceAll("{doi}", doi);
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
                  <div class="mb-1 text-neutral-900">[Recipient’s name should be here]</div>\
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
      ).catch(error => console.error("ERROR: " + error));
    };

    displayData();

    // Change displayed Insights and Strategy data based on user input

    // Get user-input dates from date fields
    // var startDateInputFieldValue = document.querySelector("#report-start-date").value,
    //     endDateInputFieldValue = document.querySelector("#report-end-date").value;

    // Preset "quick date filter" buttons
    const threeMonthsAgo  = subtractMonths(3, currentDate),
          sixMonthsAgo    = subtractMonths(6, currentDate),
          fiveYearsAgo    = subtractMonths(60, currentDate);

    var threeMonthsBtn  = document.querySelector("#three-months"),
          sixMonthsBtn    = document.querySelector("#six-months"),
          twelveMonthsBtn = document.querySelector("#twelve-months"),
          fiveYearsBtn    = document.querySelector("#five-years");

    // Change data based on preset date filters
    threeMonthsBtn.addEventListener('click', event => {
      replaceStartDate(threeMonthsAgo);
      displayData();
    });

    sixMonthsBtn.addEventListener('click', event => {
      replaceStartDate(sixMonthsAgo);
      displayData();
    });

    twelveMonthsBtn.addEventListener('click', event => {
      replaceStartDate(lastYearDate);
      displayData();
    });

    fiveYearsBtn.addEventListener('click', event => {
      replaceStartDate(fiveYearsAgo);
      displayData();
    });

  })
  .catch(error => console.error("ERROR: " + error));
};

oareport(org);
