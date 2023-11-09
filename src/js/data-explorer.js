/** Data explorer — display data from api-requests.js **/

// Map "group by" keys to human-readable names
const groupByKeyNames = {
  "supplements.grantid__bmgf": { 
    id: "grant",
    singular: "Grant", 
    plural: "Grants" 
  },
  "publisher": { 
    id: "publisher",
    singular: "Publisher", 
    plural: "Publishers" 
  },
  "concepts.display_name": { 
    id: "concept",
    singular: "Concept", 
    plural: "Concepts" 
  },
  "oa_status": { 
    id: "oa_status",
    singular: "Open Access status", 
    plural: "Open Access statuses" 
  },
  "supplements.program__bmgf": { 
    id: "program",
    singular: "Program", 
    plural: "Programs" 
  },
  "authorships.institutions.display_name": { 
    id: "institution",
    singular: "Institution", 
    plural: "Institutions" 
  },
  "authorships.institutions.country_code": { 
    id: "country",
    singular: "Country", 
    plural: "Countries" 
  },
  "journal": { 
    id: "journal",
    singular: "Journal", 
    plural: "Journals" 
  },
  "funder.name": { 
    id: "funder",
    singular: "Co-funder", 
    plural: "Co-funders" 
  },
  "publisher_license": { 
    id: "publisher_license",
    singular: "Publisher license", 
    plural: "Publisher licenses" 
  },
  "authorships.author.orcid": { 
    id: "author",
    singular: "Author", 
    plural: "Authors" 
  }
};

// Example usage:
// console.log(groupByKeyNames["supplements.grantid__bmgf"].id);  // Outputs: "grant"
// console.log(groupByKeyNames["supplements.grantid__bmgf"].singular);  // Outputs: "Grant"
// console.log(groupByKeyNames["supplements.grantid__bmgf"].plural);    // Outputs: "Grants"

// Map "group by" headers to human-readable names and to get
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
  "has_grantid": { pretty: "With grant ID", key: "doc_count" }
}
// Example usage:
// console.log(groupByHeaderNames["is_oa"]);  // Outputs: "Open Access articles"
// console.log(groupByHeaderNames["is_oa"].pretty);  // Outputs: "Open Access articles"
// console.log(groupByHeaderNames["is_oa"].key);  // Outputs: "doc_count"

// Get corresponding key from button id
function getKeyFromButtonId(buttonId, groupByKeyNames) {
  const buttonIdPrefix = buttonId.replace("_button", "");
  for (const key in groupByKeyNames) {
    if (groupByKeyNames[key].id === buttonIdPrefix) {
      return key;
    }
  }
  return null;
}

// Create a button for each "group by" type
function createGroupByBtn(key, groupByKeyNames) {
  const button = document.createElement("button");
  button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";
  button.id = groupByKeyNames[key].id + "_button";
  
  const groupbyBtn = document.createElement("span");
  groupbyBtn.textContent = groupByKeyNames[key].plural;
  button.appendChild(groupbyBtn);

  // TODO: Get total numbers here 
  // const nbRecords = document.createElement("span");
  // nbRecords.className = "bg-neutral-800 text-white ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block";
  // nbRecords.textContent = "999";
  // button.appendChild(nbRecords);

  return button;
}

// Set a button as active and deactivate other buttons
function toggleActiveButton(activeButton, container) {
  // Loop through all buttons and remove the active class
  container.querySelectorAll("button").forEach(button => {
    button.classList.remove("bg-carnation-500");
  });

  // Set the clicked button as active
  activeButton.classList.add("bg-carnation-500");
}

// Append "group by" buttons to a container
function appendButtonsToContainer(container, groupByKeyNames) {
  for (const key in groupByKeyNames) {
    const button = createGroupByBtn(key, groupByKeyNames);
    container.appendChild(button);
  }
}

// Fetch data function using Axios
async function fetchData(postData) {
  try {
    const response = await axios.post("https://bg.api.oa.works/report/works", postData);
    return response.data; 
  } catch (error) {
    console.error("There was a problem with the request: ", error.message);
    return null; 
  }
}

