// =================================================
// report-filter-manager.js
// Manages top-level Filters chip + popover
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

let orgData;
orgDataPromise.then((res) => { orgData = res.data; });

/**
 * Derive a human-readable label from an ES field key.
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
 * Build <select> options for the filter form from all term-based Explore items.
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

  const out = [];
  let m;

  while ((m = re.exec(q)) !== null) {
    const rawKey = m[1] || m[3] || m[5];
    let rawVal   = m[2] || m[4] || m[6];

    const key = normaliseFieldId(rawKey);
    const label = labelFromFieldKey(rawKey);

    // If this was a parenthesised OR group, render as a comma-separated list
    if (m[4]) {
      const parts = m[4]
        .split(/\s+OR\s+/i)
        .map((s) => s.replace(/^"+|"+$/g, ""));
      rawVal = parts.join(", ");
    }

    // Country codes to names in the filter search
    const value = 
      (/country(_code)?$/i.test(key) && COUNTRY_CODES[rawVal]) ? COUNTRY_CODES[rawVal] : rawVal;

    out.push({ label, value });
  }

  return out;
}

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
  row.className = "js-filter-row mb-3 p-2 border border-neutral-200 bg-neutral-50";

  const fieldWrapper = document.createElement("div");
  fieldWrapper.className = "mb-2 flex items-center";

  const fieldLabel = document.createElement("label");
  const fieldId = `js-filter-field-${idSuffix}`;
  fieldLabel.setAttribute("for", fieldId);
  fieldLabel.className = "mr-3 font-semibold uppercase text-[10px] md:text-xs";
  fieldLabel.textContent = "Filter field";

  const fieldSelect = document.createElement("select");
  fieldSelect.id = fieldId;
  fieldSelect.className = "js-filter-field h-8 md:h-9 px-2 border border-neutral-900 bg-white text-xs md:text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900";

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

  const textLabel = document.createElement("label");
  const inputId = `js-filter-input-${idSuffix}`;
  textLabel.setAttribute("for", inputId);
  textLabel.className = "sr-only";
  textLabel.textContent = "Filter values";

  const textarea = document.createElement("textarea");
  textarea.id = inputId;
  textarea.className = "js-filter-input mt-1 w-full border border-neutral-900 bg-white text-xs md:text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900";
  textarea.rows = 2;
  textarea.placeholder = "Type values (e.g. OPP1128001 OR OPP1182001). You can also use OR and AND.";

  textWrapper.appendChild(textLabel);
  textWrapper.appendChild(textarea);

  row.appendChild(fieldWrapper);
  row.appendChild(textWrapper);

  container.appendChild(row);
}

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
  form.className = DATE_SELECTION_BUTTON_CLASSES.enabled + " flex items-center whitespace-nowrap";
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
  pop.className = "p-2 md:p-3 text-xs md:text-sm";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-labelledby", "js-filters-form-title");
  pop.style.maxWidth = "600px";

  const heading = document.createElement("p");
  heading.className = "mb-2 font-medium text-neutral-900";
  heading.textContent = count ? `Active filters (${count})` : "No active filters yet";
  pop.appendChild(heading);

  const chipsList = document.createElement("ul");
  chipsList.className = "mb-2 flex flex-wrap";

  if (pairs.length) {
    pairs.forEach(({ label, value }) => {
      const li = document.createElement("li");
      li.className = "inline-flex items-center px-2 py-0.5 border border-neutral-300 bg-neutral-50 text-[11px] md:text-xs mr-1 mb-1";
      li.innerHTML = `
        <span class="text-neutral-700 mr-1">${label}:</span>
        <span class="font-medium text-neutral-900">${value}</span>
      `;
      chipsList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.className = "text-[11px] md:text-xs text-neutral-600";
    li.textContent = "Use the form below to add filters.";
    chipsList.appendChild(li);
  }

  pop.appendChild(chipsList);

  let clearBtn = null;

  if (pairs.length) {
    clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.id = "js-clear-q-popover";
    clearBtn.className = "mt-1 mb-3 p-2 border w-full justify-center";
    clearBtn.textContent = "Clear filters";
    pop.appendChild(clearBtn);
  }

  // Container for dynamic filter rows
  const rowsContainer = document.createElement("div");
  rowsContainer.className = "js-filter-rows mt-2 space-y-3";
  pop.appendChild(rowsContainer);

  // Start with one row
  addFilterRow(rowsContainer);

  const addRowBtn = document.createElement("button");
  addRowBtn.type = "button";
  addRowBtn.id = "js-add-filter-row";
  addRowBtn.className = "mt-1 mb-3 p-2 border w-full justify-center";
  addRowBtn.textContent = "Add another";
  pop.appendChild(addRowBtn);

  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.id = "js-apply-filters";
  applyBtn.className = "mt-1 mb-3 p-2 border w-full justify-center";
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

  // Add another filter row
  addRowBtn.addEventListener("click", () => {
    addFilterRow(rowsContainer);
  });

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

      // Support "ID1, ID2" or "ID1 OR ID2" or "ID1 AND ID2"
      const tokens = raw
        .replace(/\s+(OR|AND)\s+/gi, ",")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      if (!tokens.length) return;

      const quoted = tokens.map((value) => `"${value.replace(/"/g, '\\"')}"`);

      const clause =
        quoted.length === 1
          ? `${field}:${quoted[0]}`
          : `${field}:(${quoted.join(" OR ")})`;

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