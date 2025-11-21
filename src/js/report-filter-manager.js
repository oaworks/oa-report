// =================================================
// report-filter-manager.js
// Manages the top-level Filters chip and popover
// =================================================

// =================================================
// Imports
// =================================================

import {
  getDecodedUrlQuery,
  updateURLParams,
  removeURLParams,
  buildEncodedQueryWithUrlFilter,
  normaliseFieldId,
  pluraliseNoun
} from "./utils.js";

import {
  EXPLORE_ITEMS_LABELS,
  EXPLORE_FILTERS_LABELS,
  EXPLORE_HEADER_TERMS_LABELS,
  EXPLORE_HEADER_ARTICLES_LABELS,
  COUNTRY_CODES,
  DATE_SELECTION_BUTTON_CLASSES
} from "./constants.js";

import { orgDataPromise } from './insights-and-strategies.js';

import { handleFiltersChanged } from './explore.js';

// =================================================
// State
// =================================================

/**
 * Cached org data from the org index response.
 * @type {Object|undefined}
 */
let orgData;
orgDataPromise.then((res) => { orgData = res.data; });

// =================================================
// Helpers
// =================================================

/**
 * Derives a readable label from an ES field key.
 * Falls back to header/filter labels, then a cleaned version of the key.
 *
 * @param {string} rawKey
 * @returns {string}
 */
function labelFromFieldKey(rawKey) {
  if (!rawKey) return "";

  const normalised = normaliseFieldId(rawKey);
  let label;

  // 1. Try to match this field key to an Explore item.term
  try {
    const exploreConfig = orgData?.hits?.hits?.[0]?._source?.explore || [];

    const matchingItem = exploreConfig.find((item) => {
      if (!item.term) return false;
      // Match either exact term or normalised term
      return item.term === rawKey || normaliseFieldId(item.term) === normalised;
    });

    if (matchingItem) {
      const itemId = matchingItem.id;
      const itemLabels = EXPLORE_ITEMS_LABELS[itemId];

      // Use the same mechanism as the Explore buttons
      if (itemLabels) {
        label = itemLabels.plural || itemLabels.label || itemLabels.singular;
      } else {
        label = pluraliseNoun(itemId);
      }
    }
  } catch (e) {
    // If anything goes wrong here, just fall through to the existing fallbacks
  }

  // 2. If we still don't have a label, fall back to the existing label sources
  const fromFilters =
    EXPLORE_FILTERS_LABELS[rawKey] ||
    EXPLORE_FILTERS_LABELS[normalised];

  const fromArticles =
    EXPLORE_HEADER_ARTICLES_LABELS[rawKey] ||
    EXPLORE_HEADER_ARTICLES_LABELS[normalised];

  const fromTerms =
    EXPLORE_HEADER_TERMS_LABELS[rawKey] ||
    EXPLORE_HEADER_TERMS_LABELS[normalised];

  if (!label) {
    label =
      fromFilters?.label ||
      fromArticles?.label ||
      fromTerms?.label ||
      normalised
        .replace(/^openalex[.\s_]+/i, "")
        .replace(/[._]/g, " ");
  }

  if (label && label.length) {
    label = label.charAt(0).toUpperCase() + label.slice(1);
  }

  return label;
}

/**
 * Builds <select> options for the filter form from term-based Explore items.
 *
 * @param {Array<Object>} exploreData
 * @returns {{value:string,label:string}[]}
 */
function buildFilterFieldOptions(exploreData) {
  if (!Array.isArray(exploreData)) return [];

  // Only expose specific fields for search-to-filter ("Add filter")
  // See https://github.com/oaworks/discussion/issues/3616#issuecomment-3553985006
  const ALLOWED_TERMS = new Map([
    ["supplements.grantid__bmgf", "Grants"],
    ["authorships.institutions.display_name", "Institutions"],
    ["journal", "Journals"],
    ["supplements.host_venue.display_name", "Preprint servers"],
    ["supplements.program__bmgf", "Programs"],
    ["supplements.publisher_simple", "Publishers"],
    ["concepts.display_name", "Subjects"]
  ]);

  const seen = new Set();
  const options = [];

  exploreData.forEach((item) => {
    const fieldKey = item.term;
    if (!ALLOWED_TERMS.has(fieldKey) || seen.has(fieldKey)) return;
    seen.add(fieldKey);

    const label =
      EXPLORE_ITEMS_LABELS[item.id]?.label ||
      ALLOWED_TERMS.get(fieldKey) ||
      labelFromFieldKey(fieldKey);

    options.push({ value: fieldKey, label });
  });

  options.sort((a, b) => a.label.localeCompare(b.label));
  return options;
}

