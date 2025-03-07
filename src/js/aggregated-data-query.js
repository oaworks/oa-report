/**
 * Generates the aggregation template for Elasticsearch queries.
 * This function returns a set of common aggregations used in the Data Explore breakdowns.
 * based on the provided suffix (identifier for an organisation).
 *
 * @param {string} suffix - The suffix for the org-specific data fields in Elasticsearch.
 * @returns {Object} The aggregation template object containing various filters and metrics.
 */
function createAggregationTemplate(id, suffix) {
  return {
    "open_access": { // Corresponds to `analysis.is_oa.query`, column N
      "filter": {
        "term": {
          "is_open_access": true
        }
      }
    },
    "compliant": {
      "filter": {
        "term": {
          "oa_policy.is_compliant": id
        }
      }
    },
    "covered_by_policy": { 
      "filter": {
        "term": {
          "oa_policy.is_covered_by_policy": id
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
    "in_approved_repository": { // No change - same key.
      "filter": {
        "term": {
          [`supplements.is_approved_repository__${suffix}`]: true
        }
      }
    },
    "with_preprint": { // No change - same key.
      "filter": {
        "term": {
          "supplements.has_preprint_copy": true
        }
      }
    },
    "with_peer_reviewed_version": { // No change - same key.
      "filter": {
        "exists": {
          "field": "supplements.is_preprint_of"
        }
      }
    },
    "with_grant_id": { // No change - same key.
      "filter": {
        "exists": {
          "field": `supplements.grantid__${suffix}`
        }
      }
    },
    "with_data_availability_statement": { // No change - this already has the new key.
      "filter": {
        "term": {
          "data_availability_statement.has_data_availability_statement": true
        }
      }
    },
    "without_data_availability_statement": { // No change - this already has the new key.
      "filter": {
        "term": {
          "data_availability_statement.has_data_availability_statement": false
        }
      }
    },
    "unknown_data_availability_statement": {
      "filter": {
        "bool": {
          "must_not": {
            "exists": {
              "field": "data_availability_statement.has_data_availability_statement"
            }
          }
        }
      }
    },
    "total_citations": { // Field corresponds to new key: `openalex.cited_by_count`
      "sum": {
        "field": "cited_by_count" // "field": "openalex.cited_by_count"
      }
    },
    "mean_citations": { // Field corresponds to new key: `openalex.cited_by_count`
      "avg": {
        "field": "cited_by_count" // "field": "openalex.cited_by_count"
      }
    },
    "with_apc": { // No change - same key.
      "filter": {
        "range": {
          "supplements.apc_cost": {
            "gt": 0
          }
        }
      }
    },
    "total_apc_amount": { // No change - same key.
      "sum": {
        "field": "supplements.apc_cost"
      }
    },
    "mean_apc_amount": { // No change - same key.
      "avg": {
        "field": "supplements.apc_cost"
      }
    },
    "median_apc_amount": { // No change - same key.
      "percentiles": {
        "field": "supplements.apc_cost",
        "percents": [
          50
        ]
      }
    },
    "with_data": { // The key is the same, but I'm not sure if it's the best one. This key just tells us if it's original research. There are other keys that could tell us if there is data (e.g., `supplements.has_made_data`), but I'm not sure if those options are better than the one here. I'm also not sure what having data means - is it open? Shared? Data availability statement? I'm not sure how this is being used.
      "filter": {
        "term": {
          "supplements.is_original_research": true
        }
      }
    },
    "without_data": { // Same as "with_data": The key is the same, but I'm not sure if it's the best one. This key just tells us if it's original research. There are other keys that could tell us if there is data (e.g., `supplements.has_made_data`), but I'm not sure if those options are better than the one here. I'm also not sure what having data means - is it open? Shared? Data availability statement? I'm not sure how this is being used.
      "filter": {
        "term": {
          "supplements.is_original_research": false
        }
      }
    },
    "unknown_data_status": { // Same as "with_data": The key is the same, but I'm not sure if it's the best one. This key just tells us if it's original research. There are other keys that could tell us if there is data (e.g., `supplements.has_made_data`), but I'm not sure if those options are better than the one here. I'm also not sure what having data means - is it open? Shared? Data availability statement? I'm not sure how this is being used.
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
    "with_shared_data": { // No change - same keys.
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
    "without_shared_data": { // No change - same keys.
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
    "unknown_shared_data_status": { // No change - same key.
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
    "with_shared_data_in_repository": { // No change - same keys.
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
          },
          "in_repository": {
            "filter": {
              "bool": {
                "should": [
                  {
                    "term": {
                      "openalx.open_access.any_repository_has_fulltext": {
                        "value": true
                      }
                    }
                  },
                  {
                    "term": {
                      "has_repository_copy": {
                        "value": true
                      }
                    }
                  },
                  {
                    "exists": {
                      "field": "PMCID"
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            }
          ],
          "minimum_should_match": 1
        }
      }
    },
    "with_open_data": { // No change - same keys.
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
    "with_open_data_in_repository": { // No change - same keys.
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
    "with_data_dois": { // No change - same keys.
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
    "with_data_accession_number": { // No change - same keys.
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
    "with_dois": { // No change - same key.
      "filter": {
        "exists": {
          "field": "DOI"
        }
      }
    },
    "with_code": { // No change - same keys.
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
    "without_code": { // No change - same keys.
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
    "unknown_code_status": { // No change - same keys.
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
    "with_shared_code": { // No change - same keys.
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
    "without_shared_code": { // No change - same keys.
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
    "unknown_shared_code_status": { // No change - same key.
      "filter": {
        "bool": {
          "must_not": {
            "exists": {
              "field": "supplements.dev.code.has_shared_code"
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
        }
      },
      "no_values": {
        "filter": {
          "bool": {
            "must_not": {
              "exists": {
                "field": `${termField}`
              }
            }
          }
        },
        "aggs": {
          "open_access": {
            "filter": {
              "bool": {
                "should": [
                  {
                    "terms": {
                      "publisher_license.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0",
                        "public-domain"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "publisher_license_v2.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0",
                        "public-domain"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "supplements.publisher_license_crossref.keyword": [
                        "cc-by",
                        "cc0"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "epmc_licence.keyword": [
                        "cc-by",
                        "pd",
                        "cc-zero",
                        "cc0"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "repository_license.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0",
                        "public-domain"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "repository_license_v2.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0",
                        "public-domain"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "supplements.publisher_license_ic.keyword": [
                        "cc-by",
                        "pd",
                        "cc0"
                      ]
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            }
          },
          "compliant": {
            "filter": {
              "term": {
                [`supplements.is_compliant_all_works__${suffix}`]: true
              }
            }
          },
          "covered_by_policy": {
            "filter": {
              "term": {
                [`supplements.is_covered_by_policy__${suffix}`]: true
              }
            }
          },
          "free_to_read": {
            "filter": {
              "term": {
                "is_oa": true
              }
            }
          },
          "in_repository": {
            "filter": {
              "bool": {
                "should": [
                  {
                    "term": {
                      "openalx.open_access.any_repository_has_fulltext": {
                        "value": true
                      }
                    }
                  },
                  {
                    "term": {
                      "has_repository_copy": {
                        "value": true
                      }
                    }
                  },
                  {
                    "exists": {
                      "field": "PMCID"
                    }
                  }
                ],
                "minimum_should_match": 1
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
              "bool": {
                "should": [
                  {
                    "term": {
                      "supplements.has_data_availability_statement": true
                    }
                  },
                  {
                    "exists": {
                      "field": "data_availability_statement"
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            }
          },
          "without_data_availability_statement": {
            "filter": {
              "bool": {
                "must_not": [
                  {
                    "term": {
                      "supplements.has_data_availability_statement": true
                    }
                  },
                  {
                    "exists": {
                      "field": "data_availability_statement"
                    }
                  }
                ],
                "minimum_should_match": 1
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
        }
      },
      "values": {
        "terms": {
          "field": termField, // previously `${term}.keyword` but this doesn’t work for published_year
          "size": size,
          "order": {
            [`${sort}`]: "desc"
          }
        },
        "aggs": {
          "open_access": {
            "filter": {
              "bool": {
                "should": [
                  {
                    "terms": {
                      "publisher_license.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0",
                        "public-domain"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "publisher_license_v2.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0",
                        "public-domain"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "supplements.publisher_license_crossref.keyword": [
                        "cc-by",
                        "cc0"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "epmc_licence.keyword": [
                        "cc-by",
                        "pd",
                        "cc-zero",
                        "cc0"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "repository_license.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0",
                        "public-domain"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "repository_license_v2.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0",
                        "public-domain"
                      ]
                    }
                  },
                  {
                    "terms": {
                      "supplements.publisher_license_ic.keyword": [
                        "cc-by",
                        "pd",
                        "cc0"
                      ]
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            }
          },
          "compliant": {
            "filter": {
              "term": {
                [`supplements.is_compliant_all_works__${suffix}`]: true
              }
            }
          },
          "covered_by_policy": {
            "filter": {
              "term": {
                [`supplements.is_covered_by_policy__${suffix}`]: true
              }
            }
          },
          "free_to_read": {
            "filter": {
              "term": {
                "is_oa": true
              }
            }
          },
          "in_repository": {
            "filter": {
              "bool": {
                "should": [
                  {
                    "term": {
                      "openalx.open_access.any_repository_has_fulltext": {
                        "value": true
                      }
                    }
                  },
                  {
                    "term": {
                      "has_repository_copy": {
                        "value": true
                      }
                    }
                  },
                  {
                    "exists": {
                      "field": "PMCID"
                    }
                  }
                ],
                "minimum_should_match": 1
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
              "bool": {
                "should": [
                  {
                    "term": {
                      "supplements.has_data_availability_statement": true
                    }
                  },
                  {
                    "exists": {
                      "field": "data_availability_statement"
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            }
          },
          "without_data_availability_statement": {
            "filter": {
              "bool": {
                "must_not": [
                  {
                    "term": {
                      "supplements.has_data_availability_statement": true
                    }
                  },
                  {
                    "exists": {
                      "field": "data_availability_statement"
                    }
                  }
                ],
                "minimum_should_match": 1
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
          }
        }
      }
    },
    "with_shared_code_in_repository": { // No change - same keys.
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
    "with_open_code": { // No change - same keys.
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
    "with_open_code_in_repository": { // No change - same keys.
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
    "with_code_dois": { // No change - same keys.
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
    "with_code_accession_number": { // No change - same keys.
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
    "with_orcids": { // New key: `openalex.authorships.author.orcid`
      "filter": {
        "exists": {
          "field": "authorships.author.orcid" // "field": "openalex.authorships.author.orcid"
        }
      }
    },
    "with_rors": { // New key: `openalex.authorships.institutions.ror`
      "filter": {
        "exists": {
          "field": "authorships.institutions.ror" // "field": "openalex.authorships.institutions.ror"
        }
      }
    },
    "with_fundref_dois": { // Funder DOIs don't seem to exist in the new system. Ask Joe if this is getting replaced with something else (e.g., having openalex funder IDs).
      "filter": {
        "exists": {
          "field": "funder.DOI"
        }
      }
    },
    "with_grant_dois": { // The same key, `funder.award`, exists in the new system, but I can't see an example of this actually working to find a grant DOI by searching the api using the filter below. Ask Joe.
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
export function getAggregatedDataQuery(id, suffix, query, term, startYear, endYear, size = 20, sort = "_count") {
  const aggs = createAggregationTemplate(id, suffix);

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
