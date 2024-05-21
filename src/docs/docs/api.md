---
title: API
layout: layouts/docs.njk
---

Our API allows you to search, use, and download data about research works. It's a RESTful JSON API powered by Elasticsearch.

{% swagger method="get" path="" baseUrl="https://api.oa.works/report/works/{doi}" summary="Get a single work" expanded="true" %}
{% swagger-description %}
e.g 

[api.oa.works/report/works/10.1038/d41586-023-00175-1](https://api.oa.works/report/works/10.1038/d41586-023-00175-1)


{% endswagger-description %}

{% swagger-response status="200: OK" description="DOI: "10.1038/d41586-023-00175-1", subject: [ "Multidisciplinary" ], published_year: 2023, publisher: "Springer Science and Business Media LLC", published_date: "2023-01-20", title: "Confused by open-access policies? These tools can help", journal: "Nature", crossref_license_url_tdm: "https://www.springernature.com/gp/researchers/text-and-data-mining", crossref_license_url_vor: "https://www.springernature.com/gp/researchers/text-and-data-mining", crossref_is_oa: false, oa_status: "closed", has_repository_copy: false, has_oa_locations_embargoed: false, can_archive: true, version: "acceptedVersion", journal_oa_type: "transformative", oadoi_is_oa: false, is_oa: false," %}
{% code title="some keys omitted for brevity" %}
```json
{
  "DOI": "10.1038/d41586-023-00175-1",
  "subject": [
    "Multidisciplinary"
  ],
  "published_year": 2023,
  "publisher": "Springer Science and Business Media LLC",
  "published_date": "2023-01-20",
  "title": "Confused by open-access policies? These tools can help",
  "journal": "Nature",
  "crossref_license_url_tdm": "https://www.springernature.com/gp/researchers/text-and-data-mining",
  "crossref_license_url_vor": "https://www.springernature.com/gp/researchers/text-and-data-mining",
  "crossref_is_oa": false,
  "oa_status": "closed",
  "has_repository_copy": false,
  "has_oa_locations_embargoed": false,
  "can_archive": true,
  "version": "acceptedVersion",
  "journal_oa_type": "transformative",
  "oadoi_is_oa": false,
  "is_oa": false,
  "authorships": [
    {
      "author_position": "first",
      "author": {
        "id": "https://openalex.org/A4317550833",
        "display_name": "Dalmeet Singh Chawla",
        "orcid": null
      },
      "institutions": [],
      "raw_affiliation_string": ""
    }
  ],
  "concepts": [
    {
      "id": "https://openalex.org/C41008148",
      "display_name": "Computer science",
      "level": 0,
      "score": "0.42289513"
    },
    {
      "id": "https://openalex.org/C108827166",
      "display_name": "Internet privacy",
      "level": 1,
      "score": "0.3720916"
    },
    {
      "id": "https://openalex.org/C144133560",
      "display_name": "Business",
      "level": 0,
      "score": "0.36753693"
    },
    {
      "id": "https://openalex.org/C2522767166",
      "display_name": "Data science",
      "level": 1,
      "score": "0.36399657"
    },
    {
      "id": "https://openalex.org/C136764020",
      "display_name": "World Wide Web",
      "level": 1,
      "score": "0.3449542"
    }
  ],
  "cited_by_count": 0,
  "type": "journal-article",
  "issn": [
    "1476-4687",
    "0028-0836"
  ],
  "updated": 1677419432426,
  "_id": "10.1038_d41586-023-00175-1"
}
```
{% endcode %}
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="" baseUrl="https://api.oa.works/report/works/" summary="Get a list of works" expanded="true" %}
{% swagger-description %}
e.g 

[https://api.oa.works/report/works?q=title:%22Confused%20by%20open%20access%20policies%20These%20tools%20can%20help%22](https://api.oa.works/report/works?q=title:%22Confused%20by%20open%20access%20policies%20These%20tools%20can%20help%22)


{% endswagger-description %}

{% swagger-parameter in="query" name="q" type="String" %}
Allows you to filter results as desired. Your query (q) supports all elastic search terms such as AND, OR, NOT, brackets and wildcards (*).
{% endswagger-parameter %}

{% swagger-parameter in="query" name="sort" type="String" %}
Comma-separated list of keys you want your list sorted by. The list is sorted by the order the keys are provided. Prepending 

`:desc`

 to the key to reverse the sort order for that key (

`:asc`

 is the default).
{% endswagger-parameter %}

{% swagger-parameter in="path" name="count" type="String" %}
shortcut to provide only the count of a queries response
{% endswagger-parameter %}

{% swagger-parameter in="path" name="terms/{key}" type="String" %}
lists number of occurances of each string in the provided key
{% endswagger-parameter %}

{% swagger-parameter in="query" name="size" type="String" %}
The number of items to return



_Default_: 10

_Limit_: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="query" name="from" type="Number" %}
Where to start returning results from.



_Default_: 0

_Limit_: 10,000
{% endswagger-parameter %}

{% swagger-parameter in="query" name="includes" type="String" %}
Comma-separated list of keys you want in your response.



_Default_: all
{% endswagger-parameter %}

{% swagger-parameter in="path" name="sum/{key}" type="String" %}
adds all the values in the provided key
{% endswagger-parameter %}

{% swagger-parameter in="query" name="exclude" %}
Comma-separated list of keys you don't want in your response.



_Default_: none
{% endswagger-parameter %}

{% swagger-parameter in="path" name="/keys" type="String" %}
lists all available keys
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
{% code title="Some keys omitted for brevity" %}
```json
{
  "took": 3,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 1238652,
    "max_score": 1,
    "hits": [
      {
        "_index": "paradigm_report_works",
        "_type": "_doc",
        "_id": "10.1016_j.biocon.2016.06.013",
        "_score": 1,
        "_source": {
          "supplements": [
            {
              "orgs": [
                "Robert Wood Johnson Foundation"
              ],
              "sheets": [
                "custom_keys__rwjf"
              ],
              "ror": "02ymmdj85",
              "paid": true,
              "publisher_license_crossref": "cc-by-nc-nd",
              "is_preprint": false,
              "publisher_simple": "elsevier",
              "publisher_license_best": "cc-by-nc-nd",
              "repository_license_best": "cc-by-nc-nd"
            }
          ],
          "doi": "10.1016/j.biocon.2016.06.013",
          "subject": [
            "Nature and Landscape Conservation",
            "Ecology, Evolution, Behavior and Systematics"
          ],
          "volume": "213",
          "published_year": 2017,
          "publisher": "Elsevier BV",
          "published_date": "2017-09-01",
          "title": "A vision for global monitoring of biological invasions",
          "journal": "Biological Conservation",
          "crossref_license_url_tdm": "https://www.elsevier.com/tdm/userlicense/1.0/",
          "crossref_license_url_vor": "http://creativecommons.org/licenses/by-nc-nd/4.0/",
          "crossref_is_oa": true,
          "publisher_license": "cc-by-nc-nd",
          "publisher_url_for_pdf": null,
          "publisher_version": "publishedVersion",
          "repository_license": "cc-by-nc-nd",
          "best_oa_location_url": "https://doi.org/10.1016/j.biocon.2016.06.013",
          "best_oa_location_url_for_pdf": null,
          "oa_status": "hybrid",
          "has_repository_copy": true,
          "has_oa_locations_embargoed": false,
          "can_archive": true,
          "version": "acceptedVersion",
          "journal_oa_type": "hybrid",
          "oadoi_is_oa": true,
          "is_oa": true
}
```
{% endcode %}
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="" baseUrl="https://api.oa.works/report/works.csv" summary="Get a CSV of works" expanded="true" %}
{% swagger-description %}
Supports all the parameters provided in 

