// =================================================
// aggregated-data-query.js
// Builds Elasticsearch aggregation queries
// for Explore views
// =================================================

import { unescapeQueryValue } from "./utils.js";

// =================================================
// Helpers
// =================================================

/**
 * Finds exact values filtered for one field in an ES query string, e.g.
 * `field:"value"` or `field:("value1" OR "value2")`. Lets an aggregation
 * on that field restrict itself to just the filtered value(s). Matches
 * with or without a `.keyword` suffix, since filter clauses aren't always
 * written with one (e.g. author filters use the bare field).
 *
 * @param {string} query - The query string to search.
 * @param {string} field - Field name as it appears in the query.
 * @returns {string[]} Matching values, or an empty array if none.
 */
export function getFieldFilterValues(query, field) {
  if (!query || !field) return [];
  const baseField = field.replace(/\.keyword$/i, "");
  const escapedField = baseField.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = query.match(new RegExp(`(?<![\\w.])${escapedField}(?:\\.keyword)?\\s*:\\s*(\\([^)]*\\)|"(?:\\\\.|[^"\\\\])*")`, "i"));
  if (!match) return [];
  return (match[1].match(/"(?:\\.|[^"\\])*"/g) || []).map(v => unescapeQueryValue(v.slice(1, -1)));
}

/**
 * Converts a term into its aggregatable field. `published_year` is already
 * keyword-type; every other term field needs a `.keyword` suffix.
 *
 * @param {string} term
 * @returns {string}
 */
export function toTermField(term) {
  return term === "published_year" ? term : `${term}.keyword`;
}

/**
 * Field used to group author breakdowns.
 *
 * @type {string}
 */
export const AUTHOR_BREAKDOWN_TERM = "authorships.author.orcid";

/**
 * Returns the author value used as the author breakdown key.
 *
 * @param {Object} [author={}]
 * @returns {string|null}
 */
export function getAuthorBreakdownKey(author = {}) {
  if (AUTHOR_BREAKDOWN_TERM === "authorships.author.id") {
    return author?.id || null;
  }

  if (AUTHOR_BREAKDOWN_TERM === "authorships.author.orcid") {
    return author?.orcid || null;
  }

  return null;
}

/**
 * Formats one aggregation bucket or summary object into plain values.
 *
 * @param {Object} bucket - Raw aggregation bucket or summary object.
 * @param {string} [term=""] - Active term field for author metadata handling.
 * @returns {Object} Flattened aggregation values.
 */
export function formatAggregationBucket(bucket, term = "") {
  const formattedBucket = {};

  Object.keys(bucket).forEach((key) => {
    if (key.startsWith("median_")) {
      formattedBucket[key] = bucket[key].values["50.0"];
    } else if (key === "top_author_record") {
      const hit = bucket[key]?.hits?.hits?.[0]?._source;
      const authorships = Array.isArray(hit?.authorships) ? hit.authorships : [];
      const matchingAuthorship = authorships.find((authorship) => {
        return term === AUTHOR_BREAKDOWN_TERM
          && getAuthorBreakdownKey(authorship?.author) === bucket.key;
      });

      formattedBucket.display_name = matchingAuthorship?.author?.display_name || null;
      formattedBucket.orcid = matchingAuthorship?.author?.orcid || null;
    } else if (bucket[key].doc_count !== undefined) {
      formattedBucket[key] = bucket[key].doc_count;
    } else if (bucket[key].value !== undefined) {
      formattedBucket[key] = bucket[key].value;
    } else {
      formattedBucket[key] = bucket[key];
    }
  });

  return formattedBucket;
}

/**
 * Generates the aggregation buckets template for Elasticsearch queries.
 * Returns the common aggregations used in the Data Explore breakdowns,
 * based on the provided suffix (identifier for an organisation).
 *
 * @param {string} suffix - Organisation-specific suffix used in dynamic field
 * names (e.g. "bmgf" for Gates Foundation).
 * @returns {Object} Map of Elasticsearch aggregation definitions.
 */
