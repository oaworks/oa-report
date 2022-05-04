const base = 'https://beta.oa.works/report/';
let isPaper, isOA, complianceRate, canArchiveAAM, canArchiveAAMList, hasPolicy, policyURL;
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
    let queryBase      = base + "articles?",
        countQueryBase = base + "articles/count?";

    isPaper        = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.is_paper);
    isOA           = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.is_oa);
    canArchiveAAM  = axios.get(countQueryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query);

    canArchiveAAMList = axios.get(queryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
    console.log("query for canArchiveAAM: " + queryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
    console.log("query for isPaper: " + queryBase + response.data.hits.hits[0]._source.analysis.is_paper);

    hasPolicy = response.data.hits.hits[0]._source.policy.supported_policy;

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
            canArchiveLatestContents = document.querySelector("#can_archive_latest"),
            canArchiveLatestJournalContents = document.querySelector("#can_archive_latest_journal");

        articlesContents.textContent = isPaper.toLocaleString(getUsersLocale());
        oaArticlesContents.textContent = isOA.toLocaleString(getUsersLocale());
        oaPercentageContents.textContent = Math.round(((isOA/isPaper)*100));

        // Only replace content if there are data for compliant articles
        if (isCompliant) {
          compliantArticlesContents.textContent = isCompliant.toLocaleString(getUsersLocale());
          compliantPercentageContents.textContent = Math.round(((isCompliant/isPaper)*100));
        }

        canArchiveContents.textContent = canArchiveAAM.toLocaleString(getUsersLocale());
        canArchiveOaPercentageContents.textContent = Math.round(((((isOA+canArchiveAAM))/isPaper)*100));

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

          canArchiveListItems += "<li><span class='text-neutral-600'>" + pubDate + "</span><br/><strong>" + title + "</strong> in <i>" + journal + "</i><br/><a href='https://doi.org/" + doi + "' class='break-words'>&rarr; https://doi.org/" + doi + "</a><br/><br/></li>";
        }

        canArchiveList.innerHTML = canArchiveListItems;
      }
    ).catch(error => console.error("ERROR: " + error));
  })
  .catch(error => console.error("ERROR: " + error));

  // axios.all([articles, oaArticles, canArchive])
  // .then(axios.spread((...responses) => {
  //   let articlesContents = document.querySelector("#articles"),
  //   oaArticlesContents = document.querySelector("#articles_oa"),
  //   oaPercentageContents = document.querySelector("#percent_oa"),
  //   canArchiveContents = document.querySelector("#can_archive"),
  //   canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa"),
  //   canArchiveLatestContents = document.querySelector("#can_archive_latest"),
  //   canArchiveLatestJournalContents = document.querySelector("#can_archive_latest_journal");
  //
  //   const articles = responses[0].data,
  //   oaArticles = responses[1].data,
  //   oaPercentage = ((oaArticles/articles)*100).toFixed(2),
  //   canArchive = responses[2].data.hits.total,
  //   canArchiveAll = responses[2].data.hits.hits,
  //   canArchiveOaPercentage = ((((oaArticles+canArchive))/articles)*100).toFixed(2),
  //   canArchiveLatest = responses[2].data.hits.hits[0]._source.title,
  //   canArchiveLatestJournal = responses[2].data.hits.hits[0]._source.journal;
  //
  //   articlesContents.textContent = articles;
  //   oaArticlesContents.textContent = oaArticles;
  //   oaPercentageContents.textContent = oaPercentage;
  //   canArchiveContents.textContent = canArchive;
  //   canArchiveOaPercentageContents.textContent = canArchiveOaPercentage;
  //   canArchiveLatestContents.textContent = canArchiveLatest;
  //   canArchiveLatestJournalContents.textContent = canArchiveLatestJournal;
  //
  // })).catch(error => console.error(error));
};

oareport(org);
