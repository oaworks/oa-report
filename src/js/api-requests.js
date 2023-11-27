// Dynamically configure POST data 
function createPostData(orgName, term, startYear, endYear, size = 20, sort = "_count") {
  return {
    "query": {
      "bool": {
        "must": [
          {
            "term": {
              "orgs.keyword": orgName
            }
          },
          {
            "bool": {
              "should": [
                {
                  "terms": {
                    "type.keyword": [
                      "journal-article",
                      "posted-content",
                      "article"
                    ]
                  }
                },
                {
                  "bool": {
                    "must_not": {
                      "exists": {
                        "field": "type"
                      }
                    }
                  }
                }
              ]
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
        ],
        "must_not": {
          "term": {
            "supplements.is_preprint": true
          }
        }
      }
    },
    "size": 0,
    "aggs": {
      "key": {
        "terms": {
          "field": `${term}.keyword`,
          "size": size,
          "order": {
            [`${sort}`]: "desc"
          }
        },
        "aggs": {
          "articles_published": {
            "filter": {
              "exists": {
                "field": `${term}.keyword`
              }
            }
          },
          "are_open_access": {
            "filter": {
              "bool": {
                "should": [
                  {
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
          "are_open_access_percentage": {
            "bucket_script": {
              "buckets_path": {
                "are_open_access": "are_open_access>_count",
                "total_count": "_count"
              },
              "script": "params.are_open_access / params.total_count"
            }
          },
          "are_compliant": {
            "filter": {
              "term": {
                "supplements.is_compliant__bmgf": true
              }
            }
          },
          "are_compliant_percentage": {
            "bucket_script": {
              "buckets_path": {
                "are_compliant": "are_compliant>_count",
                "total_count": "_count"
              },
              "script": "params.are_compliant / params.total_count"
            }
          },
          "are_covered_by_policy": {
            "filter": {
              "term": {
                "supplements.is_covered_by_policy__bmgf": true
              }
            }
          },
          "are_covered_by_policy_percentage": {
            "bucket_script": {
              "buckets_path": {
                "are_covered_by_policy": "are_covered_by_policy>_count",
                "total_count": "_count"
              },
              "script": "params.are_covered_by_policy / params.total_count"
            }
          },
          "are_free_to_read": {
            "filter": {
              "term": {
                "is_oa": true
              }
            }
          },
          "are_free_to_read_percentage": {
            "bucket_script": {
              "buckets_path": {
                "are_free_to_read": "are_free_to_read>_count",
                "total_count": "_count"
              },
              "script": "params.are_free_to_read / params.total_count"
            }
          },
          "in_repository": {
            "filter": {
              "term": {
                "has_repository_copy": true
              }
            }
          },
          "in_repository_percentage": {
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
                "supplements.is_approved_repository__bmgf": true
              }
            }
          },
          "in_approved_repository_percentage": {
            "bucket_script": {
              "buckets_path": {
                "in_approved_repository": "in_approved_repository>_count",
                "total_count": "_count"
              },
              "script": "params.in_approved_repository / params.total_count"
            }
          },
          "has_preprint": {
            "filter": {
              "term": {
                "supplements.has_preprint_copy": true
              }
            }
          },
          "has_preprint_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_preprint": "has_preprint>_count",
                "total_count": "_count"
              },
              "script": "params.has_preprint / params.total_count"
            }
          },
          "has_grantid": {
            "filter": {
              "exists": {
                "field": "supplements.grantid__bmgf"
              }
            }
          },
          "has_grantid_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_grantid": "has_grantid>_count",
                "total_count": "_count"
              },
              "script": "params.has_grantid / params.total_count"
            }
          },
          "has_data_availability_statement": {
            "filter": {
              "term": {
                "supplements.has_data_availability_statement": true
              }
            }
          },
          "has_data_availability_statement_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_data_availability_statement": "has_data_availability_statement>_count",
                "total_count": "_count"
              },
              "script": "params.has_data_availability_statement / params.total_count"
            }
          },
          "no_data_availability_statement": {
            "filter": {
              "term": {
                "supplements.has_data_availability_statement": false
              }
            }
          },
          "no_data_availability_statement_percentage": {
            "bucket_script": {
              "buckets_path": {
                "no_data_availability_statement": "no_data_availability_statement>_count",
                "total_count": "_count"
              },
              "script": "params.no_data_availability_statement / params.total_count"
            }
          },
          "total_citations": {
            "sum": {
              "field": "cited_by_count"
            }
          },
          "has_apc": {
            "filter": {
              "range": {
                "supplements.apc_cost": {
                  "gt": 0
                }
              }
            }
          },
          "has_apc_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_apc": "has_apc>_count",
                "total_count": "_count"
              },
              "script": "params.has_apc / params.total_count"
            }
          },
          "total_apcs_paid": {
            "sum": {
              "field": "supplements.apc_cost"
            }
          },
          "average_apcs_paid_raw": {
            "avg": {
              "field": "supplements.apc_cost"
            }
          },
          "median_apcs_paid_raw": {
            "percentiles": {
              "field": "supplements.apc_cost",
              "percents": [
                50
              ]
            }
          },
          "has_data": {
            "filter": {
              "term": {
                "supplements.is_original_research": true
              }
            }
          },
          "has_data_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_data": "has_data>_count",
                "total_count": "_count"
              },
              "script": "params.has_data / params.total_count"
            }
          },
          "no_data": {
            "filter": {
              "term": {
                "supplements.is_original_research": false
              }
            }
          },
          "no_data_percentage": {
            "bucket_script": {
              "buckets_path": {
                "no_data": "no_data>_count",
                "total_count": "_count"
              },
              "script": "params.no_data / params.total_count"
            }
          },
          "ukn__data": {
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
          "ukn__data_percentage": {
            "bucket_script": {
              "buckets_path": {
                "ukn__data": "ukn__data>_count",
                "total_count": "_count"
              },
              "script": "params.ukn__data / params.total_count"
            }
          },
          "has_shared_data": {
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
          "has_shared_data_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_shared_data": "has_shared_data>_count",
                "total_count": "_count"
              },
              "script": "params.has_shared_data / params.total_count"
            }
          },
          "no_shared_data": {
            "filter": {
              "bool": {
                "should": [
                  {
                    "term": {
                      "supplements.dev.data.has_shared_data": false
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
          "no_shared_data_percentage": {
            "bucket_script": {
              "buckets_path": {
                "no_shared_data": "no_shared_data>_count",
                "total_count": "_count"
              },
              "script": "params.no_shared_data / params.total_count"
            }
          },
          "ukn_shared_data": {
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
          "ukn_shared_data_percentage": {
            "bucket_script": {
              "buckets_path": {
                "ukn_shared_data": "ukn_shared_data>_count",
                "total_count": "_count"
              },
              "script": "params.ukn_shared_data / params.total_count"
            }
          },
          "has_shared_data_in_repo": {
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
          "has_shared_data_in_repo_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_shared_data_in_repo": "has_shared_data_in_repo>_count",
                "total_count": "_count"
              },
              "script": "params.has_shared_data_in_repo / params.total_count"
            }
          },
          "has_open_data": {
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
          "has_open_data_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_open_data": "has_open_data>_count",
                "total_count": "_count"
              },
              "script": "params.has_open_data / params.total_count"
            }
          },
          "has_open_data_in_repo": {
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
          "has_open_data_in_repo_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_open_data_in_repo": "has_open_data_in_repo>_count",
                "total_count": "_count"
              },
              "script": "params.has_open_data_in_repo / params.total_count"
            }
          },
          "has_data_doi": {
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
          "has_data_doi_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_data_doi": "has_data_doi>_count",
                "total_count": "_count"
              },
              "script": "params.has_data_doi / params.total_count"
            }
          },
          "has_data_accession_number": {
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
          "has_data_accession_number_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_data_accession_number": "has_data_accession_number>_count",
                "total_count": "_count"
              },
              "script": "params.has_data_accession_number / params.total_count"
            }
          }
        }
      }
    }
  };
};