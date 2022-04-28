const base = 'https://beta.oa.works/report/';

oareport = function(org) {
  let articles = axios.get(base + "articles/count?q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22"),
  oaArticles = axios.get(base + "articles/count?q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22%20AND%20is_oa:true"),
  canArchive = axios.get(base + "articles?sort=published:desc&q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22%20AND%20is_oa:%20false%20AND%20can_archive:true");

  console.log("org: " + org);
  console.log("articles: " + base + "articles/count?q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22");
  console.log("oa_articles: " + base + "articles/count?q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22%20AND%20is_oa:true");
  console.log("can_archive: " + base + "articles?sort=published:desc&q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22%20AND%20is_oa:%20false%20AND%20can_archive:true");

  axios.all([articles, oaArticles, canArchive])
  .then(axios.spread((...responses) => {
    let articlesContents = document.querySelector("#articles"),
    oaArticlesContents = document.querySelector("#articles_oa"),
    oaPercentageContents = document.querySelector("#percent_oa"),
    canArchiveContents = document.querySelector("#can_archive"),
    canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa"),
    canArchiveLatestContents = document.querySelector("#can_archive_latest"),
    canArchiveLatestJournalContents = document.querySelector("#can_archive_latest_journal");

    const articles = responses[0].data,
    oaArticles = responses[1].data,
    oaPercentage = ((oaArticles/articles)*100).toFixed(2),
    canArchive = responses[2].data.hits.total,
    canArchiveAll = responses[2].data.hits.hits,
    canArchiveOaPercentage = ((((oaArticles+canArchive))/articles)*100).toFixed(2),
    canArchiveLatest = responses[2].data.hits.hits[0]._source.title,
    canArchiveLatestJournal = responses[2].data.hits.hits[0]._source.journal;

    articlesContents.textContent = articles;
    oaArticlesContents.textContent = oaArticles;
    oaPercentageContents.textContent = oaPercentage;
    canArchiveContents.textContent = canArchive;
    canArchiveOaPercentageContents.textContent = canArchiveOaPercentage;
    canArchiveLatestContents.textContent = canArchiveLatest;
    canArchiveLatestJournalContents.textContent = canArchiveLatestJournal;

  })).catch(error => console.error(error));
};

oareport(org);
