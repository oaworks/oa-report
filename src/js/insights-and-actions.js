// ================================================
// insights-and-actions.js
// State & DOM manipulation specific to Insights
// and Actions sections
// Needs to be completely refactored
// ================================================

// =================================================
// Imports
// =================================================

import { dateRange, startYear, endYear, displayNone, changeOpacity, makeNumberReadable, makeDateReadable, displayErrorHeader, showUnavailableCard, resetBarChart, setBarChart, buildEncodedQueryWithUrlFilter, fetchJson, fetchText, fetchPostData, decodeAndReplaceUrlEncodedChars, getDecodedUrlQuery, andQueryStrings, copyToClipboard } from './utils.js';
import { ORGS_REPORT_API_BASE_URL, QUERY_BASE, COUNT_QUERY_BASE, CSV_EXPORT_BASE, ARTICLE_EMAIL_BASE, INSIGHTS_CARDS, INSIGHT_EXPLORE_MAPPINGS, ACTION_LABELS, ACTION_ORDER, ACTION_TABLE_CONFIGS, LICENSE_CODES, resolveFieldDefinition } from './constants.js';
import { initAuth, onAuthChange, applyAuthVisibility } from './auth.js';
import { initActionTabs, formatDoiEpmcListForClipboard, isSingleAuthorFilterActive } from './actions.js';
import { createPopover } from './tooltip-manager.js';
import { buildTooltipContent, buildDefinitionHelpHtml, injectOrgFields } from './tooltip-content.js';
import { getInsightsAggregationQuery, formatAggregationBucket } from './aggregated-data-query.js';
import { startLoading, stopLoading } from './components.js';

// Cache identical count queries so we only hit the API once per unique URL
const countQueryCache = new Map();
const fetchCountQuery = (url) => {
  if (!countQueryCache.has(url)) {
    countQueryCache.set(url, fetchJson(url));
  }
  return countQueryCache.get(url);
};

/**
 * Cache of Explore-based aggregate requests keyed by org, filter, query, and
 * active report date range.
 *
 * @type {Map<string, Promise<Object|null>>}
 */
const insightAggregateCache = new Map();

/**
 * Fetches the Explore-style aggregate metrics for one Insights filter using the
 * current report date range and any active top-level filters.
 *
 * Returns the flattened `all_values` aggregate, which contains the raw counts
 * used by the Explore Years breakdown's summary row.
 *
 * @param {Object} orgData - Organisation record from the org index response.
 * @param {string} filterId - Analysis filter ID, such as `is_paper`.
 * @returns {Promise<Object|null>} Flattened aggregate metrics, or null when the
 * filter cannot be resolved.
 */
function fetchExploreInsightMetrics(orgData, filterId) {
  const suffix = orgData?.hits?.hits?.[0]?._source?.key_suffix;
  const analysis = orgData?.hits?.hits?.[0]?._source?.analysis || {};
  const filterQuery = analysis?.[filterId]?.query;

  if (!suffix || !filterQuery) {
    return Promise.resolve(null);
  }

  const decodedQuery = andQueryStrings(
    decodeAndReplaceUrlEncodedChars(filterQuery),
    getDecodedUrlQuery()
  );
  const cacheKey = JSON.stringify({
    suffix,
    filterId,
    query: decodedQuery,
    startYear,
    endYear
  });

  if (!insightAggregateCache.has(cacheKey)) {
    const postData = getInsightsAggregationQuery(suffix, decodedQuery, startYear, endYear);

    insightAggregateCache.set(
      cacheKey,
      fetchPostData(postData).then((response) => {
        const allValues = response?.aggregations?.all_values;
        return allValues ? formatAggregationBucket(allValues) : null;
      })
    );
  }

  return insightAggregateCache.get(cacheKey);
}

const INSIGHT_CARD_BY_NUMERATOR = new Map(INSIGHTS_CARDS.map((card) => [card.numerator, card]));
const INSIGHT_TOOLTIP_HEADING = 'Definition';

function buildInsightTooltipSection(contentHtml = '') {
  if (!contentHtml) return '';

  return `
    <section class="space-y-2">
      <h4 class="font-semibold text-neutral-900">${INSIGHT_TOOLTIP_HEADING}</h4>
      ${contentHtml}
    </section>
  `;
}

