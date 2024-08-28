/**
 * Generates the aggregation template for Elasticsearch queries.
 * This function returns a set of common aggregations used in the Data Explore breakdowns.
 * based on the provided suffix (identifier for an organisation).
 *
 * @param {string} suffix - The suffix for the org-specific data fields in Elasticsearch.
 * @returns {Object} The aggregation template object containing various filters and metrics.
 */
function createAggregationTemplate(suffix) {
  return {
    "open_access": { // Corresponds to `analysis.is_oa.query`, column N
      "filter": {
        "term": {
          "is_open_access": true
        }
      }
    },
    "compliant": { // Corresponds to `analysis.is_compliant.query`, column BO
      "filter": { // I think for this one, we're not using the query. Each organization has a custom query, so it is not standardized. Instead, we're using a key from a data sheet where we are exporting ones we know are compliant with the organization's policy. However, the key below (`supplements.is_compliant_all_works__${suffix}`) only corresponds to two sheets that are named in this way/are exporting data under this key: `is_compliant_all_works__idrc` and `is_compliant_all_works__ukri`.
        // Option 1: We update all of the `is_compliant` sheets to export the key `supplements.is_compliant_all_works__${suffix}` (including BOTH HHMI sheets) - this could replace the old key or be added as a new key.
        // Option 2: We use "bool" in this filter to capture the other keys we use to export compliance. 
        "term": {
          [`supplements.is_compliant__${suffix}`]: true
        }
      }
    },
    "covered_by_policy": { // Corresponds to `analysis.is_covered_by_policy.query`, column BT
      "filter": { // This is the same procedure as "compliant" - we're using a data sheet key instead of the query.
        "term": {
          [`supplements.is_covered_by_policy__${suffix}`]: true
        }
      }
    },
    "free_to_read": { // Corresponds to `analysis.is_free_to_read.query`, column O
      "filter": {
        "term": {
          "is_free_to_read": true 
        }
      }
    },
    "in_repository": { // I don't think there is a corresponding query - I think this is just a key.
      "filter": { // It looks like the `has_repository_copy` key doesn't exist in the new schema; I think the closest alternative might be `openalex.open_access.any_repository_has_fulltext: true`.
        "term": {
          "openalex.open_access.any_repository_has_fulltext": true
        }
      }
    },
    "in_approved_repository": {
      "filter": {
        "term": {
          [`supplements.is_approved_repository__${suffix}`]: true
        }
      }
    },
    "with_preprint": {
      "filter": {
        "term": {
          "supplements.has_preprint_copy": true
        }
      }
    },
    "with_peer_reviewed_version": {
      "filter": {
        "exists": {
          "field": "supplements.is_preprint_of"
        }
      }
    },
    "with_grant_id": {
      "filter": {
        "exists": {
          "field": `supplements.grantid__${suffix}`
        }
      }
    },
    "with_data_availability_statement": {
      "filter": {
        "term": {
          "data_availability_statement.has_data_availability_statement": true
        }
      }
    },
    "without_data_availability_statement": {
      "filter": {
        "term": {
          "data_availability_statement.has_data_availability_statement": false
        }
      }
    },
    "total_citations": {
      "sum": {
        "field": "cited_by_count"
      }
    },
    "mean_citations": {
      "avg": {
        "field": "cited_by_count"
      }
    },
    "with_apc": {
      "filter": {
        "range": {
          "supplements.apc_cost": {
            "gt": 0
          }
        }
      }
    },
    "total_apc_amount": {
      "sum": {
        "field": "supplements.apc_cost"
      }
    },
    "mean_apc_amount": {
      "avg": {
        "field": "supplements.apc_cost"
      }
    },
    "median_apc_amount": {
      "percentiles": {
        "field": "supplements.apc_cost",
        "percents": [
          50
        ]
      }
    },
    "with_data": {
      "filter": {
        "term": {
          "supplements.is_original_research": true
        }
      }
    },
    "without_data": {
      "filter": {
        "term": {
          "supplements.is_original_research": false
        }
      }
    },
    "unknown_data_status": {
      "filter": {
        "bool": {
          "must_not": {
            "exists": {
              "field": "supplements.is_original_research"
            }
          }
        }
      }
    },
    "with_shared_data": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.data.has_shared_data": true
              }
            },
            {
              "terms": {
                "supplements.dev.data.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            }
          ]
        }
      }
    },
    "without_shared_data": {
      "filter": {
        "bool": {
          "should": [
            {
              "term": {
                "supplements.dev.data.with_shared_data": false
              }
            },
            {
              "bool": {
                "must": [
                  {
                    "term": {
                      "supplements.dev.data.evidence": "supplementary"
                    }
                  }
                ],
                "must_not": [
                  {
                    "terms": {
                      "supplements.dev.data.evidence": [
                        "da",
                        "fulltext"
                      ]
                    }
                  }
                ]
              }
            }
          ],
          "minimum_should_match": 1
        }
      }
    },
    "unknown_shared_data_status": {
      "filter": {
        "bool": {
          "must_not": {
            "exists": {
              "field": "supplements.dev.data.has_shared_data"
            }
          }
        }
      }
    },
    "with_shared_data_in_repository": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.data.has_shared_data": true
              }
            },
            {
              "terms": {
                "supplements.dev.data.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            }
          ],
          "should": [
            {
              "exists": {
                "field": "supplements.dev.data.doi"
              }
            },
            {
              "exists": {
                "field": "supplements.dev.data.url"
              }
            },
            {
              "exists": {
                "field": "supplements.dev.data.accession"
              }
            }
          ],
          "minimum_should_match": 1
        }
      }
    },
    "with_open_data": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.data.has_open_data": true
              }
            },
            {
              "terms": {
                "supplements.dev.data.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            }
          ]
        }
      }
    },
    "with_open_data_in_repository": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.data.has_open_data": true
              }
            },
            {
              "terms": {
                "supplements.dev.data.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            }
          ],
          "should": [
            {
              "exists": {
                "field": "supplements.dev.data.doi"
              }
            },
            {
              "exists": {
                "field": "supplements.dev.data.url"
              }
            },
            {
              "exists": {
                "field": "supplements.dev.data.accession"
              }
            }
          ],
          "minimum_should_match": 1
        }
      }
    },
    "with_data_dois": {
      "filter": {
        "bool": {
          "must": [
            {
              "terms": {
                "supplements.dev.data.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            },
            {
              "exists": {
                "field": "supplements.dev.data.doi"
              }
            }
          ]
        }
      }
    },
    "with_data_accession_number": {
      "filter": {
        "bool": {
          "must": [
            {
              "terms": {
                "supplements.dev.data.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            },
            {
              "exists": {
                "field": "supplements.dev.data.accession"
              }
            }
          ]
        }
      }
    },
    "with_dois": {
      "filter": {
        "exists": {
          "field": "DOI"
        }
      }
    },
    "with_code": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.code.has_made_code": {
                  "value": true
                }
              }
            },
            {
              "term": {
                "supplements.is_original_research": {
                  "value": true
                }
              }
            }
          ]
        }
      }
    },
    "without_code": {
      "filter": {
        "bool": {
          "should": [
            {
              "term": {
                "supplements.dev.code.has_made_code": {
                  "value": false
                }
              }
            },
            {
              "term": {
                "supplements.is_original_research": {
                  "value": false
                }
              }
            }
          ],
          "minimum_should_match": 1
        }
      }
    },
    "unknown_code_status": {
      "filter": {
        "bool": {
          "must_not": {
            "exists": {
              "field": "supplements.dev.code.has_made_code"
            }
          }
        }
      }
    },
    "with_shared_code": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.code.has_shared_code": true
              }
            },
            {
              "terms": {
                "supplements.dev.code.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            }
          ]
        }
      }
    },
    "without_shared_code": {
      "filter": {
        "bool": {
          "should": [
            {
              "term": {
                "supplements.dev.code.with_shared_code": false
              }
            },
            {
              "bool": {
                "must": [
                  {
                    "term": {
                      "supplements.dev.code.evidence": "supplementary"
                    }
                  }
                ],
                "must_not": [
                  {
                    "terms": {
                      "supplements.dev.code.evidence": [
                        "da",
                        "fulltext"
                      ]
                    }
                  }
                ]
              }
            }
          ],
          "minimum_should_match": 1
        }
      }
    },
    "unknown_shared_code_status": {
      "filter": {
        "bool": {
          "must_not": {
            "exists": {
              "field": "supplements.dev.code.has_shared_code"
            }
          }
        }
      }
    },
    "with_shared_code_in_repository": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.code.has_shared_code": true
              }
            },
            {
              "terms": {
                "supplements.dev.code.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            }
          ],
          "should": [
            {
              "exists": {
                "field": "supplements.dev.code.doi"
              }
            },
            {
              "exists": {
                "field": "supplements.dev.code.url"
              }
            },
            {
              "exists": {
                "field": "supplements.dev.code.accession"
              }
            }
          ],
          "minimum_should_match": 1
        }
      }
    },
    "with_open_code": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.code.has_open_code": true
              }
            },
            {
              "terms": {
                "supplements.dev.code.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            }
          ]
        }
      }
    },
    "with_open_code_in_repository": {
      "filter": {
        "bool": {
          "must": [
            {
              "term": {
                "supplements.dev.code.has_open_code": true
              }
            },
            {
              "terms": {
                "supplements.dev.code.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            }
          ],
          "should": [
            {
              "exists": {
                "field": "supplements.dev.code.doi"
              }
            },
            {
              "exists": {
                "field": "supplements.dev.code.url"
              }
            },
            {
              "exists": {
                "field": "supplements.dev.code.accession"
              }
            }
          ],
          "minimum_should_match": 1
        }
      }
    },
    "with_code_dois": {
      "filter": {
        "bool": {
          "must": [
            {
              "terms": {
                "supplements.dev.code.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            },
            {
              "exists": {
                "field": "supplements.dev.code.doi"
              }
            }
          ]
        }
      }
    },
    "with_code_accession_number": {
      "filter": {
        "bool": {
          "must": [
            {
              "terms": {
                "supplements.dev.code.evidence": [
                  "da",
                  "fulltext"
                ]
              }
            },
            {
              "exists": {
                "field": "supplements.dev.code.accession"
              }
            }
          ]
        }
      }
    },
    "with_orcids": {
      "filter": {
        "exists": {
          "field": "authorships.author.orcid"
        }
      }
    },
    "with_rors": {
      "filter": {
        "exists": {
          "field": "authorships.institutions.ror"
        }
      }
    },
    "with_fundref_dois": {
      "filter": {
        "exists": {
          "field": "funder.DOI"
        }
      }
    },
    "with_grant_dois": {
      "filter": {
        "prefix": {
          "funder.award": "10."
        }
      }
    }
  };
}

/**
 * Dynamically configures POST data for Elasticsearch queries to handle complex term-based aggregations.
 * This function constructs the aggregation query including sorting and filtering based on specified parameters.
 * 
 * @param {string} suffix - The suffix for the org-specific data fields in Elasticsearch.
 * @param {string} query - The main query string for fetching data.
 * @param {string} term - The field term to aggregate on.
 * @param {number} startYear - The starting year for filtering the data.
 * @param {number} endYear - The ending year for filtering the data.
 * @param {number} size - Number of top records to return in each term aggregation.
 * @param {string} sort - The field to sort the term aggregations on.
 * @returns {Object} The POST request body for Elasticsearch.
 */
export function getAggregatedDataQuery(suffix, query, term, startYear, endYear, size = 20, sort = "_count") {
  const aggs = createAggregationTemplate(suffix);

  // append .keyword to `term` 
  term = `${term}.keyword`;

  return {
    "query": {
      "bool": {
        "must": [
          {
            "query_string": {
              "query": query
            }
          },
          {
            "range": {
              "openalex.publication_date": {
                "gte": startYear,
                "lte": endYear
              }
            }
          }
        ]
      }
    },
    "size": 0,
    "aggs": {
      "all_values": {
        "filter": { 
          "exists": { 
            "field": term 
          } 
        },
        "aggs": aggs
      },
      "no_values": {
        "filter": { 
          "bool": { 
            "must_not": { 
              "exists": { 
                "field": term 
              } 
            } 
          } 
        },
        "aggs": aggs
      },
      "values": {
        "terms": {
          "field": term,
          "size": size,
          "order": { 
            [`${sort}`]: "desc" 
          }
        },
        "aggs": aggs
      }
    }
  };
};
