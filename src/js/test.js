/* Display publisher list from api-requests.js  */
// Using Fetch 
// async function fetchData() {
//   try {
//     const response = await fetch('https://bg.api.oa.works/report/works', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(postData)
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     displayPublishers(data);
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error.message);
//   }
// }

// Fetch data function using Axios
async function fetchData(postData, listId) {
  try {
    const response = await axios.post('https://bg.api.oa.works/report/works', postData);
    displayData(response.data, listId);
  } catch (error) {
    console.error('There was a problem with the request: ', error.message);
  }
}

// Display data in a list
function displayData(data, listId) {
  const ol = document.getElementById(listId);

  if (data.aggregations && data.aggregations.key && data.aggregations.key.buckets) {
    data.aggregations.key.buckets.forEach(bucket => {
      const li = document.createElement('li');
      li.textContent = bucket.key;
      ol.appendChild(li);
    });
  }
}

// Fetch data for ublishers and Grants, both all time and 2023. 
fetchData(publisherDataAlltime, 'publisher-list-all-time');
fetchData(publisherData2023, 'publisher-list-2023');
fetchData(grantDataAlltime, 'grant-list-all-time');
fetchData(grantData2023, 'grant-list-2023');
