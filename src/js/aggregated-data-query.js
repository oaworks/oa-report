import { ELEVENTY_API_ENDPOINT } from "./constants.js";

/**
 * Generates the aggregation buckets template for Elasticsearch queries.
 * This function returns a set of common aggregations used in the Data Explore breakdowns.
 * based on the provided suffix (identifier for an organisation).
 *
 * @param {string} suffix – Organisation-specific suffix used in dynamic field
 *                          names (e.g. "bmgf" for Gates Foundation).
 * @returns {Object}       Map of Elasticsearch aggregation definitions.
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
        bool: {
          should: [
            {
              term: {
                "supplements.has_data_availability_statement": true
              }
            },
            {
              exists: {
                field: "data_availability_statement"
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    },
    without_data_availability_statement: {
      filter: {
          bool: {
              must: [
                  {
                      term: {
                          "supplements.has_data_availability_statement": false
                      }
                  },
                  {
                      bool: {
                          must_not: {
                              exists: {
                                  field: "data_availability_statement"
                              }
                          }
                      }
                  }
              ]
          }
      }
  },
    unknown_data_availability_statement: {
      filter: {
        bool: {
          must_not: [
            {
              exists: {
                field: "supplements.has_data_availability_statement"
              }
            },
            {
              exists: {
                field: "data_availability_statement"
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
    with_data: {
      filter: {
        term: {
          "supplements.is_original_research": true
        }
      }
    },
    without_data: {
      filter: {
        term: {
          "supplements.is_original_research": false
        }
      }
    },
    unknown_data_status: {
      filter: {
        bool: {
          must_not: {
            exists: {
              field: "supplements.is_original_research"
            }
          }
        }
      }
    },
    with_shared_data: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.data.has_shared_data": true
              }
            },
            {
              terms: {
                "supplements.dev.data.evidence": ["da", "fulltext"]
              }
            }
          ]
        }
      }
    },
    without_shared_data: {
      filter: {
        bool: {
          should: [
            {
              term: {
                "supplements.dev.data.with_shared_data": false
              }
            },
            {
              bool: {
                must: [
                  {
                    term: {
                      "supplements.dev.data.evidence": "supplementary"
                    }
                  }
                ],
                must_not: {
                  terms: {
                    "supplements.dev.data.evidence": ["da", "fulltext"]
                  }
                }
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    },
    unknown_shared_data_status: {
      filter: {
        bool: {
          must_not: {
            exists: {
              field: "supplements.dev.data.has_shared_data"
            }
          }
        }
      }
    },
    with_shared_data_in_repository: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.data.has_shared_data": true
              }
            },
            {
              terms: {
                "supplements.dev.data.evidence": ["da", "fulltext"]
              }
            }
          ],
          should: [
            { exists: { field: "supplements.dev.data.doi" } },
            { exists: { field: "supplements.dev.data.url" } },
            { exists: { field: "supplements.dev.data.accession" } }
          ],
          minimum_should_match: 1
        }
      }
    },
    with_open_data: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.data.has_open_data": true
              }
            },
            {
              terms: {
                "supplements.dev.data.evidence": ["da", "fulltext"]
              }
            }
          ]
        }
      }
    },
    with_open_data_in_repository: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.data.has_open_data": true
              }
            },
            {
              terms: {
                "supplements.dev.data.evidence": ["da", "fulltext"]
              }
            }
          ],
          should: [
            { exists: { field: "supplements.dev.data.doi" } },
            { exists: { field: "supplements.dev.data.url" } },
            { exists: { field: "supplements.dev.data.accession" } }
          ],
          minimum_should_match: 1
        }
      }
    },
    with_data_dois: {
      filter: {
        bool: {
          must: [
            {
              terms: {
                "supplements.dev.data.evidence": ["da", "fulltext"]
              }
            },
            {
              exists: { field: "supplements.dev.data.doi" }
            }
          ]
        }
      }
    },
    with_data_accession_number: {
      filter: {
        bool: {
          must: [
            {
              terms: {
                "supplements.dev.data.evidence": ["da", "fulltext"]
              }
            },
            {
              exists: { field: "supplements.dev.data.accession" }
            }
          ]
        }
      }
    },
    with_dois: {
      filter: { exists: { field: "DOI" } }
    },
    with_code: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.code.has_made_code": true
              }
            },
            {
              term: {
                "supplements.is_original_research": true
              }
            }
          ]
        }
      }
    },
    without_code: {
      filter: {
        bool: {
          should: [
            {
              term: {
                "supplements.dev.code.has_made_code": false
              }
            },
            {
              term: {
                "supplements.is_original_research": false
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    },
    unknown_code_status: {
      filter: {
        bool: {
          must_not: {
            exists: {
              field: "supplements.dev.code.has_made_code"
            }
          }
        }
      }
    },
    with_shared_code: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.code.has_shared_code": true
              }
            },
            {
              terms: {
                "supplements.dev.code.evidence": ["da", "fulltext"]
              }
            }
          ]
        }
      }
    },
    without_shared_code: {
      filter: {
        bool: {
          should: [
            {
              term: {
                "supplements.dev.code.with_shared_code": false
              }
            },
            {
              bool: {
                must: [
                  {
                    term: {
                      "supplements.dev.code.evidence": "supplementary"
                    }
                  }
                ],
                must_not: {
                  terms: {
                    "supplements.dev.code.evidence": ["da", "fulltext"]
                  }
                }
              }
            }
          ],
          minimum_should_match: 1
        }
      }
    },
    unknown_shared_code_status: {
      filter: {
        bool: {
          must_not: {
            exists: {
              field: "supplements.dev.code.has_shared_code"
            }
          }
        }
      }
    },
    with_shared_code_in_repository: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.code.has_shared_code": true
              }
            },
            {
              terms: {
                "supplements.dev.code.evidence": ["da", "fulltext"]
              }
            }
          ],
          should: [
            { exists: { field: "supplements.dev.code.doi" } },
            { exists: { field: "supplements.dev.code.url" } },
            { exists: { field: "supplements.dev.code.accession" } }
          ],
          minimum_should_match: 1
        }
      }
    },
    with_open_code: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.code.has_open_code": true
              }
            },
            {
              terms: {
                "supplements.dev.code.evidence": ["da", "fulltext"]
              }
            }
          ]
        }
      }
    },
    with_open_code_in_repository: {
      filter: {
        bool: {
          must: [
            {
              term: {
                "supplements.dev.code.has_open_code": true
              }
            },
            {
              terms: {
                "supplements.dev.code.evidence": ["da", "fulltext"]
              }
            }
          ],
          should: [
            { exists: { field: "supplements.dev.code.doi" } },
            { exists: { field: "supplements.dev.code.url" } },
            { exists: { field: "supplements.dev.code.accession" } }
          ],
          minimum_should_match: 1
        }
      }
    },
    with_code_dois: {
      filter: {
        bool: {
          must: [
            {
              terms: {
                "supplements.dev.code.evidence": ["da", "fulltext"]
              }
            },
            {
              exists: { field: "supplements.dev.code.doi" }
            }
          ]
        }
      }
    },
    with_code_accession_number: {
      filter: {
        bool: {
          must: [
            {
              terms: {
                "supplements.dev.code.evidence": ["da", "fulltext"]
              }
            },
            {
              exists: { field: "supplements.dev.code.accession" }
            }
          ]
        }
      }
    },
    with_orcids: {
      filter: { exists: { field: "authorships.author.orcid" } }
    },
    with_rors: {
      filter: { exists: { field: "authorships.institutions.ror" } }
    },
    with_fundref_dois: {
      filter: { exists: { field: "funder.DOI" } }
    },
    with_grant_dois: {
      filter: { prefix: { "funder.award": "10." } }
    }
  };
}

/**
 * Dynamically constructs the POST body for Elasticsearch queries 
 * to handle complex term-based aggregations.
 * This includes sorting and filtering based on specified parameters.
 *
 * @param {string}   suffix     – Organisation-specific suffix.
 * @param {string}   query      – Main query string.
 * @param {string}   term       – Field whose values will form the row labels.
 * @param {number}   startYear  – Start year (inclusive) for `published_date`.
 * @param {number}   endYear    – End year (inclusive) for `published_date`.
 * @param {number}   [size=20]  – Max buckets to return.
 * @param {string}   [sort="_count"] – Sort field (`_count` or a metric name).
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
) {
  // `published_year` on the live API is already keyword-type; others need `.keyword`.
  let termField = term;
  if (!(term === "published_year" && ELEVENTY_API_ENDPOINT === "api")) {
    termField += ".keyword";
  }

  const aggs = createAggregationTemplate(suffix);

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
      values: {
        terms: { field: termField, size, order: { [sort]: "desc" } },
        aggs,
      },
    },
  };
}
