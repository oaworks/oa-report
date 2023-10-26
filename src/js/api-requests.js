// Dynamically configure POST data 
function createPostData(orgName, key, startYear, endYear) {
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
      "all": {
        "filter": {
          "match_all": {}
        },
        "aggs": {
          "articles_published": {
            "filter": {
              "exists": {
                "field": `${key}.keyword`
              }
            }
          }
        }
      },
      "none": {
        "filter": {
          "bool": {
            "must_not": {
              "exists": {
                "field": `${key}.keyword`
              }
            }
          }
        },
        "aggs": {
          "articles_published": {
            "filter": {
              "exists": {
                "field": "published_year.keyword"
              }
            }
          }
        }
      },
      "key": {
        "terms": {
          "field": `${key}.keyword`,
          "size": 20,
          "order": {
            "_count": "desc"
          }
        },
        "aggs": {
          "articles_published": {
            "filter": {
              "exists": {
                "field": `${key}.keyword`
              }
            }
          },
          "is_oa": {
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
          "is_oa_percentage": {
            "bucket_script": {
              "buckets_path": {
                "is_oa": "is_oa>_count",
                "total_count": "_count"
              },
              "script": "Math.round((params.is_oa / params.total_count) * 1000) / 10.0"
            }
          },
          "is_compliant_articles": {
            "filter": {
              "term": {
                "supplements.is_compliant__bmgf": true
              }
            }
          },
          "is_compliant_articles_percentage": {
            "bucket_script": {
              "buckets_path": {
                "is_compliant_articles": "is_compliant_articles>_count",
                "total_count": "_count"
              },
              "script": "Math.round((params.is_compliant_articles / params.total_count) * 1000) / 10.0"
            }
          },
          "is_free_to_read": {
            "filter": {
              "term": {
                "is_oa": true
              }
            }
          },
          "is_free_to_read_percentage": {
            "bucket_script": {
              "buckets_path": {
                "is_free_to_read": "is_free_to_read>_count",
                "total_count": "_count"
              },
              "script": "Math.round((params.is_free_to_read / params.total_count) * 1000) / 10.0"
            }
          },
          "has_repository_version": {
            "filter": {
              "term": {
                "has_repository_copy": true
              }
            }
          },
          "has_repository_version_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_repository_version": "has_repository_version>_count",
                "total_count": "_count"
              },
              "script": "Math.round((params.has_repository_version / params.total_count) * 1000) / 10.0"
            }
          },
          "has_approved_repository_version": {
            "filter": {
              "term": {
                "supplements.is_approved_repository__bmgf": true
              }
            }
          },
          "has_approved_repository_version_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_repository_version": "has_approved_repository_version>_count",
                "total_count": "_count"
              },
              "script": "Math.round((params.has_repository_version / params.total_count) * 1000) / 10.0"
            }
          },
          "has_preprint_version": {
            "filter": {
              "term": {
                "supplements.has_preprint_copy": true
              }
            }
          },
          "has_preprint_version_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_preprint_version": "has_preprint_version>_count",
                "total_count": "_count"
              },
              "script": "Math.round((params.has_preprint_version / params.total_count) * 1000) / 10.0"
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
              "script": "Math.round((params.has_grantid / params.total_count) * 1000) / 10.0"
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
                "has_data_availability_statement": 
                "has_data_availability_statement>_count",
                "total_count": "_count"
              },
              "script": "Math.round((params.has_data_availability_statement / params.total_count) * 1000) / 10.0"
            }
          },
          "has_no_data_availability_statement": {
            "filter": {
              "term": {
                "supplements.has_data_availability_statement": false
              }
            }
          },
          "has_no_data_availability_statement_percentage": {
            "bucket_script": {
              "buckets_path": {
                "has_no_data_availability_statement": "has_no_data_availability_statement>_count",
                "total_count": "_count"
              },
              "script": "Math.round((params.has_no_data_availability_statement / params.total_count) * 1000) / 10.0"
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
              "script": "Math.round((params.has_apc / params.total_count) * 1000) / 10.0"
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
          "average_apcs_paid_rounded": {
            "bucket_script": {
              "buckets_path": {
                "averageValue": "average_apcs_paid_raw"
              },
              "script": "Math.round(params.averageValue * 100) / 100.0"
            }
          },
          "median_apcs_paid_raw": {
            "percentiles": {
              "field": "supplements.apc_cost",
              "percents": [
                50
              ]
            }
          }
        }
      }
    }
  };
;
};