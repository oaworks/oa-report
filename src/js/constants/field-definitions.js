// =================================================
// constants/field-definitions.js
// Shared field definition copy across Explore and Insights
// =================================================

const POLICY_LINK_EXPLORE = "<a href='' target='_blank' rel='noopener noreferrer' class='underline underline-offset-1 md:underline-offset-4 decoration-1 org-policy-url'>your organization’s Open Access policy</a>";
const POLICY_LINK_INSIGHTS = "<a href='{policyUrl}' target='_blank' rel='noopener' class='underline underline-offset-2 decoration-1'>your organization’s Open Access policy</a>";

/**
 * Canonical field definitions shared across report sections.
 * Section-specific wording lives under `explore` and `insights`.
 *
 * @type {Object.<string, Object>}
 */
export const FIELD_DEFINITIONS = {
  doc_count: {
    label: "Publications",
    explore: {}
  },
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
  compliant_and_covered_by_policy: {
    label: "Compliant (all)",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref and OpenAlex.",
    explore: {
      info: "All publications that comply with the requirements of the Open Access policy, even if they are not covered by said policy. <p><span class='org-policy-compliance'></span></p>"
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
  },
  in_repository: {
    label: "In repository",
    details: "We use data from Unpaywall —the gold standard for this data— and supplement that with data from Crossref and OpenAlex.",
    explore: {
      info: "Publications that have a copy of the work freely available and discoverable in any repository."
    }
  },
  mean_apc_amount: {
    label: "Mean APC amount",
    explore: {
      info: "Mean (i.e. average) of article-processing charges (APCs) paid by <span class='org-name'></span>."
    }
  },
  mean_citations: {
    label: "Mean citations",
    details: "We used data from OpenAlex's <code class='p-1 rounded-md bg-neutral-500 text-white text-xs'>cited_by_count</code>.",
    explore: {
      info: "The mean (i.e. average) number of citations of these publications."
    }
  },
  median_apc_amount: {
    label: "Median APC amount",
    explore: {
      info: "Median of article-processing charges (APCs) paid by <span class='org-name'></span>."
    }
  },
  publications: {
    label: "Publications",
    explore: {}
  },
  total_apc_amount: {
    label: "Total APC amount",
    explore: {
      info: "Total article-processing charges (APCs) paid by <span class='org-name'></span>."
    }
  },
  total_citations: {
    label: "Total citations",
    explore: {
      info: "Number of citations the publications received."
    }
  },
  unknown_code_status: { label: "Unknown code status", explore: {} },
  unknown_data_availability_statement: {
    label: "Unknown data availability statement",
    details: "To confirm whether a paper has a data availability statement, we first use PubMed’s data availability filter and then review articles manually. Because we wait for external sources to update before collectinf these data ourselves, this process can take up to six months.",
    explore: {
      info: "Publications where we have not yet confirmed whether they include a data availability statement. These statements (also called ‘data access’, ‘resource availability’ or ‘code availability’ statements) tell readers where the underlying data or code can be found and how to access it."
    }
  },
  unknown_data_status: { label: "Unknown data status", explore: {} },
  unknown_shared_data_status: { label: "Unknown shared data status", explore: {} },
  unknown_shared_code_status: { label: "Unknown shared code status", explore: {} },
  with_apc: {
    label: "With APC<span class='lowercase'>s</span>",
    explore: {
      info: "Journal articles with an article-processing charge (APC) paid by <span class='org-name'></span>."
    }
  },
  with_data: { label: "With data", explore: {} },
  with_code: { label: "With code", explore: {} },
  with_data_accession_number: { label: "With data accession number", explore: {} },
  with_code_accession_number: { label: "With code accession number", explore: {} },
  with_data_availability_statement: {
    label: "With data availability statement",
    details: "To confirm that a paper has a data availability statement, we first use PubMed’s data availability filter and then review articles manually.",
    explore: {
      info: "Publications that include a data availability statement. These statements (also called ‘data access’, ‘resource availability’ or ‘code availability’ statements) tell readers where the underlying data or code can be found and how to access it. This figure doesn’t specify the kind of statement provided (e.g., whether the data are openly available or not)"
    }
  },
  with_data_dois: { label: "With data DOI<span style='text-transform: lowercase;'>s</span>", explore: {} },
  with_code_dois: { label: "With code DOI<span style='text-transform: lowercase;'>s</span>", explore: {} },
  with_dois: { label: "With DOI<span style='text-transform: lowercase;'>s</span>", explore: {} },
  with_fundref_dois: {
    label: "With FundRef DOI<span style='text-transform: lowercase;'>s</span>",
    explore: {
      info: "Publications that have at least one ORCID in their Crossref metadata."
    }
  },
  with_grant_dois: {
    label: "With grant DOI<span style='text-transform: lowercase;'>s</span>",
    explore: {
      info: "Publications that have at least one grant DOI in their Crossref metadata."
    }
  },
  with_grant_id: {
    label: "With grant ID<span style='text-transform: lowercase;'>s</span>",
    details: "We found and normalized data from Crossref to find data provided by the publisher. Where this wasn't possible, we manually collected the funding statement. The grant ID was then extracted and normalized using a mix of automated tools and manual review.",
    explore: {
      info: "Publications with a grant ID from <span class='org-name'></span> found by OA.Works."
    }
  },
  with_open_data: { label: "With Open Data", explore: {} },
  with_open_code: { label: "With Open Code", explore: {} },
  with_open_data_in_repository: { label: "With Open Data in repository", explore: {} },
  with_open_code_in_repository: { label: "With Open Code in repository", explore: {} },
  with_orcids: {
    label: "With ORC<span style='text-transform: lowercase;'>i</span>D<span style='text-transform: lowercase;'>s</span>",
    explore: {
      info: "Publications that have at least one ORCID in their OpenAlex metadata."
    }
  },
  with_preprint: {
    label: "With preprint",
    details: "We used data from Unpaywall and Crossref.",
    explore: {
      info: "Publications that have a preprint associated with them."
    }
  },
  with_peer_reviewed_version: {
    label: "With peer reviewed version",
    details: "We used data from Unpaywall and Crossref.",
    explore: {
      info: "Preprints that have a peer reviewed version associated with them."
    }
  },
  with_rors: {
    label: "With ROR<span style='text-transform: lowercase;'>s</span>",
    explore: {
      info: "Publications that have at least one ROR ID in their OpenAlex metadata."
    }
  },
  with_shared_data: { label: "With shared data", explore: {} },
  with_shared_code: { label: "With shared code", explore: {} },
  with_shared_data_in_repository: { label: "With shared data in repository", explore: {} },
  with_shared_code_in_repository: { label: "With shared code in repository", explore: {} },
  without_data: { label: "Without data", explore: {} },
  without_code: { label: "Without code", explore: {} },
  without_data_availability_statement: {
    label: "Without data availability statement",
    details: "To check if a paper has a data availability statement, we use data from PubMed’s data availability filter and review articles manually.",
    explore: {
      info: "Publications that do not have a data availability statement. Data availability statements (or 'data access statement', 'resource availability statements', 'code availability statements') tell a reader where the research data or code associated with a paper is available, and how they can be accessed. This figure doesn’t tell you what type of data availability statement is provided (e.g whether there is Open Data or no data at all)."
    }
  },
  without_shared_data: { label: "Without shared data", explore: {} },
  without_shared_code: { label: "Without shared code", explore: {} }
};

function interpolateDefinitionTokens(html = '', context = {}) {
  return html.replace(/\{(\w+)\}/g, (_, key) => context[key] ?? `{${key}}`);
}

/**
 * Resolves a field definition for a specific report section.
 *
 * @param {string} key - Canonical field definition key.
 * @param {"explore"|"insights"} section - Report section to resolve.
 * @param {Object} [context={}] - Optional token replacements for the section copy.
 * @returns {Object|null} Resolved definition config, or null when not found.
 */
export function resolveFieldDefinition(key, section, context = {}) {
  const definition = FIELD_DEFINITIONS[key];
  const sectionDefinition = definition?.[section];
  if (!definition || !sectionDefinition) return null;

  return {
    label: definition.label,
    info: interpolateDefinitionTokens(sectionDefinition.info, context),
    details: definition.details,
    help_text: sectionDefinition.help_text || [],
    help_text_style: sectionDefinition.help_text_style || 'paragraph'
  };
}
