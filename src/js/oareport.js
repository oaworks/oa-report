const base           = 'https://beta.oa.works/report/',
      queryBase      = base + "articles?",
      countQueryBase = base + "articles/count?",
      csvExportBase  = base + "articles.csv?size=all&";
let isPaper, isOA, canArchiveAAM, canArchiveAAMMailto, canArchiveAAMList, downloadAllArticles, hasPolicy, policyURL;
let isCompliant = false;

// Detect browser’s locale to display human-readable numbers
getUsersLocale = function() {
  return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
};

// Get organisational data to produce reports
oareport = function(org) {
  let report = base + "orgs?q=name:%22" + org + "%22";

  console.log("org: " + org);
  console.log("report: " + base + "orgs?q=name:%22" + org + "%22");

  axios.get(report).then(response => {
    // Get all queries
    // ...for article counts
    isPaper        = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.is_paper);
    isOA           = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.is_oa);
    canArchiveAAM  = axios.get(countQueryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
    // ...for records
    canArchiveAAMList = axios.get(queryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
    console.log("query for canArchiveAAM: " + queryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
    console.log("query for isPaper: " + queryBase + response.data.hits.hits[0]._source.analysis.is_paper);

    // Get email for CSV downloads
    let csvEmailButton = document.querySelector(".js-csv_email_button");

    var getEmailInput = function (event) {
      var inputEmailField = document.querySelector(".js-csv_email_input"),
          validEmailInput = inputEmailField.checkValidity();

      // If email input is valid, get value to build download URL
      if (validEmailInput) {
        var inputEmailValue = inputEmailField.value;
        downloadAllArticles = csvExportBase + "email=" + inputEmailValue + "&" + response.data.hits.hits[0]._source.analysis.is_paper;
        csvEmailButton.setAttribute('download', true);
        csvEmailButton.setAttribute('target', '_blank');
        csvEmailButton.setAttribute('href', downloadAllArticles);
        document.querySelector("#csv_email_msg").textContent = "Your CSV export has started. Please check your email to get an update once it’s ready."
      }
    };

    csvEmailButton.addEventListener('click', getEmailInput, false);

    // Get values from org index
    canArchiveAAMMailto = response.data.hits.hits[0]._source.strategy.email_author_aam.mailto;
    canArchiveAAMMailto = canArchiveAAMMailto.replaceAll('\'', '’');
    hasPolicy = response.data.hits.hits[0]._source.policy.supported_policy;
    console.log("canArchiveAAMMailto: " + canArchiveAAMMailto);

    // If the org has a formal OA policy:
    // First get the policy’s URL & compliance number
    // Then insert an extra column showing compliance rates
    let complianceContents = document.querySelector("#compliance");
    if (hasPolicy === true) {
      policyURL = response.data.hits.hits[0]._source.policy.url;
      isCompliant = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.compliance);
    } else {
      // Indicate that there are are no policies and hide compliance number
      document.querySelector("#articles_compliant").outerHTML = "";
        document.querySelector("#percent_compliant").textContent = "No OA policy";
    }

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
            compliantPercentageContents = document.querySelector("#percent_compliant"),
            canArchiveContents = document.querySelector("#can_archive"),
            canArchiveList = document.querySelector("#can_archive_list"),
            canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa");

        // "Insights" section: display totals and % of articles, OA articles, and compliant articles
        articlesContents.textContent = isPaper.toLocaleString(getUsersLocale());
        oaArticlesContents.textContent = isOA.toLocaleString(getUsersLocale()) + " in total";
        oaPercentageContents.textContent = Math.round(((isOA/isPaper)*100)) + "%";

        // Only replace content if there are data for compliant articles
        if (isCompliant) {
          compliantArticlesContents.textContent = isCompliant.toLocaleString(getUsersLocale()) + " in total";
          compliantPercentageContents.textContent = Math.round(((isCompliant/isPaper)*100)) + "%";
        }

        // "Strategies" section: display totals and lists of archivable articles
        canArchiveContents.textContent = canArchiveAAM.toLocaleString(getUsersLocale());
        canArchiveOaPercentageContents.textContent = Math.round(((((isOA+canArchiveAAM))/isPaper)*100));

        // Set up and get list of emails for archivable AAMs
        let canArchiveListItems = "";
        canArchiveLength = canArchiveAAMList.length;
        var readableDateOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        };
        for (i = 0; i <= (canArchiveLength-1); i++) {
          let title = canArchiveAAMList[i]._source.title,
              authors = canArchiveAAMList[i]._source.author_names.join(", "),
              doi   = canArchiveAAMList[i]._source.DOI,
              pubDate = canArchiveAAMList[i]._source.published,
              journal = canArchiveAAMList[i]._source.journal;
          pubDate = new Date(pubDate).toLocaleString(getUsersLocale(), readableDateOptions);
          /*jshint multistr: true */
          canArchiveListItems += '<tr>\
            <td class="py-4 pl-4 pr-3 text-sm align-top break-words">\
              <div class="font-medium text-neutral-900 hover:text-carnation-500">\
                <a href="https://doi.org/' + doi + '" target="_blank" rel="noopener" title="Open article">' + title + '</a>\
              </div>\
              <div class="text-neutral-500">' + journal + '</div>\
            </td>\
            <td class="hidden px-3 py-4 text-sm text-neutral-500 align-top break-words sm:table-cell">' + authors + '</td>\
            <td class="hidden whitespace-nowrap px-3 py-4 text-sm text-neutral-500 align-top lg:table-cell">' + pubDate + '</td>\
            <td class="whitespace-nowrap py-4 pl-3 pr-4 text-center align-top text-sm font-medium">\
              <a href="mailto:' + canArchiveAAMMailto + '" target="_blank" rel="noopener" class="inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200">\
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail inline-block h-4 duration-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>\
              </a>\
            </td>\
          </tr>';
        }
        canArchiveList.innerHTML = canArchiveListItems;

      }
    ).catch(error => console.error("ERROR: " + error));
  })
  .catch(error => console.error("ERROR: " + error));
};

oareport(org);
