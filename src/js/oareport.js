const base = 'https://beta.oa.works/report/';

oareport = function(org) {
  const articles = axios.get(base + "articles/count?q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22"),
  oaArticles = axios.get(base + "articles/count?q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22%20AND%20is_oa:true"),
  canArchive = axios.get(base + "articles?sort=published:desc&q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22%20AND%20is_oa:%20false%20AND%20can_archive:true"),
  archivingChamps = axios.get(base + "articles/terms/author_names?q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22%20%20AND%20has_repository_copy:%22true%22%20AND%20oa_status:%22green%22");
  const art = base + "articles/count?q=author_affiliations:%22" + org + "%22%20OR%20funder_names:%22" + org + "%22";
  console.log("org: " + org);
  console.log("articles: " + art);

  axios.all([articles, oaArticles, canArchive, archivingChamps])
  .then(axios.spread((...responses) => {
    let articlesContents = document.querySelector("#articles"),
    oaArticlesContents = document.querySelector("#articles_oa"),
    oaPercentageContents = document.querySelector("#percent_oa"),
    canArchiveContents = document.querySelector("#can_archive"),
    canArchiveOaPercentageContents = document.querySelector("#can_archive_percent_oa"),
    canArchiveLatestContents = document.querySelector("#can_archive_latest"),
    canArchiveLatestJournalContents = document.querySelector("#can_archive_latest_journal"),
    archivingChampsContents = document.querySelector("#archiving_champs"),
    archivingChampsTopContents = document.querySelector("#archiving_champs_top");

    const articles = responses[0].data,
    oaArticles = responses[1].data,
    oaPercentage = ((oaArticles/articles)*100).toFixed(2),
    canArchive = responses[2].data.hits.total,
    canArchiveAll = responses[2].data.hits.hits,
    canArchiveOaPercentage = ((((oaArticles+canArchive))/articles)*100).toFixed(2),
    canArchiveLatest = responses[2].data.hits.hits[0]._source.title,
    canArchiveLatestJournal = responses[2].data.hits.hits[0]._source.journal,
    archivingChampsLength = responses[3].data.length,
    archivingChampsTop = responses[3].data[0].term;

    articlesContents.innerHTML = articles;
    oaArticlesContents.innerHTML = oaArticles;
    oaPercentageContents.innerHTML = oaPercentage;
    canArchiveContents.innerHTML = canArchive;
    canArchiveOaPercentageContents.innerHTML = canArchiveOaPercentage;
    canArchiveLatestContents.innerHTML = canArchiveLatest;
    canArchiveLatestJournalContents.innerHTML = canArchiveLatestJournal;
    archivingChampsContents.innerHTML = archivingChampsLength;
    archivingChampsTopContents.innerHTML = archivingChampsTop;

  })).catch(error => console.error(error));
};

oareport(org);
