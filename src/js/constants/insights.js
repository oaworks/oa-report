// =================================================
// constants/insights.js
// Insight card copy/config
// =================================================

/**
 * Insight card configurations and copy.
 * @type {Array<Object>}
 */
export const INSIGHTS_CARDS = [
  {
    numerator: "is_paper",
    denominator: null,
    denominatorText: "articles",
    info: "<p>The total number of journal articles published by grantees or authors at your organization.</p>"
  },
  {
    numerator: "is_preprint",
    denominator: null,
    denominatorText: "preprints",
    info: "<p>The total number of preprints published by grantees or authors at your organization.</p>"
  },
  {
    numerator: "is_unique_publication",
    denominator: null,
    denominatorText: "unique publications",
    info: "<p>The total number of unique publications, i.e., journal articles and preprints without an associated journal article.</p>"
  },
  {
    numerator: "is_free_to_read",
    denominator: "is_paper",
    denominatorText: "articles",
    info: "<p>Journal articles that are free to read on the publisher website or any online repository, including temporarily accessible articles (“bronze Open Access”).</p>"
  },
  {
    numerator: "is_free_to_read_preprint",
    denominator: "is_preprint",
    denominatorText: "preprints",
    info: "<p>Preprints that are free to read on the publisher website or any online repository, including temporarily accessible articles (“bronze Open Access”).</p>"
  },
  {
    numerator: "is_compliant",
    denominator: "is_covered_by_policy",
    denominatorText: "articles covered by policy",
    info: `<p>The percentage of journal articles covered by <a href='{policyUrl}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a> that are compliant with the policy.</p>`
  },
  {
    numerator: "is_compliant_preprint",
    denominator: "is_covered_by_policy_preprint",
    denominatorText: "preprints covered by policy",
    info: `<p>The percentage of preprints covered by <a href='{policyUrl}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a> that are compliant with the policy.</p>`
  },
  {
    numerator: "is_compliant_article",
    denominator: "is_paper",
    denominatorText: "articles covered by policy",
    info: `<p>The percentage of journal articles covered by <a href='{policyUrl}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a> that are compliant with the policy.</p>`
  },
  {
    numerator: "is_oa",
    denominator: "is_paper",
    denominatorText: "articles",
    info: "<p>The number of journal articles that are free and <a href='https://creativecommons.org/licenses/by/4.0/' class='underline underline-offset-2 decoration-1' target='_blank' rel='noopener'>CC BY</a> <strong class='bold'>or</strong> <a href='https://creativecommons.org/publicdomain/zero/1.0/' class='underline underline-offset-2 decoration-1' target='_blank' rel='noopener'>CC0</a> (in the public domain) on the publisher’s website, a repository or a preprint server.</p>"
  },
  {
    numerator: "has_data_availability_statement",
    denominator: "has_checked_data_availability_statement",
    denominatorText: "articles checked to date",
    info: `<p>This number tells you how many journal articles that we’ve analyzed have a data availability statement.</p> <p>To check if a paper has a data availability statement, we use data from PubMed and review articles manually. This figure doesn’t tell you what type of data availability statement is provided (e.g there is Open Data vs there is no data).</p>`
  },
  {
    numerator: "has_data_availability_statement_preprint",
    denominator: "has_checked_data_availability_statement_preprint",
    denominatorText: "preprints checked to date",
    info: `<p>This number tells you how many preprints that we’ve analyzed have a data availability statement.</p> <p>To check if a paper has a data availability statement, we use data from PubMed and review preprints manually. This figure doesn’t tell you what type of data availability statement is provided (e.g there is Open Data vs there is no data).</p>`
  },
  {
    numerator: "has_open_data",
    denominator: "has_data",
    denominatorText: "articles with data",
    info: "<p class='mb-2'>The percentage of journal articles that shared any data under a <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>CC0</a> or <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>CC-BY</a> license.</p> <p class='mb-2'>This figure only measures how many articles shared Open Data if they generated data in the first place. It also only measures if any of the datasets generated were open, not if all of them were open.</p> <p>We work with <a href='https://dataseer.ai/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>Dataseer</a>’s data, which uses a combination of machine learning and human review to analyze the articles’ content.</p>"
  },
  {
    numerator: "has_open_code",
    denominator: "has_code",
    denominatorText: "articles with code",
    info: "<p class='mb-2'>The percentage of journal articles that shared any code under a permissive open-source licence, such as MIT.</p> <p class='mb-2'>This figure measures how many articles shared Open Code if they generated code in the first place. It also only measures if <strong>any parts</strong> of the code generated are open, not if <strong>all</strong> of it is open.</p> <p> We work with <a href='https://dataseer.ai/' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>Dataseer</a>’s data, which uses a combination of machine learning and human review to analyze the articles’ content.</p>"
  },
  {
    numerator: "is_compliant_publication",
    denominator: "is_covered_by_policy",
    denominatorText: "unique publications covered by policy",
    info: `<p>The percentage of unique publications covered by <a href='{policyUrl}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a> that are compliant with the policy.</p>`
  }
];
