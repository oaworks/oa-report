// TEMP CRAPPY PROTOTYPING SCRIPT
document.addEventListener("DOMContentLoaded", function() {
  // Get references to elements
  var buttons = document.querySelectorAll('.js_export_pill');
  var form = document.getElementById('explore_form');
  var exportLink = document.getElementById('export_link');
  var filterBySelect = document.getElementById('filter_by');
  var groupBySelect = document.getElementById('group_by');
  var exportTitle = document.getElementById('export_title');
  var exportYear = document.getElementById('export_year');
  var exportPreviewBtn = document.getElementById('export_preview_btn');
  var exportTable = document.getElementById('export_table');
  var exportTableHead = document.getElementById('export_table_head');
  var exportTableBody = document.getElementById('export_table_body');
  var exportAllArticlesBtn = document.getElementById('export_all_articles');
  var exportFinancesBtn = document.getElementById('export_articles_with_apcs');
  
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
    exportLink.classList.remove('bg-carnation-500', 'hover:bg-carnation-300', 'hover:border-carnation-500');
  }

  // Function to activate the export link with a given href
  function activateExportLink(hrefValue) {
    exportLink.href = hrefValue;
    exportLink.classList.remove('bg-neutral-300', 'cursor-not-allowed');
    exportLink.classList.add('bg-carnation-500', 'hover:bg-carnation-300', 'hover:border-carnation-500');
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
  
  // Listen for form changes
  form.addEventListener('input', function() {
    // Deactivate buttons and the export link
    buttons.forEach(function(btn) {
      btn.classList.remove('bg-carnation-300');
    });
    deactivateExportLink();
  });

  exportPreviewBtn.addEventListener('click', function(e) {
    e.preventDefault(); // prevent default form submission

    // Listen for form submission if user selected filter by articles grouped by grants
    if (filterBySelect.value === 'articles' && groupBySelect.value === 'grant') {
      exportTitle.innerHTML = tableData.articles_grant.number;
      exportYear.innerHTML = tableData.articles_grant.year;
      exportTableHead.innerHTML = tableData.articles_grant.pretty.head;
      exportTableBody.innerHTML = tableData.articles_grant.pretty.body;
      activateExportLink(tableData.articles_grant.pretty.link);
      exportTable.classList.add('block');
      exportTable.classList.remove('hidden');
      toggleData('articles_grant');

      // Listen for form submission if user selected filter by articles grouped by publishers
    } else if (filterBySelect.value === 'articles' && groupBySelect.value === 'publisher') {
      exportTitle.innerHTML = tableData.articles_publisher.number;
      exportYear.innerHTML = tableData.articles_publisher.year;
      exportTableHead.innerHTML = tableData.articles_publisher.pretty.head;
      exportTableBody.innerHTML = tableData.articles_publisher.pretty.body;
      activateExportLink(tableData.articles_publisher.pretty.link);
      exportTable.classList.add('block');
      exportTable.classList.remove('hidden');
      toggleData('articles_publisher');
    } else {
      deactivateExportLink();
    }
  });
  
  // // Listen for button click of "all articles" preset
  // exportAllArticlesBtn.addEventListener('click', function() {
  //   filterBySelect.value = 'articles_with_apcs';
  //   groupBySelect.value = 'none';

  //   exportTable.classList.add('block');
  //   exportTable.classList.remove('hidden');

  //   exportTitle.innerHTML = `2,702`;
  // });

  // // Listen for button click of "finance" preset
  // exportFinancesBtn.addEventListener('click', function() {
  //   filterBySelect.value = 'articles_with_apcs';
  //   groupBySelect.value = 'none';

  //   exportTable.classList.add('block');
  //   exportTable.classList.remove('hidden');

  //   exportTitle.innerHTML = `1,027`;

  //   // exportTableHead.innerHTML = `
  //   //   <tr>
  //   //     <th scope="col" class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">DOI</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">grantid__bmgf</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">publisher_simple</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">journal</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">journal_oa_type</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">published_date</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">oa_status</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">publisher_license_best</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">apc_cost</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">invoice_number</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">invoice_date</th>
  //   //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">invoice_year</th>
  //   //   </tr>
  //   // `; 

  //   // exportTableBody.innerHTML = `
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fpubh.2023.1147180</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-22</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">3230</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1136/bmj-2022-072249</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-21</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">6800</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">APC600447950</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-04</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1038/s41591-023-02551-w</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-21</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">11690</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">1452513097</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-13</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1128/mbio.01887-23</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-20</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">4270</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">APC600441996</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-08-11</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fimmu.2023.1220130</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-20</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">3230</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fvets.2023.1168649</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-19</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">3230</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fsoc.2023.1254595</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-19</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">770</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1038/s41598-023-42425-2</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">springer/nature/bmc</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">Scientific Reports</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">gold</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-16</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">gold</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">cc-by</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">1350</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2939206000</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-20</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1099/mgen.0.001094</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-15</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">3170</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">APC600449722</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  //   //   <tr>
  //   //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fphar.2023.1088670</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">closed</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-14</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //     <td class="p-2 whitespace-nowrap truncate">3230</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
  //   //     <td class="p-2 whitespace-nowrap truncate">2023</td>
  //   //     <td class="p-2 whitespace-nowrap truncate"></td>
  //   //   </tr>
  
  //   // `;
  //   // activateExportLink('/temp/bmgf_articles-with-apcs_from_2023-01-01-to-2023-10-04_on_2023-09-27.csv');
  // });

  
});