/**
 * Parses the decoded ?q= string into [{label, value}] pairs.
 * Uses the same normalisation as table headers for consistent labels.
 * Falls back to raw keys if no constant label is found.
 * 
 * Handles parenthesised OR groups, e.g.
 *   supplements.grantid__bmgf:("INV-1" OR "INV-2")
 *
 * @param {string} q
 * @returns {{label:string,value:string}[]}
 */
function parseEsQueryToPairs(q) {
  if (!q) return [];

  const re = /([A-Za-z0-9._]+):"([^"]+)"|([A-Za-z0-9._]+):\(([^)]+)\)|([A-Za-z0-9._]+):([^\s]+)/g;

  const tidyValue = (val) => val.replace(/^"+|"+$/g, "");
  const renderGroup = (group) => {
    const inner = group.trim();
    if (!inner) return "";
    if (/\s+OR\s+/i.test(inner)) {
      return inner
        .split(/\s+OR\s+/i)
        .map(tidyValue)
        .join(", ");
    }
    if (/\s+AND\s+/i.test(inner)) {
      return inner
        .split(/\s+AND\s+/i)
        .map(tidyValue)
        .join(" AND ");
    }
    return tidyValue(inner);
  };

  const out = [];
  let m;

  while ((m = re.exec(q)) !== null) {
    const rawKey = m[1] || m[3] || m[5];
    let rawVal   = m[2] || m[4] || m[6];

    const key = normaliseFieldId(rawKey);
    const label = labelFromFieldKey(rawKey);

    // Clean up display of values
    rawVal = m[4] ? renderGroup(m[4]) : tidyValue(rawVal);

    // Country codes to names in the filter search
    const value = 
      (/country(_code)?$/i.test(key) && COUNTRY_CODES[rawVal]) ? COUNTRY_CODES[rawVal] : rawVal;

    out.push({ label, value });
  }

  return out;
}

// =================================================
// DOM helpers
// =================================================

/**
 * Adds a single "Filter field + textarea" row into the given container.
 *
 * @param {HTMLElement} container
 */
function addFilterRow(container) {
  const exploreConfig = orgData?.hits?.hits?.[0]?._source?.explore || [];
  const options = buildFilterFieldOptions(exploreConfig);
  if (!options.length || !container) return;

  const idSuffix = Math.random().toString(36).slice(2);

  const row = document.createElement("div");
  row.className = "js-filter-row space-y-3";

  const fieldWrapper = document.createElement("div");
  fieldWrapper.className = "w-full";

  const fieldLabel = document.createElement("label");
  const fieldId = `js-filter-field-${idSuffix}`;
  fieldLabel.setAttribute("for", fieldId);
  fieldLabel.className = "flex items-center text-neutral-800 text-[11px] md:text-xs font-medium uppercase tracking-wide";
  fieldLabel.textContent = "Field";

  const fieldSelect = document.createElement("select");
  fieldSelect.id = fieldId;
  fieldSelect.className = "js-filter-field w-full h-8 md:h-9 px-2 border border-neutral-900 bg-white text-xs md:text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Select a field";
  fieldSelect.appendChild(placeholderOption);

  options.forEach(({ value, label }) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    fieldSelect.appendChild(opt);
  });

  fieldWrapper.appendChild(fieldLabel);
  fieldWrapper.appendChild(fieldSelect);

  const textWrapper = document.createElement("div");
  textWrapper.className = "w-full";

  const textLabel = document.createElement("div");
  textLabel.className = "flex items-center text-neutral-800 text-[11px] md:text-xs font-medium uppercase tracking-wide";
  textLabel.textContent = "Values";

  const helpIcon = document.createElement("button");
  helpIcon.type = "button";
  helpIcon.className = "ml-2 text-neutral-600 underline underline-offset-4 decoration-dotted text-[11px]";
  helpIcon.setAttribute("aria-label", "How to format filter values");
  helpIcon.textContent = "(?)";
  textLabel.appendChild(helpIcon);

  const helpText = `
    <div class="p-2 md:p-3">
      <p class="mb-2 text-sm font-medium text-neutral-900 normal-case">Add values for this field</p>
      <ul class="list-disc ml-4 text-xs text-neutral-800 space-y-1 normal-case">
        <li>Type one or more values separated by commas.</li>
        <li>Use OR to match any value (e.g. OPP1128001 OR OPP1182001).</li>
        <li>Use AND to combine conditions when needed.</li>
        <li>Values are treated as exact matches.</li>
      </ul>
    </div>
  `;

  tippy(helpIcon, {
    content: helpText,
    allowHTML: true,
    theme: "popover",
    maxWidth: 320,
    interactive: true,
    placement: "top",
  });

  const inputId = `js-filter-input-${idSuffix}`;
  const textarea = document.createElement("textarea");
  textarea.id = inputId;
  textarea.className = "js-filter-input mt-1 p-2 w-full h-32 border border-neutral-900 bg-white text-xs md:text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900";
  textarea.rows = 2;
  textarea.placeholder = "";

  textWrapper.appendChild(textLabel);
  textWrapper.appendChild(textarea);

  row.appendChild(fieldWrapper);
  row.appendChild(textWrapper);

  container.appendChild(row);
}

