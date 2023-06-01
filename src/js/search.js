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

document.addEventListener('click', (event) => {
  if (event.target !== searchBox) {
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
  }

  if (event.target.tagName.toLowerCase() === 'a') {
    searchBox.value = event.target.innerText;
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
  }
});