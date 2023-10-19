// TEMP CRAPPY PROTOTYPING SCRIPT

// ==============================
// Utility functions
// ==============================

/**
 * Replace all instances of a text
 * 
 * @param {string} className - The class name indicating a string where we will be replacing all instances
 *  @param {string} parameter - The content we are replacing instances found with 
 */

function replaceText(className, parameter) {
  document.querySelectorAll(className).forEach(element => element.textContent = parameter);
}


// ==============================
// Main functionality
// ==============================

// Toggle data-display style
let currentToggleHandler = null;  // To keep track of the current event handler

function resetToggle() {
  const toggleButton = document.getElementById('toggle');
  const toggleBg = toggleButton.querySelector('span.bg-carnation-500, span.bg-neutral-200');
  const toggleDot = toggleButton.querySelector('span.translate-x-100, span.translate-x-5');
  
  // Detach the current event listener, if any
  if (currentToggleHandler) {
    toggleButton.removeEventListener('click', currentToggleHandler);
  }
  
  // Set to default "pretty" state
  toggleButton.setAttribute('aria-checked', 'true');
  toggleBg.classList.remove('bg-neutral-200');
  toggleBg.classList.add('bg-carnation-500');
  toggleDot.classList.remove('translate-x-5');
  toggleDot.classList.add('translate-x-100');
}

function toggleData(dataKey) {
  resetToggle();  // Reset the toggle first

  const toggleButton = document.getElementById('toggle');
  const toggleBg = toggleButton.querySelector('span.bg-carnation-500, span.bg-neutral-200');
  const toggleDot = toggleButton.querySelector('span.translate-x-100, span.translate-x-5');

  currentToggleHandler = function() {
    const ariaChecked = toggleButton.getAttribute('aria-checked') === 'true';
    const targetData = tableData[dataKey];
    
    if (!targetData) {
      console.error(`Data for key "${dataKey}" not found!`);
      return;
    }

    if (ariaChecked) {
      exportTableHead.innerHTML = targetData.raw.head;
      exportTableBody.innerHTML = targetData.raw.body;
      activateExportLink(targetData.raw.link);

      toggleButton.setAttribute('aria-checked', 'false');
      toggleBg.classList.remove('bg-carnation-500');
      toggleBg.classList.add('bg-neutral-200');
      toggleDot.classList.remove('translate-x-100');
      toggleDot.classList.add('translate-x-5');
    } else {
      exportTableHead.innerHTML = targetData.pretty.head;
      exportTableBody.innerHTML = targetData.pretty.body;
      activateExportLink(targetData.pretty.link);

      toggleButton.setAttribute('aria-checked', 'true');
      toggleBg.classList.remove('bg-neutral-200');
      toggleBg.classList.add('bg-carnation-500');
      toggleDot.classList.remove('translate-x-5');
      toggleDot.classList.add('translate-x-100');
    }
  };

  // Attach the event handler
  toggleButton.addEventListener('click', currentToggleHandler);
}

// ==============================
// Event listeners
// ==============================

