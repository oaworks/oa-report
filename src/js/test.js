/* Display publisher list from api-requests.js  */
// Map 'group by' keys to human-readable names
const groupByKeyNames = {
  "supplements.grantid__bmgf": { singular: "Grant", plural: "Grants" },
  "authorships.author.orcid": { singular: "Author", plural: "Authors" },
  "publisher": { singular: "Publisher", plural: "Publishers" },
  "concepts.display_name": { singular: "Concept", plural: "Concepts" },
  "oa_status": { singular: "Open Access status", plural: "Open Access statuses" },
  "supplements.program__bmgf": { singular: "Program", plural: "Programs" },
  "authorships.institutions.display_name": { singular: "Institution", plural: "Institutions" },
  "authorships.institutions.country_code": { singular: "Country", plural: "Countries" },
  "journal": { singular: "Journal", plural: "Journals" },
  "funder.name": { singular: "Co-funder", plural: "Co-funders" },
  "publisher_license": { singular: "Publisher license", plural: "Publisher licenses" }
};

// Example usage:
// console.log(groupByKeyNames["supplements.grantid__bmgf"].singular);  // Outputs: "Grant"
// console.log(groupByKeyNames["supplements.grantid__bmgf"].plural);    // Outputs: "Grants"

// Map 'group by' headers to human-readable names
const groupByHeaderNames = {
  "articles_published": "Articles published",
  "is_compliant_articles": "Compliant articles",
  "is_free_to_read": "Free-to-read articles",
  "is_oa": "Open Access articles",
  "has_repository_version": "Repository version",
  "has_approved_repository_version": "Approved repository version",
  "has_preprint_version": "Preprint version",
  "has_data_availability_statement": "Data availability statement",
  "has_no_data_availability_statement": "No data availability statement",
  "has_apc": "With APCs",
  "total_apcs_paid ": "Total APCs paid",
  "average_apcs_paid_raw": "Average APCs paid",
  "median_apcs_paid_raw ": "Median APCs paid",
  "has_grantid": "With grant ID",
  "total_citations": "Total citations"
}

// Example usage:
// console.log(groupByHeaderNames["is_oa"]);  // Outputs: "Open Access articles"

// Fetch data function using Axios
async function fetchData(postData, listId) {
  try {
    const response = await axios.post('https://bg.api.oa.works/report/works', postData);
    displayData(response.data, listId);
    console.log(response.data.aggregations);
  } catch (error) {
    console.error('There was a problem with the request: ', error.message);
  }
}

// Display data in a list
function displayData(data, listId) {
  const ol = document.getElementById(listId);

  if (data.aggregations && data.aggregations.key && data.aggregations.key.buckets) {
    data.aggregations.key.buckets.forEach(bucket => {
      const li = document.createElement('li');
      li.textContent = `${bucket.key}, ${bucket.articles_published.doc_count} articles`;
      ol.appendChild(li);
    });
  }
}

// Allow any input from user for testing: 
function fetchDataForForm(formId, orgSelectId, groupbySelectId, startYearInputId, endYearInputId, codeId, listId) {
  const form = document.getElementById(formId);
  const orgSelect = document.getElementById(orgSelectId);
  const groupbySelect = document.getElementById(groupbySelectId);
  const startYearInput = document.getElementById(startYearInputId);
  const endYearInput = document.getElementById(endYearInputId);
  const codeElement = document.getElementById(codeId);

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear the list
    document.getElementById(listId).innerHTML = '';

    const org = orgSelect.value;
    const groupByValue = groupbySelect.value;
    const startYearValue = startYearInput.value || 1960;
    const endYearValue = endYearInput.value || 2023;

    const postData = createPostData(org, groupByValue, startYearValue, endYearValue);
    fetchData(postData, listId);

    // Update <code> snippet 
    let currentContent = codeElement.textContent;
    const replacements = {
        "org": org,
        "groupByValue": groupByValue,
        "startYearValue": startYearValue,
        "endYearValue": endYearValue
    };
    for (let word in replacements) {
        let regex = new RegExp(word, "g");
        currentContent = currentContent.replace(regex, replacements[word]);
    }
    codeElement.textContent = currentContent;
  });
}

// Setup event listeners for both forms
fetchDataForForm('custom-api-form-1', 'org-select-1', 'groupby-select-1', 'start-year-input-1', 'end-year-input-1', 'code-1', 'any-list-1');
fetchDataForForm('custom-api-form-2', 'org-select-2', 'groupby-select-2', 'start-year-input-2', 'end-year-input-2', 'code-2', 'any-list-2');