/* Display publisher list from api-requests.js  */

// Fetch data function using Axios
async function fetchPostData(postData, listId) {
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
function fetchPostDataForForm(formId, orgSelectId, groupbySelectId, startYearInputId, endYearInputId, codeId, listId) {
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
    fetchPostData(postData, listId);

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
fetchPostDataForForm('custom-api-form-1', 'org-select-1', 'groupby-select-1', 'start-year-input-1', 'end-year-input-1', 'code-1', 'any-list-1');
fetchPostDataForForm('custom-api-form-2', 'org-select-2', 'groupby-select-2', 'start-year-input-2', 'end-year-input-2', 'code-2', 'any-list-2');