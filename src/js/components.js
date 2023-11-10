// =============
// UI Components
// =============

/**
 * Creates a button for each "group by" type in the data explore section.
 * 
 * @param {string} key - The key used to identify the group by type.
 * @param {Object} groupByKeyNames - The mapping object containing key names and display names for group by types.
 * @returns {HTMLButtonElement} The button element configured for the specified group by type.
 */
export function createGroupByBtn(key, groupByKeyNames) {
  const button = document.createElement("button");
  button.className = "items-center inline-flex p-2 px-4 mr-4 mt-4 px-3 rounded-full bg-carnation-100 font-medium text-xs md:text-sm text-neutral-900 transition duration-300 ease-in-out hover:bg-carnation-500";
  button.id = groupByKeyNames[key].id + "_button";
  
  const groupbyBtn = document.createElement("span");
  groupbyBtn.textContent = groupByKeyNames[key].plural;
  button.appendChild(groupbyBtn);

  // TODO: Get total numbers here 
  // const nbRecords = document.createElement("span");
  // nbRecords.className = "bg-neutral-800 text-white ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block";
  // nbRecords.textContent = "999";
  // button.appendChild(nbRecords);
  
  return button;
}

/**
 * Class representing a modal window.
 * This class handles opening and closing of a modal, as well as setting its title and content.
 */
class Modal {
  /**
   * Creates a Modal instance.
   * @param {string} titleSelector - The CSS selector for the title element of the modal's content.
   * @param {string} contentSelector - The CSS selector for the content element to display in the modal.
   */
  constructor(titleSelector, contentSelector) {
    this.modal = document.querySelector('#dynamic-modal');
    this.closeModalBtn = this.modal.querySelector('.close-modal-btn');
    this.modalTitle = this.modal.querySelector('.modal-title');
    this.modalContent = this.modal.querySelector('.modal-content');

    this.titleSelector = titleSelector;
    this.contentSelector = contentSelector;

    this.closeModalBtn.addEventListener('click', () => this.close());
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });

    // Adding event listener to close the modal on outside click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }

  /**
   * Opens the modal window with content and title fetched from the specified selectors.
   */
  open() {
    const titleElement = document.querySelector(this.titleSelector);
    const contentElement = document.querySelector(this.contentSelector);
  
    if (titleElement && contentElement) {
      this.modalTitle.textContent = titleElement.textContent;
  
      // Clear the current modal content
      this.modalContent.innerHTML = '';
  
      // Clone the content element and append it to the modal content
      const clonedContent = contentElement.cloneNode(true);
      clonedContent.classList.remove('hidden');
      
      // Update the `for` attribute of labels and `id` of inputs to maintain association
      // This is necessary to ensure that form inputs are still focussed visually 
      // when selecting their corresponding labels (for a11y)
      const labels = clonedContent.querySelectorAll('label');
      labels.forEach((label) => {
        const htmlFor = label.getAttribute('for');
        if (htmlFor) {
          const input = clonedContent.querySelector(`#${htmlFor}`);
          if (input) {
            const newID = `cloned-${htmlFor}`;
            label.setAttribute('for', newID);
            input.id = newID;
          }
        }
      });
  
      this.modalContent.append(clonedContent);
  
      this.modal.classList.remove('hidden');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('overflow-hidden');
      this.closeModalBtn.focus();
    } else {
      console.error('Title or content element not found.');
    }
  }  

  /**
   * Closes the modal window and resets the modal state.
   */
  close() {
    this.modal.classList.add('hidden');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  }
}

let currentModal = null; // Variable to keep track of the current modal instance