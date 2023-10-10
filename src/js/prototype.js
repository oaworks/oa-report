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
      // Listen for form submission if user selected filter by articles grouped by publishers
    } else if (filterBySelect.value === 'articles' && groupBySelect.value === 'publisher') {
      exportTitle.innerHTML = tableData.articles_publisher.number;
      exportTableHead.innerHTML = tableData.articles_publisher.pretty.head;
      exportTableBody.innerHTML = tableData.articles_publisher.pretty.body;
      activateExportLink(tableData.articles_grant.link);
    } else {
      deactivateExportLink();
    }
  });
});
