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
  andQueryStrings,
  normaliseFieldId,
  pluraliseNoun
} from "./utils.js";
import { API_BG_BASE_URL } from "./constants/api.js";

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

  // Remove outer wrapping parentheses so top-level AND splitting works
  const query = (() => {
    let out = q.trim();
    const balanced = (s) => {
      let depth = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") depth++;
        if (s[i] === ")") depth--;
        if (depth === 0 && i < s.length - 1) return false;
      }
      return depth === 0;
    };
    while (out.startsWith("(") && out.endsWith(")") && balanced(out)) {
      out = out.slice(1, -1).trim();
    }
    return out;
  })();

  const splitTopLevel = (str, keyword) => {
    const parts = [];
    let buf = "";
    let depth = 0;
    let inQuote = false;
    const needle = ` ${keyword} `;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === '"') inQuote = !inQuote;
      if (!inQuote) {
        if (ch === "(") depth++;
        if (ch === ")" && depth > 0) depth--;
        if (depth === 0 && str.slice(i, i + needle.length).toUpperCase() === needle) {
          parts.push(buf.trim());
          buf = "";
          i += needle.length - 1;
          continue;
        }
      }
      buf += ch;
    }

    if (buf.trim()) parts.push(buf.trim());
    return parts.length ? parts : [str.trim()];
  };

  const unwrapParens = (val) => {
    let out = val.trim();
    const balanced = (s) => {
      let depth = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") depth++;
        if (s[i] === ")") depth--;
        if (depth === 0 && i < s.length - 1) return false;
      }
      return depth === 0;
    };
    while (out.startsWith("(") && out.endsWith(")") && balanced(out)) {
      out = out.slice(1, -1).trim();
    }
    return out;
  };

  const renderValue = (key, rawVal) =>
    splitTopLevel(rawVal, "AND")
      .map((segment) =>
        splitTopLevel(unwrapParens(segment), "OR")
          .map((part) =>
            part
              .replace(/["()]/g, "")
              .trim()
          )
          .filter(Boolean)
          .map((val) =>
            /country(_code)?$/i.test(key) && COUNTRY_CODES[val] ? COUNTRY_CODES[val] : val
          )
          .join(", ")
      )
      .filter(Boolean)
      .join(" AND ");

  return splitTopLevel(query, "AND")
    .map((clause) => {
      const cleanedClause = unwrapParens(clause);
      const m = cleanedClause.match(/^\s*\(?\s*([A-Za-z0-9._]+)\s*:\s*(.+?)\s*\)?\s*$/);
      if (!m) return null;
      const rawKey = m[1];
      const value = renderValue(rawKey, unwrapParens(m[2]));
      return value ? { label: labelFromFieldKey(rawKey), value } : null;
    })
    .filter(Boolean);
}

/**
 * Fetch autocomplete suggestions for a given field and org.
 *
 * @param {Object} params
 * @param {string} params.field  - ES field id (e.g., journal, concepts.display_name)
 * @param {string} params.query  - User-entered prefix/term to match
 * @param {number} [params.size=10] - Max number of suggestions to return
 * @returns {Promise<string[]>} Ordered list of suggested values (unique, trimmed)
 */
export async function fetchFilterValueSuggestions({ field, query, size = 10 }) {
  if (!field || !query || !query.trim()) return [];

  // Try the works terms endpoint first (scoped by org + existing filters), preferring ".keyword" for dotted fields
  let qClean = query.trim();
  try {
    qClean = decodeURIComponent(qClean);
  } catch (e) {
    // If already decoded/invalid, keep as-is
  }
  const existingQ = getDecodedUrlQuery();
  const orgName = orgData?.hits?.hits?.[0]?._source?.name;

  const candidates = field.includes(".")
    ? [ `${field}.keyword`, field ]
    : [ field, `${field}.keyword` ];
  const candidateFields = Array.from(new Set(candidates));

  // Scoped terms-based suggestions
  for (const f of candidateFields) {
    try {
      const parts = [];
      if (orgName) {
        const safeOrg = orgName.replace(/"/g, '\\"');
        parts.push(`orgs.keyword:"${safeOrg}"`);
      }
      if (existingQ) parts.push(`(${existingQ})`);
      parts.push(`${f}:*${qClean}*`);

      const qParam = encodeURIComponent(parts.join(" AND "));
      const url = `${API_BG_BASE_URL}works/terms/${f}?counts=false&size=${size}&q=${qParam}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || !data.length) continue;

      const seen = new Set();
      const values = [];
      data.forEach((item) => {
        const val = (
          typeof item === "string"
            ? item
            : item?.key || item?.value || item?.label || ""
        ).trim();
        if (val && !seen.has(val)) {
          seen.add(val);
          values.push(val);
        }
      });

      if (values.length) return values.slice(0, size);
    } catch (err) {
      console.error("Error fetching filter suggestions (terms):", err);
    }
  }

  // Fallback to unscoped suggest if terms returns nothing
  for (const f of candidateFields) {
    try {
      // Do not encode the field (dotted names need to remain intact); only encode the query
      const url = `${API_BG_BASE_URL}works/suggest/${f}/${encodeURIComponent(qClean)}?size=${size}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || !data.length) continue;

      const seen = new Set();
      const values = [];
      data.forEach((item) => {
        const val = (typeof item === "string" ? item : item?.value || item?.label || "").trim();
        if (val && !seen.has(val)) {
          seen.add(val);
          values.push(val);
        }
      });

      if (values.length) return values.slice(0, size);
    } catch (err) {
      console.error("Error fetching filter suggestions (suggest fallback):", err);
    }
  }

  return [];
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
  fieldSelect.required = true;
  fieldSelect.setAttribute("aria-required", "true");

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
  textWrapper.className = "w-full relative";

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
      <ul class="list-disc ml-4 text-xs text-neutral-800 space-y-1 normal-case font-normal">
        <li>Enter one or more values to match any of them; <strong>commas</strong> and <strong><code>OR</code></strong> both mean “any” (e.g., <code>INV-001, INV-002</code> or <code>INV-001 OR INV-002</code> both return publications under either grant).</li>
        <li>Use <strong><code>AND</code></strong> when all values must be present (e.g., <code>Economic growth AND Artificial intelligence</code> returns publications about both Economic growth and Artificial intelligence).</li>
        <li>Values ignore case and match whole words (e.g., typing <code>oxford</code> or <code>OXFORD UNIVERSITY PRESS</code> finds <code>Oxford University Press</code>, but abbreviations like <code>OUP</code> will not match).</li>
      </ul>
    </div>
  `;

  tippy(helpIcon, {
    content: helpText,
    allowHTML: true,
    theme: "popover",
    maxWidth: 320,
    interactive: true,
    placement: "bottom",
  });

  const inputId = `js-filter-input-${idSuffix}`;
  const textarea = document.createElement("textarea");
  textarea.id = inputId;
  textarea.className = "js-filter-input mt-1 p-2 w-full h-32 border border-neutral-900 bg-white text-xs md:text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900";
  textarea.rows = 2;
  textarea.placeholder = "";
  textarea.required = true;
  textarea.setAttribute("aria-required", "true");
  textarea.setAttribute("role", "combobox");
  textarea.setAttribute("aria-autocomplete", "list");
  textarea.setAttribute("aria-expanded", "false");

  const listboxId = `js-filter-suggestions-${idSuffix}`;
  textarea.setAttribute("aria-controls", listboxId);

  const listbox = document.createElement("ul");
  listbox.id = listboxId;
  listbox.className = "js-filter-suggestions absolute z-10 mt-1 w-full bg-white border border-neutral-300 shadow-sm max-h-48 overflow-auto hidden";
  listbox.setAttribute("role", "listbox");
  listbox.setAttribute("aria-label", "Filter value suggestions");

  textWrapper.appendChild(textLabel);
  textWrapper.appendChild(textarea);
  textWrapper.appendChild(listbox);

  row.appendChild(fieldWrapper);
  row.appendChild(textWrapper);

  // Debounced fetch of value suggestions
  let suggestTimer = null;
  let activeIndex = -1;

  const hideSuggestions = () => {
    listbox.classList.add("hidden");
    textarea.setAttribute("aria-expanded", "false");
    activeIndex = -1;
  };

  const applySuggestion = (value) => {
    if (!value) return;
    textarea.value = value;
    hideSuggestions();
    textarea.focus();
  };

  const updateActiveOption = () => {
    Array.from(listbox.children).forEach((li, idx) => {
      const selected = idx === activeIndex;
      li.setAttribute("aria-selected", selected ? "true" : "false");
      li.classList.toggle("bg-neutral-900", selected);
      li.classList.toggle("text-white", selected);
    });
  };

  const renderSuggestions = (items) => {
    listbox.innerHTML = "";
    if (!items || !items.length) {
      hideSuggestions();
      return;
    }
    items.forEach((val, idx) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", "false");
      li.className = "px-2 py-1 cursor-pointer hover:bg-carnation-100 text-xs md:text-sm";
      li.textContent = val;
      li.addEventListener("mousedown", (e) => {
        e.preventDefault(); // keep focus
        applySuggestion(val);
      });
      listbox.appendChild(li);
    });
    activeIndex = -1;
    listbox.classList.remove("hidden");
    textarea.setAttribute("aria-expanded", "true");
  };

  const triggerSuggestions = () => {
    clearTimeout(suggestTimer);
    suggestTimer = setTimeout(async () => {
      const fieldVal = fieldSelect.value;
      const q = textarea.value.trim();
      if (!fieldVal || q.length < 3) return;
      const suggestions = await fetchFilterValueSuggestions({
        field: fieldVal,
        query: q,
      });
      renderSuggestions(suggestions);
    }, 250);
  };

  textarea.addEventListener("keydown", (event) => {
    if (listbox.classList.contains("hidden")) return;
    const options = listbox.children;
    if (!options.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % options.length;
      updateActiveOption();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = activeIndex <= 0 ? options.length - 1 : activeIndex - 1;
      updateActiveOption();
    } else if (event.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < options.length) {
        event.preventDefault();
        applySuggestion(options[activeIndex].textContent);
      }
    } else if (event.key === "Escape") {
      hideSuggestions();
    }
  });

  textarea.addEventListener("blur", () => {
    setTimeout(hideSuggestions, 100);
  });

  fieldSelect.addEventListener("change", triggerSuggestions);
  textarea.addEventListener("input", triggerSuggestions);

  container.appendChild(row);
}

// =================================================
// Exports
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

  const heading = document.createElement("h3");
  heading.className = "mb-2 font-semibold text-neutral-900 text-xs md:text-sm";
  heading.id = "js-active-filters-heading";
  heading.textContent = count ? `Active filters (${count})` : "No active filters";
  pop.appendChild(heading);

  const chipsList = document.createElement("ul");
  chipsList.className = "mb-2 flex flex-wrap";
  chipsList.setAttribute("role", "list");
  chipsList.setAttribute("aria-live", "polite");
  chipsList.setAttribute("aria-labelledby", heading.id);

  if (pairs.length) {
    pairs.forEach(({ label, value }) => {
      const li = document.createElement("li");
      li.className = "inline-flex items-center px-2 py-0.5 bg-carnation-100 text-[11px] md:text-xs mr-1 mb-1";
      li.setAttribute("role", "listitem");
      li.setAttribute("aria-label", `${label}: ${value}`);
      li.innerHTML = `
        <span class="text-neutral-700 mr-1">${label}:</span>
        <span class="font-medium text-neutral-900">${value}</span>
      `;
      chipsList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.className = "text-neutral-700";
    li.setAttribute("role", "listitem");
    li.innerHTML = `<p><strong>Filter across your entire OA.Report.</strong></p><p>None selected; use the form below to narrow your results.</p>`;
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
    clearBtn.setAttribute("aria-describedby", heading.id);
    pop.appendChild(clearBtn);
  }

  // Container for dynamic filter rows
  const filterForm = document.createElement("form");
  filterForm.className = "mt-3 pt-3 border-t border-neutral-200 space-y-3";

  const formHeading = document.createElement("h3");
  formHeading.className = "text-xs md:text-sm font-semibold text-neutral-900";
  formHeading.textContent = "Add a filter";
  filterForm.appendChild(formHeading);

  const rowsContainer = document.createElement("div");
  rowsContainer.className = "js-filter-rows space-y-3";
  filterForm.appendChild(rowsContainer);
  pop.appendChild(filterForm);

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
  applyBtn.type = "submit";
  applyBtn.id = "js-apply-filters";
  applyBtn.className = "mt-1 mb-1 p-2 rounded-sm w-full justify-center bg-neutral-900 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900";
  applyBtn.textContent = "Apply";
  filterForm.appendChild(applyBtn);

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
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
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
      q: andQueryStrings(combined, getDecodedUrlQuery()),
    });

    handleFiltersChanged();
    tip.hide();
  });
}
