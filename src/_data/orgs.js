require('dotenv').config();

module.exports = async () => {
  const size = process.env.ELEVENTY_NUMBER_REPORTS || 500;
  const url = `https://bg.${process.env.ELEVENTY_API_HOST_ORGS}.oa.works/report/orgs?q=*&excludes=aliases,fundref,sheets,analysis,strategy,export_includes,search,allow_tdm,grantid_regex,source&size=${size}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load org data: ${response.status}`);
  }

  const data = await response.json();

  // Deduplicate by ES _id (fallback to _source.objectID) to avoid duplicate org pages
  const seen = new Set();
  const hits = Array.isArray(data?.hits?.hits) ? data.hits.hits : [];
  const dedupedHits = hits.filter((hit) => {
    const id = hit?._id || hit?._source?.objectID;
    if (!id) return true; // keep if no ID to key on
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  return { ...data, hits: { ...data?.hits, hits: dedupedHits } };
};