function buildInsightDefinitionsHtml(numerator, insightInfo = '', helpTextByKey = {}, analysisHelpText = '') {
  const matchingCard = INSIGHT_CARD_BY_NUMERATOR.get(numerator);
  const definitionKey = matchingCard?.definition_key;
  const orgMeta = {
    orgName,
    orgPolicyCoverage,
    orgPolicyCompliance,
    orgPolicyUrl
  };
  if (!definitionKey) {
    const contentHtml = buildTooltipContent({
      leadHtml: insightInfo,
      helpHtml: injectOrgFields(analysisHelpText, orgMeta)
    });
    return buildInsightTooltipSection(contentHtml);
  }

  const fieldDefinition = resolveFieldDefinition(definitionKey, 'insights');
  if (!fieldDefinition) {
    return buildInsightTooltipSection(insightInfo);
  }

  const helpHtml = buildDefinitionHelpHtml({
    help_text: fieldDefinition.help_text,
    help_text_by_key: helpTextByKey,
    org_meta: orgMeta,
    help_text_style: fieldDefinition.help_text_style
  });
  const contentHtml = buildTooltipContent({
    leadHtml: injectOrgFields(insightInfo, orgMeta),
    helpHtml,
    detailsHtml: injectOrgFields(fieldDefinition.details, orgMeta),
    dedupeHelpTextAgainstLead: fieldDefinition.help_text_style !== 'bullets'
  });

  return buildInsightTooltipSection(contentHtml);
}

// =================================================
// Org data
// =================================================

// Set report org index URL’s base path
export const orgApiUrl = `${ORGS_REPORT_API_BASE_URL}orgs?q=objectID:%22${org}%22`;

// Fetch and store organisational data in a constant
export const orgDataPromise = fetchJson(orgApiUrl);

// =================================================
// Auth state
// =================================================

let orgKey = "";
let loggedIn = false;

const authState = initAuth(org);
loggedIn = authState.loggedIn;
orgKey = authState.orgKey ? `&orgkey=${authState.orgKey}` : "";
applyAuthVisibility({
  showWhenLoggedIn: ["logout", "section-tab-actions", "actions-anchor", "actions"],
  hideWhenLoggedIn: ["login"]
});
if (!loggedIn) {
  ["section-tab-actions", "actions-anchor", "actions"].forEach((id) => {
    document.getElementById(id)?.remove();
  });
}

onAuthChange(({ loggedIn: isLoggedIn, orgKey: key }) => {
  loggedIn = isLoggedIn;
  orgKey = key ? `&orgkey=${key}` : "";
  applyAuthVisibility({
    showWhenLoggedIn: ["logout", "section-tab-actions", "actions-anchor", "actions"],
    hideWhenLoggedIn: ["login"]
  });
  if (!loggedIn) {
    ["section-tab-actions", "actions-anchor", "actions"].forEach((id) => {
      document.getElementById(id)?.remove();
    });
  }
});

// =================================================
// Exports
// =================================================

