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

// =================================================
// State
// =================================================

/**
 * Cached org data from the org index response.
 * @type {Object|undefined}
 */
let orgData;
orgDataPromise.then((res) => { orgData = res.data; });

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
function labelFromFieldKeyInverse(label) {
  // We only need this to map the displayed label back to the field key when removing chips
  for (const [key, val] of ALLOWED_TERMS.entries()) {
    if (val === label) return key;
  }
  return null;
}

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

  const rawClauses = [];
  const processClause = (clause) => {
    const cleanedClause = unwrapParens(clause);
    const nested = splitTopLevel(cleanedClause, "AND");
    if (nested.length > 1) {
      nested.forEach((sub) => processClause(sub));
      return;
    }
    const m = cleanedClause.match(/^\s*\(?\s*([A-Za-z0-9._]+)\s*:\s*(.+?)\s*\)?\s*$/);
    if (!m) return;
    const rawKey = m[1];
    const value = renderValue(rawKey, unwrapParens(m[2]));
    if (!value) return;
    rawClauses.push({ label: labelFromFieldKey(rawKey), field: rawKey, value, clause: clause.trim() });
  };

  splitTopLevel(query, "AND").forEach((clause) => processClause(clause));

  // Group by field, OR all values within the same field
  const grouped = new Map();
  rawClauses.forEach((c) => {
    if (!grouped.has(c.field)) {
      grouped.set(c.field, { field: c.field, values: [], clauses: [] });
    }
    const entry = grouped.get(c.field);
    const tokens = (c.value || "")
      .split(/\s+OR\s+/)
      .map((v) => v.trim())
      .filter(Boolean);
    tokens.forEach((t) => entry.values.push(t));
    entry.clauses.push(c.clause);
  });

  return Array.from(grouped.values()).map((g) => ({
    field: g.field,
    label: labelFromFieldKey(g.field),
    values: g.values,
    clause: g.clauses.join(" AND "),
  }));
}

function removeClauseFromQuery(q, field) {
  if (!field) return q;
  if (!q) return "";
  return parseEsQueryToPairs(q)
    .filter((p) => p.field !== field)
    .map((p) => p.clause)
    .join(" AND ");
}

function removeValueFromField(q, field, value) {
  if (!field || !value) return q || "";
  const pairs = parseEsQueryToPairs(q);
  const clauses = [];
  pairs.forEach((p) => {
    if (p.field !== field) {
      clauses.push(p.clause);
      return;
    }
    const remaining = (p.values || [])
      .map((v) => v.trim())
      .filter(Boolean)
      .filter((v) => v !== value);
    if (!remaining.length) return;
    const quotedVals = remaining.map((val) => `"${val.replace(/"/g, '\\"')}"`);
    const valueExpr = quotedVals.length === 1 ? quotedVals[0] : `(${quotedVals.join(" OR ")})`;
    clauses.push(`${p.field}:${valueExpr}`);
  });
  return clauses.join(" AND ");
}

/**
 * Fetch autocomplete suggestions for a given field and org.
 *
 * @param {Object} params
 * @param {string} params.field  - ES field id (e.g., journal, concepts.display_name)
 * @param {string} params.query  - User-entered prefix/term to match
 * @param {number} [params.size=10] - Max number of suggestions to return
 * @param {AbortSignal} [params.signal] - Optional abort signal
 * @returns {Promise<string[]>} Ordered list of suggested values (unique, trimmed)
 */
export async function fetchFilterValueSuggestions({ field, query, size = 8, signal }) {
  if (!field || !query || !query.trim()) return [];

  // Per-session cache to avoid repeat calls
  fetchFilterValueSuggestions._cache = fetchFilterValueSuggestions._cache || new Map();
  const cacheKey = `${field}::${query.slice(0, 50)}`;
  if (fetchFilterValueSuggestions._cache.has(cacheKey)) {
    return fetchFilterValueSuggestions._cache.get(cacheKey);
  }

  // Scoped terms only (org + existing filters)
  let qClean = query.trim();
  try {
    qClean = decodeURIComponent(qClean);
  } catch (e) {
    // If already decoded/invalid, keep as-is
  }
  const baseField = field.replace(/\.keyword$/, "");
  const lower = qClean.toLowerCase();
  const orgName = orgData?.hits?.hits?.[0]?._source?.name;

  const targetField = `${baseField}.keyword`;

  try {
    const parts = [];
    if (orgName) {
      const safeOrg = orgName.replace(/"/g, '\\"');
      parts.push(`orgs.keyword:"${safeOrg}"`);
    }
    parts.push(`${baseField}:*${lower}*`);

    const qParam = encodeURIComponent(parts.join(" AND "));
    const url = `${API_BG_BASE_URL}works/terms/${targetField}?counts=false&size=${size}&q=${qParam}`;

    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) throw new Error("No suggestions");

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

    const sorted = values.sort((a, b) => a.localeCompare(b));
    const result = sorted.slice(0, size);
    fetchFilterValueSuggestions._cache.set(cacheKey, result);
    return result;
  } catch (err) {
    if (err?.name !== "AbortError") {
      console.error("Error fetching filter suggestions (terms):", err);
    }
    fetchFilterValueSuggestions._cache.set(cacheKey, []);
    return [];
  }
}

