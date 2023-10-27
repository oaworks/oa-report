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
// Event listeners
// ==============================


document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById('explore')) {
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

    // Sticky year header — add padding when the year is at the top
    document.addEventListener("scroll", function() {
      const nav = document.querySelector("#top_nav");
      const rect = nav.getBoundingClientRect();

      // Add 'transition-pb-6' class when the nav is at the top of the viewport
      if (rect.top <= 0) {
        nav.classList.add("shadow-lg");
        nav.classList.add("transition-pb-3");
        nav.classList.add("md:transition-pb-6");
        nav.classList.remove("transition-pb-0");
      } else {
        nav.classList.remove("shadow-lg");
        nav.classList.remove("transition-pb-3");
        nav.classList.remove("md:transition-pb-6");
        nav.classList.add("transition-pb-0");
      }
    });

    function handleButtonClick(button, tableId, tableDataProperty, replaceTextValue) {
      var table = document.querySelector(".js_export_table");
      table.id = tableId;
    
      // Ensure articles are selected
      document.querySelector('#filter_by option[value="articles"]').selected = true;
    
      exportRecordsShown.innerHTML = 10;
      exportTitle.innerHTML = tableData[tableDataProperty].number;
      exportYear.innerHTML = tableData[tableDataProperty].year;
      exportTableHead.innerHTML = tableData[tableDataProperty].pretty.head;
      exportTableBody.innerHTML = tableData[tableDataProperty].pretty.body;
      activateExportLink(tableData[tableDataProperty].pretty.link);
    
      replaceText('.js_export_type', replaceTextValue);
    }
    
    const exportButtons = [
      { elementId: 'export_grant', tableId: 'table_grant', tableDataProperty: 'articles_grant', replaceTextValue: 'grants', year: 'all-time' },
      { elementId: 'export_publisher', tableId: 'table_publisher', tableDataProperty: 'articles_publisher', replaceTextValue: 'publishers', year: 'start-year' },
      { elementId: 'filter_all_articles', tableId: 'table_publisher', tableDataProperty: 'articles_publisher', replaceTextValue: 'publishers', year: 'start-year' },
      { elementId: 'filter_preprints', tableId: 'table_publisher', tableDataProperty: 'articles_publisher_subset', replaceTextValue: 'publishers' },
      { elementId: 'filter_authored_articles', tableId: 'table_publisher', tableDataProperty: 'articles_publisher_subset', replaceTextValue: 'publishers' }
    ];
    
    exportButtons.forEach(btn => {
      const buttonElement = document.getElementById(btn.elementId);
      var yearBtn = document.getElementById(btn.year);

      buttonElement.addEventListener('click', function(event) {
        if (yearBtn.getAttribute('aria-pressed') === 'true' ) { // Check if corresponding year is active       
          // Add highlighting to the selected export button
          this.classList.add("bg-carnation-500");
          toggleData(btn.tableDataProperty);

          // Remove the class from all other buttons
          exportButtons.forEach(innerBtn => {        
            if (innerBtn.elementId !== btn.elementId) {
              document.getElementById(innerBtn.elementId).classList.remove("bg-carnation-500");
            }
          });

          handleButtonClick(this, btn.tableId, btn.tableDataProperty, btn.replaceTextValue);

          event.stopPropagation(); // Prevent the document click event from being triggered immediately after button click    
        }
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
    
  }
});