function renderInsightCards({ analysis, showPreprints, showUnique, isGates }) {
  const template = document.getElementById('insights_cards_template');
  const sectionsWrapper = document.getElementById('insights_sections');
  if (!template || !sectionsWrapper) {
    return new Set();
  }

  const articleCardIds = [
    "is_paper",
    ...(showPreprints ? [] : ["is_preprint"]),
    ...(isGates ? ["is_compliant_article"] : []),
    "is_free_to_read",
    "is_compliant",
    "is_oa",
    "has_data_availability_statement",
    "has_open_data",
    "has_open_code"
  ];

  // Build the sections list so we only render cards that are relevant for this org.
  const sections = [
    {
      sectionId: "insights_articles",
      containerId: "insights_articles_cards",
      cardIds: articleCardIds
    },
    {
      sectionId: "insights_preprints",
      containerId: "insights_preprints_cards",
      cardIds: showPreprints
        ? ["is_preprint", "is_compliant_preprint", "has_data_availability_statement_preprint"]
        : []
    },
    {
      sectionId: "insights_unique_publications",
      containerId: "insights_unique_publications_cards",
      cardIds: showUnique
        ? ["is_unique_publication", "is_compliant_publication"]
        : []
    }
  ];

  const renderedIds = new Set();
  const visibleSections = [];

  sections.forEach((section) => {
    const sectionEl = document.getElementById(section.sectionId);
    const container = document.getElementById(section.containerId);
    if (!sectionEl || !container) return;

    container.innerHTML = "";

    // Clone from the template to keep markup consistent and avoid extra DOM work.
    section.cardIds.forEach((cardId) => {
      const analysisEntry = analysis?.[cardId];
      if (analysisEntry && analysisEntry.show_on_web !== true) return;
      const card = template.content.querySelector(`#${cardId}`);
      if (!card) return;
      const clonedCard = card.cloneNode(true);
      // Show a placeholder when the API returns no data or the date range is outside the card's available window.
      const unavailable = !analysisEntry
        || (analysisEntry.available_from && endYear < analysisEntry.available_from)
        || (analysisEntry.available_until && startYear > analysisEntry.available_until);
      if (unavailable) {
        showUnavailableCard(clonedCard);
      }
      container.appendChild(clonedCard);
      if (!unavailable) {
        renderedIds.add(cardId);
      }
    });

    if (container.children.length > 0) {
      sectionEl.classList.remove("hidden");
      visibleSections.push(sectionEl);
    } else {
      sectionEl.classList.add("hidden");
    }
  });

  // Match grid density to the number of visible sections for a tidy layout.
  // e.g. Gates Foundation’s has 3 sections; most others have 1. 
  const columnsClass =
    visibleSections.length >= 3
      ? "md:grid-cols-3"
      : visibleSections.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-1";

  sectionsWrapper.classList.remove("md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3");
  sectionsWrapper.classList.add(columnsClass);

  const gridClass =
    visibleSections.length === 3
      ? "grid gap-4 grid-cols-1 xl:grid-cols-2"
      : "grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6";

  document.querySelectorAll(".js_insights_card_grid").forEach((grid) => {
    grid.className = `js_insights_card_grid ${gridClass}`;
  });

  return renderedIds;
}

function renderActionTabs(strategy = {}) {
  const tabsContainer = document.getElementById("actions_buttons");
  if (!tabsContainer) return;
  const actionsTabLink = document.getElementById("section-tab-actions");
  const actionsAnchor = document.getElementById("actions-anchor");
  const actionsSection = document.getElementById("actions");

  const visibleActions = Object.entries(strategy)
    .filter(([, config]) => config?.show_on_web === true)
    .map(([id]) => id)
    .filter((id) => document.getElementById(id)) // Keep only actions with an existing panel for this pass.
    .filter((id) => id !== "wellcome_point_of_award_check" || isSingleAuthorFilterActive())
    .sort((a, b) => {
      const aIndex = ACTION_ORDER.indexOf(a);
      const bIndex = ACTION_ORDER.indexOf(b);
      const aRank = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const bRank = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      return aRank - bRank;
    });

  const hasVisibleActions = visibleActions.length > 0;
  [actionsTabLink, actionsAnchor, actionsSection].forEach((el) => {
    if (el instanceof HTMLElement) {
      el.classList.toggle("hidden", !hasVisibleActions);
    }
  });

  tabsContainer.innerHTML = "";

  visibleActions.forEach((id, index) => {
    const label = ACTION_LABELS[id] || id.replaceAll("_", " ");
    const item = document.createElement("li");
    item.className = "list-none";
    const tabBtn = document.createElement("button");
    tabBtn.type = "button";
    tabBtn.id = `strategy_${id}`;
    tabBtn.className = "js_strategy_btn group cursor-pointer px-4 py-1.5 text-sm font-medium rounded-md outline outline-1 outline-transparent outline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-carnation-400 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-800 transition-colors text-white bg-neutral-900/60";
    tabBtn.setAttribute("aria-controls", id);
    tabBtn.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    tabBtn.innerHTML = `<span>${label}</span><span id="count_${id}" class="bg-neutral-900 text-neutral-100 ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block group-hover:bg-neutral-800">0</span>`;
    item.appendChild(tabBtn);
    tabsContainer.appendChild(item);
  });
}

