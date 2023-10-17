// TEMP CRAPPY PROTOTYPING SCRIPT
document.addEventListener("DOMContentLoaded", function() {
  // Get references to elements
  var buttons = document.querySelectorAll('.js_export_pill');
  var form = document.getElementById('explore_form');
  var exportLink = document.getElementById('export_link');
  var filterBySelect = document.getElementById('filter_by');
  var groupBySelect = document.getElementById('group_by');
  var exportRecordsShown = document.getElementById('export_records_shown');
  var exportTitle = document.getElementById('export_title');
  var exportYear = document.getElementById('export_year');
  var exportTypeName = document.getElementById('export_type_name');
  var exportPreviewBtn = document.getElementById('export_preview_btn');
  var exportTable = document.getElementById('export_table');
  var exportTableHead = document.getElementById('export_table_head');
  var exportTableBody = document.getElementById('export_table_body');
  var exportAllArticlesBtn = document.getElementById('export_all_articles');
  var exportGrantsBtn = document.getElementById('export_grant');
  var exportPublishersBtn = document.getElementById('export_publisher');
  var exportFinancesBtn = document.getElementById('export_articles_with_apcs');
  var seeMoreRecordsBtn = document.querySelector('#js_see_more_records');
  
  // For each export pill button
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      // First, remove the active class from all buttons
      buttons.forEach(function(btn) {
        btn.classList.remove('bg-carnation-300');
      });
      // Then, add the active class to the clicked button
      button.classList.add('bg-carnation-300');
      // Change select options in the form based on button's data attributes
      document.getElementById('filter_by').value = button.getAttribute('data-filter-by');
      document.getElementById('group_by').value = button.getAttribute('data-group-by');
      // Change the h3 title based on button's data-title
      document.getElementById('export_title').innerHTML = button.getAttribute('data-title');
      // Activate the export link with the button's data-csv value
      activateExportLink(button.getAttribute('data-csv'));
    });
  });

  // Function to deactivate the export link
  function deactivateExportLink() {
    exportLink.removeAttribute('href');
    exportLink.classList.add('bg-neutral-300', 'cursor-not-allowed');
    // exportLink.classList.remove('bg-carnation-500', 'hover:bg-carnation-300', 'hover:border-carnation-500');
  }

  // Function to activate the export link with a given href
  function activateExportLink(hrefValue) {
    exportLink.href = hrefValue;
    exportLink.classList.remove('bg-neutral-300', 'cursor-not-allowed');
    // exportLink.classList.add('bg-carnation-500', 'hover:bg-carnation-300', 'hover:border-carnation-500');
  }

  // Function to toggle data-display style
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

  // Listen button click of "grants"
  exportGrantsBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_grant";

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles_grant.number;
    exportYear.innerHTML = tableData.articles_grant.year;
    exportTableHead.innerHTML = tableData.articles_grant.pretty.head;
    exportTableBody.innerHTML = tableData.articles_grant.pretty.body;
    activateExportLink(tableData.articles_grant.pretty.link);
    exportTable.classList.add('block');
    exportTable.classList.remove('hidden');
    exportTypeName.innerText = 'grants';
    toggleData('articles_grant');
  });

  // Listen for button click of "publishers"
  exportPublishersBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_publisher";

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles_publisher.number;
    exportYear.innerHTML = tableData.articles_publisher.year;
    exportTableHead.innerHTML = tableData.articles_publisher.pretty.head;
    exportTableBody.innerHTML = tableData.articles_publisher.pretty.body;
    activateExportLink(tableData.articles_publisher.pretty.link);
    exportTable.classList.add('block');
    exportTable.classList.remove('hidden');
    exportTypeName.innerText = 'publishers';
    toggleData('articles_publisher');
  });
  
  // Listen for button click of "all articles" 
  exportAllArticlesBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_article";

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles.number;
    exportYear.innerHTML = tableData.articles.year;
    exportTableHead.innerHTML = tableData.articles.raw.head;
    exportTableBody.innerHTML = tableData.articles.raw.body;
    activateExportLink(tableData.articles.raw.link);
    exportTable.classList.add('block');
    exportTable.classList.remove('hidden');
    exportTypeName.innerText = 'articles';
  });

  // Listen for button click of "finance" 
  exportFinancesBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_finance";

    exportRecordsShown.innerHTML = 10;
    exportTitle.innerHTML = tableData.articles_with_apcs_only.number;
    exportYear.innerHTML = tableData.articles_with_apcs_only.year;
    exportTableHead.innerHTML = tableData.articles_with_apcs_only.raw.head;
    exportTableBody.innerHTML = tableData.articles_with_apcs_only.raw.body;
    activateExportLink(tableData.articles_with_apcs_only.raw.link);
    exportTable.classList.add('block');
    exportTable.classList.remove('hidden');
    exportTypeName.innerText = 'articles';
  });

  // Display more records in table 
  seeMoreRecordsBtn.addEventListener('click', function() {
    // Increment records shown value by 10
    let currentValue = parseInt(exportRecordsShown.innerText, 10);
    currentValue += 10;
    exportRecordsShown.innerText = currentValue;

    // For grants 
    if (document.getElementById('table_grant')) {
      var htmlContent = tableData.articles_grant.pretty.body_more;
      exportTableBody.insertAdjacentHTML('beforeend', htmlContent);

      // at 50 records, prompt to download full data 
      if (currentValue === 50) {
        var seeMoreRecordsBtnContent = seeMoreRecordsBtn.querySelector('div');
        
        seeMoreRecordsBtnContent.innerHTML = `Maximum reached — <a href="${tableData.articles_grant.pretty.link}">download the CSV</a> to see the full data`;
      }
    }
    // For publishers
    else if (document.getElementById('table_publisher')) {
      var htmlContent = tableData.articles_publisher.pretty.body_more;
      exportTableBody.insertAdjacentHTML('beforeend', htmlContent);
      
      // at 50 records, prompt to download full data 
      if (currentValue === 50) {
        var seeMoreRecordsBtnContent = seeMoreRecordsBtn.querySelector('div');
  
        seeMoreRecordsBtnContent.innerHTML = `Maximum reached — <a href="${tableData.articles_publisher.pretty.link}">download the CSV</a> to see the full data`;
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
