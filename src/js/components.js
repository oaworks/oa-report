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
 * This class handles opening and closing of a modal, as well as setting its title and content directly from HTML elements using data attributes.
 */
class Modal {
  constructor() {
    this.modal = document.querySelector('#dynamic-modal');
    this.closeModalBtn = this.modal.querySelector('.close-modal-btn');
    this.modalTitle = this.modal.querySelector('.modal-title');
    this.modalContent = this.modal.querySelector('.modal-content');

    // Bind the close event on the close button
    this.closeModalBtn.addEventListener('click', () => this.close());
    // Bind the close event on escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });
    // Bind the close event on clicking outside the modal content
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Automatically attach to trigger elements
    this.initTriggers();
  }

  /**
   * Searches for and initialises all modal trigger elements on the page.
   */
  initTriggers() {
    document.querySelectorAll('[data-modal-title][data-modal-content]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const title = trigger.getAttribute('data-modal-title');
        const content = trigger.getAttribute('data-modal-content');
        this.open(title, content);
      });
    });
  }

  /**
   * Opens the modal window with content and title provided.
   * @param {string} title - The title text to display in the modal.
   * @param {string} content - The HTML content to display in the modal.
   */
  open(title, content) {
    // Generate unique IDs for title and content (a11y requirement)
    const titleId = 'modal-title-' + new Date().getTime();
    const contentId = 'modal-content-' + new Date().getTime();
    this.modalTitle.textContent = title;
    this.modalTitle.id = titleId; // Set dynamic ID for title
    this.modalContent.innerHTML = content;
    this.modalContent.id = contentId; // Set dynamic ID for content

    // Show the modal
    this.modal.classList.remove('hidden');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    this.closeModalBtn.focus();

    // Set ARIA attributes for accessibility
    this.modal.setAttribute('aria-labelledby', titleId);
    this.modal.setAttribute('aria-describedby', contentId);
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

// Initialise the modal system
new Modal();