const apiEndpoint = document.body.getAttribute('data-api-endpoint');
const searchBox = document.getElementById('js-search-box');
const suggestionsList = document.getElementById('js-suggestions-list');
let debounceTimeout;

function closeSuggestions() {
  suggestionsList.innerHTML = '';
  suggestionsList.style.display = 'none';
  searchBox.setAttribute('aria-expanded', 'false');
}

async function fetchSuggestions(searchTerm) {
  if (!searchTerm.trim()) {
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
    return;
  }

  try {
    const url = `https://bg.${apiEndpoint}.oa.works/oareport/orgs_new/suggest/search/${searchTerm}?include=name,objectID,private`;
    const response = await fetch(url);
    const data = await response.json();

    const filteredData = data.filter(item => !item.private);

    if (Array.isArray(filteredData) && filteredData.some(item => item.hasOwnProperty('name'))) {
      suggestionsList.innerHTML = filteredData
        .map(
          result => `<li class="relative cursor-default border-b select-none"><a href="/${result.objectID}" class="block text-neutral-700 hover:font-semibold hover:text-white hover:bg-neutral-900"><span class="p-3 block truncate">${result.name}</span></a></li>`
        )
        .join('');
      suggestionsList.style.display = 'block';
      searchBox.setAttribute('aria-expanded', 'true');
    } else {
      suggestionsList.innerHTML = '<li class="relative cursor-default border-b select-none p-3 text-neutral-900 js-no-results"><p>No results found! <a href="mailto:hello@oa.works&subject=OA.Report — I can’t find my organization" target="_blank" class="underline underline-offset-2 decoration-1 js-no-results-link">Contact us</a> if you can’t find your organization.</p><br><p><span class="font-semibold">Looking for your university?</span><br> Join our <a href="https://blog.oa.works/join-the-oa-report-for-libraries-pilot-to-simplify-compliance-checking-for-your-institutional-funders-oa-policies/" target="_blank" rel="noopener" class="underline underline-offset-2 decoration-1 js-no-results-link">OA.Report for libraries pilot</a>!</p></li>';
      suggestionsList.style.display = 'block';
      searchBox.setAttribute('aria-expanded', 'true');
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
}

searchBox.addEventListener('input', (event) => {
  const searchTerm = event.target.value;

  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    fetchSuggestions(searchTerm);
  }, 200);
});

suggestionsList.addEventListener('click', (event) => {
  const clickedElement = event.target.closest('a');
  
  if (clickedElement && !clickedElement.classList.contains('js-no-results-link')) {
    event.preventDefault();
    searchBox.value = clickedElement.innerText;
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
    window.location.href = clickedElement.href; // Navigate to the org’s report page
  }
});

// Navigate search results with keyboard
let activeIndex = -1; // Track the currently active (highlighted) item
const results = suggestionsList.getElementsByTagName('li');

searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault(); // Prevent default scrolling behavior
    navigateResults('down');
  } else if (event.key === 'ArrowUp') {
    event.preventDefault(); // Prevent default scrolling behavior
    navigateResults('up');
  } else if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission or other default behavior
    selectItem();
  } else if (event.key === 'Escape') {
    closeSuggestions();
  }
});

searchBox.addEventListener('focus', () => {
  if (suggestionsList.innerHTML.trim() !== '') {
    suggestionsList.style.display = 'block';
    searchBox.setAttribute('aria-expanded', 'true');
    updateActiveItem();
  }
});

searchBox.addEventListener('blur', () => {
  setTimeout(closeSuggestions, 200); // Delay closing the suggestions to handle clicks on suggestions
});

function navigateResults(direction) {
  const maxIndex = results.length - 1;

  if (direction === 'down') {
    activeIndex = (activeIndex + 1) > maxIndex ? 0 : activeIndex + 1;
  } else if (direction === 'up') {
    activeIndex = (activeIndex - 1) < 0 ? maxIndex : activeIndex - 1;
  }

  updateActiveItem();
}

function updateActiveItem() {
  Array.from(results).forEach((result, index) => {
    const link = result.querySelector('a');

    if (index === activeIndex && !result.classList.contains('js-no-results')) {
      link.classList.add('bg-neutral-900', 'text-white', 'font-semibold');
      result.scrollIntoView({ block: 'nearest' });
      searchBox.value = link.querySelector('span').innerText;
    } else {
      link.classList.remove('bg-neutral-900', 'text-white', 'font-semibold');
    }
  });
}

function selectItem() {
  if (activeIndex !== -1) {
    const selectedItem = results[activeIndex];
    const link = selectedItem.querySelector('a');
    const url = link.getAttribute('href');
    window.location.href = url;
  }
}
