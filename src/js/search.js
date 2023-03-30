const searchBox = document.getElementById('searchBox');
const suggestionsList = document.getElementById('suggestionsList');
let debounceTimeout;

async function fetchSuggestions(searchTerm) {
    if (!searchTerm.trim()) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
        return;
    }

    try {
        const url = `https://beta.oa.works/report/orgs/suggest/search/${searchTerm}?include=name,objectID,private`;
        const response = await fetch(url);
        const data = await response.json();

        const filteredData = data.filter(item => !item.private);

        if (Array.isArray(filteredData) && filteredData.some(item => item.hasOwnProperty('name'))) {
            suggestionsList.innerHTML = filteredData.map(result => `<li><a href="https://oa.report/${result.objectID}">${result.name}</a></li>`).join('');
            suggestionsList.style.display = 'block';
        } else {
            suggestionsList.innerHTML = '<li>No results! If you think there should be, <a href="mailto:contact@yourdomain.com">get in touch</a>.</li>';
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
    }, 300);
});

suggestionsList.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'a') {
        searchBox.value = event.target.innerText;
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
    }
});

document.addEventListener('click', (event) => {
    if (event.target !== searchBox) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
    }
});
