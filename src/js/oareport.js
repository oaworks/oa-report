const base           = 'https://beta.oa.works/report/',
      queryBase      = base + "articles?",
      countQueryBase = base + "articles/count?",
      csvExportBase  = base + "articles.csv?size=all&email=joe@oa.works";
let isPaper, isOA, canArchiveAAM, canArchiveAAMMailto, canArchiveAAMList, downloadAllArticles, downloadAllArchivableAAM, hasPolicy, policyURL;
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
    // ..for CSV downloads
    downloadAllArticles = csvExportBase + "&" + response.data.hits.hits[0]._source.analysis.is_paper;
    downloadAllArchivableAAM = csvExportBase + "&" + response.data.hits.hits[0]._source.strategy.email_author_aam.query;

    // Get values from org index
    canArchiveAAMMailto = response.data.hits.hits[0]._source.strategy.email_author_aam.mailto;
    hasPolicy = response.data.hits.hits[0]._source.policy.supported_policy;
    console.log("canArchiveAAMMailto: " + canArchiveAAMMailto);

    // If the org has a formal OA policy:
    // First get the policy’s URL & compliance number
    // Then insert an extra column showing compliance rates
    if (hasPolicy === true) {
      policyURL = response.data.hits.hits[0]._source.policy.url;
      isCompliant = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.compliance);
      console.log("query for complianceRate: " + countQueryBase + response.data.hits.hits[0]._source.analysis.compliance);

      let complianceContents = document.querySelector("#compliance");

      /*jshint multistr: true */
      complianceContents.outerHTML = '\
        <article class="col-span-12 lg:col-span-4 mb-6 md:mb-12">\
          <h2 class="mb-3 uppercase font-semibold text-base"><span class="block mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle inline-block"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></span> policy-compliant articles</h2>\
          <p class="text-4xl md:text-8xl font-light"><span id="percent_compliant">00.00</span>%<sup class="align-top top-0"><span class="text-lg text-neutral-500 font-normal">(<span id="articles_compliant">00</span>)</span></sup></p>\
        </article>\
      ';
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
            canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa"),
            // canArchiveLatestContents = document.querySelector("#can_archive_latest"),
            // canArchiveLatestJournalContents = document.querySelector("#can_archive_latest_journal"),
            csvDownloadInsightsContents = document.querySelector("#csv_download_insights"),
            csvDownloadArchivableAAMContents = document.querySelector("#csv_download_archivable_aam");

        // "Insights" section: display totals and % of articles, OA articles, and compliant articles
        articlesContents.textContent = isPaper.toLocaleString(getUsersLocale());
        oaArticlesContents.textContent = isOA.toLocaleString(getUsersLocale());
        oaPercentageContents.textContent = Math.round(((isOA/isPaper)*100));
        // Only replace content if there are data for compliant articles
        if (isCompliant) {
          compliantArticlesContents.textContent = isCompliant.toLocaleString(getUsersLocale());
          compliantPercentageContents.textContent = Math.round(((isCompliant/isPaper)*100));
        }
        csvDownloadInsightsContents.innerHTML = "<a href='"+ downloadAllArticles + "' class='p-3 border text-xs text-neutral-600 uppercase font-semibold hover:bg-neutral-600 hover:text-white active:bg-neutral-700 focus:outline-none focus:ring focus:ring-white'><span class='hidden md:inline'>Download in </span>CSV</a>";
        console.log("downloadAllArticles: " + downloadAllArticles);

        // "Strategies" section: display totals and lists of archivable articles
        canArchiveContents.textContent = canArchiveAAM.toLocaleString(getUsersLocale());
        canArchiveOaPercentageContents.textContent = Math.round(((((isOA+canArchiveAAM))/isPaper)*100));
        csvDownloadArchivableAAMContents.innerHTML = "<a href='"+ downloadAllArchivableAAM + "' class='p-3 border text-xs text-neutral-600 uppercase font-semibold hover:bg-neutral-600 hover:text-white active:bg-neutral-700 focus:outline-none focus:ring focus:ring-white'><span class='hidden md:inline'>Download in </span>CSV</a>";
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
              doi   = canArchiveAAMList[i]._source.DOI,
              pubDate = canArchiveAAMList[i]._source.published,
              journal = canArchiveAAMList[i]._source.journal;
          pubDate = new Date(pubDate).toLocaleString(getUsersLocale(), readableDateOptions);
          canArchiveListItems += "<li class='mb-6'><article>\
            <header class='text-neutral-600'>" + pubDate + "</header>\
            <h5 class='mb-1'><a href='https://doi.org/" + doi + "' target='_blank' rel='noopener'><strong>" + title + "</strong> in <i>" + journal + "</i></a></h5>\
            <p>&rarr; <a href='" + canArchiveAAMMailto + "' target='_blank' rel='noopener'>Open email draft</a></p>\
          </article></li>";
        }
        canArchiveList.innerHTML = canArchiveListItems;

      }
    ).catch(error => console.error("ERROR: " + error));
  })
  .catch(error => console.error("ERROR: " + error));
};

oareport(org);
