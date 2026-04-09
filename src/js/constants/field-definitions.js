// =================================================
// constants/field-definitions.js
// Shared field definition copy across Explore and Insights
// =================================================

const POLICY_LINK_EXPLORE = "<a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>your organization’s Open Access policy</a>";
const POLICY_LINK_INSIGHTS = "<a href='{policyUrl}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a>";

/**
 * Canonical field definitions shared across UI surfaces.
 * Surface-specific wording lives under `explore` and `insights`.
 *
 * @type {Object.<string, Object>}
 */
export const FIELD_DEFINITIONS = {
  compliant: {
    label: "Compliant",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref and OpenAlex.",
    explore: {
      info: `Publications covered by ${POLICY_LINK_EXPLORE} that are compliant with the policy. <span class='org-policy-compliance'></span>`,
      help_text: ["compliant"],
      help_text_style: "paragraph"
    },
    insights: {
      info: `<p>The percentage of {subject} covered by ${POLICY_LINK_INSIGHTS} that are compliant with the policy.</p>`,
      help_text: ["compliant", "covered_by_policy"],
      help_text_style: "bullets"
    }
  },
  covered_by_policy: {
    label: "Covered by policy",
    explore: {
      info: `Publications covered by ${POLICY_LINK_EXPLORE}. <span class='org-policy-coverage'></span>`,
      help_text: ["covered_by_policy"],
      help_text_style: "paragraph"
    }
  },
  free_to_read: {
    label: "Free-to-read",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref and OpenAlex.",
    explore: {
      info: "Publications that are free to read on the publisher’s website or any online repository, including temporarily accessible articles (“bronze Open Access”)."
    },
    insights: {
      info: "<p>{subject} that are free to read on the publisher website or any online repository, including temporarily accessible articles (“bronze Open Access”).</p>"
    }
  },
  open_access: {
    label: "Open Access",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref, OpenAlex, Europe PMC and manual checks (as required). If a work has the required license at any location it is considered Open Access.",
    explore: {
      info: "Publications that are free and CC BY or CC0 (in the public domain) on the publisher’s website, a repository or a preprint server."
    },
    insights: {
      info: "<p>The number of {subject} that are free and <a href='https://creativecommons.org/licenses/by/4.0/' class='underline underline-offset-2 decoration-1' target='_blank' rel='noopener'>CC BY</a> <strong class='bold'>or</strong> <a href='https://creativecommons.org/publicdomain/zero/1.0/' class='underline underline-offset-2 decoration-1' target='_blank' rel='noopener'>CC0</a> (in the public domain) on the publisher’s website, a repository or a preprint server.</p>"
    }
  },
  data_availability_statement: {
    label: "With data availability statement",
    details: "To confirm that a paper has a data availability statement, we first use PubMed’s data availability filter and then review articles manually.",
    explore: {
      info: "Publications that include a data availability statement. These statements (also called ‘data access’, ‘resource availability’ or ‘code availability’ statements) tell readers where the underlying data or code can be found and how to access it. This figure doesn’t specify the kind of statement provided (e.g., whether the data are openly available or not)"
    },
    insights: {
      info: "<p>This number tells you how many {subject} that we’ve analyzed have a data availability statement.</p> <p>To check if a paper has a data availability statement, we use data from PubMed and review {review_subject} manually. This figure doesn’t tell you what type of data availability statement is provided (e.g there is Open Data vs there is no data).</p>"
    }
  }
};

function interpolateDefinitionTokens(html = '', context = {}) {
  return html.replace(/\{(\w+)\}/g, (_, key) => context[key] ?? `{${key}}`);
}

/**
 * Returns a field definition resolved for a specific UI surface.
 *
 * @param {string} key - Canonical field definition key.
 * @param {"explore"|"insights"} surface - UI surface to resolve.
 * @param {Object} [context={}] - Optional token replacements for the surface copy.
 * @returns {Object|null} Resolved definition config, or null when not found.
 */
export function getFieldDefinition(key, surface, context = {}) {
  const definition = FIELD_DEFINITIONS[key];
  const surfaceDefinition = definition?.[surface];
  if (!definition || !surfaceDefinition) return null;

  return {
    label: definition.label,
    info: interpolateDefinitionTokens(surfaceDefinition.info, context),
    details: definition.details,
    help_text: surfaceDefinition.help_text || [],
    help_text_style: surfaceDefinition.help_text_style || 'paragraph'
  };
}
