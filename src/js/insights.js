document.addEventListener('DOMContentLoaded', function() {
  const insightsBarContainer = document.querySelector('#insights_bar_container');
  const insightsBar = document.querySelector('#insights_bar');
  const insightsText = document.querySelector('#insights_text');
  const insightsSubset = document.querySelector('#insights_subset');
  const insightsSuperset = document.querySelector('#insights_superset');
  const yearButton2023 = document.querySelector('#start-year');
  const allTimeButton = document.querySelector('#all-time');
  let clickedHeader = null;

  function getCurrentYear() {
    if (yearButton2023.getAttribute('aria-pressed') === "true" && yearButton2023.textContent.trim() === "2023") {
        return '2023';
    } else if (allTimeButton.getAttribute('aria-pressed') === "true" && allTimeButton.textContent.trim() === "All time") {
        return 'allTime';
    } else {
        return null;
    }
  }

  function resetBars() {
      insightsSubset.style.width = '0%';
      insightsSuperset.style.width = '0%';
      insightsBar.classList.remove('striped-bg', 'bg-neutral-400');
      insightsText.textContent = 'Click on an Insight to visualise it';
  }

  function clearActiveStyles() {
      if (clickedHeader) {
          clickedHeader.parentElement.classList.remove('outline', 'outline-offset-2', 'outline-2', 'outline-carnation-300');
          clickedHeader = null;
      }
  }

  function handleInteraction(event, eventData, makeActive) {
    const currentYear = getCurrentYear();
    if (!currentYear) return;

    insightsSubset.style.width = eventData[currentYear].subset;
    insightsSuperset.style.width = eventData[currentYear].superset;
    insightsBar.classList.add('striped-bg', 'bg-neutral-400');

    if (eventData[currentYear].text) {
        if (insightsText) {
            insightsText.innerHTML = eventData[currentYear].text;
        }
    } else {
        const insightsText = document.querySelector('#insights_text');
        if (insightsText) {
            insightsText.innerHTML = ''; // Reset the text if there's no text associated
        }
    }

    const parentCard = event.currentTarget.parentElement;
    if (makeActive) {
        clearActiveStyles();
        parentCard.classList.add('outline', 'outline-offset-2', 'outline-2', 'outline-carnation-300');
        clickedHeader = event.currentTarget;
    } else {
        parentCard.classList.remove('outline', 'outline-offset-2', 'outline-2', 'outline-carnation-300');
    }
  }

  const events = [
    { 
      el: '#is_paper > header', 
      2023: {
          subset: '0%',
          superset: '100%',
          text: '40 articles in total'
      },
      allTime: {
          subset: '0%',
          superset: '100%',
          text: '3,049 articles in total'
      }
    },
    { 
      el: '#is_free_to_read > header', 
      2023: {
          subset: '85%',
          superset: '100%',
          text: '34 free-to-read articles of 40 articles'
      },
      allTime: {
          subset: '92.62%',
          superset: '100%',
          text: '2,824 free-to-read articles of 3,049 articles'
      }
    },
    { 
      el: '#is_compliant > header', 
      2023: {
          subset: '47.5%',
          superset: '92.5%',
          text: '19 policy-compliant articles of 37 articles covered'
      },
      allTime: {
          subset: '60.79%',
          superset: '94.66%',
          text: '1,854 policy-compliant articles of 2,886 articles covered'
      }
    },
    { 
      el: '#is_oa > header', 
      2023: {
          subset: '42.5%',
          superset: '100%',
          text: '17 OA articles of 40 articles'
      },
      allTime: {
          subset: '52.97%',
          superset: '100%',
          text: '1,615 OA articles of 3,049 articles'
      }
    },
    { 
      el: '#has_data_availability_statement > header', 
      2023: {
          subset: '52.5%',
          superset: '95%',
          text: '21 of 38 articles checked have a data availability statement'
      },
      allTime: {
          subset: '52.06%',
          superset: '96.03%',
          text: '1,587 of 2,928 articles checked have a data availability statement'
      }
    },
    { 
      el: '#has_open_data > header', 
      2023: {
          subset: '0%',
          superset: '0%',
          text: '<span class="text-white">No info available yet</span>'
      },
      allTime: {
          subset: '1.67%',
          superset: '13.18%',
          text: '<span class="text-white">51 of 402 articles with data have open data</span>'
      }
    },
    { 
      el: '#has_open_code > header', 
      2023: {
          subset: '0%',
          superset: '0%',
          text: '<span class="text-white">No info available yet</span>'
      },
      allTime: {
          subset: '0.23%',
          superset: '9.91%',
          text: '<span class="text-white">7 of 302 articles with code have open code</span>'
      }
    }
  ];

  if (insightsBarContainer) {
    events.forEach(event => {
      const header = document.querySelector(event.el);
      
      header.addEventListener('mouseenter', e => handleInteraction(e, event, false)); // Inactive on mouse enter

      header.addEventListener('mouseleave', e => {
        if (clickedHeader !== e.currentTarget) { // Only reset if it's not the clicked one
          resetBars();
        }
      });

      header.addEventListener('click', e => {
        e.stopPropagation();
        handleInteraction(e, event, true); // Active on click
      });
    });

    // Reset everything when clicked outside
    document.addEventListener('click', () => {
        clearActiveStyles();
        resetBars();
    });
  }
});