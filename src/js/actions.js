// ================================================
// actions.js
// State & DOM manipulation specific to Actions
// ================================================

// =================================================
// Imports
// =================================================

import { updateURLParams, getAllURLParams, announce } from './utils.js';
import { SEGMENTED_PILL_CLASSES } from './constants.js';

/**
 * Initialises event listeners for action tab buttons.
 */
export function initActionTabs() {
  const actionsButtons = document.getElementById("actions_buttons");
  if (!actionsButtons) return;

  if (actionsButtons.dataset.bound !== "true") {
    actionsButtons.addEventListener("click", updateStrategyButtonStyling);
    actionsButtons.dataset.bound = "true";
  }

  const actionTabBtns = actionsButtons.querySelectorAll(".js_strategy_btn");
  if (!actionTabBtns.length) return;

  // Apply ?action=... on load (after buttons exist)
  const params = getAllURLParams();
  const action = params.action;
  if (action) {
    const preferred = document.getElementById(`strategy_${action}`);
    if (preferred) {
      preferred.click();
      return;
    }
  }

  if (actionTabBtns.length) {
    shouldUpdateActionUrl = false;
    actionTabBtns[0].click();
    shouldUpdateActionUrl = true;
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
  const activeClasses = SEGMENTED_PILL_CLASSES.active.split(" ");

  const selectedAction = tabBtn.getAttribute("aria-controls");
  const selectedTabContents = document.querySelector(`.js_actions #${selectedAction}`);

  if (!selectedTabContents) {
    console.error(`No tab content found with ID ${selectedAction}`);
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
    btn.classList.remove(...activeClasses);
    btn.classList.add("text-white", "hover:bg-neutral-700/70", "bg-neutral-900/60");
    const badge = btn.querySelector("[id^='count_']");
    if (badge) {
      badge.classList.remove("bg-neutral-900", "text-neutral-200");
      badge.classList.add("bg-neutral-700", "text-neutral-100");
    }
    btn.setAttribute("aria-pressed", "false");
  });

  tabBtn.classList.add(...activeClasses);
  tabBtn.classList.remove("text-white", "hover:bg-neutral-700/70", "bg-neutral-900/60");
  const activeBadge = tabBtn.querySelector("[id^='count_']");
  if (activeBadge) {
    activeBadge.classList.add("bg-neutral-900", "text-neutral-200");
    activeBadge.classList.remove("bg-neutral-700", "text-neutral-100");
  }
  tabBtn.setAttribute("aria-pressed", "true");

  const actionName = tabBtn.textContent?.trim().replace(/\s+/g, " ");
  if (actionName) {
    announce(`Action type: ${actionName}.`);
  }

  // Update URL params
  if (shouldUpdateActionUrl) {
    updateURLParams({ 'action': selectedAction });
  }
}

let shouldUpdateActionUrl = true;
