// Dynamically configure POST data 
export function createPostData(suffix, query, term, startYear, endYear, size = 20, sort = "_count") {
  // Only the term published_year on the live API does not require the .keyword suffix 
  let termField = term;
  if (!(term === "published_year" && apiEndpoint === "api")) {
    termField += ".keyword";
  }
  return {
    "query": {
      "bool": {
        "must": [{
            "query_string": {
              "query": query
            }
          },
          {
            "range": {
              "published_year": {
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
      "key": {
        "terms": {
          "field": termField, // previously `${term}.keyword` but this doesn’t for published_year
          "size": size,
          "order": {
            [`${sort}`]: "desc"
          }
        },
        "aggs": {
          "publications": {
            "filter": {
              "exists": {
                "field": termField // previously `${term}.keyword` but this doesn’t for published_year
              }
            }
          },
          "open_access": {
            "filter": {
              "bool": {
                "should": [{
                    "terms": {
                      "publisher_license.keyword": [
                        "cc-by",
                        "pd",
                        "cc-0"
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
                        "cc-0"
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
          "open_access_pct": {
            "bucket_script": {
              "buckets_path": {
                "open_access": "open_access>_count",
                "total_count": "_count"
              },
              "script": "params.open_access / params.total_count"
            }
          },
          "compliant": {
            "filter": {
              "term": {
                [`supplements.is_compliant_all_works__${suffix}`]: true
              }
            }
          },
          "compliant_pct": {
            "bucket_script": {
              "buckets_path": {
                "compliant": "compliant>_count",
                "total_count": "_count"
              },
              "script": "params.compliant / params.total_count"
            }
          },
          "covered_by_policy": {
            "filter": {
              "term": {
                [`supplements.is_covered_by_policy__${suffix}`]: true
              }
            }
          },
          "covered_by_policy_pct": {
            "bucket_script": {
              "buckets_path": {
                "covered_by_policy": "covered_by_policy>_count",
                "total_count": "_count"
              },
              "script": "params.covered_by_policy / params.total_count"
            }
          },
          "free_to_read": {
            "filter": {
              "term": {
                "is_oa": true
              }
            }
          },
          "free_to_read_pct": {
            "bucket_script": {
              "buckets_path": {
                "free_to_read": "free_to_read>_count",
                "total_count": "_count"
              },
              "script": "params.free_to_read / params.total_count"
            }
          },
          "in_repository": {
            "filter": {
              "term": {
                "has_repository_copy": true
              }
            }
          },
          "in_repository_pct": {
            "bucket_script": {
              "buckets_path": {
                "in_repository": "in_repository>_count",
                "total_count": "_count"
              },
              "script": "params.in_repository / params.total_count"
            }
          },
          "in_approved_repository": {
            "filter": {
              "term": {
                [`supplements.is_approved_repository__${suffix}`]: true
              }
            }
          },
          "in_approved_repository_pct": {
            "bucket_script": {
              "buckets_path": {
                "in_approved_repository": "in_approved_repository>_count",
                "total_count": "_count"
              },
              "script": "params.in_approved_repository / params.total_count"
            }
          },
          "with_preprint": {
            "filter": {
              "term": {
                "supplements.has_preprint_copy": true
              }
            }
          },
          "with_preprint_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_preprint": "with_preprint>_count",
                "total_count": "_count"
              },
              "script": "params.with_preprint / params.total_count"
            }
          },
          "with_peer_reviewed_version": {
            "filter": {
              "exists": {
                "field": `supplements.is_preprint_of`
              }
            }
          },
          "with_peer_reviewed_version_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_peer_reviewed_version": "with_peer_reviewed_version>_count",
                "total_count": "_count"
              },
              "script": "params.with_peer_reviewed_version / params.total_count"
            }
          },
          "with_grant_id": {
            "filter": {
              "exists": {
                "field": `supplements.grantid__${suffix}`
              }
            }
          },
          "with_grant_id_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_grant_id": "with_grant_id>_count",
                "total_count": "_count"
              },
              "script": "params.with_grant_id / params.total_count"
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
          "with_data_availability_statement_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_data_availability_statement": "with_data_availability_statement>_count",
                "total_count": "_count"
              },
              "script": "params.with_data_availability_statement / params.total_count"
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
          "without_data_availability_statement_pct": {
            "bucket_script": {
              "buckets_path": {
                "without_data_availability_statement": "without_data_availability_statement>_count",
                "total_count": "_count"
              },
              "script": "params.without_data_availability_statement / params.total_count"
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
          "with_apc_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_apc": "with_apc>_count",
                "total_count": "_count"
              },
              "script": "params.with_apc / params.total_count"
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
          "with_data_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_data": "with_data>_count",
                "total_count": "_count"
              },
              "script": "params.with_data / params.total_count"
            }
          },
          "without_data": {
            "filter": {
              "term": {
                "supplements.is_original_research": false
              }
            }
          },
          "without_data_pct": {
            "bucket_script": {
              "buckets_path": {
                "without_data": "without_data>_count",
                "total_count": "_count"
              },
              "script": "params.without_data / params.total_count"
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
          "unknown_data_status_pct": {
            "bucket_script": {
              "buckets_path": {
                "unknown_data_status": "unknown_data_status>_count",
                "total_count": "_count"
              },
              "script": "params.unknown_data_status / params.total_count"
            }
          },
          "with_shared_data": {
            "filter": {
              "bool": {
                "must": [{
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
          "with_shared_data_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_shared_data": "with_shared_data>_count",
                "total_count": "_count"
              },
              "script": "params.with_shared_data / params.total_count"
            }
          },
          "without_shared_data": {
            "filter": {
              "bool": {
                "should": [{
                    "term": {
                      "supplements.dev.data.with_shared_data": false
                    }
                  },
                  {
                    "bool": {
                      "must": [{
                        "term": {
                          "supplements.dev.data.evidence": "supplementary"
                        }
                      }],
                      "must_not": [{
                        "terms": {
                          "supplements.dev.data.evidence": [
                            "da",
                            "fulltext"
                          ]
                        }
                      }]
                    }
                  }
                ],
                "minimum_should_match": 1
              }
            }
          },
          "without_shared_data_pct": {
            "bucket_script": {
              "buckets_path": {
                "without_shared_data": "without_shared_data>_count",
                "total_count": "_count"
              },
              "script": "params.without_shared_data / params.total_count"
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
          "unknown_shared_data_status_pct": {
            "bucket_script": {
              "buckets_path": {
                "unknown_shared_data_status": "unknown_shared_data_status>_count",
                "total_count": "_count"
              },
              "script": "params.unknown_shared_data_status / params.total_count"
            }
          },
          "with_shared_data_in_repository": {
            "filter": {
              "bool": {
                "must": [{
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
                "should": [{
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
          "with_shared_data_in_repository_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_shared_data_in_repository": "with_shared_data_in_repository>_count",
                "total_count": "_count"
              },
              "script": "params.with_shared_data_in_repository / params.total_count"
            }
          },
          "with_open_data": {
            "filter": {
              "bool": {
                "must": [{
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
          "with_open_data_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_open_data": "with_open_data>_count",
                "total_count": "_count"
              },
              "script": "params.with_open_data / params.total_count"
            }
          },
          "with_open_data_in_repository": {
            "filter": {
              "bool": {
                "must": [{
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
                "should": [{
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
          "with_open_data_in_repository_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_open_data_in_repository": "with_open_data_in_repository>_count",
                "total_count": "_count"
              },
              "script": "params.with_open_data_in_repository / params.total_count"
            }
          },
          "with_data_dois": {
            "filter": {
              "bool": {
                "must": [{
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
          "with_data_dois_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_data_dois": "with_data_dois>_count",
                "total_count": "_count"
              },
              "script": "params.with_data_dois / params.total_count"
            }
          },
          "with_data_accession_number": {
            "filter": {
              "bool": {
                "must": [{
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
          "with_data_accession_number_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_data_accession_number": "with_data_accession_number>_count",
                "total_count": "_count"
              },
              "script": "params.with_data_accession_number / params.total_count"
            }
          },
          "with_dois": {
            "filter": {
              "exists": {
                "field": "DOI"
              }
            }
          },
          "with_dois_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_dois": "with_dois>_count",
                "total_count": "_count"
              },
              "script": "params.with_dois / params.total_count"
            }
          },
          "with_orcids": {
            "filter": {
              "exists": {
                "field": "authorships.author.orcid"
              }
            }
          },
          "with_orcids_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_orcids": "with_orcids>_count",
                "total_count": "_count"
              },
              "script": "params.with_orcids / params.total_count"
            }
          },
          "with_rors": {
            "filter": {
              "exists": {
                "field": "authorships.institutions.ror"
              }
            }
          },
          "with_rors_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_rors": "with_rors>_count",
                "total_count": "_count"
              },
              "script": "params.with_rors / params.total_count"
            }
          },
          "with_fundref_dois": {
            "filter": {
              "exists": {
                "field": "funder.DOI"
              }
            }
          },
          "with_fundref_dois_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_fundref_dois": "with_fundref_dois>_count",
                "total_count": "_count"
              },
              "script": "params.with_fundref_dois / params.total_count"
            }
          },
          "with_grant_dois": {
            "filter": {
              "prefix": {
                "funder.award": "10."
              }
            }
          },
          "with_grant_dois_pct": {
            "bucket_script": {
              "buckets_path": {
                "with_grant_dois": "with_grant_dois>_count",
                "total_count": "_count"
              },
              "script": "params.with_grant_dois / params.total_count"
            }
          }
        }
      }
    }
  };
};