// =================================================
// DOM helpers
// =================================================

/**
 * Adds a single "Filter field + value input" row into the given container.
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
  textLabel.id = `js-filter-values-label-${idSuffix}`;
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
  const input = document.createElement("input");
  input.id = inputId;
  input.type = "text";
  input.className = "js-filter-input mt-1 p-2 w-full h-9 border border-neutral-900 bg-white text-xs md:text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900";
  input.placeholder = "Search for values…";
  input.required = true;
  input.setAttribute("aria-required", "true");
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("aria-labelledby", textLabel.id);

  const listboxId = `js-filter-suggestions-${idSuffix}`;
  input.setAttribute("aria-controls", listboxId);

  const listbox = document.createElement("ul");
  listbox.id = listboxId;
  listbox.className = "js-filter-suggestions absolute z-10 mt-1 w-full bg-white border border-neutral-300 shadow-sm max-h-48 overflow-auto hidden";
  listbox.setAttribute("role", "listbox");
  listbox.setAttribute("aria-label", "Filter value suggestions");

  const tokens = document.createElement("div");
  tokens.className = "js-filter-tokens mt-2 flex flex-wrap gap-1";
  tokens.setAttribute("role", "list");
  tokens.setAttribute("aria-label", "Selected values");

  textWrapper.appendChild(textLabel);
  textWrapper.appendChild(input);
  textWrapper.appendChild(listbox);
  textWrapper.appendChild(tokens);

  row.appendChild(fieldWrapper);
  row.appendChild(textWrapper);

  // Debounced fetch of value suggestions + tokens
  let suggestTimer = null;
  let activeIndex = -1;
  const tokenData = [];
  let requestSeq = 0;

  const hideSuggestions = () => {
    listbox.classList.add("hidden");
    input.setAttribute("aria-expanded", "false");
    activeIndex = -1;
  };

  const addToken = (value) => {
    if (!value) return;
    input.value = "";
    tokenData.push(value);
    renderTokens();
    hideSuggestions();
  };

  const applySuggestion = (value) => {
    if (!value) return;
    addToken(value);
    input.focus();
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
    const termRaw = input.value || "";
    const term = termRaw.toLowerCase().replace(/\s+/g, " ").trim();

    // Keep a non-selectable hint at the top
    renderHint(termRaw);

    if (!items || !items.length) {
      listbox.classList.remove("hidden");
      input.setAttribute("aria-expanded", "true");
      activeIndex = -1;
      return;
    }

    const highlight = (val) => {
      if (!term || !val) return val;
      const idx = val.toLowerCase().indexOf(term);
      if (idx === -1) return val;
      const before = val.slice(0, idx);
      const match = val.slice(idx, idx + term.length);
      const after = val.slice(idx + term.length);
      return `${before}<strong>${match}</strong>${after}`;
    };

    const filtered = items
      .filter((val) => (val || "").toLowerCase().includes(term))
      .sort((a, b) => {
        const aStarts = (a || "").toLowerCase().startsWith(term);
        const bStarts = (b || "").toLowerCase().startsWith(term);
        if (aStarts === bStarts) return 0;
        return aStarts ? -1 : 1;
      });

    if (!filtered.length) {
      renderHint(termRaw);
      return;
    }

    filtered.forEach((val) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", "false");
      li.className = "px-2 py-1 cursor-pointer hover:bg-carnation-100 text-xs md:text-sm";
      li.innerHTML = highlight(val);
      li.addEventListener("mousedown", (e) => {
        e.preventDefault(); // keep focus
        applySuggestion(val);
      });
      listbox.appendChild(li);
    });
    activeIndex = -1;
    listbox.classList.remove("hidden");
    input.setAttribute("aria-expanded", "true");
  };

  const renderHint = (termRaw = "") => {
    listbox.innerHTML = "";
    const hint = document.createElement("li");
    hint.setAttribute("role", "presentation");
    hint.className = "px-2 py-1 h-9 flex items-center text-xs md:text-sm bg-neutral-100 text-neutral-700 border-b border-neutral-200";
    hint.textContent = termRaw ? `Matching suggestions for “${termRaw}”` : "Start typing to see suggestions…";
    listbox.appendChild(hint);
    activeIndex = -1;
    listbox.classList.remove("hidden");
    input.setAttribute("aria-expanded", "true");
  };

  const renderTokens = () => {
    tokens.innerHTML = "";
    const hasTokens = tokenData.length > 0;
    input.required = !hasTokens;
    input.setAttribute("aria-required", hasTokens ? "false" : "true");

    tokenData.forEach((val) => {
      const chip = document.createElement("span");
      chip.className = "inline-flex items-center rounded-full bg-carnation-100 text-neutral-900 px-2 py-0.5 text-[11px] md:text-xs";
      chip.setAttribute("data-value", val);
      chip.setAttribute("role", "listitem");

      const valSpan = document.createElement("span");
      valSpan.textContent = val;
      chip.appendChild(valSpan);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "ml-2 text-[10px]";
      removeBtn.setAttribute("aria-label", `Remove ${val}`);
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", () => {
        const idxToRemove = tokenData.indexOf(val);
        if (idxToRemove > -1) {
          tokenData.splice(idxToRemove, 1);
        }
        renderTokens();
      });

      chip.appendChild(removeBtn);
      tokens.appendChild(chip);
    });
  };

  const triggerSuggestions = () => {
    clearTimeout(suggestTimer);
    suggestTimer = setTimeout(async () => {
      const fieldVal = fieldSelect.value;
      const raw = input.value || "";
      const q = raw.replace(/\s+/g, " ").trim();
      if (!fieldVal || q.length < 2) {
        const msg = !fieldVal ? "Select a field first to see suggestions." : "Type at least 2 characters.";
        renderHint("", msg);
        return;
      }
      const currentReq = ++requestSeq;
      renderHint(q);
      try {
        const suggestions = await fetchFilterValueSuggestions({
          field: fieldVal,
          query: q,
        });
        if (currentReq === requestSeq) {
          renderSuggestions(suggestions);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 120);
  };

  input.addEventListener("keydown", (event) => {
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

  input.addEventListener("blur", () => {
    setTimeout(hideSuggestions, 100);
  });

  fieldSelect.addEventListener("change", triggerSuggestions);
  input.addEventListener("input", triggerSuggestions);
  input.addEventListener("focus", () => {
    renderHint();
  });

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
  const count = pairs.reduce((sum, p) => sum + (Array.isArray(p.values) ? p.values.length : 1), 0); // total values count across all fields, instead of just fields count

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
  pop.style.maxWidth = "90vw";
  pop.style.minWidth = "320px";

  const heading = document.createElement("h3");
  heading.className = "mb-2 font-semibold text-neutral-900 text-xs md:text-sm";
  heading.id = "js-active-filters-heading";
  heading.textContent = count ? `Active filters (${count})` : "No active filters";
  pop.appendChild(heading);

  const chipsList = document.createElement("ul");
  chipsList.className = "mb-2 space-y-2";
  chipsList.setAttribute("role", "list");
  chipsList.setAttribute("aria-live", "polite");
  chipsList.setAttribute("aria-labelledby", heading.id);

  if (pairs.length) {
    const grouped = new Map(); // field -> {label, clauses:[...], values:[...]}
    pairs.forEach(({ field, label, values, clause }) => {
      if (!grouped.has(field)) {
        grouped.set(field, { label, clauses: [], values: [] });
      }
      const entry = grouped.get(field);
      entry.clauses.push(clause);
      (values || []).forEach((v) => entry.values.push(v));
    });

    Array.from(grouped.values()).forEach(({ label, clauses, values }) => {
      const li = document.createElement("li");
      li.className = "mb-1";
      li.setAttribute("role", "listitem");

      const headingDiv = document.createElement("div");
      headingDiv.className = "text-[11px] md:text-xs font-semibold text-neutral-900";
      headingDiv.textContent = label;
      li.appendChild(headingDiv);

      const chipsRow = document.createElement("div");
      chipsRow.className = "flex flex-wrap gap-1 mt-1";
      chipsRow.setAttribute("role", "list");

      (values || []).forEach((val) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "inline-flex items-center rounded-full bg-carnation-100 text-neutral-900 px-2 py-0.5 text-[11px] md:text-xs";
        chip.setAttribute("role", "listitem");
        chip.setAttribute("aria-label", `Remove ${label}: ${val}`);
        chip.innerHTML = `<span>${val}</span><span class="ml-2 text-[10px]">✕</span>`;
        chip.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const decodedQ = getDecodedUrlQuery();
          const nextQ = removeValueFromField(decodedQ, labelFromFieldKeyInverse(label), val);
          if (nextQ) {
            updateURLParams({ q: nextQ });
          } else {
            removeURLParams("q");
          }
          handleFiltersChanged();
          tip.hide();
        });
        chipsRow.appendChild(chip);
      });

      li.appendChild(chipsRow);
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
    placement: "bottom-start",
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

  // Apply: gather all rows, group values by field (OR within field, AND across fields)
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fieldMap = new Map(); // field -> array of values (strings)

    rowsContainer.querySelectorAll(".js-filter-row").forEach((row) => {
      const fieldSelect = row.querySelector(".js-filter-field");
      const input = row.querySelector(".js-filter-input");
      const tokensEl = row.querySelector(".js-filter-tokens");
      if (!fieldSelect || !input || !tokensEl) return;

      const field = fieldSelect.value;
      const raw = input.value.trim();
      const chips = Array.from(tokensEl.children).map((chip) => chip.getAttribute("data-value") || "").filter(Boolean);

      if (!field) return;

      const pushVals = (vals) => {
        if (!vals.length) return;
        const list = fieldMap.get(field) || [];
        vals.forEach((v) => list.push(v));
        fieldMap.set(field, list);
      };

      if (chips.length) {
        pushVals(chips);
        return;
      }

      if (!raw) return;

      // Fallback: support "ID1, ID2" (OR), "ID1 OR ID2", "ID1 AND ID2"
      const segments = [];
      const opRegex = /\s+(AND|OR)\s+/gi;
      let lastIndex = 0;
      raw.replace(opRegex, (match, op, offset) => {
        segments.push(raw.slice(lastIndex, offset).trim());
        lastIndex = offset + match.length;
      });
      segments.push(raw.slice(lastIndex).trim());

      const values = [];
      segments.forEach((segment) => {
        if (!segment) return;
        segment
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
          .forEach((v) => values.push(v));
      });

      pushVals(values);
    });

    // Merge with existing: keep existing clauses, but merge values per field (OR)
    const existingQ = getDecodedUrlQuery();
    const existingPairs = parseEsQueryToPairs(existingQ);
    const mergedFields = new Map();

    // Start with existing values
    existingPairs.forEach((p) => {
      const vals = Array.isArray(p.values)
        ? p.values
        : (p.value || "")
            .split(/\s+OR\s+/)
            .map((v) => v.trim())
            .filter(Boolean);
      mergedFields.set(p.field, {
        label: p.label,
        values: new Set(vals),
      });
    });

    // Add new values
    fieldMap.forEach((vals, field) => {
      if (!mergedFields.has(field)) {
        mergedFields.set(field, { label: labelFromFieldKey(field), values: new Set() });
      }
      const entry = mergedFields.get(field);
      vals.filter(Boolean).forEach((v) => entry.values.add(v));
    });

    const clauses = [];
    mergedFields.forEach((entry, field) => {
      const unique = Array.from(entry.values);
      if (!unique.length) return;
      const quotedVals = unique.map((val) => `"${val.replace(/"/g, '\\"')}"`);
      const valueExpr = quotedVals.length === 1 ? quotedVals[0] : `(${quotedVals.join(" OR ")})`;
      clauses.push(`${field}:${valueExpr}`);
    });

    if (!clauses.length) {
      tip.hide();
      return;
    }

    updateURLParams({
      q: clauses.join(" AND "),
    });

    handleFiltersChanged();
    tip.hide();
  });
}
