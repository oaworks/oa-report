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
  var exportTypeName = document.getElementById('export_type_name');
  var exportPreviewBtn = document.getElementById('export_preview_btn');
  var exportTable = document.getElementById('export_table');
  var exportTableHead = document.getElementById('export_table_head');
  var exportTableBody = document.getElementById('export_table_body');
  var exportAllArticlesBtn = document.getElementById('export_all_articles');
  var exportGrantsBtn = document.getElementById('export_grant');
  var exportPublishersBtn = document.getElementById('export_publisher');
  var exportFinancesBtn = document.getElementById('export_articles_with_apcs');
  var seeMoreRecordsBtn = document.getElementById('js_see_more_records');

  // Select section tab 
  // Function to show a specific section
  function showSection(sectionId) {
    const sections = document.querySelectorAll('.js_section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
  }

  // Function to handle tab highlighting
  function highlightTab(sectionId) {
    const sectionTabs = document.querySelectorAll('.js_section_tab');
    sectionTabs.forEach(tab => {
        if (tab.getAttribute('data-section') === sectionId) {
            // Add the 'bg-neutral-900' and 'text-white' classes to the selected tab
            tab.classList.add('bg-neutral-900', 'font-semibold', 'text-white');
        } else {
            // Remove the classes from other tabs
            tab.classList.remove('bg-neutral-900', 'font-semibold', 'text-white');
        }
    });
  }

  // Function to handle anchor links
  function handleAnchorLink() {
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.slice(1); // Remove the '#' character
        showSection(sectionId);
        highlightTab(sectionId);
    }
  }

  // Handle anchor links on page load
  window.addEventListener('load', handleAnchorLink);

  // Select section tab 
  const sectionTabs = document.querySelectorAll('.js_section_tab');
  sectionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const sectionId = tab.getAttribute('data-section');
        showSection(sectionId);
        highlightTab(sectionId);

        // Update the URL with the section ID
        history.pushState(null, null, `#${sectionId}`);
    });
  });
  
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

  // Listen for form submission if user selected filter by articles grouped by grants
  exportGrantsBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_grant";

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

  // Listen for form submission if user selected filter by articles grouped by publishers
  exportPublishersBtn.addEventListener('click', function() {
    var table = document.querySelector(".js_export_table");
    table.id = "table_publisher";

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

  document.querySelector('#js_see_more_records').addEventListener('click', function() {
    if (document.getElementById('table_grant')) {
      var htmlContent = tableData.articles_grant.pretty.body_more;
      exportTableBody.insertAdjacentHTML('beforeend', htmlContent);
    }
    else if (document.getElementById('table_publisher')) {
      var htmlContent = tableData.articles_publisher.pretty.body_more;
      exportTableBody.insertAdjacentHTML('beforeend', htmlContent);
    }
  });
  
  // Listen for button click of "all articles" preset
  exportAllArticlesBtn.addEventListener('click', function() {
    filterBySelect.value = 'articles';
    groupBySelect.value = 'none';

    exportTable.classList.add('block');
    exportTable.classList.remove('hidden');

    exportTitle.innerHTML = `2,702`;

    exportTableHead.innerHTML = `
      <th scope="col" class="sticky left-0 bg-neutral-700 p-2 w-60">DOI</th>
      <th scope="col" class="p-2 w-60">is_compliant__bmgf</th>
      <th scope="col" class="p-2 w-60">grantid__bmgf</th>
      <th scope="col" class="p-2 w-60">title</th>
      <th scope="col" class="p-2 w-60">publisher</th>
      <th scope="col" class="p-2 w-60">journal</th>
      <th scope="col" class="p-2 w-60">issn</th>
      <th scope="col" class="p-2 w-60">published_date</th>
      <th scope="col" class="p-2 w-60">published_year</th>
      <th scope="col" class="p-2 w-60">PMCID</th>
      <th scope="col" class="p-2 w-60">authorships.institutions.display_name</th>
      <th scope="col" class="p-2 w-60">funder.name</th>
      <th scope="col" class="p-2 w-60">is_oa</th>
      <th scope="col" class="p-2 w-60">oa_status</th>
      <th scope="col" class="p-2 w-60">journal_oa_type</th>
      <th scope="col" class="p-2 w-60">publisher_license_best</th>
      <th scope="col" class="p-2 w-60">has_repository_copy</th>
      <th scope="col" class="p-2 w-60">repository_license_best</th>
      <th scope="col" class="p-2 w-60">repository_version</th>
      <th scope="col" class="p-2 w-60">repository_url</th>
      <th scope="col" class="p-2 w-60">is_approved_repository__bmgf</th>
      <th scope="col" class="p-2 w-60">is_preprint</th>
      <th scope="col" class="p-2 w-60">can_archive</th>
      <th scope="col" class="p-2 w-60">version</th>
      <th scope="col" class="p-2 w-60">concepts.display_name</th>
      <th scope="col" class="p-2 w-60">subject</th>
      <th scope="col" class="p-2 w-60">program__bmgf</th>
      <th scope="col" class="p-2 w-60">has_data_availability_statement</th>
      <th scope="col" class="p-2 w-60">cited_by_count</th>
      <th scope="col" class="p-2 w-60">author_email_name</th>
      <th scope="col" class="p-2 w-60">email</th>
      <th scope="col" class="p-2 w-60">invoice_date</th>
      <th scope="col" class="p-2 w-60">invoice_number</th>
      <th scope="col" class="p-2 w-60">apc_cost</th>
      <th scope="col" class="p-2 w-60">oasupport.status</th>
      <th scope="col" class="p-2 w-60">sheets</th>
      <th scope="col" class="p-2 w-60">is_new__bmgf</th>
      <th scope="col" class="p-2 w-60">dev.data.has_shared_data</th>
      <th scope="col" class="p-2 w-60">dev.data.has_open_data</th>
      <th scope="col" class="p-2 w-60">dev.data.doi</th>
      <th scope="col" class="p-2 w-60">dev.data.url</th>
      <th scope="col" class="p-2 w-60">dev.data.accession</th>
      <th scope="col" class="p-2 w-60">dev.data.location</th>
      <th scope="col" class="p-2 w-60">dev.data.licence</th>
      <th scope="col" class="p-2 w-60">dev.data.evidence</th>
      <th scope="col" class="p-2 w-60">dev.code.has_made_code</th>
      <th scope="col" class="p-2 w-60">dev.code.has_shared_code</th>
      <th scope="col" class="p-2 w-60">dev.code.has_open_code</th>
      <th scope="col" class="p-2 w-60">dev.code.doi</th>
      <th scope="col" class="p-2 w-60">dev.code.url</th>
      <th scope="col" class="p-2 w-60">dev.code.accession</th>
      <th scope="col" class="p-2 w-60">dev.code.location</th>
      <th scope="col" class="p-2 w-60">dev.code.licence</th>
      <th scope="col" class="p-2 w-60">dev.code.evidence</th>
      <th scope="col" class="p-2 w-60">is_original_research</th>
      <th scope="col" class="p-2 w-60">data_availability_statement_category</th>
    `;

    exportTableBody.innerHTML = `
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.1016/j.xpro.2023.102563</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">A protocol for measuring the sexual receptivity of female Drosophila</td>
        <td class="p-2 whitespace-nowrap truncate">Elsevier BV</td>
        <td class="p-2 whitespace-nowrap truncate">STAR Protocols</td>
        <td class="p-2 whitespace-nowrap truncate">2666-1667</td>
        <td class="p-2 whitespace-nowrap truncate">2023-12-01</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate">PMC10507193</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">hybrid</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">cc-by-nc-nd</td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">publishedVersion</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.1016/j.ebiom.2023.104777</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Predictive models of long COVID</td>
        <td class="p-2 whitespace-nowrap truncate">Elsevier BV</td>
        <td class="p-2 whitespace-nowrap truncate">eBioMedicine</td>
        <td class="p-2 whitespace-nowrap truncate">2352-3964</td>
        <td class="p-2 whitespace-nowrap truncate">2023-10-01</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate">PMC10494314</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">closed</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">cc-by</td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">publishedVersion</td>
        <td class="p-2 whitespace-nowrap truncate">Medicine;Coronavirus disease 2019 (COVID-19);Logistic regression;Generalizability theory;Random forest;Internal medicine;Cohort;Diagnosis code;Incidence (geometry);Disease;Artificial intelligence;Statistics;Infectious disease (medical specialty);Population;Computer science;Environmental health;Physics;Mathematics;Optics</td>
        <td class="p-2 whitespace-nowrap truncate">General Biochemistry, Genetics and Molecular Biology;General Medicine</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">0</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_compliant__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf;publication_type__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.1016/j.eclinm.2023.102140</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Immunogenicity and safety of SARS-CoV-2 recombinant protein nanoparticle vaccine GBP510 adjuvanted with AS03: interim results of a randomised, active-controlled, observer-blinded, phase 3 trial</td>
        <td class="p-2 whitespace-nowrap truncate">Elsevier BV</td>
        <td class="p-2 whitespace-nowrap truncate">eClinicalMedicine</td>
        <td class="p-2 whitespace-nowrap truncate">2589-5370</td>
        <td class="p-2 whitespace-nowrap truncate">2023-10-01</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate">PMC10498190</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">cc-by-nc-nd</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">publishedVersion</td>
        <td class="p-2 whitespace-nowrap truncate">Medicine;Immunogenicity;Cohort;Interim analysis;Vaccination;Internal medicine;Seroconversion;Randomized controlled trial;Immunology;Antibody</td>
        <td class="p-2 whitespace-nowrap truncate">General Medicine</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">0</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf;publication_type__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.1016/s2214-109x(23)00383-2</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Potential cost-effectiveness of community availability of tenofovir, lamivudine, and dolutegravir for HIV prevention and treatment in east, central, southern, and west Africa: a modelling analysis</td>
        <td class="p-2 whitespace-nowrap truncate">Elsevier BV</td>
        <td class="p-2 whitespace-nowrap truncate">The Lancet Global Health</td>
        <td class="p-2 whitespace-nowrap truncate">2214-109X</td>
        <td class="p-2 whitespace-nowrap truncate">2023-10-01</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">closed</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">publishedVersion</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_new__bmgf;name_epmc__bmgf;preprints_oa_locations__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.1016/j.eclinm.2023.102151</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Immune persistence of an inactivated poliovirus vaccine derived from the Sabin strain: a 10-year follow-up of a phase 3 study</td>
        <td class="p-2 whitespace-nowrap truncate">Elsevier BV</td>
        <td class="p-2 whitespace-nowrap truncate">eClinicalMedicine</td>
        <td class="p-2 whitespace-nowrap truncate">2589-5370</td>
        <td class="p-2 whitespace-nowrap truncate">2023-10-01</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate">PMC10514427</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">hybrid</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">cc-by-nc-nd</td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">publishedVersion</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.1186/s40249-023-01135-7</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Assessing food security performance from the One Health concept: an evaluation tool based on the Global One Health Index</td>
        <td class="p-2 whitespace-nowrap truncate">Springer Science and Business Media LLC</td>
        <td class="p-2 whitespace-nowrap truncate">Infectious Diseases of Poverty</td>
        <td class="p-2 whitespace-nowrap truncate">2049-9957</td>
        <td class="p-2 whitespace-nowrap truncate">2023-09-22</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate">PMC10514978</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">cc-by</td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">publishedVersion</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_compliant__bmgf;is_new__bmgf;name_epmc__bmgf;preprints_oa_locations__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.7554/elife.85023</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Diverse evolutionary pathways challenge the use of collateral sensitivity as a strategy to suppress resistance</td>
        <td class="p-2 whitespace-nowrap truncate">eLife Sciences Publications, Ltd</td>
        <td class="p-2 whitespace-nowrap truncate">eLife</td>
        <td class="p-2 whitespace-nowrap truncate">2050-084X</td>
        <td class="p-2 whitespace-nowrap truncate">2023-09-22</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">cc-by</td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">publishedVersion</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_compliant__bmgf;is_new__bmgf;name_epmc__bmgf;preprints_oa_locations__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.1111/nph.19273</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Parallel tuning of semi‐dwarfism via differential splicing of <i>Brachytic1</i> in commercial maize and smallholder sorghum</td>
        <td class="p-2 whitespace-nowrap truncate">Wiley</td>
        <td class="p-2 whitespace-nowrap truncate">New Phytologist</td>
        <td class="p-2 whitespace-nowrap truncate">0028-646X;1469-8137</td>
        <td class="p-2 whitespace-nowrap truncate">2023-09-22</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">bronze</td>
        <td class="p-2 whitespace-nowrap truncate">hybrid</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">acceptedVersion</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_new__bmgf;name_epmc__bmgf;preprints_oa_locations__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.3389/fpubh.2023.1147180</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Prevalence and risk factors associated with the occurrence of Campylobacter sp. in children aged 6–24 months in peri-urban Nairobi, Kenya</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">2023-09-22</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">University of Nairobi;International Livestock Research Institute;University of Copenhagen;London School of Hygiene & Tropical Medicine</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">closed</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Campylobacter;Hygiene;Campylobacter jejuni;Diarrhea;Environmental health;Sanitation;Medicine;Malnutrition;Diarrheal disease;Veterinary medicine;Biology;Internal medicine;Bacteria;Genetics;Pathology</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">0</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
        <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
        <td class="p-2 whitespace-nowrap truncate">3230</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;finance_v3__bmgf;is_new__bmgf;preprints_oa_locations__bmgf;publication_type__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
      <tr>
        <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">10.1007/s41109-023-00595-y</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">Overcoming vaccine hesitancy by multiplex social network targeting: an analysis of targeting algorithms and implications</td>
        <td class="p-2 whitespace-nowrap truncate">Springer Science and Business Media LLC</td>
        <td class="p-2 whitespace-nowrap truncate">Applied Network Science</td>
        <td class="p-2 whitespace-nowrap truncate">2364-8228</td>
        <td class="p-2 whitespace-nowrap truncate">2023-09-21</td>
        <td class="p-2 whitespace-nowrap truncate">2023</td>
        <td class="p-2 whitespace-nowrap truncate">PMC10514145</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">gold</td>
        <td class="p-2 whitespace-nowrap truncate">cc-by</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">cc-by</td>
        <td class="p-2 whitespace-nowrap truncate">submittedVersion</td>
        <td class="p-2 whitespace-nowrap truncate">https://www.researchsquare.com/article/rs-2608863/latest.pdf</td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate">publishedVersion</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">FALSE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate">custom_keys__bmgf;is_compliant__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf</td>
        <td class="p-2 whitespace-nowrap truncate">TRUE</td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
        <td class="p-2 whitespace-nowrap truncate"></td>
      </tr>
    `;
  });

  // Listen for button click of "finance" preset
  exportFinancesBtn.addEventListener('click', function() {
    filterBySelect.value = 'articles_with_apcs';
    groupBySelect.value = 'none';

    exportTable.classList.add('block');
    exportTable.classList.remove('hidden');

    exportTitle.innerHTML = `1,027`;

    // exportTableHead.innerHTML = `
    //   <tr>
    //     <th scope="col" class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">DOI</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">grantid__bmgf</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">publisher_simple</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">journal</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">journal_oa_type</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">published_date</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">oa_status</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">publisher_license_best</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">apc_cost</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">invoice_number</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">invoice_date</th>
    //     <th scope="col" class="p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">invoice_year</th>
    //   </tr>
    // `; 

    // exportTableBody.innerHTML = `
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fpubh.2023.1147180</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-22</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">3230</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1136/bmj-2022-072249</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-21</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">6800</td>
    //     <td class="p-2 whitespace-nowrap truncate">APC600447950</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-04</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1038/s41591-023-02551-w</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-21</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">11690</td>
    //     <td class="p-2 whitespace-nowrap truncate">1452513097</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-13</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1128/mbio.01887-23</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-20</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">4270</td>
    //     <td class="p-2 whitespace-nowrap truncate">APC600441996</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-08-11</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fimmu.2023.1220130</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-20</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">3230</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fvets.2023.1168649</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-19</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">3230</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fsoc.2023.1254595</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-19</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">770</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1038/s41598-023-42425-2</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">springer/nature/bmc</td>
    //     <td class="p-2 whitespace-nowrap truncate">Scientific Reports</td>
    //     <td class="p-2 whitespace-nowrap truncate">gold</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-16</td>
    //     <td class="p-2 whitespace-nowrap truncate">gold</td>
    //     <td class="p-2 whitespace-nowrap truncate">cc-by</td>
    //     <td class="p-2 whitespace-nowrap truncate">1350</td>
    //     <td class="p-2 whitespace-nowrap truncate">2939206000</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-20</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.1099/mgen.0.001094</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-15</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">3170</td>
    //     <td class="p-2 whitespace-nowrap truncate">APC600449722</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
    //   <tr>
    //     <td class="sticky left-0 bg-neutral-700 p-2 text-left text-sm font-medium uppercase tracking-wider w-60 truncate">10.3389/fphar.2023.1088670</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">closed</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-14</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //     <td class="p-2 whitespace-nowrap truncate">3230</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-1008788-1</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023-09-08</td>
    //     <td class="p-2 whitespace-nowrap truncate">2023</td>
    //     <td class="p-2 whitespace-nowrap truncate"></td>
    //   </tr>
  
    // `;
    // activateExportLink('/temp/bmgf_articles-with-apcs_from_2023-01-01-to-2023-10-04_on_2023-09-27.csv');
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
      const tdsToHighlight = Array.from(row.querySelectorAll('td')).slice(2); // Exclude the first two <td> elements

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





});