// Display headers in the table’s <thead>
async function displayTableHead(groupByKeyName, displayMode = "pretty") {
  const exportTableHead = document.getElementById("export_table_head");
  let tableHeadersHTML = "";
  
  // Extract the first column based on the provided groupByKeyName and style the first sticky header
  if (groupByKeyNames[groupByKeyName]) {
    tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">${groupByKeyNames[groupByKeyName].plural}</th>`;
  }
  
  const headersArray = Object.keys(groupByHeaderNames);

  for (let i = 0; i < headersArray.length; i++) {
    const headerValue = headersArray[i];
    const displayHeader = displayMode === "raw" ? headerValue : (groupByHeaderNames[headerValue] && groupByHeaderNames[headerValue].pretty);

    if (i === 0) { // Style the second sticky header
      tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom break-words">${displayHeader}</th>`;
    } else {
      tableHeadersHTML += `<th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">${displayHeader}</th>`;
    }
  }

  exportTableHead.innerHTML = tableHeadersHTML;
}

// Clear table body content / rows to let new ones populate the table 
function clearTableData() {
  const exportTableBody = document.getElementById("export_table_body");
  while (exportTableBody.firstChild) {
    exportTableBody.removeChild(exportTableBody.firstChild);
  }
}

// Display body of data table for any given group-by 
function createCell(type, className, content) {
  const cell = document.createElement(type);
  cell.className = className;
  cell.textContent = content;
  return cell;
}

function getBucketValue(bucket, headerKey, valueKey) {
  let bucketValue;

  if (headerKey === "median_apcs_paid_raw") {
    bucketValue = bucket[headerKey].values["50.0"];
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
    bucketValue = bucket[headerKey] ? bucket[headerKey][valueKey] : "0";
  }

  return bucketValue;
}

const dataTableClasses = {
  firstCol: "border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate",
  secondCol: "border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate",
  otherCols: "border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"
};

function appendRowToFragment(data, fragment, groupByKeyName, displayMode, groupByHeaderNames) {
  if (data.aggregations && data.aggregations.key && data.aggregations.key.buckets) {
    data.aggregations.key.buckets.forEach(bucket => {
      let row = document.createElement("tr");

      if (groupByKeyNames[groupByKeyName]) {
        const cell = createCell("th", dataTableClasses.firstCol, bucket.key || "");
        row.appendChild(cell);
      }

      let columnCounter = 1;
      Object.keys(groupByHeaderNames).forEach(headerKey => {
        const valueKey = groupByHeaderNames[headerKey].key;
        const bucketValue = getBucketValue(bucket, headerKey, valueKey);
        const className = columnCounter === 1 ? dataTableClasses.secondCol : dataTableClasses.otherCols;
        const cellType = columnCounter === 1 ? "th" : "td";
        const articlesPublishedValue = Number(bucket["articles_published"].doc_count);
        const cellContent = displayMode === "raw" 
                            ? bucketValue 
                            : formatValueBasedOnKey(headerKey, bucketValue, articlesPublishedValue) || "0";

        const cell = createCell(cellType, className, cellContent);
        row.appendChild(cell);
        columnCounter++;
      });

      fragment.appendChild(row);
    });
  }
}

async function displayTableBody(groupByKeyName, displayMode = "pretty") {
  const exportTableBody = document.getElementById("export_table_body");
  clearTableData();

  const postData = createPostData(orgName, groupByKeyName, startYear, endYear);
  const responseData = await fetchData(postData);
  
  if (responseData) {
    const fragment = document.createDocumentFragment();
    appendRowToFragment(responseData, fragment, groupByKeyName, displayMode, groupByHeaderNames);
    exportTableBody.appendChild(fragment);
  }
}

// Format values ("pretty" data display) based on key types set in groupByHeaderNames
function formatValueBasedOnKey(key, value, articlesPublished) {
  const header = groupByHeaderNames[key];
  if (!header) return value; // Return original value if the key doesn"t exist

  if (key === "articles_published") {
    return makeNumberReadable(value); // Only total number of articles shows the full number at all times
  }

  if (header.key === "doc_count") {
    return ((value / articlesPublished) * 100).toFixed(0) + "%"; // Convert to fraction of total articles published, then to percentage
  }

  if (["value", "values['50.0']"].includes(header.key)) {
    return makeNumberReadable(value, true); // Format as currency
  }

  return value; // Return original value if no conditions match
}

// Toggle data display style between "raw" and "pretty"
let currentToggleHandler = null;

function resetToggle() {
  const toggleButton = document.getElementById("toggle-data-view");
  toggleButton.setAttribute("aria-checked", "true");
  toggleButton.querySelector("span.bg-carnation-500, span.bg-neutral-200").classList.replace("bg-neutral-200", "bg-carnation-500");
  toggleButton.querySelector("span.translate-x-100, span.translate-x-5").classList.replace("translate-x-5", "translate-x-100");
}