document.addEventListener("DOMContentLoaded", function() {

  // Get references
  const exportRecordsShown = document.getElementById('export_records_shown');
  const exportTitle = document.getElementById('export_title');
  const exportYear = document.getElementById('export_year');
  const exportTable = document.getElementById('export_table');
  const exportTableHead = document.getElementById('export_table_head');
  const exportTableBody = document.getElementById('export_table_body');

  const exportLink = document.getElementById('export_link'); 

  // Activate / deactivate the data export link with a given href
  function activateExportLink(hrefValue) {
    exportLink.href = hrefValue;
    exportLink.classList.remove('bg-neutral-300', 'cursor-not-allowed');
    // exportLink.classList.add('bg-carnation-500', 'hover:bg-carnation-300', 'hover:border-carnation-500');
  }
  
  function deactivateExportLink() {
    exportLink.removeAttribute('href');
    exportLink.classList.add('bg-neutral-300', 'cursor-not-allowed');
    // exportLink.classList.remove('bg-carnation-500', 'hover:bg-carnation-300', 'hover:border-carnation-500');
  }

  // Listen button click of "grants"
  const exportGrantsBtn = document.getElementById('export_grant');

  exportGrantsBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_grant";

    // Ensure articles are selected
    document.querySelector('#filter_by option[value="articles"]').selected = true;

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles_grant.number;
    exportYear.innerHTML = tableData.articles_grant.year;
    exportTableHead.innerHTML = tableData.articles_grant.pretty.head;
    exportTableBody.innerHTML = tableData.articles_grant.pretty.body;
    activateExportLink(tableData.articles_grant.pretty.link);
    toggleData('articles_grant');

    replaceText('.js_export_type', 'grants');
  });

  // Listen for button click of "publishers"
  const exportPublishersBtn = document.getElementById('export_publisher');

  exportPublishersBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_publisher";

    // Ensure articles are selected
    document.querySelector('#filter_by option[value="articles"]').selected = true;

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles_publisher.number;
    exportYear.innerHTML = tableData.articles_publisher.year;
    exportTableHead.innerHTML = tableData.articles_publisher.pretty.head;
    exportTableBody.innerHTML = tableData.articles_publisher.pretty.body;
    activateExportLink(tableData.articles_publisher.pretty.link);
    toggleData('articles_publisher');

    replaceText('.js_export_type', 'publishers');
  });

  const exportPublishersAllArticlesBtn = document.getElementById('filter_all_articles');

  exportPublishersAllArticlesBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_publisher";

    // Ensure articles are selected
    document.querySelector('#filter_by option[value="articles"]').selected = true;

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles_publisher.number;
    exportYear.innerHTML = tableData.articles_publisher.year;
    exportTableHead.innerHTML = tableData.articles_publisher.pretty.head;
    exportTableBody.innerHTML = tableData.articles_publisher.pretty.body;
    activateExportLink(tableData.articles_publisher.pretty.link);
    toggleData('articles_publisher');

    replaceText('.js_export_type', 'publishers');
  });

  // Listen for radio button selection  of "publishers => preprints OR publishers => authored"
  const filterBtnIds = ['filter_preprints', 'filter_authored_articles'];

  filterBtnIds.forEach(id => {
    const btn = document.getElementById(id);

    btn.addEventListener('click', function() {
      var table = document.querySelector(".js_export_table");
      table.id = "table_publisher";

      exportRecordsShown.innerHTML = 10;
      exportTitle.innerHTML = tableData.articles_publisher_subset.number;
      exportYear.innerHTML = tableData.articles_publisher_subset.year;
      exportTableHead.innerHTML = tableData.articles_publisher_subset.pretty.head;
      exportTableBody.innerHTML = tableData.articles_publisher_subset.pretty.body;
      activateExportLink(tableData.articles_publisher_subset.pretty.link);
      toggleData('articles_publisher_subset');

      replaceText('.js_export_type', 'publishers');
    });
  });
  
  // Listen for button click of "all articles" 
  const exportAllArticlesBtn = document.getElementById('export_all_articles');

  exportAllArticlesBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_article";

    // Ensure articles are selected
    document.querySelector('#filter_by option[value="articles"]').selected = true;

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles.number;
    exportYear.innerHTML = tableData.articles.year;
    exportTableHead.innerHTML = tableData.articles.raw.head;
    exportTableBody.innerHTML = tableData.articles.raw.body;
    activateExportLink(tableData.articles.raw.link);

    replaceText('.js_export_type', 'articles');
  });

  // Listen for button click of "finance" 
  const exportFinancesBtn = document.getElementById('export_articles_with_apcs');

  exportFinancesBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_finance";

    // Ensure articles are selected
    document.querySelector('#filter_by option[value="articles"]').selected = true;

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles_with_apcs_only.number;
    exportYear.innerHTML = tableData.articles_with_apcs_only.year;
    exportTableHead.innerHTML = tableData.articles_with_apcs_only.raw.head;
    exportTableBody.innerHTML = tableData.articles_with_apcs_only.raw.body;
    activateExportLink(tableData.articles_with_apcs_only.raw.link);

    replaceText('.js_export_type', 'articles with paid APCs');
  });

  // Display more records in table 
  const seeMoreRecordsBtn = document.querySelector('#js_see_more_records');

  seeMoreRecordsBtn.addEventListener('click', function() {
    // Increment records shown value by 10
    let currentValue = parseInt(exportRecordsShown.innerText, 10);
    currentValue += 10;
    exportRecordsShown.innerText = currentValue;

    if (currentValue >= 50) {
      seeMoreRecordsBtn.querySelector('div').textContent = 'Maximum reached: Download the CSV to see the full data';
      
      // Disable the button and change the cursor style
      seeMoreRecordsBtn.style.pointerEvents = 'none';
      seeMoreRecordsBtn.removeEventListener('click', this);
    } else {
      // Determine the HTML content based on the table type
      let htmlContent = '';
      if (document.getElementById('table_grant')) {
        htmlContent = tableData.articles_grant.pretty.body_more;
      } else if (document.getElementById('table_publisher')) {
        htmlContent = tableData.articles_publisher.pretty.body_more;
      }

      // Add the HTML content to the table body
      exportTableBody.insertAdjacentHTML('beforeend', htmlContent);

      // Scroll the last row into view
      if (exportTable) {
        exportTable.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
    }
  });

  // See more exports btn
  const pillContainer = document.getElementById("more_exports");
  const seeMoreButton = document.getElementById("export_see_more");
  const seeMoreTxt = document.getElementById("see_more_text");
  const seeMoreCount = document.getElementById("count_see_more");
  
    seeMoreButton.addEventListener("click", function() {
      if (pillContainer.classList.contains('hidden')) {
        pillContainer.classList.remove('hidden');
        seeMoreTxt.textContent = "See fewer";
        seeMoreCount.textContent = "–";
      } else {
        pillContainer.classList.add('hidden');
        seeMoreTxt.textContent = "See more";
        seeMoreCount.textContent = "+";
      }
    });

  // Allow highlighting of table rows
  const tableBody = document.getElementById('export_table_body');
  const tableRows = tableBody.querySelectorAll('tr'); 

  tableBody.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'TD') {
      const row = target.parentElement; // Get the parent <tr> element
      const tdsToHighlight = Array.from(row.querySelectorAll('td')); // Exclude the first two <td> elements

      // Remove highlighting from all rows
      tableRows.forEach((r) => {
        r.classList.remove('bg-neutral-200', 'hover:bg-neutral-100', 'text-neutral-900');
      });

      // Toggle highlighting for the selected <td> elements
      tdsToHighlight.forEach((td) => {
        td.classList.toggle('bg-neutral-200');
        td.classList.toggle('hover:bg-neutral-100');
        td.classList.toggle('text-neutral-900');
      });
    }
  });

  // Function to scroll the table to the right on click of the arrow button
  const tableContainer = document.querySelector('.js_export_table_container');
  const scrollRightBtn = document.getElementById('js_scroll_table_btn');
  
  scrollRightBtn.addEventListener('click', () => {
    const scrollAmount = 200; 
    const currentScroll = tableContainer.scrollLeft;
    const maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;

    const targetScroll = currentScroll + scrollAmount;
    
    if (targetScroll >= maxScroll) {
      // If reaching the end, hide the scrollRightBtn
      scrollRightBtn.style.display = 'none';
    } else {
      // Otherwise, scroll smoothly to the right
      tableContainer.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  });

  // Add a scroll event listener to check and show/hide the scrollRightBtn
  tableContainer.addEventListener('scroll', () => {
    const currentScroll = tableContainer.scrollLeft;
    const maxScroll = tableContainer.scrollWidth - tableContainer.clientWidth;

    if (currentScroll >= maxScroll) {
      scrollRightBtn.style.display = 'none';
    } else {
      scrollRightBtn.style.display = 'block';
    }
  });

});