// Generate report’s UI for any given date range
export function initInsightsAndActions(org) {
  // Ensure counts are fetched fresh for the current date range
  countQueryCache.clear();
  insightAggregateCache.clear();

  startLoading();

  // Set paths for orgindex
  let queryPrefix = `${QUERY_BASE}q=${dateRange}`,
      countQueryPrefix = `${COUNT_QUERY_BASE}q=${dateRange}`;

  orgDataPromise.then(function (orgData) {
    const analysis = orgData?.hits?.hits?.[0]?._source?.analysis || {};
    const objectID = orgData?.hits?.hits?.[0]?._source?.objectID;
    const showPreprints = analysis?.is_preprint?.show_on_web === true;
    const showUnique = analysis?.is_unique_publication?.show_on_web === true;
    const isGates = objectID === "gates-foundation";

    const renderedInsightIds = renderInsightCards({
      analysis,
      showPreprints,
      showUnique,
      isGates
    });
    if (loggedIn) {
      renderActionTabs(orgData?.hits?.hits?.[0]?._source?.strategy || {});
      initActionTabs();
    }

    /** Decrypt emails if user has an orgKey **/
    window.handleDecryptEmailClick = function(buttonElement) {
      const email = buttonElement.getAttribute('data-email');
      const doi = buttonElement.getAttribute('data-doi');
      const mailto = buttonElement.getAttribute('data-mailto');
  
      decryptEmail(email, doi, mailto);
    }

    window.decryptEmail = function(email, doi, mailto) {
      mailto = decodeURI(mailto);
      
      function openEmailClientWithFallback() {
          window.open(`mailto:${mailto}`);
      }
  
      // if email is not undefined and there is an orgkey, try to decrypt the author’s email
      if (email !== 'undefined' && doi && doi !== 'N/A' && loggedIn) {
          fetchText(`${ARTICLE_EMAIL_BASE}${encodeURIComponent(doi)}${orgKey ? `?${orgKey.slice(1)}` : ""}`)
              .then(function (authorEmail) {
                  mailto = mailto.replaceAll("{email}", authorEmail);
                  window.open(`mailto:${mailto}`);
              })
              .catch(function (error) { 
                  // On error, use the fallback
                  openEmailClientWithFallback();
                  // and also display the error
                  displayErrorHeader(`Error decrypting email: ${error}`);
              });
      } else {
          // If email is undefined or there is no orgkey, use the fallback
          openEmailClientWithFallback();
          // and display the error
          displayErrorHeader("We couldn’t find the author’s email address. Please try again later or contact us for help.");
      }
    };

    /** Get Insights data and display it **/
    // Loop through each Insight card from constants.js and call getInsight
    const policyUrl = orgData?.hits?.hits?.[0]?._source?.policy?.url;
    const helpTextByKey = orgData?.hits?.hits?.[0]?._source?.policy?.help_text || {};
    const cardPromises = [];
    INSIGHTS_CARDS.forEach((cardConfig) => {
      if (!renderedInsightIds.has(cardConfig.numerator)) {
        return;
      }
      // Clone per use so we never mutate the constant
      const card = { ...cardConfig };
      if (policyUrl && typeof card.info === 'string' && card.info.includes("{policyUrl}")) {
        card.info = card.info.replace("{policyUrl}", policyUrl);
      }

      const cardPromise = getInsight(
        card.numerator,
        card.denominator,
        card.denominatorText,
        card.info,
        helpTextByKey
      );
      if (cardPromise) cardPromises.push(cardPromise);
    });

    function getInsight(numerator, denominator, denominatorText, insightInfo, helpTextByKey) {
      // Check if the data for this "numerator" (i.e. Insights data card) exists in orgData
      const analysisEntry = orgData.hits.hits[0]._source.analysis[numerator];
      if (!analysisEntry) return;

      // If the analysis entry does exist, proceed as usual
      const shown     = analysisEntry.show_on_web,
            contentID = numerator,
            cardContents = document.getElementById(contentID);
      
      // Exit if the card element is not found
      if (!cardContents) return; 

      if (shown === true) {
        // Ensure card is reset from any prior "unavailable" state before fetching fresh data
        resetBarChart(cardContents);

        // Locate placeholders
        const percentageContents = document.getElementById(`percent_${numerator}`);
        const figureDetails      = document.getElementById(`articles_${numerator}`);
        const articlesWrapper    = figureDetails ? figureDetails.closest('p') : null;
        const barChartElement    = cardContents.querySelector('.js_bar_chart');
        const figureElement      = percentageContents
          ? percentageContents.closest('p') || percentageContents
          : null;

        if (articlesWrapper) {
          articlesWrapper.classList.add('sr-only');
        }

        // On-click tooltip to contain Insight info + figure details
        const tooltipTarget = cardContents.querySelector('.js_insight_trigger');
        if (!(tooltipTarget instanceof HTMLButtonElement)) return;
        const tooltipTargetId = tooltipTarget.id || `${numerator}-card-trigger`;
        tooltipTarget.id = tooltipTargetId;
        let instance = cardContents._insightTooltip;
        if (!instance) {
          instance = createPopover(tooltipTarget, '', {
            placement: 'right',
            theme: 'tooltip-white',
            arrow: true,
            role: 'dialog',
            onShow() {
              tooltipTarget.setAttribute('aria-expanded', 'true');
            },
            onHide() {
              tooltipTarget.setAttribute('aria-expanded', 'false');
            }
          });
          cardContents._insightTooltip = instance;
        }
        if (!cardContents._insightTooltipEventsBound) {
          tooltipTarget.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              instance.show();
            }
          });

          cardContents._insightTooltipEventsBound = true;
        }
        const updateTooltipContent = () => {
          const detailHtml = figureDetails
            ? `<div class="mb-2 font-semibold text-neutral-900">${figureDetails.innerHTML}</div>`
            : "";
          const definitionHtml = buildInsightDefinitionsHtml(
            numerator,
            insightInfo,
            helpTextByKey,
            analysisEntry.help_text || ''
          );
          instance.setContent(`${detailHtml}${definitionHtml}`);
        };

        // Accessibility / tooltip IDs
        const tooltipID = instance.popper.id;
        tooltipTarget.setAttribute('aria-controls', tooltipID);
        tooltipTarget.setAttribute('aria-description', 'Press Enter to show more information for this metric.');
        tooltipTarget.setAttribute('title', 'More information on this metric');
        tooltipTarget.setAttribute('aria-haspopup', 'dialog');

        const exploreMapping = INSIGHT_EXPLORE_MAPPINGS[numerator] || null;

        // Mapped cards can read directly from Explore's all-values aggregate.
        if (exploreMapping) {
          // Reuse the same aggregate source as Explore Years for matching totals.
          const cardPromise = fetchExploreInsightMetrics(orgData, exploreMapping.exploreFilter)
            .then((metrics) => {
              const numeratorCount = metrics?.[exploreMapping.numeratorMetric];
              const denominatorCount = Array.isArray(exploreMapping.denominatorSumOf)
                ? exploreMapping.denominatorSumOf.reduce((sum, metricKey) => {
                  const value = metrics?.[metricKey];
                  return sum + (Number.isFinite(value) ? value : 0);
                }, 0)
                : (Number.isFinite(metrics?.[exploreMapping.denominatorMetric])
                  ? metrics[exploreMapping.denominatorMetric]
                  : 0);
              const totalCount = Number.isFinite(metrics?.[exploreMapping.totalMetric])
                ? metrics[exploreMapping.totalMetric]
                : 0;

              if (!Number.isFinite(numeratorCount)) {
                showUnavailableCard(cardContents);
                return;
              }

              if (!denominator) {
                percentageContents.textContent = makeNumberReadable(numeratorCount);
                figureDetails.innerHTML = `
                  <span id="details_${numerator}" class="font-semibold text-carnation-600">${makeNumberReadable(numeratorCount)}</span>
                  <span class="text-neutral-900">
                    ${denominatorText} in total
                  </span>
                `;
                return;
              }

              if (!denominatorCount) {
                showUnavailableCard(cardContents);
                return;
              }

              figureDetails.innerHTML = `
                <span id="details_${numerator}" class="font-semibold text-carnation-600">${makeNumberReadable(numeratorCount)}</span>
                <span class="text-neutral-900">
                  of <span id="denominator_${numerator}">${makeNumberReadable(denominatorCount)}</span> ${denominatorText}
                </span>
              `;

              const pct = Math.round((numeratorCount / denominatorCount) * 100);
              percentageContents.innerHTML = `
                <span class="font-extrabold">${pct}%</span>
              `;

              setBarChart(
                cardContents,
                numeratorCount,
                denominatorCount,
                exploreMapping.denominatorMetric || denominator,
                totalCount
              );
            })
            .catch(function (error) {
              console.log(`${numerator} aggregate error: ${error}`);
              showUnavailableCard(cardContents);
            })
            .finally(updateTooltipContent);

          changeOpacity(contentID);
          return cardPromise;
        }

      } else {
        displayNone(contentID);
      }
    };

    /* Get Strategy data and display it */
    function displayStrategy(strategy, keys, tableRow) {
      if (!loggedIn) {
        return;
      }

      // POC: this action is only relevant when reviewing a single author's articles.
      // Unlike show_on_web (fixed for the session), the author filter can toggle on
      // and off as the user changes filters, so skip fetching without touching the
      // panel/table DOM — removing it here would break re-population if the filter
      // is reapplied later. renderActionTabs() already keeps its tab out of the nav
      // while this is the case.
      if (strategy === "wellcome_point_of_award_check" && !isSingleAuthorFilterActive()) {
        return;
      }

      var shown  = orgData.hits.hits[0]._source.strategy[strategy].show_on_web,
          sort   = `&sort=${orgData.hits.hits[0]._source.strategy[strategy].sort}`,
          tabID  = `strategy_${strategy}`;

      if (shown === true) {
        // Get tab elements
        var tabCountContents   = document.getElementById(`count_${strategy}`),
            tableCountContents = document.getElementById(`total_${strategy}`),
            tableBody          = document.getElementById(`table_${strategy}`).getElementsByTagName('tbody')[0];
        
        // Store original query + build encoded query with URL filters, if any
        const strategyQuery = orgData.hits.hits[0]._source.strategy[strategy].query,
              encodedQuery = buildEncodedQueryWithUrlFilter(strategyQuery);
        
        // Build full count + works queries
        var countQuery = countQueryPrefix + encodedQuery,
            listQuery  = queryPrefix + encodedQuery + sort;
        
        // Get total action (article) count for this strategy
        const actionPromise = fetchCountQuery(countQuery)
          .then(function (countResponse) {
            var count = parseFloat(countResponse);
            
            // Show total number of actions in tab & above table
            tabCountContents.textContent = makeNumberReadable(count);
            if (count > 100) {
              count = 100; // limit to 100
            }
            tableCountContents.textContent = makeNumberReadable(count);

            // If no actions are available, show message
            if (count === 0) {
              tableCountContents.textContent = "No ";
              tableBody.innerHTML = "<tr><td class='py-4 pl-4 pr-3 text-sm text-center align-top break-words' colspan='3'>We couldn’t find any articles! <br>Try selecting another date range or come back later once new articles are ready.</td></tr>";
            }

            // Otherwise, generate list of actions
            else if (count > 0) {

              // Get full list of actions for this strategy 
              fetchJson(listQuery)
                .then(function (listResponse) {
                  var list = listResponse?.hits?.hits || [],
                      rowsToRender = Math.min(count, list.length),
                      tableRows = ""; // Contents of the list to be displayed in the UI as a table
              
                  // For each individual action, create a row
                  for (let i = 0; i < rowsToRender; i++) {
                    var action = {}; // Create object to store key-value pairs for each action
                    tableRows += "<tr>";

                    // Populate action array with values for each key
                    for (var key of keys) {
                      // If it’s from the supplements array, loop over supplements to access data without index number
                      if (key.startsWith('supplements.')) {
                        var origKey = key;
                        key = key.replace('supplements.', ''); // Remove prefix
                        var pathParts = key.split('.');
                        var suppKey = list[i]._source.supplements.find(function(s) { return s[pathParts[0]] != null; });

                        if (suppKey == null) {
                          action[key] = "N/A";
                        } else {
                          var value = pathParts.reduce(function(obj, part) { return obj != null ? obj[part] : null; }, suppKey);
                          action[key] = value != null ? value : "N/A";
                        }

                        if (key.includes('invoice_date')) action[key] = makeDateReadable(new Date(action[key]));
                        if (key.includes('apc_cost')) action[key] = makeNumberReadable(action[key]);
                        action[origKey] = action[key]; // mirror under full key for {supplements.*} mailto template substitution
                      } else { 
                        var value = list[i]._source[key];
                        action[key] = value;

                        if (key === 'published_date') action[key] = makeDateReadable(new Date(action[key]));
                        if (key === 'epmc_licence' && action[key] != null) action[key] = LICENSE_CODES[action[key]]?.name || String(action[key]).toUpperCase();
                      }

                      if (action[key] == null) {
                        action[key] = "N/A";
                      }
                    };
                    
                    // If mailto is included, replace its body’s content with the action’s values
                    if ("mailto" in action) {
                      var mailto = orgData.hits.hits[0]._source.strategy[strategy].mailto;

                      const decodeMailtoValue = function(value, fallback) {
                        const resolvedValue = typeof value === "string" && value.length > 0 ? value : fallback;
                        const textarea = document.createElement("textarea");
                        textarea.innerHTML = resolvedValue.replaceAll("\’", "’");
                        return textarea.value
                          .replace(/<\/?[a-zA-Z][a-zA-Z0-9-]*(\s[^>]*)?\/?>/g, "")
                          .replace(/\s+/g, " ")
                          .trim();
                      };

                      var newMailto = mailto.replaceAll("\’", "’");
                      newMailto = newMailto.replaceAll("{doi}", decodeMailtoValue(action.DOI, "[No DOI found]"));
                      newMailto = newMailto.replaceAll("{author_email_name}", decodeMailtoValue(action.author_email_name, "[No author’s name found]"));
                      newMailto = newMailto.replaceAll("{title}", decodeMailtoValue(action.title, "[No title found]"));
                      for (var actionKey in action) {
                        if (actionKey !== "email" && typeof action[actionKey] === "string") newMailto = newMailto.replaceAll("{" + actionKey + "}", decodeMailtoValue(action[actionKey], ""));
                      }

                      // And add it to the action array
                      action["mailto"] = encodeURI(newMailto);
                      action["draft_aria_label"] = `Open draft for ${action.author_email_name || "unknown author"}, article: ${action.title || action.DOI || "unknown article"}`
                        .replaceAll("&", "&amp;")
                        .replaceAll("\"", "&quot;")
                        .replaceAll("\'", "&#39;")
                        .replaceAll("<", "&lt;")
                        .replaceAll(">", "&gt;");
                    };

                    // If EPMC fulltext status is included, derive a human-readable label + icon for
                    // display, without touching the raw value the data-in-epmc attribute relies on
                    if ("has_epmc_fulltext" in action) {
                      var inEpmc = action.has_epmc_fulltext === true;
                      action.epmc_status_label = inEpmc ? "Yes" : "No";
                      action.epmc_status_icon = inEpmc ? "ph-check-circle" : "ph-x-circle";
                      action.epmc_status_color = inEpmc ? "text-neutral-900" : "text-carnation-500";
                    }

                    if (typeof action.title === "string" && action.title.includes("&")) {
                      const textarea = document.createElement("textarea");
                      textarea.innerHTML = action.title;
                      action.title = textarea.value;
                    }

                    var tableRowLiteral = tableRow.replace(/\$\{action\.([^}]+)\}/g, function(match, key) {
                      return action[key] ?? "";
                    });
                    tableRows += tableRowLiteral; // Populate the table with a row w/ replaced placeholders for each action 
                    tableRows += "</tr>";
                  }

                  tableBody.innerHTML = tableRows; // Fill table with all actions
                }
              )
            }
          })
          .catch(function (error) { console.log(`${strategy} error: ${error}`); });

        // Once data has loaded, display the card
        changeOpacity(tabID);
        return actionPromise;

      } else {
        var tabItem = document.getElementById(tabID),
            tabContent = document.getElementById(strategy);

        if (tabItem) {
          tabItem.remove();
        }
        if (tabContent) {
          tabContent.remove();
        }
      };
    };

    // Hide temporarily 
    // See See https://github.com/oaworks/discussion/issues/3619#issuecomment-3587683138 #}
    // displayStrategy(
    //   "email_author_vor",
    //   ['published_date', 'title', 'journal', 'author_email_name', 'email', 'DOI', 'mailto'],
    //   "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
    //     <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
    //     <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
    //       <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
    //     </div>\
    //     <div class='text-neutral-600'>${action.journal}</div>\
    //   </td>\
    //   <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
    //     <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
    //   </td>\
    //   <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
    //     <button \
    //       class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
    //       data-email='${action.email}'\
    //       data-doi='${action.DOI}'\
    //       data-mailto='${action.mailto}'\
    //       onclick='handleDecryptEmailClick(this)'>\
    //       <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
    //     </button>\
    //   </td>"
    // );

    // displayStrategy(
    //   "email_author_aam",
    //   ['published_date', 'title', 'journal', 'author_email_name', 'email', 'DOI', 'mailto'],
    //   "<td class='py-4 pl-4 pr-3 text-sm align-top break-words'>\
    //     <div class='mb-1 text-neutral-600'>${action.published_date}</div>\
    //     <div class='mb-1 font-medium text-neutral-900 hover:text-carnation-500'>\
    //       <a href='https://doi.org/${action.DOI}' target='_blank' rel='noopener' title='Open article'>${action.title}</a>\
    //     </div>\
    //     <div class='text-neutral-600'>${action.journal}</div>\
    //   </td>\
    //   <td class='hidden px-3 py-4 text-sm text-neutral-600 align-top break-words sm:table-cell'>\
    //     <div class='mb-1 text-neutral-900'>${action.author_email_name}</div>\
    //   </td>\
    //   <td class='hidden px-3 py-4 text-sm text-center text-neutral-600 align-top break-words sm:table-cell'>\
    //     <button \
    //       class='inline-flex items-center p-2 border border-transparent bg-carnation-500 text-white rounded-full shadow-sm hover:bg-white hover:text-carnation-500 hover:border-carnation-500 transition duration-200'\
    //       data-email='${action.email}'\
    //       data-doi='${action.DOI}'\
    //       data-mailto='${action.mailto}'\
    //       onclick='handleDecryptEmailClick(this)'>\
    //       <i class='ph ph-envelope inline-block text-[16px] leading-none duration-500' aria-hidden='true'></i>\
    //     </button>\
    //   </td>"
    // );
    
    const actionPromises = [];
    if (loggedIn) {
      ACTION_TABLE_CONFIGS.forEach(({ id, keys, rowTemplate }) => {
        const actionPromise = displayStrategy(id, keys, rowTemplate);
        if (actionPromise) actionPromises.push(actionPromise);
      });

      // POC: only Wellcome's org strategy currently defines this action
      if (document.getElementById("copy_clipboard_wellcome_point_of_award_check")) {
        copyToClipboard(
          "copy_clipboard_wellcome_point_of_award_check",
          "table_wellcome_point_of_award_check",
          formatDoiEpmcListForClipboard,
          "DOIs copied!"
        );
      }
    }

    return Promise.allSettled([...cardPromises, ...actionPromises]);

  }).catch(error => {
    console.log(`Report ERROR: ${error}`);
    displayErrorHeader();
  }).finally(stopLoading);
};