function toggleData(groupByKeyName) {
  resetToggle();
  const toggleButton = document.getElementById("toggle-data-view");

  if (toggleButton) { 
    // Remove any previous event listeners attached to the btn to avoid unexpected behaviour
    if (currentToggleHandler) {
      toggleButton.removeEventListener("click", currentToggleHandler);
    }
  
    // Ensure the initial state is set correctly
    if (toggleButton.getAttribute("aria-checked") === null) {
      toggleButton.setAttribute("aria-checked", "true"); // By default, you want "true" for "pretty"
    }

    currentToggleHandler = function(event) {
      event.stopPropagation();

      // 1. Check the current state
      const ariaChecked = toggleButton.getAttribute("aria-checked") === "true";

      // 2. Switch the button state
      toggleButton.setAttribute("aria-checked", !ariaChecked ? "true" : "false");

      // 3. Determine the display mode based on the NEW state
      const displayMode = !ariaChecked ? "pretty" : "raw"; 

      // 4. Display the data based on the new display mode
      displayTableHead(groupByKeyName, displayMode);
      displayTableBody(groupByKeyName, displayMode);
      
      // 5. Update visual appearance of the button
      toggleButton.querySelector("span.bg-carnation-500, span.bg-neutral-200").classList.toggle("bg-neutral-200");
      toggleButton.querySelector("span.translate-x-100, span.translate-x-5").classList.toggle("translate-x-5");
    };

    toggleButton.addEventListener("click", currentToggleHandler);
  }
}

// Enable row highlighting on table click
function enableRowHighlighting() {
  const tableBody = document.getElementById("export_table_body");
  const tableRows = tableBody.querySelectorAll("tr"); 

  tableBody.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "TD" || target.tagName === "TH") {
      const row = target.parentElement; // Get the parent <tr> element
      const cellsToHighlight = Array.from(row.querySelectorAll("td, th")); 

      // Remove highlighting from all rows
      tableRows.forEach((r) => {
        r.classList.remove("bg-neutral-200", "bg-neutral-300", "hover:bg-neutral-100", "text-neutral-900");
      });

      // Toggle highlighting for the selected <td> and <th> elements
      cellsToHighlight.forEach((cell) => {
        if (cell.tagName === "TD") {
          cell.classList.toggle("bg-neutral-200");
        } else if (cell.tagName === "TH") {
          cell.classList.toggle("bg-neutral-300");
        }
        cell.classList.toggle("hover:bg-neutral-100");
        cell.classList.toggle("text-neutral-900");
      });
    }
  });
}

// Enable the table to scroll to the right
function enableTableScroll() {
  const tableContainer = document.querySelector(".js_export_table_container");
  const scrollRightBtn = document.getElementById("js_scroll_table_btn");

  scrollRightBtn.addEventListener("click", () => {
    const scrollAmount = 200; 
    const currentScroll = tableContainer.scrollLeft;
    const maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;

    const targetScroll = currentScroll + scrollAmount;

    if (targetScroll >= maxScroll) {
      // If reaching the end, hide the scrollRightBtn
      scrollRightBtn.style.display = "none";
    } else {
      // Otherwise, scroll smoothly to the right
      tableContainer.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  });

  tableContainer.addEventListener("scroll", () => {
    const currentScroll = tableContainer.scrollLeft;
    const maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;

    if (currentScroll >= maxScroll) {
      scrollRightBtn.style.display = "none";
    } else {
      scrollRightBtn.style.display = "block";
    }
  });
}

// Setup event listeners for the buttons
function setupButtonListeners(container, groupByKeyNames) {
  const exportTable = document.getElementById("export_table");

  enableRowHighlighting();
  enableTableScroll();

  container.addEventListener("click", function(event) {

    if (event.target.closest("button")) {
      // Clear any old state/data here
      const clickedButton = event.target.closest("button");
      toggleActiveButton(clickedButton, container);
      exportTable.classList.remove("hidden");

      // Call the table display functions using the id of the clicked button
      const key = getKeyFromButtonId(clickedButton.id, groupByKeyNames);
      if (key) {
        displayTableHead(key);
        displayTableBody(key);

        // Reset and reinitialize the toggle functionality
        toggleData(key);
      }
    }
  });
}

// Generate the data table — main event listener
document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("explore")) { 
    const groupbyBtns = document.getElementById("groupby_buttons");
    appendButtonsToContainer(groupbyBtns, groupByKeyNames);
    setupButtonListeners(groupbyBtns, groupByKeyNames);
  }
});