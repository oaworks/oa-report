// ================================================
// strategies.js
// State & DOM manipulation specific to Strategies
// ================================================

// =================================================
// Imports
// =================================================

import { updateURLParams, getAllURLParams } from './utils.js';

/**
 * Initialises event listeners for strategy tab buttons.
 */
export function initStrategyTabs() {
  const strategyTabBtns = document.querySelectorAll(".js_strategy_btn");

  strategyTabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", updateStrategyButtonStyling);
  });

  // Apply ?action=... on load (after buttons exist)
  const params = getAllURLParams();
  const action = params.action;
  if (action) {
    document.getElementById(`strategy_${action}`)?.click();
  } else if (strategyTabBtns.length) {
    shouldUpdateStrategyUrl = false;
    strategyTabBtns[0].click();
    shouldUpdateStrategyUrl = true;
  }
}

/**
 * Handles click events on tab buttons to switch between different tabs.
 * This function controls the display of tab content and updates the appearance of tabs based on the selected state.
 *
 * @param {Event} event - The click event object.
 */
function updateStrategyButtonStyling(event) {
  const tabBtn = event.target.closest(".js_strategy_btn");
  if (!tabBtn) return;

  const selectedStrategy = tabBtn.getAttribute("aria-controls");
  const selectedTabContents = document.querySelector(`.js_strategies #${selectedStrategy}`);

  if (!selectedTabContents) {
    console.error(`No tab content found with ID ${selectedStrategy}`);
    return;
  }

  // Hide all strategy contents
  document.querySelectorAll(".js_strategy").forEach((tab) => {
    tab.classList.add("hidden");
    tab.setAttribute("hidden", true);
  });

  // Show selected content
  selectedTabContents.classList.remove("hidden");
  selectedTabContents.removeAttribute("hidden");

  // Update button styles
  document.querySelectorAll(".js_strategy_btn").forEach((btn) => {
    btn.classList.remove("bg-neutral-100", "text-neutral-900", "shadow-inner");
    btn.classList.add("text-neutral-300", "bg-transparent", "hover:bg-neutral-700/70");
    const badge = btn.querySelector("[id^='count_']");
    if (badge) {
      badge.classList.remove("bg-neutral-900", "text-neutral-200");
      badge.classList.add("bg-neutral-700", "text-neutral-100");
    }
    btn.setAttribute("aria-selected", "false");
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("tabindex", "-1");
  });

  tabBtn.classList.add("bg-neutral-100", "text-neutral-900", "shadow-inner");
  tabBtn.classList.remove("text-neutral-300", "bg-transparent", "hover:bg-neutral-700/70");
  const activeBadge = tabBtn.querySelector("[id^='count_']");
  if (activeBadge) {
    activeBadge.classList.add("bg-neutral-900", "text-neutral-200");
    activeBadge.classList.remove("bg-neutral-700", "text-neutral-100");
  }
  tabBtn.setAttribute("aria-selected", "true");
  tabBtn.setAttribute("aria-pressed", "true");
  tabBtn.setAttribute("tabindex", "0");

  // Update URL params
  if (shouldUpdateStrategyUrl) {
    updateURLParams({ 'action': selectedStrategy });
  }
}

let shouldUpdateStrategyUrl = true;
