const apiEndpoint = document.body.getAttribute('data-api-endpoint');
const searchBox = document.getElementById('js-search-box');
const suggestionsList = document.getElementById('js-suggestions-list');
let debounceTimeout;

if (searchBox && suggestionsList) {
  async function fetchSuggestions(searchTerm) {
    try {
      const url = `https://bg.${apiEndpoint}.oa.works/oareport/orgs/suggest/search/${searchTerm}?include=name,url_slug,private`;
      const response = await fetch(url);
      const data = await response.json();

      const filteredData = data.filter(item => !item.private);

      if (Array.isArray(filteredData) && filteredData.some(item => item.hasOwnProperty('name'))) {
        suggestionsList.innerHTML = filteredData
          .map(
            result => `<li class="relative cursor-default border-b select-none"><a href="/${result.url_slug}" class="block text-neutral-700 hover:font-semibold hover:text-white hover:bg-neutral-900"><span class="p-3 block truncate">${result.name}</span></a></li>`
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
      console.error("Error fetching suggestions:", error);
    }
  }

  searchBox.addEventListener('input', (event) => {
    const searchTerm = event.target.value;

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 200);
  });
}