[#get-list-of-works](api.md#get-list-of-works "mention")


{% endswagger-description %}

{% swagger-parameter in="query" name="email" required="true" type="String" %}
Comma-separated list of emails you want to send a download link to your CSV
{% endswagger-parameter %}

{% swagger-parameter in="query" name="size" type="String" %}
_Default_: 10

_Format_: number, or  `all` to provide all results (up to a max of 30,000)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="https://static.oa.works/export/report_wroks_e6pdyvsqsseyo38jersne.csv" %}
```
https://static.oa.works/export/report_works_8wl6t8lkjkmji2dltjuvf.csv
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="" baseUrl="https://api.oa.works/report/orgs" summary="Get a list of organizations" expanded="true" %}
{% swagger-description %}
Supports all the parameters provided in 

[#get-list-of-works](api.md#get-list-of-works "mention")


{% endswagger-description %}

{% swagger-response status="200: OK" description="" %}
{% code title="Some keys omitted for brevity" %}
```json
{
  "took": 2,
  "hits": {
    "total": 1,
    "max_score": 0,
    "hits": [
      {
        "_index": "paradigm_report_orgs",
        "_type": "_doc",
        "_id": "gxfln9cdkrs90m3xogp8m",
        "_score": 0,
        "_source": {
          "objectID": "test",
          "name": "test",
          "ror": "",
          "aliases": "",
          "acronyms": "",
          "fundref": "",
          "paid": "",
          "analysis": {
            "is_paper": "(supplements.orgs:%22test%22 OR authorships.institutions.display_name%3A%2522test%2522%20OR%20funder.name%3A%2522test%2522)",
            "is_oa": "(supplements.orgs:%22test%22 OR authorships.institutions.display_name%3A%2522test%2522%20OR%20funder.name%3A%2522test%2522) AND (publisher_license.keyword:(%22cc-by%22 OR %22pd%22 OR %22cc-0%22) OR supplements.publisher_license_crossref.keyword:(%22cc-by%22 OR %22cc0%22) OR epmc_licence.keyword:(%22cc-by%22 OR %22pd%22 OR %22cc-zero%22 OR %22cc0%22) OR repository_license.keyword:(%22cc-by%22 OR %22pd%22 OR %22cc-0%22) OR supplements.publisher_license_ic.keyword:(%22cc-by%22 OR %22pd%22 OR %22cc0%22))",
            "is_free_to_read": "(supplements.orgs:%22test%22 OR authorships.institutions.display_name%3A%2522test%2522%20OR%20funder.name%3A%2522test%2522) AND (is_oa:true OR crossref_is_oa:true)",
          },
          "strategy": {
            "email_author_aam": {
              "query": "(supplements.orgs:%22test%22 OR authorships.institutions.display_name%3A%2522test%2522%20OR%20funder.name%3A%2522test%2522) AND (oa_status:%22closed%22 AND crossref_is_oa:%22false%22 AND version:acceptedVersion AND NOT supplements.sheets:%22oasupport_v2__bmgf%22 AND NOT supplements.is_free_ic:%22true%22 AND NOT supplements.apc_cost:* AND NOT journal_oa_type:%22diamond%22 AND NOT journal_oa_type:%22gold%22 AND NOT has_oa_locations_embargoed:true AND NOT type:book-chapter AND NOT supplements.is_preprint:true)&sort=author_email_name.keyword:desc,email.keyword:desc,published_date:desc",
              "mailto": "{email}?subject=Article%20Request%20ref%3A{doi}&body=Dear%20{author_email_name}%2C%0D%0A%0D%0APlease%20take%20a%20minute%20to%20make%20your%20recently%20published%20article%2C%20{title}'%20open%20access%20using%20the%20instructions%20at%3A%20https%3A%2F%2FShareYourPaper.org%2F{doi}%3Femail%3D{email}.%C2%A0The%20process%20is%20easy%20and%20completely%20free%20to%20you.%0D%0A%0D%0ABy%20depositing%20your%20accepted%20manuscript%20in%20an%20open%20repository%2C%20you%20will%20enable%20equitable%20access%20and%20ensure%20your%20paper%20has%20its%20fullest%20impact.%0D%0A%0D%0AIf%20you%20have%20any%20questions%2C%20let%20us%20know.",
              "export_includes": "DOI,title,publisher,journal,published_date,author_email_name,email,can_archive,version"
            },
            "email_author_vor": {
              "query": "(supplements.orgs:%22test%22 OR authorships.institutions.display_name%3A%2522test%2522%20OR%20funder.name%3A%2522test%2522) AND (oa_status:%22closed%22 AND crossref_is_oa:%22false%22 AND version:publishedVersion AND NOT supplements.sheets:%22oasupport_v2__bmgf%22 AND NOT supplements.is_free_ic:%22true%22 AND NOT supplements.apc_cost:* AND NOT journal_oa_type:%22diamond%22 AND NOT journal_oa_type:%22gold%22 AND NOT has_oa_locations_embargoed:true AND NOT type:book-chapter AND NOT supplements.is_preprint:true)&sort=author_email_name.keyword:desc,email.keyword:desc,published_date:desc",
              "mailto": "{email}?subject=Article%20Request%20ref%3A{doi}&body=Dear%20{author_email_name}%2C%0D%0A%0D%0APlease%20take%20a%20minute%20to%20make%20your%20recently%20published%20article%2C%20{title}'%20open%20access%20using%20the%20instructions%20at%3A%20https%3A%2F%2FShareYourPaper.org%2F{doi}%3Femail%3D{email}.%C2%A0The%20process%20is%20easy%20and%20completely%20free%20to%20you.%0D%0A%0D%0ABy%20depositing%20your%20publisher%20PDF%20in%20an%20open%20repository%2C%20you%20will%20enable%20equitable%20access%20and%20ensure%20your%20paper%20has%20its%20fullest%20impact.%0D%0A%0D%0AIf%20you%20have%20any%20questions%2C%20let%20us%20know.",
              "export_includes": "DOI,title,publisher,journal,published_date,author_email_name,email,can_archive,version"
            }
          },
          "policy": {
            "has_policy": "",
            "supported_policy": false
          }
        }
      }
    ]
  }
}
```
{% endcode %}
{% endswagger-response %}
{% endswagger %}
