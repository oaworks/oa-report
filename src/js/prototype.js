// TEMP CRAPPY PROTOTYPING SCRIPT
document.addEventListener("DOMContentLoaded", function() {
  // Get references to elements
  var buttons = document.querySelectorAll('.js_export_pill');
  var form = document.getElementById('explore_form');
  var exportLink = document.getElementById('export_link');
  var filterBySelect = document.getElementById('filter_by');
  var groupBySelect = document.getElementById('group_by');
  var exportTitle = document.getElementById('export_title');
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

        toggleButton.setAttribute('aria-checked', 'false');
        toggleBg.classList.remove('bg-carnation-500');
        toggleBg.classList.add('bg-neutral-200');
        toggleDot.classList.remove('translate-x-100');
        toggleDot.classList.add('translate-x-5');
      } else {
        exportTableHead.innerHTML = targetData.pretty.head;
        exportTableBody.innerHTML = targetData.pretty.body;

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
      exportTableHead.innerHTML = tableData.articles_grant.pretty.head;
      exportTableBody.innerHTML = tableData.articles_grant.pretty.body;
      activateExportLink(tableData.articles_grant.link);
      exportTable.classList.add('block');
      exportTable.classList.remove('hidden');
      toggleData('articles_grant');

      // Listen for form submission if user selected filter by articles grouped by publishers
    } else if (filterBySelect.value === 'articles' && groupBySelect.value === 'publisher') {
      exportTitle.innerHTML = tableData.articles_publisher.number;
      exportTableHead.innerHTML = tableData.articles_publisher.pretty.head;
      exportTableBody.innerHTML = tableData.articles_publisher.pretty.body;
      activateExportLink(tableData.articles_grant.link);
      exportTable.classList.add('block');
      exportTable.classList.remove('hidden');
      toggleData('articles_publisher');
    } else {
      deactivateExportLink();
    }
  });
  

  
});