function createAggregationTemplate(suffix) {
  return {
    open_access: {
      filter: {
        bool: {
          should: [
            {
              terms: {
                "publisher_license.keyword": [
                  "cc-by", "pd", "cc-0", "public-domain"
                ]
              }
            },
            {
              terms: {
                "publisher_license_v2.keyword": [
                  "cc-by", "pd", "cc-0", "public-domain"
                ]
              }
            },
            {
              terms: {
                "supplements.publisher_license_crossref.keyword": [
                  "cc-by", "cc0"
                ]
              }
            },
            {
              terms: {
                "epmc_licence.keyword": [
                  "cc-by", "pd", "cc-zero", "cc0"
                ]
              }
            },
            {
              terms: {
                "repository_license.keyword": [
                  "cc-by", "pd", "cc-0", "public-domain"
                ]
              }
            },
            {
              terms: {
                "repository_license_v2.keyword": [
                  "cc-by", "pd", "cc-0", "public-domain"
                ]
              }
            },
            {
              terms: {
                "supplements.publisher_license_ic.keyword": [
                  "cc-by", "pd", "cc0"
                ]
              }
            },
            {
              terms: {
                "supplements.preprint_license.keyword": [
                  "cc-by", "pd", "cc-0", "public-domain"
                ]
              }
            },
            {
              terms: {
                "supplements.oasupport.status.keyword": [
                  "Successful"
                ]
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    },
    compliant: {
      filter: {
        term: {
        [`supplements.is_compliant__${suffix}`]: true  
        }
      }
    },
    compliant_and_covered_by_policy: {
      filter: {
        term: {
          [`supplements.is_compliant_all_works__${suffix}`]: true
        }
      }
    },
    covered_by_policy: {
      filter: {
        term: {
          [`supplements.is_covered_by_policy__${suffix}`]: true
        }
      }
    },
    free_to_read: {
      filter: {
        bool: {
          should: [
            {
              term: {
                "is_oa": true
              }
            },
            {
              term: {
                crossref_is_oa: true
              }
            },
            {
              term: {
                "supplements.has_preprint_copy": true
              }
            },
            {
              term: {
                "openalx.open_access.is_oa": true
              }
            },
            {
              exists: {
                field: "PMCID"
              }
            },
            {
              exists: {
                field: "openalx.open_access.oa_url"
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    },
    in_repository: {
      filter: {
        bool: {
          should: [
            {
              term: {
                "openalx.open_access.any_repository_has_fulltext": true
              }
            },
            {
              term: {
                has_repository_copy: true
              }
            },
            {
              exists: {
                field: "PMCID"
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    },
    in_approved_repository: {
      filter: {
        term: {
          [`supplements.is_approved_repository__${suffix}`]: true
        }
      }
    },
    with_preprint: {
      filter: {
        term: {
          "supplements.has_preprint_copy": true
        }
      }
    },
    with_peer_reviewed_version: {
      filter: {
        exists: {
          field: "supplements.is_preprint_of"
        }
      }
    },
    with_grant_id: {
      filter: {
        exists: {
          field: `supplements.grantid__${suffix}`
        }
      }
    },
    with_data_availability_statement: {
      filter: {
        term: {
          has_data_availability_statement: true
        }
      }
    },
    without_data_availability_statement: {
      filter: {
        term: {
          has_data_availability_statement: false
        }
      }
    },
    unknown_data_availability_statement: {
      filter: {
        bool: {
          must_not: [
            {
              exists: {
                field: "has_data_availability_statement"
              }
            }
          ]
        }
      }
    },
    total_citations: {
      sum: { field: "cited_by_count" }
    },
    mean_citations: {
      avg: { field: "cited_by_count" }
    },
    with_apc: {
      filter: {
        range: {
          "supplements.apc_cost": { gt: 0 }
        }
      }
    },
    total_apc_amount: {
      sum: { field: "supplements.apc_cost" }
    },
    mean_apc_amount: {
      avg: { field: "supplements.apc_cost" }
    },
    median_apc_amount: {
      percentiles: {
        field: "supplements.apc_cost",
        percents: [50]
      }
    },
  };
}

/** Filter-type metric keys (e.g. "open_access") — shown as _pct columns; sorted client-side since ES can't order by a sibling pipeline agg. */
export function getPercentageMetricAggKeys() {
  return Object.entries(createAggregationTemplate("")).filter(([, def]) => def && typeof def === "object" && "filter" in def).map(([key]) => key);
}

/**
 * Returns extra bucket metadata aggregations for author id breakdowns.
 *
 * @param {string} term - Field used for the current terms aggregation.
 * @returns {Object} Extra aggregations to merge into each terms bucket.
 */
function createAuthorBucketMetadataAggs(term) {
  if (term !== AUTHOR_BREAKDOWN_TERM) {
    return {};
  }

  return {
    top_author_record: {
      top_hits: {
        size: 1,
        _source: {
          includes: [
            "authorships.author.id",
            "authorships.author.display_name",
            "authorships.author.orcid"
          ]
        }
      }
    }
  };
}

// =================================================
// Exports
// =================================================

/**
 * Constructs a minimal POST body for Elasticsearch queries used by Insights
 * cards. Only requests the `all_values` aggregate.
 *
 * @param {string} suffix    - Organisation-specific suffix.
 * @param {string} query     - Main query string.
 * @param {number} startYear - Start year (inclusive) for `published_date`.
 * @param {number} endYear   - End year (inclusive) for `published_date`.
 * @returns {Object} POST body suitable for `/_search`.
 */
export function getInsightsAggregationQuery(suffix, query, startYear, endYear) {
  return {
    query: {
      bool: {
        must: [
          { query_string: { query } },
          { range: { published_date: { gte: startYear, lte: endYear } } },
        ],
      },
    },
    size: 0,
    aggs: {
      all_values: {
        filter: { exists: { field: "published_year" } },
        aggs: createAggregationTemplate(suffix),
      },
    },
  };
}

/**
 * Dynamically constructs the POST body for Elasticsearch queries
 * to handle complex term-based aggregations.
 * This includes sorting and filtering based on specified parameters.
 *
 * @param {string}   suffix     - Organisation-specific suffix.
 * @param {string}   query      - Main query string.
 * @param {string}   term       - Field whose values will form the row labels.
 * @param {number}   startYear  - Start year (inclusive) for `published_date`.
 * @param {number}   endYear    - End year (inclusive) for `published_date`.
 * @param {number}   [size=20]  - Max buckets to return.
 * @param {string}   [sort="_count"] - Sort field (`_count`, `_key`, or a metric name).
 * @param {string}   [activeFilterQuery=query] - Just the user's active filter, excluding any
 * base org query, so exact-match restriction never picks up unrelated baseline query clauses.
 * @param {string[]} [includeValuesOverride] - Exact values to restrict buckets to, bypassing
 * the automatic field-match detection (e.g. author ORCIDs resolved from a name filter).
 * @param {string}   [sortDirection="desc"] - Sort direction for the selected sort field.
 * @returns {Object} POST body suitable for `/_search`.
 */
export function getAggregatedDataQuery(
  suffix,
  query,
  term,
  startYear,
  endYear,
  size = 20,
  sort = "_count",
  activeFilterQuery = query,
  includeValuesOverride,
  sortDirection = "desc",
) {
  const termField = toTermField(term);

  const aggs = createAggregationTemplate(suffix);
  const bucketMetadataAggs = createAuthorBucketMetadataAggs(term);

  // If the user's own filter (not the org's base query) already targets this same
  // field (e.g. one author), restrict buckets to exactly those values so
  // co-occurring values (e.g. co-authors) don't show.
  const includeValues = includeValuesOverride ?? getFieldFilterValues(activeFilterQuery, termField);
  const bucketSize = includeValues.length ? Math.max(size, includeValues.length) : size;

  return {
    query: {
      bool: {
        must: [
          { query_string: { query } },
          { range: { published_date: { gte: startYear, lte: endYear } } },
        ],
      },
    },
    size: 0,
    aggs: {
      all_values: {
        filter: { exists: { field: termField } },
        aggs,
      },
      no_values: {
        filter: { bool: { must_not: { exists: { field: termField } } } },
        aggs,
      },
      values_total: {
        cardinality: { field: termField },
      },
      values: {
        terms: {
          field: termField,
          size: bucketSize,
          order: { [sort]: sortDirection },
          ...(includeValues.length ? { include: includeValues } : {}),
        },
        aggs: {
          ...aggs,
          ...bucketMetadataAggs
        },
      },
    },
  };
}
