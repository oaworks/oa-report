// =============
// components.js
// UI Components
// =============

/**
 * Toggles the visibility of the loading indicator.
 *
 * @param {boolean} show - Determines whether to show or hide the loading indicator.
 * @param {string} id - The ID of the loading indicator to show/hide.
 */
export function toggleLoadingIndicator(show, id) {
  const loader = document.getElementById(id);
  const loadingMessage = document.getElementById('loading_message'); // Get the loading message element for screen readers
  if (!loader || !loadingMessage) return;

  const minDisplayTime = 500; // minimum display time in milliseconds
  const fadeOutDuration = 300; // duration of fade-out effect in milliseconds, should match TailwindCSS class
  const now = Date.now();

  if (show) {
    loader.dataset.showTime = now; // Store the current time
    loader.className = 'fixed inset-0 z-50 flex justify-center items-center opacity-100 transition-opacity duration-300';
    loader.setAttribute('aria-busy', 'true'); // Indicate that the area is busy
    loadingMessage.textContent = 'Loading, please wait...'; // Set screen reader text
  } else {
    const timeShown = now - parseInt(loader.dataset.showTime || '0'); // How long the loader has been shown
    const hideLoader = () => {
      loader.className = 'fixed inset-0 z-50 flex justify-center items-center opacity-0 transition-opacity duration-300';
      setTimeout(() => {
        if (loader.className.includes('opacity-0')) { // Check if it's still hidden (user hasn't triggered it to show again)
          loader.className = 'hidden';
          loader.setAttribute('aria-busy', 'false'); // Indicate that the area is no longer busy
          loadingMessage.textContent = ''; // Clear screen reader text
        }
      }, fadeOutDuration);
    };

    if (timeShown < minDisplayTime) {
      // If the minimum display time hasn't been reached, wait for the remaining time
      setTimeout(hideLoader, minDisplayTime - timeShown);
    } else {
      // If min display time has passed, hide the loader immediately
      hideLoader();
    }
  }
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