/**
 * Calls the getActionExportLink function with the necessary orgData.
 * This function is designed to be called from HTML templates and handles
 * fetching the organization data before executing getActionExportLink.
 *
 * @param {string} id - The identifier for the action export link.
 */
window.callGetActionExportLink = function(id) {
  orgDataPromise.then(function (orgData) {
      getActionExportLink(id, orgData);
  }).catch(function (error) {
      console.error(`Error fetching orgData: ${error}`);
  });

  // Do not navigate away from the page on submit
  return false;
};


/**
 * Handles the creation and sending of an action export link request.
 * This function is called with organizational data and an identifier to
 * construct the appropriate export link.
 *
 * @param {string} id - The identifier for the action export link.
 * @param {Object} orgData - The organization data required for the export link.
 * @returns {boolean} - Always returns false to prevent default form submission.
*/
export function getActionExportLink(id, orgData) {
  let hasCustomExportIncludes = orgData.hits.hits[0]._source.strategy[id].export_includes,
      strategyQuery           = orgData.hits.hits[0]._source.strategy[id].query,
      strategySort            = orgData.hits.hits[0]._source.strategy[id].sort;

  Promise.all([hasCustomExportIncludes])
    .then(function (results) {
      hasCustomExportIncludes = results[0].data;
    })
    .catch(function (error) {
      console.log(`Export error: ${error}`);
    });

  // Build the export query
  const isPaperURL = dateRange + strategyQuery;
  const query = `q=${buildEncodedQueryWithUrlFilter(isPaperURL)}`;

  // Get form content — email address input
  const form = new FormData(document.getElementById(`form_${id}`));
  const email = `&${new URLSearchParams(form).toString()}`;

  // Include custom export fields if any
  const include = (typeof hasCustomExportIncludes === 'string' && hasCustomExportIncludes.trim())
    ? `&include=${hasCustomExportIncludes.trim()}`
    : "";

  // Build final URL
  const exportUrl = `${CSV_EXPORT_BASE}${query}${include}&sort=${strategySort}${email}${orgKey}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", exportUrl);
  xhr.onload = function () {
    const emailHint = document.getElementById(`email-hint-${id}`);
    if (emailHint) {
      emailHint.hidden = true;
    }
    document.getElementById(`msg-${id}`).innerHTML = `OA.Report has started building your CSV export at <a href='${this.response}' target='_blank' class='underline underline-offset-2 decoration-1'>this URL</a>. Please check your email to get the full data once it’s ready.`;
  };
  xhr.send();
}
