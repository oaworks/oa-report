const apiEndpoint = document.body.getAttribute('data-api-endpoint');
const searchBox = document.getElementById('js-search-box');
const suggestionsList = document.getElementById('js-suggestions-list');
let debounceTimeout;

async function fetchSuggestions(searchTerm) {
  if (!searchTerm.trim()) {
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
    return;
  }

  try {
    const url = `https://${apiEndpoint}.oa.works/report/orgs/suggest/search/${searchTerm}?include=name,objectID,private`;
    const response = await fetch(url);
    const data = await response.json();

    const filteredData = data.filter(item => !item.private);

    if (Array.isArray(filteredData) && filteredData.some(item => item.hasOwnProperty('name'))) {
      suggestionsList.innerHTML = filteredData
        .map(
          result => `<li class="relative cursor-default border-b select-none text-neutral-700 hover:font-semibold hover:text-white hover:bg-neutral-900"><a href="/${result.objectID}"><span class="p-3 block truncate">${result.name}</span></a></li>`
        )
        .join('');
      suggestionsList.style.display = 'block';
    } else {
      suggestionsList.innerHTML = '<li class="relative cursor-default border-b select-none p-3 text-neutral-900">No results! If you think there should be, <a href="mailto:hello@oa.works&subject=OA.Report — I can’t find my organization" class="underline underline-offset-2 decoration-1">get in touch</a>.</li>';
      suggestionsList.style.display = 'block';
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
  
  if (clickedElement) {
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
  }
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
    if (index === activeIndex) {
      result.classList.add('bg-neutral-900', 'text-white', 'font-semibold');
      result.scrollIntoView({ block: 'nearest' });
      searchBox.value = result.querySelector('span').innerText;
    } else {
      result.classList.remove('bg-neutral-900', 'text-white', 'font-semibold');
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