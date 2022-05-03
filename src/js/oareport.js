const base = 'https://beta.oa.works/report/';
let isPaper, isOA, complianceRate, canArchiveAAM, canArchiveAAMList, hasPolicy, policyURL;

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
    console.log("query for emails:" + queryBase + response.data.hits.hits[0]._source.strategy.email_author_aam.query);
    // hasPolicy      = axios.get(response.data.hits.hits[0]._source.policy.supported_policy);
    //
    // if (hasPolicy === true) {
    //   policyURL = response.data.hits.hits[0]._source.policy.url;
    //   complianceRate = axios.get(countQueryBase + response.data.hits.hits[0]._source.analysis.compliance);
    // }

    Promise.all([isPaper, isOA, canArchiveAAM, canArchiveAAMList])
      .then(function (results) {
        let isPaper = results[0].data,
            isOA    = results[1].data,
            canArchiveAAM = results[2].data,
            canArchiveAAMList = results[3].data.hits.hits;

        let articlesContents = document.querySelector("#articles"),
            oaArticlesContents = document.querySelector("#articles_oa"),
            oaPercentageContents = document.querySelector("#percent_oa"),
            canArchiveContents = document.querySelector("#can_archive"),
            canArchiveList = document.querySelector("#can_archive_list"),
            canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa"),
            canArchiveLatestContents = document.querySelector("#can_archive_latest"),
            canArchiveLatestJournalContents = document.querySelector("#can_archive_latest_journal");

        articlesContents.textContent = isPaper.toLocaleString(getUsersLocale());
        oaArticlesContents.textContent = isOA.toLocaleString(getUsersLocale());
        oaPercentageContents.textContent = ((isOA/isPaper)*100).toFixed(2);
        canArchiveContents.textContent = canArchiveAAM.toLocaleString(getUsersLocale());
        canArchiveOaPercentageContents.textContent = ((((isOA+canArchiveAAM))/isPaper)*100).toFixed(2);

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

          canArchiveListItems += "<li><strong>" + title + "</strong> in <i>" + journal + "</i> (" + pubDate + ")<br/><a href='https://doi.org/" + doi + "'>&rarr; https://doi.org/" + doi + "</a><br/><br/></li>";
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
