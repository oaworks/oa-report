// =================================================
// constants/insights.js
// Insight card copy/config
// =================================================

import { resolveFieldDefinition } from './field-definitions.js';

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
    definition_key: "free_to_read",
    info: resolveFieldDefinition("free_to_read", "insights", { subject: "Journal articles" }).info
  },
  {
    numerator: "is_free_to_read_preprint",
    denominator: "is_preprint",
    denominatorText: "preprints",
    definition_key: "free_to_read",
    info: resolveFieldDefinition("free_to_read", "insights", { subject: "Preprints" }).info
  },
  {
    numerator: "is_compliant",
    denominator: "is_covered_by_policy",
    denominatorText: "articles covered by policy",
    definition_key: "compliant",
    info: resolveFieldDefinition("compliant", "insights", { subject: "journal articles" }).info
  },
  {
    numerator: "is_compliant_preprint",
    denominator: "is_covered_by_policy_preprint",
    denominatorText: "preprints covered by policy",
    definition_key: "compliant",
    info: resolveFieldDefinition("compliant", "insights", { subject: "preprints" }).info
  },
  {
    numerator: "is_compliant_article",
    denominator: "is_paper",
    denominatorText: "articles covered by policy",
    definition_key: "compliant",
    info: resolveFieldDefinition("compliant", "insights", { subject: "journal articles" }).info
  },
  {
    numerator: "is_oa",
    denominator: "is_paper",
    denominatorText: "articles",
    definition_key: "open_access",
    info: resolveFieldDefinition("open_access", "insights", { subject: "journal articles" }).info
  },
  {
    numerator: "has_data_availability_statement",
    denominator: "has_checked_data_availability_statement",
    denominatorText: "articles checked to date",
    definition_key: "data_availability_statement",
    info: resolveFieldDefinition("data_availability_statement", "insights", { subject: "journal articles", review_subject: "articles" }).info
  },
  {
    numerator: "has_data_availability_statement_preprint",
    denominator: "has_checked_data_availability_statement_preprint",
    denominatorText: "preprints checked to date",
    definition_key: "data_availability_statement",
    info: resolveFieldDefinition("data_availability_statement", "insights", { subject: "preprints", review_subject: "preprints" }).info
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
    definition_key: "compliant",
    info: resolveFieldDefinition("compliant", "insights", { subject: "unique publications" }).info
  }
];
