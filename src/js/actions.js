// ================================================
// actions.js
// State & DOM manipulation specific to Actions
// ================================================

// =================================================
// Imports
// =================================================

import { updateURLParams, getAllURLParams, announce, getDecodedUrlQuery, orcidDisplayNames } from './utils.js';
import { SEGMENTED_PILL_CLASSES } from './constants.js';

// Matches a single authorships.author.display_name / .orcid filter clause (with
// or without the .keyword suffix depending on how it was added) and captures its
// value(s), so we can tell a single-author filter apart from a multi-author one.
const AUTHOR_FILTER_FIELD_PATTERN = /authorships\.author\.(?:display_name|orcid)(?:\.keyword)?\s*:\s*(\([^)]*\)|"(?:\\.|[^"\\])*")/gi;

/**
 * The current URL filter's (`?q=`) single author value — via
 * authorships.author.display_name or authorships.author.orcid — or null if
 * there isn't exactly one. Resolves ORCIDs to a display name via
 * orcidDisplayNames when cached, else falls back to the bare ORCID.
 * @returns {string|null}
 */
export function getSingleAuthorFilterName() {
  const q = getDecodedUrlQuery();
  if (!q) return null;

  AUTHOR_FILTER_FIELD_PATTERN.lastIndex = 0;
  let match;
  while ((match = AUTHOR_FILTER_FIELD_PATTERN.exec(q)) !== null) {
    const quotedValues = match[1].match(/"(?:\\.|[^"\\])*"/g) || [];
    if (quotedValues.length === 1) {
      const rawValue = quotedValues[0].slice(1, -1);
      return orcidDisplayNames.get(rawValue) || rawValue;
    }
  }
  return null;
}

/**
 * True when the report is scoped to a single author (see getSingleAuthorFilterName).
 * Gates the "wellcome_point_of_award_check" action, which is only meaningful
 * when reviewing one author's articles at a time.
 * @returns {boolean}
 */
export function isSingleAuthorFilterActive() {
  return getSingleAuthorFilterName() !== null;
}

const escapeHtml = (str) => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Formats an Actions table's rows as DOIs grouped under their shared next step,
 * read from each row's `data-doi`/`data-in-epmc`/`data-epmc-licence` attributes
 * (see the "wellcome_point_of_award_check" action's rowTemplate). Articles
 * missing from Europe PMC need depositing under CC-BY; those already there
 * just need their licence updated to CC-BY. Prefixed with the filtered
 * author's name/ORCID for context once pasted elsewhere, bolded in the
 * rich-text version for apps that accept it (e.g. Gmail, Outlook web).
 * @param {HTMLTableElement} element
 * @returns {{text: string, html: string}}
 */
export function formatDoiEpmcListForClipboard(element) {
  const doisByNextStep = new Map();
  Array.from(element.rows)
    .map(row => row.querySelector('[data-doi]'))
    .filter(Boolean)
    .forEach(cell => {
      const nextStep = cell.dataset.inEpmc === 'true'
        ? `No action needed: Published under ${cell.dataset.epmcLicence}; use CC-BY for future submissions`
        : 'Action needed: Deposit to Europe PMC with CC-BY licence';
      if (!doisByNextStep.has(nextStep)) doisByNextStep.set(nextStep, []);
      doisByNextStep.get(nextStep).push(cell.dataset.doi);
    });

  // Action-needed groups first, so the reader sees what to do before what not to worry about
  const orderedGroups = Array.from(doisByNextStep).sort(([a], [b]) =>
    (a.startsWith('Action needed') ? 0 : 1) - (b.startsWith('Action needed') ? 0 : 1)
  );

  const groupsText = orderedGroups.map(([nextStep, dois]) =>
    `${nextStep}:\n${dois.map(doi => `- https://doi.org/${doi}`).join('\n')}`
  ).join('\n\n');

  const authorName = getSingleAuthorFilterName();
  const heading = authorName ? `Non-compliant articles authored by ${authorName}:` : '';
  const text = authorName ? `${heading}\n\n${groupsText}` : groupsText;

  // Bold just the author heading (if any) and the "Action needed"/"No action needed" labels
  let html = escapeHtml(text);
  if (authorName) html = html.replace(escapeHtml(heading), `<strong>${escapeHtml(heading)}</strong>`);
  html = html
    .replace(/No action needed:/g, '<strong>No action needed:</strong>')
    .replace(/Action needed:/g, '<strong>Action needed:</strong>')
    .replace(/\n/g, '<br>');

  return { text, html };
}

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
