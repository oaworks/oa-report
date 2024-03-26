// ================================================
// strategies.js
// State & DOM manipulation specific to Strategies
// ================================================

import { updateURLParams } from './utils.js';

/**
 * Initialises event listeners for strategy tab buttons.
 */
export function initStrategyTabs() {
  const strategyTabBtns = document.querySelectorAll(".js_strategy_btn");

  strategyTabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", updateStrategyButtonStyling);
  });
}

/**
 * Handles click events on tab buttons to switch between different tabs.
 * This function controls the display of tab content and updates the appearance of tabs based on the selected state.
 *
 * @param {Event} event - The click event object.
 */
function updateStrategyButtonStyling(event) {
  // Check if the target is a span and stop propagation if so
  if (event.target.tagName.toLowerCase() === 'span') {
    event.stopPropagation();
    return;
  }

  const tabBtn = event.currentTarget;
  const selectedStrategy = tabBtn.getAttribute("aria-controls");
  const selectedTabContents = document.querySelector(`.js_strategies #${selectedStrategy}`);
  const otherTabContents = document.querySelectorAll(`.js_strategy:not(#${selectedStrategy})`);
  const otherTabBtns = document.querySelectorAll(`.js_strategy_btn:not(#strategy_${selectedStrategy})`);

  // Update URL params 
  // TODO: This should be moved to a more generic function along with
  // other URL param updates in other files (see start, end, and breakdown params)
  updateURLParams({ 'action': selectedStrategy });

  // When unselected
  for (let tabContents of otherTabContents) {
    tabContents.classList.add("hidden");
    tabContents.setAttribute("hidden", true);
  }

  for (let unselectedTabBtn of otherTabBtns) {
    unselectedTabBtn.classList.remove("bg-carnation-300", "font-semibold");
    unselectedTabBtn.classList.add("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
    unselectedTabBtn.setAttribute("aria-selected", "false");
    unselectedTabBtn.setAttribute("tabindex", "-1");
  }

  // When selected
  selectedTabContents.classList.remove("hidden");
  selectedTabContents.removeAttribute("hidden");

  tabBtn.classList.add("bg-carnation-300", "font-semibold");
  tabBtn.classList.remove("hover:text-neutral-700", "hover:border-neutral-300", "font-normal");
  tabBtn.setAttribute("aria-selected", "true");
  tabBtn.setAttribute("tabindex", "0");
}