// =================================================
// Public API
// =================================================

/**
 * Renders the Filters chip in the top nav and wires a Tippy popover
 * that shows:
 *  - Active filters summary (chips + Clear filters)
 *  - A wider multi-filter form (Filter field + textarea rows)
 */
export function renderActiveFiltersBanner() {
  const wrapper = document.querySelector(".js-active-filters-wrapper");
  const mount = document.getElementById("js-active-filters");
  if (!wrapper || !mount) return;

  // Clean up any previous Tippy instance on the trigger
  const oldTrigger = document.getElementById("js-filters-trigger");
  if (oldTrigger && oldTrigger._tippy) {
    oldTrigger._tippy.destroy();
  }

  const q = getDecodedUrlQuery();
  const pairs = parseEsQueryToPairs(q);
  const count = pairs.length;

  wrapper.classList.remove("hidden");
  mount.innerHTML = "";

  // Trigger form styled like other date/year chips
  const form = document.createElement("form");
  form.id = "filters_form";
  form.className = DATE_SELECTION_BUTTON_CLASSES.enabled + " !mr-0 !md:mr-0 flex items-center whitespace-nowrap";
  form.setAttribute("aria-labelledby", "js-filters-form-title");

  const formTitle = document.createElement("h2");
  formTitle.id = "js-filters-form-title";
  formTitle.textContent = "Manage filters";
  formTitle.className = "sr-only";
  form.appendChild(formTitle);

  const triggerBtn = document.createElement("button");
  triggerBtn.type = "button";
  triggerBtn.id = "js-filters-trigger";
  triggerBtn.innerHTML = `Filters (${count}) <span class="ml-1 text-xs">▼</span>`;
  triggerBtn.setAttribute("aria-haspopup", "dialog");
  triggerBtn.setAttribute("aria-expanded", "false");
  triggerBtn.style.color = "inherit";
  form.appendChild(triggerBtn);

  mount.appendChild(form);

  // Popover content (wider than date range)
  const pop = document.createElement("div");
  pop.className = "p-3 md:p-4 text-xs md:text-sm";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-labelledby", "js-filters-form-title");
  pop.style.maxWidth = "min(95vw, 960px)";

  const heading = document.createElement("p");
  heading.className = "mb-2 font-medium text-neutral-900";
  heading.textContent = count ? `Active (${count})` : "Nothing selected yet";
  pop.appendChild(heading);

  const chipsList = document.createElement("ul");
  chipsList.className = "mb-2 flex flex-wrap";

  if (pairs.length) {
    pairs.forEach(({ label, value }) => {
      const li = document.createElement("li");
      li.className = "inline-flex items-center px-2 py-0.5 bg-carnation-100 text-[11px] md:text-xs mr-1 mb-1";
      li.innerHTML = `
        <span class="text-neutral-700 mr-1">${label}:</span>
        <span class="font-medium text-neutral-900">${value}</span>
      `;
      chipsList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.className = "text-[11px] md:text-xs text-neutral-600";
    li.textContent = "Use the form to add a rule.";
    chipsList.appendChild(li);
  }

  pop.appendChild(chipsList);

  let clearBtn = null;

  if (pairs.length) {
    clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.id = "js-clear-q-popover";
    clearBtn.className = "mt-1 mb-3 p-2 border border-neutral-400 text-neutral-900 rounded-sm w-full justify-center hover:bg-neutral-100";
    clearBtn.textContent = "Clear all";
    pop.appendChild(clearBtn);
  }

  // Container for dynamic filter rows
  const formSection = document.createElement("div");
  formSection.className = "mt-3 pt-3 border-t border-neutral-200 space-y-3";

  const formHeading = document.createElement("p");
  formHeading.className = "text-xs md:text-sm font-semibold text-neutral-900";
  formHeading.textContent = "Add a rule";
  formSection.appendChild(formHeading);

  const rowsContainer = document.createElement("div");
  rowsContainer.className = "js-filter-rows space-y-3";
  formSection.appendChild(rowsContainer);
  pop.appendChild(formSection);

  // Start with one row
  addFilterRow(rowsContainer);

  // Add another row button — not needed yet 
  // See https://github.com/oaworks/discussion/issues/3616#issuecomment-3558260193
  // const addRowBtn = document.createElement("button");
  // addRowBtn.type = "button";
  // addRowBtn.id = "js-add-filter-row";
  // addRowBtn.className = "mt-1 mb-3 p-2 border w-full justify-center";
  // addRowBtn.textContent = "Add another";
  // pop.appendChild(addRowBtn);

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.id = "js-apply-filters";
  applyBtn.className = "mt-1 mb-1 p-2 rounded-sm w-full justify-center bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900";
  applyBtn.textContent = "Apply";
  pop.appendChild(applyBtn);

  // Tippy instance, same pattern as custom date range
  const tip = tippy(triggerBtn, {
    content: pop,
    allowHTML: true,
    interactive: true,
    placement: "bottom",
    appendTo: document.body,
    trigger: "click",
    theme: "popover",
    arrow: false,
    onShow() {
      triggerBtn.setAttribute("aria-expanded", "true");
    },
    onHide() {
      triggerBtn.setAttribute("aria-expanded", "false");
    },
  });

  // Add another filter row — not needed yet 
  // See https://github.com/oaworks/discussion/issues/3616#issuecomment-3558260193
  // addRowBtn.addEventListener("click", () => {
  //   addFilterRow(rowsContainer);
  // });

  // Clear filters behaviour (same as before)
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      removeURLParams("q");
      tip.hide();
      handleFiltersChanged();
    });
  }

  // Apply: gather all rows, build clauses, AND them in one go
  applyBtn.addEventListener("click", () => {
    const clauses = [];

    rowsContainer.querySelectorAll(".js-filter-row").forEach((row) => {
      const fieldSelect = row.querySelector(".js-filter-field");
      const input = row.querySelector(".js-filter-input");
      if (!fieldSelect || !input) return;

      const field = fieldSelect.value;
      const raw = input.value.trim();

      if (!field || !raw) return;

      // Support "ID1, ID2" (OR), "ID1 OR ID2", "ID1 AND ID2"
      // Commas inside a segment are OR
      const operators = [];
      const segments = [];
      const opRegex = /\s+(AND|OR)\s+/gi;
      let lastIndex = 0;
      raw.replace(opRegex, (match, op, offset) => {
        segments.push(raw.slice(lastIndex, offset).trim());
        operators.push(op.toUpperCase());
        lastIndex = offset + match.length;
      });
      segments.push(raw.slice(lastIndex).trim());

      const pieceExprs = [];

      segments.forEach((segment, idx) => {
        if (!segment) return;
        const values = segment
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
          .map((v) => `"${v.replace(/"/g, '\\"')}"`);

        if (!values.length) return;

        const valueExpr =
          values.length === 1 ? values[0] : `(${values.join(" OR ")})`;

        pieceExprs.push(valueExpr);
        if (idx < operators.length) {
          pieceExprs.push(operators[idx]);
        }
      });

      if (!pieceExprs.length) return;

      const clause =
        pieceExprs.length === 1
          ? `${field}:${pieceExprs[0]}`
          : `${field}:(${pieceExprs.join(" ")})`;

      clauses.push(clause);
    });

    if (!clauses.length) {
      tip.hide();
      return;
    }

    const combined = clauses.join(" AND ");

    updateURLParams({
      q: buildEncodedQueryWithUrlFilter(combined),
    });

    handleFiltersChanged();
    tip.hide();
  });
}
