/** Data explorer — display data from api-requests.js **/

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

// Map 'group by' headers to human-readable names and to get
const groupByHeaderNames = {
  "articles_published": { pretty: "Articles published", key: "doc_count" },
  "is_compliant_articles": { pretty: "Compliant articles", key: "doc_count" },
  "is_free_to_read": { pretty: "Free-to-read articles", key: "doc_count" },
  "is_oa": { pretty: "Open Access articles", key: "doc_count" },
  "has_repository_version": { pretty: "Repository version", key: "doc_count" },
  "has_approved_repository_version": { pretty: "Approved repository version", key: "doc_count" },
  "has_preprint_version": { pretty: "Preprint version", key: "doc_count" },
  "has_data_availability_statement": { pretty: "Data availability statement", key: "doc_count" },
  "has_no_data_availability_statement": { pretty: "No data availability statement", key: "doc_count" },
  "has_apc": { pretty: "With APCs", key: "doc_count" },
  "total_apcs_paid": { pretty: "Total APCs paid", key: "value" },
  "average_apcs_paid_raw": { pretty: "Average APCs paid", key: "value" },
  "median_apcs_paid_raw": { pretty: "Median APCs paid", key: "values['50.0']" },
  "has_grantid": { pretty: "With grant ID", key: "doc_count" },
  "total_citations": { pretty: "Total citations", key: "value" }
}

// Example usage:
// console.log(groupByHeaderNames["is_oa"]);  // Outputs: "Open Access articles"

// Get references to table elements
const exportTable = document.getElementById('export_table');

// Fetch data function using Axios
async function fetchData(postData) {
  try {
    const response = await axios.post('https://bg.api.oa.works/report/works', postData);
    return response.data;  // Return the data here
  } catch (error) {
    console.error('There was a problem with the request: ', error.message);
    return null;  // Return null in case of an error
  }
}

// Display headers in the table’s <thead>
async function displayTableHead(groupByKeyName) {
  const exportTableHead = document.getElementById('export_table_head');
  let tableHeadersHTML = '';
  
  // Extract the first column based on the provided groupByKeyName and display in a specific style
  if (groupByKeyNames[groupByKeyName]) {
    tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">${groupByKeyNames[groupByKeyName].plural}</th>`;
  }

  const headersArray = Object.values(groupByHeaderNames);

  for (let i = 0; i < headersArray.length; i++) {
    const headerName = headersArray[i];
    if (i === 0) { // Styling the second sticky header
      tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom break-words">${headerName.pretty}</th>`;
    } else {
      tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">${headerName.pretty}</th>`;
    }
  }

  exportTableHead.innerHTML = tableHeadersHTML;
}

// Display body of data table for any given group-by 
async function displayTableBody(groupByKeyName) {
  const exportTableBody = document.getElementById('export_table_body');

  function displayData(data) {
    let fragment = document.createDocumentFragment();

    if (data.aggregations && data.aggregations.key && data.aggregations.key.buckets) {
      data.aggregations.key.buckets.forEach(bucket => {
        let row = document.createElement('tr');
        
        // Add the first column based on the provided groupByKeyName & style it
        if (groupByKeyNames[groupByKeyName]) {
          let cell = document.createElement('th');
          cell.className = "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate";
          cell.textContent = bucket.key || '';
          row.appendChild(cell);
        }
    
        // Counter to keep track of the current column
        let columnCounter = 1;
    
        // Add other columns based on groupByHeaderNames
        Object.keys(groupByHeaderNames).forEach(headerKey => {
          let valueKey = groupByHeaderNames[headerKey].key;
          let bucketValue;
    
          if (headerKey === "median_apcs_paid_raw") {
            bucketValue = bucket[headerKey].values["50.0"]; // Exception for median due to special formatting
          } else if (valueKey.includes(".")) {
              let keys = valueKey.split(".");
              bucketValue = bucket[headerKey];
              for (let key of keys) {
                  if (bucketValue) {
                      bucketValue = bucketValue[key];
                  } else {
                      break;
                  }
              }
          } else {
              bucketValue = bucket[headerKey] ? bucket[headerKey][valueKey] : '0';
          }
    
          let cell = (columnCounter === 1) ? document.createElement('th') : document.createElement('td');
          
          if (columnCounter === 1) {
            cell.className = "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate";
          } else {
            cell.className = "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600";
          }
          cell.textContent = bucketValue || '0';
          row.appendChild(cell);
          columnCounter++; // Increment the counter
        });
        
        fragment.appendChild(row);
      });
    }

    exportTableBody.appendChild(fragment);
  }

  const postData = createPostData(orgName, groupByKeyName, startYear, endYear);
  console.log(orgName);
  const responseData = await fetchData(postData);  // Capture the response data
  
  if (responseData) {  // Ensure that data exists before passing it to displayData
    displayData(responseData);
  }
}


document.addEventListener("DOMContentLoaded", function() {
  displayTableHead("publisher");
  displayTableBody("publisher");
});

